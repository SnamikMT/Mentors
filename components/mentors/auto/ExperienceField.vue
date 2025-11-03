<template>
  <div class="form-row">
    <!-- ЛЕВАЯ КОЛОНКА: только заголовок -->
    <aside class="flex flex-col items-start">
      <h2 class="text-[#101012] text-[22px] leading-[28px] sm:text-[28px] sm:leading-[32px] font-medium">
        Какой у тебя<br />сейчас опыт?
      </h2>
    </aside>

    <!-- ПРАВАЯ КОЛОНКА: слайдер -->
    <section>
      <div class="text-[12px] text-[#3C3C43]/70 flex justify-between mb-2">
        <span>0 месяцев</span>
        <span>10+ лет</span>
      </div>

      <div class="relative h-16">
        <!-- трек -->
        <div class="absolute left-0 right-0 top-[10px] h-1 rounded-full bg-[#C7D7FF]"></div>
        <div class="absolute left-0 top-[10px] h-1 rounded-full bg-[#007AFF]" :style="{ width: pct + '%' }"></div>

        <!-- круг 12×12 -->
        <div class="absolute -translate-x-1/2 -translate-y-1/2 z-10" :style="{ left: pct + '%', top: '10px' }">
          <div class="w-3 h-3 rounded-full bg-white border-2 border-[#007AFF]"></div>
        </div>

        <!-- прозрачный range -->
        <input
          type="range" min="0" max="120" step="1"
          :value="months"
          @input="$emit('update:months', +($event.target as HTMLInputElement).value)"
          class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          aria-label="Опыт в месяцах"
        />

        <!-- ПУЗЫРЁК: 48px высота, ширина по контенту -->
        <div
          class="bubble absolute top-[26px] -translate-x-1/2 inline-flex items-center justify-center
                 px-4 text-white text-[16px] leading-[24px] font-medium bg-[#007AFF]
                 rounded-[16px] pointer-events-none z-20 whitespace-nowrap"
          :style="{ left: pct + '%' }"
        >
          {{ label }}
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps<{ months: number }>()
defineEmits<{ (e:'update:months', v:number):void }>()

const clamp = (n:number, a:number, b:number) => Math.min(b, Math.max(a, n))
const pct = computed(() => clamp((props.months / 120) * 100, 1.5, 98.5))

const label = computed(() => {
  const m = props.months
  if (m >= 120) return '10+ лет'
  if (m >= 12) {
    const y = Math.floor(m / 12)
    const mm = m % 12
    return `${y} г.${mm ? ` ${mm} мес` : ''}`
  }
  return `${m} мес`
})
</script>

<style scoped>
.form-row { display: grid; grid-template-columns: 1fr; gap: 24px; }
@media (min-width:1024px) {
  .form-row { grid-template-columns: 320px 1fr; gap: 36px; }
}

/* Пузырёк: фикс-высота 48, ширина по контенту, мягкий «хвост» */
.bubble {
  height: 48px;
  width: max-content;
  box-shadow:
    0 18px 40px rgba(0,122,255,.18),
    0 8px 20px rgba(0,122,255,.12);
  position: relative;
}
.bubble::before{
  content:"";
  position:absolute;
  left:50%;
  top:-7px;
  width:12px;
  height:12px;
  transform:translateX(-50%) rotate(45deg);
  background:#007AFF;
  border-radius:3px 9px 9px 9px; /* скруглённый «хвост» */
}
</style>
