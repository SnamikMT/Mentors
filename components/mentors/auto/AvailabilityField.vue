<template>
  <section>
    <!-- Заголовок + таб справа -->
    <div class="mb-3 flex items-center">
      <div class="text-[18px] leading-[20px] font-medium text-[#101012]">Доступность</div>

      <div class="ml-auto">
        <div
          class="inline-flex h-9 items-center gap-2 rounded-full border px-3 bg-white
                 [border-color:rgba(120,120,128,0.16)]
                 text-[14px] leading-[14px] text-[rgba(60,60,67,0.72)]"
        >
          <img v-if="locationIcon" :src="locationIcon" class="h-4 w-4 opacity-70" alt="" />
          <span>{{ locationLabel }}</span>
        </div>
      </div>
    </div>

    <!-- День за днём -->
    <div class="flex flex-col gap-3">
      <div v-for="(d, idx) in days" :key="idx" class="flex items-start gap-3">
        <div class="w-[52px] pt-[6px] text-[13px] leading-[16px] text-[#101012]">{{ d.label }}</div>

        <div class="flex flex-wrap gap-2">
          <button
            v-for="t in d.times"
            :key="t"
            type="button"
            class="time-pill"
            :class="isActive(d.label, t) ? 'time-pill--active' : ''"
            @click="pick(d.label, t)"
          >
            {{ t }}
          </button>
        </div>
      </div>
    </div>

    <!-- Низ -->
    <div class="mt-4 flex items-center gap-2">
      <!-- Кнопка брони: активна только когда выбран слот -->
      <button
        type="button"
        class="h-10 px-3 rounded-full text-[14px] font-medium leading-[20px]
               transition disabled:opacity-60 disabled:pointer-events-none
               text-white bg-[#007AFF] hover:opacity-95 active:opacity-90"
        :disabled="!modelValue"
        @click="bookNow"
      >
        Забронировать звонок
        <span v-if="modelValue" class="ml-2 opacity-90">
          {{ modelValue.dateLabel }}, {{ modelValue.time }}
        </span>
      </button>

      <!-- Справа — мини-тумблер -->
      <div class="ml-auto inline-grid grid-cols-2 rounded-full bg-[#F5F6F8] p-1">
        <button class="seg-btn" :class="seg===0 ? 'seg-btn--on' : ''" @click="seg=0">Label 1</button>
        <button class="seg-btn" :class="seg===1 ? 'seg-btn--on' : ''" @click="seg=1">Label 2</button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

type SlotValue = { dateLabel: string; time: string } | null

const props = withDefaults(defineProps<{
  modelValue: SlotValue
  days?: { label: string; times: string[] }[]
  locationLabel?: string
  locationIcon?: string
}>(), {
  modelValue: null,
  locationLabel: 'Европа / Москва',
  days: () => ([
    { label: 'Сб 27', times: ['18:00','19:00','21:00'] },
    { label: 'Вс 28', times: ['18:00','19:00','21:00','21:30','22:00'] },
    { label: 'Пн 29', times: ['18:00','19:00','21:00','21:30','21:45','22:00'] },
    { label: 'Вт 30', times: ['18:00','19:00','21:00','21:30','21:45','22:00'] },
  ])
})

const emit = defineEmits<{
  (e:'update:modelValue', v: SlotValue): void
  (e:'book', v: { dateLabel: string; time: string }): void
}>()

const seg = ref(0)

function isActive(dateLabel: string, time: string){
  return !!props.modelValue
    && props.modelValue.dateLabel === dateLabel
    && props.modelValue.time === time
}
function pick(dateLabel: string, time: string){
  // повторный клик снимает выбор
  if (isActive(dateLabel, time)) emit('update:modelValue', null)
  else emit('update:modelValue', { dateLabel, time })
}
function bookNow() {
  if (!props.modelValue) return
  emit('book', props.modelValue)   // ← именно это событие открывает шаг 3
}
</script>

<style scoped>
.time-pill{
  height:36px; padding:0 12px; border-radius:12px;
  border:1px solid rgba(120,120,128,.16); background:#fff;
  font-size:16px; line-height:24px; font-weight:500; letter-spacing:-.25px;
  transition: border-color .15s ease, background-color .15s ease;
}
.time-pill--active{
  border-color:#007AFF; background:#F5F9FF;
}

.seg-btn{
  height:32px; padding:0 12px; border-radius:9999px;
  font-size:13px; font-weight:500; color:#3C3C43;
}
.seg-btn--on{
  background:#fff; color:#101012; box-shadow:0 1px 1px rgba(0,0,0,.03);
}
</style>
