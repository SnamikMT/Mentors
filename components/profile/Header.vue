<template>
  <div class="w-full flex flex-col items-start" ref="dropdownRoot">
    <header class="w-full flex justify-between items-center mb-12">
      <div class="flex items-center gap-3">
       
        <slot name="left">
          <div class="flex items-center gap-2">
            <div class="w-5 h-5 relative">
              <img :src="sectionIcon" class="w-5 h-5 absolute left-[3.12px] top-[0.83px]" />
            </div>
            <span class="text-base font-medium text-[#020203] leading-normal">
              {{ sectionTitle }}
            </span>
          </div>
        </slot>
      </div>

      <div
        @click="toggleDropdown"
        class="group p-2 rounded-full backdrop-blur-xl flex items-center gap-2 relative cursor-pointer z-50"
      >
        <div class="absolute inset-0 rounded-full z-0 group-hover:bg-[#f2f2f2] transition"></div>

        <div class="relative z-10 flex items-center gap-2">
          <div class="w-8 h-8 relative rounded-full overflow-hidden">
            <div class="absolute inset-0 rounded-full mix-blend-hue pointer-events-none"></div>
            <img :src="tokenIcon" class="absolute pointer-events-none" />
          </div>

          <div class="w-6 h-6 absolute left-[10px] top-[10px] z-20 pointer-events-none">
            <img :src="badgeHex" class="absolute w-[26px] h-[28px]" />
            <div class="absolute left-[2px] top-[8px] w-5 text-center text-xs font-medium text-white leading-3">36</div>
          </div>

          <img :src="isDropdownOpen ? arrowUp : arrowDown" alt="chevron" class="w-4 h-4 z-10" />
        </div>

        <Transition name="fade-slide">
          <div
            v-if="isDropdownOpen"
            class="absolute top-12 right-0 z-50 w-[290px] p-1 bg-white rounded-xl outline outline-1 outline-offset-[-1px] outline-[#D0D0D0]/10 shadow-xl"
          >
            <div class="w-full p-3">
              <div class="text-base font-medium text-[#020203] leading-normal">Антон Рязанов</div>
            </div>
            <div class="w-full h-px bg-[#D0D0D0]/40 my-1"></div>
            <DropdownItem :iconSrc="subIcon" label="Управление подпиской" badge="Pro" badgeColor="blue" to="/subscription" />
            <DropdownItem :iconSrc="settingsIcon" label="Настройки" :separator="true" to="/settings" />
            <DropdownItem label="Пригласить друга" to="/invite" />
            <DropdownItem label="Подарить сертификат" :blue="true" :separator="true" @click.stop="openGiftModal"  />
            <DropdownItem label="Задать вопрос" :separator="true" to="/help" />
            <DropdownItem :iconSrc="logoutIcon" label="Выйти из аккаунта" :danger="true" to="/logout" />
          </div>
        </Transition>
      </div>
    </header>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from 'vue-router'   // ⬅️ ДОБАВЬ ЭТО
import DropdownItem from './DropdownItem.vue'

defineProps({
  user: Object,
  sectionTitle: String,
  sectionIcon: String
})

import tokenIcon from '../../src/assets/icons/profile/header/Avatar.png'
import badgeHex from '../../src/assets/icons/profile/header/hex.svg'
import arrowDown from '../../src/assets/icons/profile/header/chevron-down.svg'
import arrowUp from '../../src/assets/icons/profile/header/chevron-up.svg'
import settingsIcon from '../../src/assets/icons/profile/header/drop-down/settings.svg'
import subIcon from '../../src/assets/icons/profile/header/drop-down/sparkles.svg'
import logoutIcon from '../../src/assets/icons/profile/header/drop-down/exit.svg'

const isDropdownOpen = ref(false)
const dropdownRoot = ref(null)

const route = useRoute()   // ⬅️
const router = useRouter() // ⬅️

function openGiftModal() {
  const q = { ...route.query, modal: 'gift' }
  router.push({ path: route.path, query: q }) // ⬅️ явный path, остаёмся на той же странице
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
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.2s ease;
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