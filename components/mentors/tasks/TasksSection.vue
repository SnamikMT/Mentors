<template>
  <section class="flex flex-col gap-4 lg:gap-6">
    <!-- шапка секции -->
    <div class="flex items-center gap-2">
      <!-- короткая левая линия -->
      <div class="h-[2px] w-3 rounded-full" :class="ruleBgClass" />

      <!-- чип без иконки -->
      <div
        class="inline-flex items-center gap-2 px-3 py-1 rounded-full"
        :class="badgeBgClass"
      >
        <span
          class="font-medium
                 text-[14px] leading-[12px] tracking-[0]"
          :class="badgeTextClass"
        >
          {{ label }}
        </span>
      </div>

      <!-- длинная правая линия -->
      <div class="hidden sm:block flex-1 h-[2px] rounded-full" :class="ruleBgClass" />
    </div>

    <!-- сетка карточек -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-6">
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
  theme: { type: String, default: 'orange' }, // 'orange' | 'blue' | 'green'
  // icon убираем из UI, но оставляем пропс на будущее — просто не используем его
  icon:  { type: String, default: '' },
  items: { type: Array,  default: () => [] }
})

const badgeBgByTheme = {
  orange: 'bg-[#FF9500]/10',
  blue:   'bg-[#007AFF]/12',
  green:  'bg-[#34C759]/10'
}
const badgeTextByTheme = {
  orange: 'text-[#FF9500]',
  blue:   'text-[#007AFF]',
  green:  'text-[#34C759]'
}
const ruleBgByTheme = {
  orange: 'bg-[#FF9500]/20',
  blue:   'bg-[#007AFF]/20',
  green:  'bg-[#34C759]/20'
}

const badgeBgClass   = computed(() => badgeBgByTheme[props.theme] ?? badgeBgByTheme.orange)
const badgeTextClass = computed(() => badgeTextByTheme[props.theme] ?? badgeTextByTheme.orange)
const ruleBgClass    = computed(() => ruleBgByTheme[props.theme] ?? ruleBgByTheme.orange)
</script>
