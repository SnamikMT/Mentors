<template>
  <!-- Сайдбар только ≥lg; высота экрана, без внешнего скролла -->
  <div
    class="hidden lg:flex w-[256px] min-w-[256px] max-w-[256px] shrink-0
           bg-[#F9F9FA] box-border"
  >
    <!-- Внутренний фрейм: колонка, во всю высоту экрана -->
    <div class="flex flex-col h-dvh w-full px-3 py-6 overflow-hidden">
      <!-- Top: Лого -->
      <div class="flex items-center px-3 mb-9 gap-2 shrink-0">
        <img :src="logo" alt="Mentors Logo" class="w-20 h-8" />
        <div class="inline-flex items-center justify-center gap-0.5 px-2 py-1 rounded-full bg-[#3E87FF] text-white">
          <span class="text-xs font-medium leading-3">Plus</span>
        </div>
      </div>

      <!-- Верхние пункты (внутри скролла) -->
      <div class="sidebar-scroll flex-1 overflow-y-auto pr-1">
        <div class="flex flex-col items-start gap-1 mb-2">
          <NavItem itemKey="career" icon="compas" label="Карьерный путь" :route="routes.career" />
        </div>

        <div class="h-0 outline outline-1 outline-offset-[-0.5px] outline-[#787880]/10 mb-2"></div>

        <div class="flex flex-col items-start gap-1">
          <NavItem itemKey="calendar" icon="calendar" label="Календарь"       :route="routes.calendar" />
          <NavItem itemKey="chat"     icon="chat"     label="Чат с ментором"  :route="routes.chat" />
          <NavItem itemKey="calls"    icon="calls"    label="История звонков" :route="routes.calls" />
          <NavItem itemKey="tasks"    icon="tasks"    label="Задания"         :route="routes.tasks" />
        </div>

        <!-- маленький внутренний отступ снизу, чтобы скролл не утыкался в низ -->
        <div class="h-3"></div>
      </div>

      <!-- Bottom: блоки, ПРИЖАТЫ ВНИЗ + отступ 65px от НИЗА экрана -->
      <div class="self-stretch space-y-2 mt-auto mb-[65px] shrink-0">
        <div class="p-3 bg-[#5856D6]/10 rounded-2xl flex justify-center items-center gap-2">
          <div class="px-2 flex text-center gap-2">
            <span class="text-[#5856D6] text-[16px] font-medium leading-[24px]">Повысить до Max</span>
          </div>
        </div>

        <div class="pl-4 pr-3 py-3 bg-white rounded-2xl flex items-center gap-2">
          <div class="flex-1 flex flex-col items-start gap-1">
            <span class="text-xs font-medium text-[#3C3C43B3] leading-3">Баланс</span>
            <div class="flex items-center gap-0.5">
              <span class="text-base font-medium text-[#020203] leading-normal">2 500 ₽</span>
            </div>
          </div>
          <button class="p-2 rounded-full bg-[#007AFF1A] overflow-hidden flex justify-center items-center">
            <img :src="plus" alt="Plus" class="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, provide, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import NavItem from './NavItem.vue'

import logo from '../../../src/assets/icons/profile/sidebar/Subtract.svg'
import plus from '../../../src/assets/icons/profile/sidebar/plus.svg'

const selectedKey = ref(null)
const selectedSubKey = ref(null)

provide('selectedKey', selectedKey)
provide('selectedSubKey', selectedSubKey)
provide('setSelectedKey', (val) => (selectedKey.value = val))
provide('setSelectedSubKey', (val) => (selectedSubKey.value = val))

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
  let key = pathToKey[route.path]
  if (!key) {
    const hit = Object.entries(pathToKey).find(([p]) => route.path.startsWith(p))
    key = hit?.[1]
  }
  selectedKey.value = key ?? 'career'
  selectedSubKey.value = null
}
onMounted(syncActiveFromRoute)
watch(() => route.path, syncActiveFromRoute)
</script>

<style scoped>
/* аккуратный вертикальный скролл только у средней зоны */
.sidebar-scroll::-webkit-scrollbar{ width:8px }
.sidebar-scroll::-webkit-scrollbar-thumb{ background:#E6E6E6; border-radius:8px }
.sidebar-scroll::-webkit-scrollbar-track{ background:transparent }
</style>
