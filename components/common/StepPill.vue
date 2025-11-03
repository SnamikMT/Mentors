<template>
  <div class="relative h-10">
    <svg
      class="block h-10"
      :class="widthCls"
      viewBox="0 0 164 40"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <!-- Контур -->
      <path :d="shapePath" :fill="fillColor" />
      <!-- Текст -->
      <text
        x="82" y="21"
        text-anchor="middle"
        dominant-baseline="middle"
        :fill="textColor"
        font-family="Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
        :font-size="fontSize"
        font-weight="500"
      >
        {{ label }}
      </text>
    </svg>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  label:  { type: String, required: true },
  state:  { type: String, default: 'idle' }, // 'idle' | 'active' | 'done'
  isLast: { type: Boolean, default: false }
})

/* Цвета */
const fillColor = computed(() =>
  (props.state === 'active' || props.state === 'done') ? '#101012' : '#F6F7FA'
)
const textColor = computed(() =>
  (props.state === 'active' || props.state === 'done') ? '#FFFFFF' : '#101012'
)

/* Ширины: мобилка ужата, десктоп как в макете */
const widthCls = computed(() =>
  props.isLast
    ? 'w-[120px] sm:w-[150px] lg:w-[150px]'
    : 'w-[132px] sm:w-[164px] lg:w-[164px]'
)

/* Шрифт: на мобилке 13, далее 14 */
const fontSize = computed(() => (typeof window !== 'undefined' && window.matchMedia?.('(max-width: 640px)').matches) ? 13 : 14)

/* Форма стрелки (адаптивно растягивается благодаря preserveAspectRatio="none") */
const shapePath = `
M0 20
C0 8.95 8.95 0 20 0
H126.6
C129.2 0 131.6 0.97 133.5 2.71
L161.8 30.04
C163.2 31.32 163.2 33.46 161.8 34.75
L133.5 62.08
C131.6 63.81 129.2 64.78 126.6 64.78
H20
C8.95 64.78 0 55.83 0 44.78
V20Z
`.replace(/\s+/g, ' ')
</script>

<style scoped>
svg { shape-rendering: geometricPrecision; text-rendering: optimizeLegibility; }
</style>
