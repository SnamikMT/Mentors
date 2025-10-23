<template>
  <section class="flex flex-col gap-[16px]">
    <div class="flex items-center gap-2">
      <!-- короткая левая линия -->
      <div class="w-4 h-px rounded" :class="ruleBgClass"></div>

      <div class="pl-2 pr-3 py-2 rounded-full flex items-center gap-2" :class="badgeBgClass">
        <img :src="icon" alt="" class="w-4 h-4" />
        <span :class="badgeTextClass" class="text-sm font-medium leading-3">
          {{ label }}
        </span>
      </div>

      <!-- длинная правая линия -->
      <div class="flex-1 h-px rounded" :class="ruleBgClass"></div>
    </div>
    
    <div class="grid grid-cols-3 gap-6">
      <TaskCard
        v-for="(t, i) in items"
        :key="t.id ?? i"
        :id="t.id ?? String(i)"
        :title="t.title"
        :description="t.description"
        :info="t.info"
      />
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import TaskCard from './TaskCard.vue'

const props = defineProps({
  label: { type: String, required: true },
  theme: { type: String, default: 'orange' },
  icon:  { type: String, required: true },
  items: { type: Array,  required: true, default: () => [] }
})

const badgeBgByTheme = {
  orange: 'bg-[#FF9500]/10',
  blue:   'bg-[#3E87FF]/10',
  green:  'bg-[#34C759]/10'
}
const badgeTextByTheme = {
  orange: 'text-[#FF9500]',
  blue:   'text-[#3E87FF]',
  green:  'text-[#34C759]'
}
const ruleBgByTheme = {
  orange: 'bg-[#FF9500]/10',
  blue:   'bg-[#3E87FF]/10',
  green:  'bg-[#34C759]/10'
}

const badgeBgClass   = computed(() => badgeBgByTheme[props.theme] ?? badgeBgByTheme.orange)
const badgeTextClass = computed(() => badgeTextByTheme[props.theme] ?? badgeTextByTheme.orange)
const ruleBgClass    = computed(() => ruleBgByTheme[props.theme] ?? ruleBgByTheme.orange)
</script>
