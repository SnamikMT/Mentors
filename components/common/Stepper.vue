<template>
  <nav class="flex items-center gap-2 overflow-x-auto no-scrollbar">
    <button
      v-for="(label, i) in steps"
      :key="label + i"
      type="button"
      class="shrink-0 focus:outline-none"
      @click="$emit('select', i)"
    >
      <svg
        v-if="!compact"
        :width="165"
        :height="36"
        viewBox="0 0 165 36"
        xmlns="http://www.w3.org/2000/svg"
        :style="{ color: i === current ? '#101012' : '#F7F8FA' }"
      >
        <!-- сам shape как в твоём step1.svg -->
        <path d="M0 12C0 5.37258 5.37258 0 12 0H149V36H12C5.37258 36 0 30.6274 0 24V12Z" fill="currentColor"/>
        <path d="M162.151 13.1513C164.829 15.8292 164.829 20.1709 162.151 22.8487L149 36L149 0L162.151 13.1513Z" fill="currentColor"/>
        <!-- текст по центру -->
        <text
          x="50%"
          y="50%"
          dominant-baseline="middle"
          text-anchor="middle"
          :fill="i === current ? '#FFFFFF' : '#101012'"
          font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
          font-size="13"
          font-weight="500"
        >
          {{ label }}
        </text>
      </svg>

      <!-- компактный вариант для мобилки -->
      <svg
        v-else
        :width="140"
        :height="32"
        viewBox="0 0 165 36"
        xmlns="http://www.w3.org/2000/svg"
        :style="{ color: i === current ? '#101012' : '#F7F8FA' }"
      >
        <path d="M0 12C0 5.37258 5.37258 0 12 0H149V36H12C5.37258 36 0 30.6274 0 24V12Z" fill="currentColor"/>
        <path d="M162.151 13.1513C164.829 15.8292 164.829 20.1709 162.151 22.8487L149 36L149 0L162.151 13.1513Z" fill="currentColor"/>
        <text
          x="50%"
          y="50%"
          dominant-baseline="middle"
          text-anchor="middle"
          :fill="i === current ? '#FFFFFF' : '#101012'"
          font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
          font-size="12"
          font-weight="500"
        >
          {{ label }}
        </text>
      </svg>
    </button>
  </nav>
</template>

<script setup lang="ts">
defineProps<{
  steps: string[]
  current: number
  compact?: boolean
}>()

defineEmits<{
  (e: 'select', index: number): void
}>()
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
