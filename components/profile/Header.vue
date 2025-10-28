<template>
  <div class="w-full flex flex-col items-start" ref="dropdownRoot">
    <!-- Шапка: компакт на мобилке, просторнее на десктопе -->
    <header
      class="w-full flex justify-between items-center
             py-3 sm:py-4 lg:py-0
             mb-6 sm:mb-8 lg:mb-8
             lg:mt-2
             lg:relative
             sticky top-[env(safe-area-inset-top)] z-[60] bg-white/90 backdrop-blur lg:static lg:bg-transparent"
    >
      <!-- Левая зона: слот или секция по умолчанию -->
      <div class="flex items-center gap-2 sm:gap-3">
        <slot name="left">
          <div class="flex items-center gap-2 sm:gap-3">
            <div class="relative w-5 h-5 sm:w-6 sm:h-6">
              <img :src="sectionIcon" class="absolute inset-0 w-full h-full object-contain" />
            </div>
            <span class="text-[15px] sm:text-base font-medium text-[#020203] leading-normal">
              {{ sectionTitle }}
            </span>
          </div>
        </slot>
      </div>

      <!-- Правый блок: аватар + бейдж + стрелка -->
      <button
        @click="toggleDropdown"
        class="group relative shrink-0 p-1.5 sm:p-2 rounded-full flex items-center gap-2 cursor-pointer
               bg-white/70 lg:bg-transparent border border-transparent lg:border-0"
        aria-haspopup="menu"
        aria-expanded="isDropdownOpen"
      >
        <div class="absolute inset-0 rounded-full z-0 group-hover:bg-[#f2f2f2] transition"></div>

        <div class="relative z-10 flex items-center gap-2">
          <!-- Аватар -->
          <div class="relative h-8 w-8 sm:h-9 sm:w-9 rounded-full overflow-hidden">
            <img :src="tokenIcon" class="absolute inset-0 w-full h-full object-cover pointer-events-none" />
          </div>

          <!-- Бейдж «36» поверх -->
          <div class="w-0 h-0 relative">
            <div class="absolute -right-2 -bottom-1 w-[26px] h-[28px]">
              <img :src="badgeHex" class="absolute inset-0 w-full h-full" alt="" />
              <div class="absolute left-[2px] top-[8px] w-5 text-center text-[11px] font-medium text-white leading-3">36</div>
            </div>
          </div>

          <!-- Стрелка -->
          <img :src="isDropdownOpen ? arrowUp : arrowDown" alt="chevron" class="w-4 h-4 z-10" />
        </div>
      </button>

      <!-- Дропдаун -->
      <Transition name="fade-slide">
        <div
          v-if="isDropdownOpen"
          class="absolute right-3 top-[calc(100%+10px)] sm:right-0 sm:top-[calc(100%+12px)]
                 z-[70] w-[92vw] max-w-[290px] p-1 bg-white rounded-xl
                 outline outline-1 outline-offset-[-1px] outline-[#D0D0D0]/10 shadow-xl"
          role="menu"
        >
          <div class="w-full p-3">
            <div class="text-base font-medium text-[#020203] leading-normal">Антон Рязанов</div>
          </div>
          <div class="w-full h-px bg-[#D0D0D0]/40 my-1"></div>

          <DropdownItem :iconSrc="subIcon" label="Управление подпиской" badge="Pro" badgeColor="blue" to="/subscription" />
          <DropdownItem :iconSrc="settingsIcon" label="Настройки" :separator="true" to="/settings" />
          <DropdownItem label="Пригласить друга" to="/invite" />
          <DropdownItem label="Подарить сертификат" :blue="true" :separator="true" @click.stop="openGiftModal" />
          <DropdownItem label="Задать вопрос" :separator="true" to="/help" />
          <DropdownItem :iconSrc="logoutIcon" label="Выйти из аккаунта" :danger="true" to="/logout" />
        </div>
      </Transition>
    </header>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import DropdownItem from './DropdownItem.vue'

const props = defineProps({
  user: Object,
  sectionTitle: { type: String, default: '' },
  sectionIcon:  { type: String, default: '' }
})

/* ассеты */
import tokenIcon   from '@/src/assets/icons/profile/header/Avatar.png'
import badgeHex    from '@/src/assets/icons/profile/header/hex.svg'
import arrowDown   from '@/src/assets/icons/profile/header/chevron-down.svg'
import arrowUp     from '@/src/assets/icons/profile/header/chevron-up.svg'
import settingsIcon from '@/src/assets/icons/profile/header/drop-down/settings.svg'
import subIcon      from '@/src/assets/icons/profile/header/drop-down/sparkles.svg'
import logoutIcon   from '@/src/assets/icons/profile/header/drop-down/exit.svg'

const isDropdownOpen = ref(false)
const dropdownRoot = ref(null)

const route = useRoute()
const router = useRouter()

function openGiftModal() {
  const q = { ...route.query, modal: 'gift' }
  router.push({ path: route.path, query: q })
  isDropdownOpen.value = false
}
const toggleDropdown = () => { isDropdownOpen.value = !isDropdownOpen.value }

function handleClickOutside (event) {
  if (dropdownRoot.value && !dropdownRoot.value.contains(event.target)) {
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
