<template>
  <div class="w-full flex flex-col items-start" ref="dropdownRoot">
    <header
      class="w-full flex items-center
             py-3 sm:py-4 lg:py-0
             mb-6 sm:mb-8 lg:mb-4 lg:mt-2
             sticky top-[env(safe-area-inset-top)] z-[80] bg-white/90 backdrop-blur
             lg:static lg:bg-transparent"
      :style="{'--stepper-bg': stepperBg}"
    >
      <!-- ЛЕВО -->
      <div class="flex items-center gap-2 sm:gap-3">
        <slot name="left">
          <div class="flex items-center gap-2 sm:gap-3">
            <div class="relative w-5 h-5 sm:w-6 sm:h-6">
              <img :src="sectionIcon" class="absolute inset-0 w-full h-full object-contain" />
            </div>
            <span class="text-[15px] sm:text-[20px] font-medium text-[#020203] leading-normal">
              {{ sectionTitle }}
            </span>
          </div>
        </slot>
      </div>

      <!-- ЦЕНТР: степпер (только на md+) -->
      <div class="flex-1 hidden md:flex justify-center">
        <slot name="center"></slot>
      </div>

      <!-- ПРАВО: аватар/меню -->
      <button
        ref="avatarBtn"
        @click="toggleDropdown"
        class="group relative shrink-0 p-1.5 sm:p-2 rounded-full flex items-center gap-2 cursor-pointer
               bg-white/70 lg:bg-transparent border border-transparent lg:border-0"
        aria-haspopup="menu"
        :aria-expanded="isDropdownOpen"
      >
        <div class="absolute inset-0 rounded-full z-0 group-hover:bg-[#f2f2f2] transition"></div>
        <div class="relative z-10 flex items-center gap-2">
          <div class="relative h-8 w-8 sm:h-9 sm:w-9 rounded-full overflow-hidden">
            <img :src="tokenIcon" class="absolute inset-0 w-full h-full object-cover pointer-events-none" />
          </div>
          <!-- бейдж -->
          <div class="w-0 h-0 relative">
            <div class="absolute -right-2 -bottom-1 w-[26px] h-[28px]">
              <img :src="badgeHex" class="absolute inset-0 w-full h-full" alt="" />
              <div class="absolute left-[2px] top-[8px] w-5 text-center text-[11px] font-medium text-white leading-3">36</div>
            </div>
          </div>
          <img :src="isDropdownOpen ? arrowUp : arrowDown" alt="chevron" class="w-4 h-4 z-10" />
        </div>
      </button>
    </header>

    <!-- ДРОПДАУН ТЕЛЕПОРТОМ -->
    <teleport to="body">
      <Transition name="fade-slide">
        <div
          v-if="isDropdownOpen"
          :style="dropdownPosition"
          class="fixed z-[999] bg-white rounded-xl
                 outline outline-1 outline-offset-[-1px] outline-[#D0D0D0]/10 shadow-xl
                 p-1 w-[92vw] max-w-[290px]"
          role="menu"
        >
          <div class="w-full p-3">
            <div class="text-base font-medium text-[#020203] leading-normal">Антон Рязанов</div>
          </div>
          <div class="w-full h-px bg-[#D0D0D0]/40 my-1"></div>

          <DropdownItem
            :iconSrc="subIcon"
            label="Управление подпиской"
            badge="Pro"
            badgeColor="blue"
            to="/subscription"
            @click="closeDropdown"
          />
          <DropdownItem
            :iconSrc="settingsIcon"
            label="Настройки"
            :separator="true"
            to="/settings"
            @click="closeDropdown"
          />
          <DropdownItem label="Пригласить друга" to="/invite" @click="closeDropdown" />
          <DropdownItem
            label="Подарить сертификат"
            :blue="true"
            :separator="true"
            @click.stop="openGiftModal"
          />
          <DropdownItem label="Задать вопрос" :separator="true" to="/help" @click="closeDropdown" />
          <DropdownItem
            :iconSrc="logoutIcon"
            label="Выйти из аккаунта"
            :danger="true"
            to="/logout"
            @click="closeDropdown"
          />
        </div>
      </Transition>
    </teleport>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import DropdownItem from './DropdownItem.vue'

const props = defineProps({
  user: Object,
  sectionTitle: { type: String, default: '' },
  sectionIcon:  { type: String, default: '' },
  stepperBg:    { type: String, default: '#ffffff' },
})

/* ассеты */
import tokenIcon    from '@/src/assets/icons/profile/header/Avatar.png'
import badgeHex     from '@/src/assets/icons/profile/header/hex.svg'
import arrowDown    from '@/src/assets/icons/profile/header/chevron-down.svg'
import arrowUp      from '@/src/assets/icons/profile/header/chevron-up.svg'
import settingsIcon from '@/src/assets/icons/profile/header/drop-down/settings.svg'
import subIcon      from '@/src/assets/icons/profile/header/drop-down/sparkles.svg'
import logoutIcon   from '@/src/assets/icons/profile/header/drop-down/exit.svg'

const isDropdownOpen = ref(false)
const dropdownRoot   = ref(null)
const avatarBtn      = ref(null)
const route = useRoute()
const router = useRouter()

// координаты для fixed-дропа
const dropTop  = ref(72)   // дефолт под шапкой
const dropLeft = ref(0)

const dropdownPosition = computed(() => ({
  top:  dropTop.value + 'px',
  left: dropLeft.value + 'px',
}))

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
  if (isDropdownOpen.value) {
    // когда открываем — посчитать позицию кнопки
    requestAnimationFrame(() => {
      const btn = avatarBtn.value
      if (btn) {
        const rect = btn.getBoundingClientRect()
        // на мобилке — почти во всю ширину, привязали к левому паддингу
        if (window.innerWidth < 768) {
          dropTop.value  = rect.bottom + 10 + window.scrollY
          dropLeft.value = 16   // как px-4
        } else {
          // десктоп — справа под кнопкой
          dropTop.value  = rect.bottom + 10 + window.scrollY
          dropLeft.value = rect.right - 290 + window.scrollX // 290 — max-width
        }
      }
    })
  }
}
const closeDropdown = () => { isDropdownOpen.value = false }

function openGiftModal() {
  const q = { ...route.query, modal: 'gift' }
  router.push({ path: route.path, query: q })
  isDropdownOpen.value = false
}

function handleClickOutside (event) {
  // т.к. дроп телепортирован — просто закрываем, если клик не по кнопке
  if (
    avatarBtn.value &&
    !avatarBtn.value.contains(event.target)
  ) {
    isDropdownOpen.value = false
  }
}

onMounted(() => document.addEventListener('click', handleClickOutside))
onBeforeUnmount(() => document.removeEventListener('click', handleClickOutside))
</script>

<style scoped>
/* анимация дропа */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.18s ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(-8px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
