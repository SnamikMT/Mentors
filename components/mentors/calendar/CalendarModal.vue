<template>
  <teleport to="body">
    <div
      class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/45 backdrop-blur-lg"
      @keydown.esc.prevent="close"
    >
      <div class="absolute inset-0" @click="close" />

      <!-- Модалка -->
      <div
        ref="dialogEl"
        role="dialog"
        aria-modal="true"
        tabindex="-1"
        class="
          relative z-[1] bg-white shadow-xl flex flex-col overflow-visible
          w-[calc(100vw-16px)] sm:w-[min(560px,calc(100vw-24px))] md:w-[640px]
          max-h-[92vh] md:max-h-none md:h-[612px]
          rounded-[24px] md:rounded-[32px]
          p-4 sm:p-6 md:p-9
          gap-4 sm:gap-5 md:gap-6
        "
      >
        <!-- Верхние табы (ПК/планшет) — «торчат» над модалкой -->
        <div
          class="hidden md:flex absolute -top-5 left-1/2 -translate-x-1/2 items-center gap-2"
          aria-hidden="true"
        >
          <div class="inline-flex h-10 items-center rounded-full bg-white border px-3 shadow-sm overflow-hidden [border-color:rgba(120,120,128,0.16)]">
            <img v-if="locationIcon" :src="locationIcon" class="h-4 w-4 mr-2 shrink-0" alt="" />
            <span class="whitespace-nowrap text-[14px] leading-[14px] font-medium text-[rgba(60,60,67,0.72)]">
              Европа / Москва
            </span>
          </div>
          <div class="inline-flex h-10 items-center rounded-full bg-white border px-3 shadow-sm overflow-hidden [border-color:rgba(120,120,128,0.16)]">
            <span class="whitespace-nowrap text-[14px] leading-[14px] font-medium text-[rgba(60,60,67,0.72)]">
              Звонок длится 50 минут
            </span>
          </div>
        </div>

        <!-- Закрыть -->
        <button
          class="absolute right-3 top-3 md:right-4 md:top-4 grid h-8 w-8 md:h-9 md:w-9 place-items-center rounded-full bg-zinc-100 hover:bg-zinc-200 transition"
          aria-label="Закрыть"
          @click="close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M18 6 6 18M6 6l12 12" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>

        <!-- Заголовок + подзаголовок (+ мобильные табы ВНУТРИ) -->
        <section class="flex flex-col gap-3 md:gap-0">
          <h3 class="text-[20px] leading-[24px] md:text-[24px] md:leading-[24px] font-semibold tracking-[-0.25px] md:tracking-[-0.5px] text-[#101012]">
            <span class="hidden md:inline">Выбери свободное<br />время у ментора</span>
            <span class="md:hidden">Выбери свободное время у ментора</span>
          </h3>

          <!-- Табы внутри — только на мобилке -->
          <div class="flex md:hidden flex-wrap gap-2">
            <div class="inline-flex h-9 items-center rounded-full bg-white border px-3 overflow-hidden [border-color:rgba(120,120,128,0.16)]">
              <img v-if="locationIcon" :src="locationIcon" class="h-3.5 w-3.5 mr-2 shrink-0" alt="" />
              <span class="whitespace-nowrap text-[13px] leading-[14px] font-medium text-[rgba(60,60,67,0.72)]">Европа / Москва</span>
            </div>
            <div class="inline-flex h-9 items-center rounded-full bg-white border px-3 overflow-hidden [border-color:rgba(120,120,128,0.16)]">
              <span class="whitespace-nowrap text-[13px] leading-[14px] font-medium text-[rgba(60,60,67,0.72)]">Звонок длится 50 минут</span>
            </div>
          </div>

          <p class="text-[14px] leading-[20px] md:text-[16px] md:leading-[24px] font-normal tracking-[-0.15px] md:tracking-[-0.25px] text-[rgba(60,60,67,0.72)]">
            Запланируем это время только для тебя
          </p>
        </section>

        <!-- Линия на всю ширину -->
        <hr class="border-t border-zinc-100 -mx-4 sm:-mx-6 md:-mx-9 mt-1 md:mt-3">

        <!-- Неделя + дни -->
        <section class="flex items-start justify-between gap-2">
          <!-- Мобилка: горизонтальный скролл дней -->
          <div class="md:hidden -ml-1 pr-2 overflow-x-auto no-scrollbar">
            <div class="flex gap-2">
              <button
                v-for="(d, i) in weekDays" :key="'m'+i"
                @click="selectDate(d)"
                class="flex flex-col items-center gap-1 shrink-0"
              >
                <div
                  class="grid place-items-center w-11 h-11 rounded-[14px] text-[14px] font-medium transition
                         data-[active=true]:bg-[#101012] data-[active=true]:text-white
                         data-[active=false]:bg-transparent data-[active=false]:text-[#101012]"
                  :data-active="isSameDate(d, selectedDate)"
                >{{ weekdayShort(d) }}</div>
                <div
                  class="text-[13px] tabular-nums transition
                         data-[active=true]:text-[#101012]
                         data-[active=false]:text-[rgba(60,60,67,0.72)]"
                  :data-active="isSameDate(d, selectedDate)"
                >{{ d.getDate() }}</div>
              </button>
            </div>
          </div>

          <!-- ≥ md: сетка 7 колонок -->
          <div class="hidden md:grid grid-cols-7 gap-2">
            <button
              v-for="(d, i) in weekDays" :key="i"
              @click="selectDate(d)"
              class="flex flex-col items-center gap-1"
            >
              <div
                class="grid place-items-center w-12 h-12 rounded-[16px] text-[15px] font-medium transition
                       data-[active=true]:bg-[#101012] data-[active=true]:text-white
                       data-[active=false]:bg-transparent data-[active=false]:text-[#101012]"
                :data-active="isSameDate(d, selectedDate)"
              >{{ weekdayShort(d) }}</div>
              <div
                class="text-[14px] tabular-nums transition
                       data-[active=true]:text-[#101012]
                       data-[active=false]:text-[rgba(60,60,67,0.72)]"
                :data-active="isSameDate(d, selectedDate)"
              >{{ d.getDate() }}</div>
            </button>
          </div>

          <!-- Стрелка строго справа; на мобилке подпись переносится (не в одну строку) -->
          <div class="ml-2 flex flex-col items-end text-right flex-shrink-0">
            <button
              class="grid h-11 w-11 md:h-12 md:w-12 place-items-center rounded-[14px] md:rounded-[16px] border hover:bg-zinc-50 [border-color:rgba(120,120,128,0.16)]"
              @click="shiftWeek(1)"
              aria-label="Следующая неделя"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M9 18l6-6-6-6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <div
              class="mt-1.5 md:mt-2 text-[13px] md:text-[14px] leading-[18px] md:leading-[20px] text-[rgba(60,60,67,0.72)]
                     whitespace-normal md:whitespace-nowrap break-words w-[88px] md:w-auto text-right"
            >
              Следующая неделя
            </div>
          </div>
        </section>

        <!-- Слоты времени -->
        <section class="flex-1 overflow-auto flex flex-col gap-3 sm:gap-4">
          <div v-for="s in sections" :key="s.label">
            <div class="mb-1.5 sm:mb-2 text-[13px] sm:text-[14px] leading-[12px] text-[#101012] font-medium">
              {{ s.label }}
            </div>

            <!-- мобилка: авто-сетка; ≥ sm — флекс -->
            <div class="grid grid-cols-[repeat(auto-fit,minmax(96px,1fr))] sm:flex sm:flex-wrap gap-2">
              <button
                v-for="t in s.times" :key="t" @click="pickTime(t)"
                class="h-10 rounded-xl px-3 sm:px-4 border text-[15px] sm:text-[16px] leading-[24px] font-medium tabular-nums transition
                       bg-white focus:outline-none hover:border-zinc-300 focus:ring-2 focus:ring-zinc-300
                       data-[active=true]:[border-color:#007AFF]
                       data-[active=false]:[border-color:rgba(120,120,128,0.16)]"
                :data-active="t===selectedTime"
              >
                {{ t }}
              </button>
            </div>
          </div>
        </section>

        <!-- Футер (мобилка — колонкой) -->
        <footer class="border-t border-zinc-100 pt-3 sm:pt-4 flex flex-col md:flex-row md:items-center gap-3 md:gap-0 md:justify-between">
          <div
            class="rounded-full bg-zinc-100 px-3.5 py-2 md:px-4 text-sm flex items-center gap-2 w-full md:w-auto justify-between md:justify-start"
            :class="{'opacity-60': !(selectedDate && selectedTime)}"
          >
            <span class="font-medium">Забронировать звонок</span>
            <span v-if="selectedDate && selectedTime" class="text-zinc-500 truncate">
              {{ bookLabel }}
            </span>
          </div>

          <div class="flex items-center md:ml-auto w-full md:w-auto">
            <div class="rounded-full bg-zinc-100 p-1 flex items-center gap-2 w-full md:w-auto justify-center md:justify-start">
              <button class="rounded-full bg-white px-3 py-1 text-sm font-medium text-[#101012] shadow-sm">Label 1</button>
              <span class="px-3 py-1 text-sm text-zinc-500">Label 2</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

defineProps({ locationIcon: { type: String, default: '' } })
const emit = defineEmits(['close','confirm'])
const dialogEl = ref(null)

/* форматтеры */
const ruLong = new Intl.DateTimeFormat('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })
const weekdayFmt = new Intl.DateTimeFormat('ru-RU', { weekday: 'short' })
const weekdayShort = (d) => weekdayFmt.format(d).replace('.', '')

/* helpers */
const startOfWeek = (date) => {
  const d = new Date(date)
  const day = (d.getDay() + 6) % 7
  d.setDate(d.getDate() - day)
  d.setHours(0,0,0,0)
  return d
}
const addDays = (date, n) => { const d = new Date(date); d.setDate(d.getDate()+n); return d }
const isSameDate = (a, b) => !!a && !!b &&
  a.getFullYear()===b.getFullYear() && a.getMonth()===b.getMonth() && a.getDate()===b.getDate()

/* state */
const baseMonday = ref(startOfWeek(new Date()))
const selectedDate = ref(null)
const selectedTime = ref('')

const weekDays = computed(() => Array.from({ length: 7 }, (_, i) => addDays(baseMonday.value, i)))
const sections = ref([
  { label: 'Утро',  times: ['10:00','11:00','12:00','13:00'] },
  { label: 'День',  times: ['14:00','15:00','16:00','19:00'] },
  { label: 'Вечер', times: ['20:00','21:00','21:30','22:00'] }
])
const bookLabel = computed(() =>
  selectedDate.value && selectedTime.value ? `${ruLong.format(selectedDate.value)}, ${selectedTime.value}` : ''
)

/* actions */
const shiftWeek = (dir) => { baseMonday.value = addDays(baseMonday.value, 7 * dir) }
const selectDate = (d) => { selectedDate.value = d }
const pickTime   = (t) => { selectedTime.value = t }
const close      = () => emit('close')
const confirm    = () => emit('confirm', { date: selectedDate.value, time: selectedTime.value })

/* UX */
let prevOverflow = ''
onMounted(() => {
  prevOverflow = document.body.style.overflow
  document.body.style.overflow = 'hidden'
  dialogEl.value?.focus()
})
onBeforeUnmount(() => {
  document.body.style.overflow = prevOverflow
})
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
:focus-visible { outline: 2px solid #1f2937; outline-offset: 2px; }
</style>
