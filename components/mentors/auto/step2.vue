<template>
  <div>
    <!-- Подходящие менты сверху -->
    <SuitableMentors
      v-if="suitable && suitable.length"
      class="mt-2"
      v-model="localPickedSuitableId"
      :mentors="suitable"
      @update:modelValue="onSuitablePick"
    />

    <!-- Основной контент -->
    <div class="mt-6 grid grid-cols-1 lg:grid-cols-[320px,1fr] gap-6 lg:gap-9">
      <!-- ЛЕВО: карточка ментора -->
      <aside class="flex flex-col gap-4">
        <div class="relative rounded-[20px] overflow-hidden bg-white border border-[#000]/10 shadow-sm">
          <img
            :src="currentMentor?.avatar || placeholderAvatar"
            alt="mentor"
            class="w-full aspect-square object-cover"
          />
          <div class="absolute right-3 bottom-3 grid place-items-center">
            <div class="h-8 w-8 rounded-full bg-[#FFD60A] grid place-items-center shadow">
              <img :src="iconTbank" class="h-4 w-4" alt="">
            </div>
          </div>
        </div>

        <!-- кнопка открыть полноразмерный календарь — опционально -->
        <AppButton
          full
          size="lg"
          :leftIcon="iconCalendar"
          @click="openCalendar = true"
        >
          Выбрать дату звонка
        </AppButton>

        <div class="grid grid-cols-2 gap-3">
          <div
            class="h-12 rounded-[16px] bg-[#F2F3F5] flex items-center justify-center gap-2 px-4
                   text-[16px] leading-[24px] text-[#101012]"
          >
            <img :src="iconWallet" class="h-[18px] w-[18px] opacity-80" alt="">
            <span>{{ currentMentor?.price ?? '—' }}</span>
          </div>
          <div
            class="h-12 rounded-[16px] bg-[#F2F3F5] flex items-center justify-center gap-2 px-4
                   text-[16px] leading-[24px] text-[#101012]"
          >
            <img :src="iconClock" class="h-[18px] w-[18px] opacity-80" alt="">
            <span>50 минут</span>
          </div>
        </div>

        <!-- превью работ -->
        <div class="flex flex-col space-y-3" v-if="currentMentor?.shots?.length">
          <button
            v-for="(shot,idx) in currentMentor.shots"
            :key="idx"
            class="preview-card"
          >
            <img :src="shot" class="w-full h-full object-cover" alt="">
          </button>
        </div>
      </aside>

      <!-- ПРАВО: описание, доступность и прочее -->
      <main class="flex flex-col">
        <!-- бейджи -->
        <div class="flex flex-wrap items-center gap-2 mb-4">
          <span class="inline-flex h-7 items-center px-3 rounded-full text-[14px] font-medium text-white bg-[#5856D6]">
            Опытный ментор
          </span>
          <span class="inline-flex h-7 items-center px-3 rounded-full text-[14px] font-medium text-white bg-[#101012]">
            5+ лет в профессии
          </span>
        </div>

        <!-- заголовок -->
        <header class="mb-5">
          <h1
            class="text-[28px] leading-[32px] sm:text-[36px] sm:leading-[40px]
                   md:text-[48px] md:leading-[48px] font-medium tracking-[-2px]"
          >
            {{ currentMentor?.name || 'Ментор' }}
          </h1>
          <p class="mt-3 text-[16px] leading-[24px] tracking-[-0.25px] text-[#101012]">
            {{ currentMentor?.subtitle || 'Описание появится позже' }}
          </p>
        </header>

        <!-- теги -->
        <div class="mb-6 flex flex-wrap gap-2" v-if="currentMentor?.tags?.length">
          <span
            v-for="t in currentMentor.tags"
            :key="t"
            class="chip-tab"
          >{{ t }}</span>
        </div>

        <div class="mb-6 h-px bg-[#787880]/[0.16]"></div>

        <!-- ===== Доступность ===== -->
        <section class="mb-6">
          <div class="mb-3 flex items-center">
            <div class="text-[18px] leading-[20px] font-medium text-[#101012]">Доступность</div>
            <div class="ml-auto">
              <div
                class="inline-flex h-9 items-center gap-2 rounded-full border px-3 bg-white
                       [border-color:rgba(120,120,128,0.16)]
                       text-[14px] leading-[14px] text-[rgba(60,60,67,0.72)]"
              >
                <img :src="iconLocation" class="h-4 w-4 opacity-70" alt="" />
                <span>Европа / Москва</span>
              </div>
            </div>
          </div>

          <!-- День → слоты -->
          <div class="flex flex-col gap-3">
            <div
              v-for="(d, idx) in days"
              :key="idx"
              class="flex items-start gap-3"
            >
              <div class="w-[52px] pt-[6px] text-[13px] leading-[16px] text-[#101012]">
                {{ d.label }}
              </div>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="t in d.times"
                  :key="t"
                  type="button"
                  class="time-pill"
                  :class="isActive(d.label, t) ? 'time-pill--active' : ''"
                  @click="pickSlot(d.label, t)"
                >
                  {{ t }}
                </button>
              </div>
            </div>
          </div>

          <!-- нижняя плашка -->
          <div class="mt-4 flex items-center gap-2">
            <button
              type="button"
              class="inline-flex items-center h-10 px-3 rounded-full bg-[#F2F3F5]
                     text-[#101012] text-[14px] font-medium leading-[20px]
                     transition disabled:opacity-60 disabled:pointer-events-none"
              :disabled="!localPickedSlot"
              @click="bookAndNext"
            >
              Забронировать звонок
              <span v-if="localPickedSlot" class="ml-2 text-[rgba(60,60,67,0.72)]">
                {{ localPickedSlot.dateLabel }}, {{ localPickedSlot.time }}
              </span>
            </button>

            <!-- маленький сегмент справа, просто для вида -->
            <div class="ml-auto inline-grid grid-cols-2 rounded-full bg-[#F5F6F8] p-1">
              <button
                class="seg-btn"
                :class="segTab===0 ? 'seg-btn--on' : ''"
                @click="segTab=0"
              >Label 1</button>
              <button
                class="seg-btn"
                :class="segTab===1 ? 'seg-btn--on' : ''"
                @click="segTab=1"
              >Label 2</button>
            </div>
          </div>
        </section>

        <div class="h-px bg-[#D0D0D0]/40"></div>

        <!-- О менторе -->
        <section class="py-7 md:py-9 space-y-3">
          <h2 class="subheading">О менторе</h2>
          <p class="body-text">{{ currentMentor?.aboutShort || aboutFallback }}</p>
          <transition name="fade-slide">
            <p v-if="aboutOpen" class="body-text mt-1">
              {{ currentMentor?.aboutLong || aboutFallbackLong }}
            </p>
          </transition>
          <button class="readmore-btn" @click="aboutOpen = !aboutOpen">
            <img
              :src="chevronIcon"
              class="h-4 w-4 transition-transform duration-300"
              :class="{ 'rotate-180': aboutOpen }"
              alt=""
            />
            {{ aboutOpen ? 'Свернуть' : 'Читать полностью' }}
          </button>
        </section>

        <div class="h-px bg-[#D0D0D0]/40"></div>

        <!-- Что даст менторство? -->
        <section class="py-7 md:py-9 space-y-3">
          <h2 class="subheading">Что даст менторство?</h2>
          <p class="body-text">{{ mentorFirst }}</p>
          <transition name="fade-slide">
            <p v-if="mentorshipOpen" class="body-text mt-1">
              {{ mentorHidden }}
            </p>
          </transition>
          <button class="readmore-btn" @click="mentorshipOpen = !mentorshipOpen">
            <img
              :src="chevronIcon"
              class="h-4 w-4 transition-transform duration-300"
              :class="{ 'rotate-180': mentorshipOpen }"
              alt=""
            />
            {{ mentorshipOpen ? 'Свернуть' : 'Читать полностью' }}
          </button>
        </section>

        <div class="h-px bg-[#D0D0D0]/40"></div>

        <!-- С чем поможет -->
        <section class="py-7 md:py-9 space-y-3" v-if="currentMentor?.helpWith?.length">
          <h2 class="subheading">С чем поможет</h2>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="t in currentMentor.helpWith"
              :key="'h-'+t"
              class="chip-tab"
            >{{ t }}</span>
          </div>
        </section>

        <div class="h-px bg-[#D0D0D0]/40" v-if="currentMentor?.achievements?.length"></div>

        <!-- Достижения -->
        <section class="py-7 md:py-9 space-y-3" v-if="currentMentor?.achievements?.length">
          <h2 class="subheading">Достижения</h2>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="a in currentMentor.achievements"
              :key="a"
              class="chip-tab"
            >{{ a }}</span>
          </div>
        </section>
      </main>
    </div>

    <!-- модал календаря (оставили, он локальный) -->
    <CalendarModal
      v-if="openCalendar"
      :locationIcon="iconLocation"
      @close="openCalendar=false"
      @confirm="onCalendarConfirm"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import SuitableMentors from '@/components/mentors/auto/SuitableMentors.vue'
import AppButton from '@/components/ui/AppButton.vue'
import CalendarModal from '@/components/mentors/calendar/CalendarModal.vue'

import iconCalendar  from '@/src/assets/img/mentor/calendar-white.svg'
import iconWallet    from '@/src/assets/img/mentor/wallet.svg'
import iconClock     from '@/src/assets/img/mentor/clock.svg'
import iconTbank     from '@/src/assets/img/mentor/tbank.svg'
import iconLocation  from '@/src/assets/icons/CalendarModal/location.svg'
import chevronIcon   from '@/src/assets/img/mentor/chevron-down.svg'

// запасной аватар
import placeholderAvatar from '@/src/assets/img/mentor/avatarmentor.jpg'

type SlotValue = { dateLabel: string; time: string } | null

const props = withDefaults(defineProps<{
  mentors?: Array<{
    id: number
    name: string
    subtitle?: string
    avatar?: string
    price?: string
    shots?: string[]
    tags?: string[]
    helpWith?: string[]
    achievements?: string[]
    aboutShort?: string
    aboutLong?: string
  }>
  suitable?: Array<{ id: number; avatar: string }>
  selectedMentorId?: number | null
  slot?: SlotValue
}>(), {
  mentors: () => [],
  suitable: () => [],
  selectedMentorId: null,
  slot: null,
})

const emit = defineEmits<{
  (e:'patch', payload: Record<string, unknown>): void
  (e:'next'): void
}>()

/* локальное состояние */
const localPickedSuitableId = ref<number | null>(
  props.suitable[0]?.id ?? null
)
const localSelectedMentorId = ref<number | null>(
  props.selectedMentorId ?? props.mentors[0]?.id ?? null
)
const localPickedSlot = ref<SlotValue>(props.slot ?? null)

const openCalendar = ref(false)
const aboutOpen = ref(false)
const mentorshipOpen = ref(false)
const segTab = ref(0)

/* выводим текущего ментора */
const currentMentor = computed(() => {
  if (!props.mentors.length) return null
  return props.mentors.find(m => m.id === localSelectedMentorId.value) ?? props.mentors[0]
})

/* дни и слоты — пока захардкожены, как в макете */
const days = [
  { label: 'Сб 27', times: ['18:00','19:00','21:00'] },
  { label: 'Вс 28', times: ['18:00','19:00','21:00','21:30','22:00'] },
  { label: 'Пн 29', times: ['18:00','19:00','21:00','21:30','21:45','22:00'] },
  { label: 'Вт 30', times: ['18:00','19:00','21:00','21:30','21:45','22:00'] },
]

function isActive(label: string, time: string) {
  return !!localPickedSlot.value &&
         localPickedSlot.value.dateLabel === label &&
         localPickedSlot.value.time === time
}

function pickSlot(label: string, time: string) {
  if (isActive(label, time)) {
    localPickedSlot.value = null
  } else {
    localPickedSlot.value = { dateLabel: label, time }
  }
}

function onSuitablePick(id: number | null) {
  localPickedSuitableId.value = id
  // если нужен маппинг подходящего к реальному ментору — тут делаем
  // пока что просто оставим как есть
}

function bookAndNext() {
  if (!localPickedSlot.value) return
  emit('patch', {
    selectedMentorId: currentMentor.value?.id ?? null,
    slot: localPickedSlot.value,
  })
  emit('next')
}

function onCalendarConfirm(/* payload */) {
  openCalendar.value = false
  // можно тут тоже emit('patch', {...})
}

/* тексты-заглушки */
const aboutFallback = 'Описание ментора появится позже.'
const aboutFallbackLong = 'Здесь можно будет прочитать длинное описание, опыт, подход к созвонам и т.д.'
const mentorFirst  = 'Короткий первый абзац: что получит ученик, какие навыки подтянет.'
const mentorHidden = 'Развёрнуто: примеры кейсов, результаты учеников, формат встреч и т.д.'
</script>

<style scoped>
.preview-card{
  width:100%; height:200px;
  border-radius:16px;
  overflow:hidden;
  background:#ECEFF3;
  transform-origin:center;
  transition:transform .42s cubic-bezier(.22,1,.36,1), box-shadow .42s cubic-bezier(.22,1,.36,1);
}
@media (min-width:640px){
  .preview-card{ height:240px; }
}
.preview-card:hover{
  transform:scale(1.04);
  box-shadow:0 28px 80px rgba(0,0,0,.28);
}

.chip-tab{
  display:inline-flex;
  align-items:center;
  height:36px;
  padding:0 12px;
  border-radius:12px;
  background:#F7F8FA;
  color:#101012;
  font-size:16px;
  line-height:24px;
  letter-spacing:-.25px;
}

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

.subheading{ font-size:22px; line-height:24px; letter-spacing:-.5px; font-weight:500; }
.body-text{ font-size:16px; line-height:24px; letter-spacing:-.25px; }

.readmore-btn{
  display:inline-flex; align-items:center; gap:8px;
  border:1px solid rgba(120,120,128,.16); background:#fff;
  border-radius:12px; padding:8px 16px;
  font-size:16px; line-height:24px;
  transition: background .15s ease;
}
.readmore-btn:hover{ background:#F7F8FA; }

.fade-slide-enter-from{ opacity:0; transform:translateY(-4px); }
.fade-slide-enter-active{ transition:all .28s cubic-bezier(.22,1,.36,1); }
.fade-slide-leave-to{ opacity:0; transform:translateY(-4px); }
.fade-slide-leave-active{ transition:all .2s ease; }
</style>
