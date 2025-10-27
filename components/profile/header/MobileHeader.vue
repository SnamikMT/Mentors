<template>
  <!-- Мобильный хедер: показываем только < lg -->
  <header class="lg:hidden sticky top-0 z-[100] bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/60">
    <div class="mx-auto max-w-[1008px] px-4 py-3 flex items-center justify-between">
      <!-- Левый: гамбургер -->
      <button
        @click="open = true"
        aria-label="Открыть меню"
        class="h-10 w-10 grid place-items-center rounded-full border border-[rgba(120,120,128,.16)]"
      >
        <span class="relative block h-[14px] w-[18px]">
          <span class="absolute inset-x-0 top-0 h-[2px] bg-[#6B7280] rounded"></span>
          <span class="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[2px] bg-[#6B7280] rounded"></span>
          <span class="absolute inset-x-0 bottom-0 h-[2px] bg-[#6B7280] rounded"></span>
        </span>
      </button>

      <!-- Центр: логотип + Plus -->
      <div class="flex items-center gap-2">
        <img :src="logo" alt="Mentors" class="h-6 w-auto" />
        <span class="inline-flex h-6 items-center px-2 rounded-full bg-[#3E87FF] text-white text-[12px] font-medium">Plus</span>
      </div>

      <!-- Право: «планета» + бейдж 36 -->
      <div class="relative h-8 w-8">
        <div class="h-8 w-8 rounded-full bg-gradient-to-br from-[#A9C7FF] to-[#0A2D6C]"></div>
        <div
          class="absolute -bottom-1 -right-1 h-[18px] min-w-[22px] px-[6px] rounded-[6px] bg-[#3E87FF] text-white text-[11px] font-semibold
                 flex items-center justify-center shadow-sm"
          style="clip-path: path('M0,6 Q0,0 6,0 L16,0 Q22,0 22,6 L22,12 Q22,18 16,18 L6,18 Q0,18 0,12 Z')"
        >
          36
        </div>
      </div>
    </div>

    <!-- Выезжающее меню -->
    <teleport to="body">
      <div v-if="open" class="fixed inset-0 z-[110]">
        <div class="absolute inset-0 bg-black/40" @click="open = false" />
        <aside
          class="absolute top-0 left-0 h-full w-[86vw] max-w-[320px] bg-[#F9F9FA] shadow-xl
                 pt-4 pb-6 flex flex-col transition-transform duration-300 ease-[cubic-bezier(.22,1,.36,1)]"
          :class="open ? 'translate-x-0' : '-translate-x-full'"
        >
          <div class="px-4 py-2 mb-2 flex items-center justify-between">
            <div class="flex items-center gap-2">
              <img :src="logo" alt="Mentors" class="h-6 w-auto" />
              <span class="inline-flex h-6 items-center px-2 rounded-full bg-[#3E87FF] text-white text-[12px] font-medium">Plus</span>
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
            <div @click="open=false">
              <NavItem itemKey="career"   icon="compas"   label="Карьерный путь" :route="routes.career" />
            </div>
            <div @click="open=false">
              <NavItem itemKey="calendar" icon="calendar" label="Календарь"      :route="routes.calendar" />
            </div>
            <div @click="open=false">
              <NavItem itemKey="chat"     icon="chat"     label="Чат с ментором" :route="routes.chat" />
            </div>
            <div @click="open=false">
              <NavItem itemKey="calls"    icon="calls"    label="История звонков":route="routes.calls" />
            </div>
            <div @click="open=false">
              <NavItem itemKey="tasks"    icon="tasks"    label="Задания"        :route="routes.tasks" />
            </div>
          </nav>

          <div class="mt-auto px-4 pt-4 space-y-2">
            <button class="w-full py-3 rounded-2xl bg-[#5856D6]/10 text-[#5856D6] font-medium">Повысить до Max</button>
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
  </header>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import NavItem from '@/components/profile/sidebar/NavItem.vue'

import logo from '@/src/assets/icons/profile/sidebar/Subtract.svg'
import plus from '@/src/assets/icons/profile/sidebar/plus.svg'

const open = ref(false)

/* маршруты — те же, что у Sidebar */
const routes = {
  career: '/career',
  calendar: '/calendar',
  chat: '/chat',
  calls: '/calls',
  tasks: '/tasks'
}
const pathToKey = {
  [routes.career]: 'career',
  [routes.calendar]: 'calendar',
  [routes.chat]: 'chat',
  [routes.calls]: 'calls',
  [routes.tasks]: 'tasks'
}

const route = useRoute()
const syncActiveFromRoute = () => {
  // просто закрываем меню при смене маршрута
  open.value = false
}
onMounted(syncActiveFromRoute)
watch(() => route.path, syncActiveFromRoute)
</script>
