<template>
  <div class="w-full">
    <div
      class="w-full flex items-center px-4 py-3 rounded-xl hover:bg-white cursor-pointer select-none"
      @click="onClick"
      :class="{ 'bg-[#ffffff]': isActiveMain }"
      :aria-current="isActiveMain ? 'page' : undefined"
    >
      <div class="flex items-center gap-2 min-w-0 w-full">
        <div class="w-4 h-4 relative shrink-0">
          <img :src="iconSrc" class="w-4 h-4 absolute left-[1.2px] top-[1.7px]" />
        </div>
        
        <div
          class="text-base font-normal text-[#020203] leading-normal whitespace-nowrap truncate"
          :title="label"
        >
          {{ label }}
        </div>
        <div class="flex-1"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, inject } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const selectedKey = inject('selectedKey')
const selectedSubKey = inject('selectedSubKey')
const setSelectedKey = inject('setSelectedKey')
const setSelectedSubKey = inject('setSelectedSubKey')

const props = defineProps({
  icon: { type: String, required: true },
  label: { type: String, required: true },
  itemKey: { type: String, required: true },
  route: { type: String, default: '' }
})

import compas from '../../../src/assets/icons/profile/sidebar/compas.svg'
import calendar from '../../../src/assets/icons/profile/mentors/calendar.svg'
import chat from '../../../src/assets/icons/profile/mentors/chat.svg'
import calls from '../../../src/assets/icons/profile/mentors/call.svg'
import tasks from '../../../src/assets/icons/profile/mentors/golf.svg'

import compasActive from '../../../src/assets/icons/profile/sidebar/compas.svg'
import calendarActive from '../../../src/assets/icons/profile/mentors/calendar-active.svg'
import chatActive from '../../../src/assets/icons/profile/mentors/chat-active.svg'
import callsActive from '../../../src/assets/icons/profile/mentors/call-active.svg'
import tasksActive from '../../../src/assets/icons/profile/mentors/golf-active.svg'

const icons = { compas, calendar, chat, calls, tasks }
const coloredIcons = { compas: compasActive, calendar: calendarActive, chat: chatActive, calls: callsActive, tasks: tasksActive }

const isActiveMain = computed(() => selectedKey?.value === props.itemKey && !selectedSubKey?.value)

const iconSrc = computed(() => (isActiveMain.value && coloredIcons[props.icon]) ? coloredIcons[props.icon] : icons[props.icon])

const onClick = () => {
  setSelectedKey?.(props.itemKey)
  setSelectedSubKey?.(null)
  if (props.route) router.push(props.route)
}
</script>
