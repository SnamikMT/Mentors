<template>
  <!-- Мобильный хедер: показываем только < lg -->
  <header
    class="lg:hidden sticky top-0 z-[100] bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/60"
    ref="dropdownRoot"
  >
    <div class="mx-auto max-w-[1008px] px-4 py-3 flex items-center justify-between gap-2">
      <!-- Левый: гамбургер -->
      <button
        @click="open = true"
        aria-label="Открыть меню"
        class="h-10 w-10 grid place-items-center rounded-full border border-[rgba(120,120,128,.16)] bg-white"
      >
        <span class="relative block h-[14px] w-[18px]">
          <span class="absolute inset-x-0 top-0 h-[2px] bg-[#6B7280] rounded"></span>
          <span class="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[2px] bg-[#6B7280] rounded"></span>
          <span class="absolute inset-x-0 bottom-0 h-[2px] bg-[#6B7280] rounded"></span>
        </span>
      </button>

      <!-- Центр: логотип + Plus -->
      <div class="flex items-center gap-2 min-w-0">
        <img :src="logo" alt="Mentors" class="h-6 w-auto" />
        <span class="inline-flex h-6 items-center px-2 rounded-full bg-[#3E87FF] text-white text-[12px] font-medium">
          Plus
        </span>
      </div>

      <!-- Право: ТОТ ЖЕ блок, что в обычном Header -->
      <button
        @click.stop="toggleDropdown"
        class="group relative shrink-0 p-1.5 rounded-full flex items-center gap-2 cursor-pointer
               bg-white/70 border border-transparent"
        aria-haspopup="menu"
        :aria-expanded="isDropdownOpen"
      >
        <div class="absolute inset-0 rounded-full z-0 group-hover:bg-[#f2f2f2] transition"></div>
        <div class="relative z-10 flex items-center gap-2">
          <div class="relative h-8 w-8 rounded-full overflow-hidden">
            <img :src="tokenIcon" class="absolute inset-0 w-full h-full object-cover pointer-events-none" />
          </div>
          <div class="w-0 h-0 relative">
            <div class="absolute -right-2 -bottom-1 w-[26px] h-[28px]">
              <img :src="badgeHex" class="absolute inset-0 w-full h-full" alt="" />
              <div class="absolute left-[2px] top-[8px] w-5 text-center text-[11px] font-medium text-white leading-3">
                36
              </div>
            </div>
          </div>
          <img :src="isDropdownOpen ? arrowUp : arrowDown" alt="chevron" class="w-4 h-4 z-10" />
        </div>
      </button>
    </div>

    <!-- Сайдбар из бургера -->
    <teleport to="body">
      <div v-if="open" class="fixed inset-0 z-[110]">
        <div class="absolute inset-0 bg-black/40" @click="open = false" />
        <aside
          class="absolute top-0 left-0 h-full w-[86vw] max-w-[320px] bg-[#F9F9FA] shadow-xl
                 pt-4 pb-6 flex flex-col transition-transform duration-300 ease-[cubic-bezier(.22,1,.36,1)]"
        >
          <div class="px-4 py-2 mb-2 flex items-center justify-between">
            <div class="flex items-center gap-2">
              <img :src="logo" alt="Mentors" class="h-6 w-auto" />
              <span class="inline-flex h-6 items-center px-2 rounded-full bg-[#3E87FF] text-white text-[12px] font-medium">
                Plus
              </span>
            </div>
            <button
              @click="open=false"
              aria-label="Закрыть"
              class="h-9 w-9 grid place-items-center rounded-full border border-[rgba(120,120,128,.16)] bg-white"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M18 6 6 18M6 6l12 12" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </button>
          </div>

          <!-- меню -->
          <nav class="px-2 space-y-1">
            <div @click="goAndClose(routes.career)">
              <NavItem itemKey="career"   icon="compas"   label="Карьерный путь" :route="routes.career" />
            </div>
            <div @click="goAndClose(routes.calendar)">
              <NavItem itemKey="calendar" icon="calendar" label="Календарь"      :route="routes.calendar" />
            </div>
            <div @click="goAndClose(routes.chat)">
              <NavItem itemKey="chat"     icon="chat"     label="Чат с ментором" :route="routes.chat" />
            </div>
            <div @click="goAndClose(routes.calls)">
              <NavItem itemKey="calls"    icon="calls"    label="История звонков":route="routes.calls" />
            </div>
            <div @click="goAndClose(routes.tasks)">
              <NavItem itemKey="tasks"    icon="tasks"    label="Задания"        :route="routes.tasks" />
            </div>
          </nav>

          <div class="mt-auto px-4 pt-4 space-y-2">
            <button class="w-full py-3 rounded-2xl bg-[#5856D6]/10 text-[#5856D6] font-medium">
              Повысить до Max
            </button>
            <div class="p-3 bg-white rounded-2xl flex items-center gap-2">
              <div class="flex-1">
                <div class="text-xs font-medium text-[#3C3C43B3] leading-3">Баланс</div>
                <div class="text-base font-medium text-[#020203]">2 500 ₽</div>
              </div>
              <button class="p-2 rounded-full bg-[#007AFF1A] overflow-hidden">
                <img :src="plus" alt="Plus" class="w-6 h-6" />
              </button>
            </div>
          </div>
        </aside>
      </div>
    </teleport>

    <!-- Дропдаун АВАТАРА — 1 в 1 как в десктопном -->
    <teleport to="body">
      <Transition name="fade-slide">
        <div
          v-if="isDropdownOpen"
          class="fixed right-3 top-[56px] z-[130] w-[92vw] max-w-[290px] p-1 bg-white rounded-xl
                 outline outline-1 outline-offset-[-1px] outline-[#D0D0D0]/10 shadow-xl"
          role="menu"
        >
          <div class="w-full p-3">
            <div class="text-base font-medium text-[#020203] leading-normal">Антон Рязанов</div>
          </div>
          <div class="w-full h-px bg-[#D0D0D0]/40 my-1"></div>

          <DropdownItem :iconSrc="subIcon" label="Управление подпиской" badge="Pro" badgeColor="blue" to="/subscription" @click="closeDropdown" />
          <DropdownItem :iconSrc="settingsIcon" label="Настройки" :separator="true" to="/settings" @click="closeDropdown" />
          <DropdownItem label="Пригласить друга" to="/invite" @click="closeDropdown" />
          <DropdownItem label="Подарить сертификат" :blue="true" :separator="true" @click.stop="closeDropdown" />
          <DropdownItem label="Задать вопрос" :separator="true" to="/help" @click="closeDropdown" />
          <DropdownItem :iconSrc="logoutIcon" label="Выйти из аккаунта" :danger="true" to="/logout" @click="closeDropdown" />
        </div>
      </Transition>
    </teleport>
  </header>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import NavItem from '@/components/profile/sidebar/NavItem.vue'
import DropdownItem from '@/components/profile/DropdownItem.vue'

import logo from '@/src/assets/icons/profile/sidebar/Subtract.svg'
import plus from '@/src/assets/icons/profile/sidebar/plus.svg'

import tokenIcon   from '@/src/assets/icons/profile/header/Avatar.png'
import badgeHex    from '@/src/assets/icons/profile/header/hex.svg'
import arrowDown   from '@/src/assets/icons/profile/header/chevron-down.svg'
import arrowUp     from '@/src/assets/icons/profile/header/chevron-up.svg'
import settingsIcon from '@/src/assets/icons/profile/header/drop-down/settings.svg'
import subIcon      from '@/src/assets/icons/profile/header/drop-down/sparkles.svg'
import logoutIcon   from '@/src/assets/icons/profile/header/drop-down/exit.svg'

const open = ref(false)
const isDropdownOpen = ref(false)
const dropdownRoot = ref(null)

const router = useRouter()
const route = useRoute()

const routes = {
  career: '/career',
  calendar: '/calendar',
  chat: '/chat',
  calls: '/calls',
  tasks: '/tasks'
}

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}
const closeDropdown = () => {
  isDropdownOpen.value = false
}
const goAndClose = (to) => {
  router.push(to)
  open.value = false
}

function handleClickOutside (event) {
  // закрываем только дропдаун (а не бургер)
  if (isDropdownOpen.value && dropdownRoot.value && !dropdownRoot.value.contains(event.target)) {
    isDropdownOpen.value = false
  }
}
onMounted(() => document.addEventListener('click', handleClickOutside))
onBeforeUnmount(() => document.removeEventListener('click', handleClickOutside))

// если перешли по роуту — всё закрываем
watch(() => route.path, () => {
  open.value = false
  isDropdownOpen.value = false
})
</script>

<style scoped>
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
