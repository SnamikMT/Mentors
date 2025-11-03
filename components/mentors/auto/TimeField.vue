<!-- components/mentors/auto/TimeField.vue -->
<template>
  <div class="form-row">
    <!-- ЛЕВАЯ КОЛОНКА -->
    <aside class="flex flex-col">
      <h2 class="text-[#101012] text-[22px] leading-[28px] sm:text-[28px] sm:leading-[32px] font-medium">
        Что насчёт времени?
      </h2>
    </aside>

    <!-- ПРАВАЯ КОЛОНКА -->
    <section>
      <!-- Сегменты -->
      <div class="rounded-full bg-[#F5F6F8] p-1 grid grid-cols-3 max-w-[520px]">
        <button
          class="h-10 rounded-full text-[14px] font-medium"
          :class="tab==='any'   ? 'bg-white shadow text-[#101012]' : 'text-[#3C3C43] hover:bg-white/60'"
          @click="emit('update:tab','any')"
        >Всё равно</button>
        <button
          class="h-10 rounded-full text-[14px] font-medium"
          :class="tab==='soon'  ? 'bg-white shadow text-[#101012]' : 'text-[#3C3C43] hover:bg-white/60'"
          @click="emit('update:tab','soon')"
        >Поскорее</button>
        <button
          class="h-10 rounded-full text-[14px] font-medium"
          :class="tab==='exact' ? 'bg-white shadow text-[#101012]' : 'text-[#3C3C43] hover:bg-white/60'"
          @click="emit('update:tab','exact')"
        >Конкретное</button>
      </div>

      <!-- Календарь и слоты — только при "Конкретное" -->
      <div v-if="tab==='exact'" class="mt-4 rounded-[24px] border border-[#787880]/20 bg-white p-4 sm:p-5">
        <!-- Дни недели -->
        <div class="flex items-start justify-between gap-2">
          <div class="grid grid-cols-7 gap-2">
            <button
              v-for="(d,i) in weekDays" :key="i"
              @click="selectDate(d)"
              class="flex flex-col items-center gap-1"
            >
              <div
                class="grid place-items-center w-10 h-10 sm:w-12 sm:h-12 rounded-[14px] text-[14px] sm:text-[15px] font-medium transition
                       data-[on=true]:bg-[#101012] data-[on=true]:text-white
                       data-[on=false]:bg-transparent data-[on=false]:text-[#101012]"
                :data-on="isSameDate(d, selectedDate)"
              >{{ weekdayShort(d) }}</div>
              <div
                class="text-[13px] sm:text-[14px] tabular-nums transition
                       data-[on=true]:text-[#101012]
                       data-[on=false]:text-[rgba(60,60,67,0.72)]"
                :data-on="isSameDate(d, selectedDate)"
              >{{ d.getDate() }}</div>
            </button>
          </div>

          <!-- След. неделя -->
          <div class="ml-2 flex flex-col items-end text-right flex-shrink-0">
            <button
              class="grid h-11 w-11 sm:h-12 sm:w-12 place-items-center rounded-[14px] sm:rounded-[16px] border hover:bg-zinc-50 [border-color:rgba(120,120,128,0.16)]"
              @click="shiftWeek(1)"
              aria-label="Следующая неделя"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M9 18l6-6-6-6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <div class="mt-2 text-[13px] sm:text-[14px] leading-[18px] sm:leading-[20px] text-[rgba(60,60,67,0.72)]">
              Следующая неделя
            </div>
          </div>
        </div>

        <!-- Тонкая линия между днями и временем -->
        <div class="mt-3 h-px bg-[#787880]/[0.16]"></div>

        <!-- Слоты времени -->
        <div class="mt-4 flex flex-col gap-3">
          <div v-for="s in sections" :key="s.label">
            <div class="mb-1.5 sm:mb-2 text-[13px] sm:text-[14px] leading-[12px] text-[#101012] font-medium">
              {{ s.label }}
            </div>

            <div class="grid grid-cols-[repeat(auto-fit,minmax(92px,1fr))] sm:flex sm:flex-wrap gap-2">
              <button
                v-for="t in s.times" :key="t"
                class="time-chip relative h-10 rounded-xl px-3 sm:px-4 border text-[15px] leading-[24px] font-medium tabular-nums transition
                       data-[active=false]:[border-color:rgba(120,120,128,0.16)]"
                :data-active="t===time"
                @click="emit('update:time', t)"
              >
                {{ t }}
                <!-- крестик для сброса -->
                <span
                  v-if="t===time"
                  class="absolute right-1.5 top-1/2 -translate-y-1/2 grid place-items-center w-5 h-5 rounded-full hover:bg-white/20"
                  @click.stop="emit('update:time','')"
                  aria-label="Снять выбор"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M18 6 6 18M6 6l12 12" stroke-width="2" stroke-linecap="round"/>
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
        <!-- Нижняя полоса: слева пиллы, справа тумблер -->
        <div class="mt-4 flex items-center justify-between gap-3 flex-wrap">
          <!-- ЛЕВО -->
          <div class="flex items-center gap-2 flex-wrap">
            <div class="pill">
              <!-- иконка часов -->
              <svg class="mr-1.5" width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" stroke="#6B7280" stroke-width="1.5"/>
                <path d="M12 7v5l3 2" stroke="#6B7280" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              Европа / Москва
            </div>
            <div class="pill">Звонок длится 50 минут</div>
          </div>

          <!-- ПРАВО: тумблер -->
          <div class="rounded-full bg-[#F5F6F8] p-1 grid grid-cols-2">
            <button
              class="h-9 px-4 rounded-full text-[14px] font-medium"
              :class="footTab==='l1' ? 'bg-white shadow text-[#101012]' : 'text-[#3C3C43]'"
              @click="setFoot('l1')"
            >Label 1</button>
            <button
              class="h-9 px-4 rounded-full text-[14px] font-medium"
              :class="footTab==='l2' ? 'bg-white shadow text-[#101012]' : 'text-[#3C3C43]'"
              @click="setFoot('l2')"
            >Label 2</button>
          </div>
        </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const props = defineProps<{
  tab: 'any'|'soon'|'exact'
  date?: Date | null
  time?: string
  foot?: 'l1'|'l2'            // опциональная внешняя модель тумблера
}>()

const emit = defineEmits<{
  (e:'update:tab',  v:'any'|'soon'|'exact'):void
  (e:'update:date', v:Date|null):void
  (e:'update:time', v:string):void
  (e:'update:foot', v:'l1'|'l2'):void
}>()

/* неделя */
const startOfWeek = (d:Date) => { const x=new Date(d); const wd=(x.getDay()+6)%7; x.setDate(x.getDate()-wd); x.setHours(0,0,0,0); return x }
const addDays     = (d:Date,n:number)=>{ const x=new Date(d); x.setDate(x.getDate()+n); return x }
const baseMonday  = ref(startOfWeek(new Date()))
const weekDays    = computed(()=>Array.from({length:7},(_,i)=>addDays(baseMonday.value,i)))
const weekdayFmt  = new Intl.DateTimeFormat('ru-RU',{weekday:'short'})
const weekdayShort= (d:Date)=>weekdayFmt.format(d).replace('.','')
const isSameDate  = (a?:Date|null,b?:Date|null)=>!!a&&!!b&&a.getFullYear()===b.getFullYear()&&a.getMonth()===b.getMonth()&&a.getDate()===b.getDate()

const selectedDate = computed(()=> props.date ?? null)
const shiftWeek  = (dir:number)=> baseMonday.value = addDays(baseMonday.value,7*dir)
const selectDate = (d:Date)=> emit('update:date', d)

/* слоты */
const sections = ref([
  { label:'Утро',  times:['10:00','11:00','12:00','13:00'] },
  { label:'День',  times:['14:00','15:00','16:00','19:00'] },
  { label:'Вечер', times:['20:00','21:00','21:30','22:00'] }
])

/* нижний тумблер */
const footTab = ref<'l1'|'l2'>(props.foot ?? 'l1')
const setFoot = (v:'l1'|'l2') => { footTab.value = v; emit('update:foot', v) }
</script>

<style scoped>
.form-row{ display:grid; grid-template-columns:1fr; gap:24px; }
@media (min-width:1024px){ .form-row{ grid-template-columns:320px 1fr; gap:36px; } }

/* Пиллы */
.pill{
  display:inline-flex; align-items:center; gap:6px;
  height:32px; padding:0 12px; border-radius:9999px;
  border:1px solid rgba(120,120,128,.16); background:#F5F6F8;
  font-size:14px; line-height:14px; color:#3C3C43;
}

/* Слот времени (selected = тёмно-серый фон) */
.time-chip{
  position:relative;
  color:#101012; background:#fff;
  border-color: rgba(120,120,128,.16);
  padding-right:28px; /* место под крестик */
}
.time-chip[data-active="true"]{
  background: rgba(120,120,128,.72);
  color: #fff;
  border-color: transparent;
}
</style>
