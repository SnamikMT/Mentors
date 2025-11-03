<template>
  <NuxtLayout name="app">
    <Header :stepperBg="'#fff'">
      <!-- Назад -->
      <template #left>
        <button
          @click="$router.back()"
          class="h-10 w-10 grid place-items-center rounded-full outline outline-1 outline-[#787880]/10 hover:bg-black/5 transition"
          aria-label="Назад"
        >
          <img :src="iconBack" class="w-5 h-5 opacity-70" alt="">
        </button>
      </template>

      <!-- Степпер -->
      <template #center>
        <Stepper
          :steps="['Парочку вопросов','Выбор ментора','Выбор тарифа','Оплата']"
          :current="1"
        />
      </template>
    </Header>

    <div class="px-4 sm:px-6 lg:px-0">
      <div class="mx-auto w-full max-w-[1008px]">
        <!-- Идеально подходящие -->
        <SuitableMentors class="mt-2" v-model="pickedMentorId" :mentors="suitable" />

        <!-- Карточка выбранного -->
        <div class="mt-6 grid grid-cols-1 lg:grid-cols-[320px,1fr] gap-6 lg:gap-9">
          <!-- LEFT -->
          <aside class="flex flex-col gap-4">
            <div class="relative rounded-[20px] overflow-hidden bg-white border border-[#000]/10 shadow-sm">
              <img :src="current.avatar" alt="mentor" class="w-full aspect-square object-cover" />
              <div class="absolute right-3 bottom-3 grid place-items-center">
                <div class="h-8 w-8 rounded-full bg-[#FFD60A] grid place-items-center shadow">
                  <img :src="iconTbank" class="h-4 w-4" alt="">
                </div>
              </div>
            </div>

            <AppButton
              full
              size="lg"
              :leftIcon="iconCalendar"
              @click="openCalendar = true"
            >
              Выбрать дату звонка
            </AppButton>

            <div class="grid grid-cols-2 gap-3">
              <div class="h-12 rounded-[16px] bg-[#F2F3F5] flex items-center justify-center gap-2 px-4 text-[16px] leading-[24px] text-[#101012]">
                <img :src="iconWallet" class="h-[18px] w-[18px] opacity-80" alt="">
                <span>{{ current.price }}</span>
              </div>
              <div class="h-12 rounded-[16px] bg-[#F2F3F5] flex items-center justify-center gap-2 px-4 text-[16px] leading-[24px] text-[#101012]">
                <img :src="iconClock" class="h-[18px] w-[18px] opacity-80" alt="">
                <span>50 минут</span>
              </div>
            </div>

            <!-- Превью работ -->
            <div class="flex flex-col space-y-3">
              <button v-for="(shot,idx) in current.shots" :key="idx" class="preview-card">
                <img :src="shot" class="w-full h-full object-cover" alt="">
              </button>
            </div>
          </aside>

          <!-- RIGHT -->
          <main class="flex flex-col">
            <!-- бейджи -->
            <div class="flex flex-wrap items-center gap-2 mb-4">
              <span class="inline-flex h-7 items-center px-3 rounded-full text-[14px] font-medium text-white bg-[#5856D6]">Опытный ментор</span>
              <span class="inline-flex h-7 items-center px-3 rounded-full text-[14px] font-medium text-white bg-[#101012]">5+ лет в профессии</span>
            </div>

            <!-- заголовок -->
            <header class="mb-5">
              <h1 class="text-[28px] leading-[32px] sm:text-[36px] sm:leading-[40px] md:text-[48px] md:leading-[48px] font-medium tracking-[-2px]">
                {{ current.name }}
              </h1>
              <p class="mt-3 text-[16px] leading-[24px] tracking-[-0.25px] text-[#101012]">
                {{ current.subtitle }}
              </p>
            </header>

            <!-- скилл-чипы -->
            <div class="mb-6 flex flex-wrap gap-2">
              <span v-for="t in current.tags" :key="t" class="chip-tab">{{ t }}</span>
            </div>

            <div class="mb-6 h-px bg-[#787880]/[0.16]"></div>

            <!-- Доступность -->
            <section class="mb-6">
              <div class="mb-3 flex items-center">
                <div class="text-[18px] leading-[20px] font-medium text-[#101012]">Доступность</div>
                <div class="ml-auto">
                  <div class="inline-flex h-9 items-center gap-2 rounded-full border px-3 bg-white [border-color:rgba(120,120,128,0.16)] text-[14px] leading-[14px] text-[rgba(60,60,67,0.72)]">
                    <img :src="iconLocation" class="h-4 w-4 opacity-70" alt="" />
                    <span>Европа / Москва</span>
                  </div>
                </div>
              </div>

              <!-- День — слоты -->
              <div class="flex flex-col gap-3">
                <div v-for="(d, idx) in days" :key="idx" class="flex items-start gap-3">
                  <div class="w-[52px] pt-[6px] text-[13px] leading-[16px] text-[#101012]">{{ d.label }}</div>
                  <div class="flex flex-wrap gap-2">
                    <button
                      v-for="t in d.times" :key="t"
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

              <!-- Низ секции: НЕ синяя, нейтральная плашка-бронирование -->
              <div class="mt-4 flex items-center gap-2">
                <button
                  type="button"
                  class="inline-flex items-center h-10 px-3 rounded-full bg-[#F2F3F5] text-[#101012] text-[14px] font-medium leading-[20px]
                         transition disabled:opacity-60 disabled:pointer-events-none"
                  :disabled="!pickedSlot"
                  @click="bookAndGo"
                >
                  Забронировать звонок
                  <span v-if="pickedSlot" class="ml-2 text-[rgba(60,60,67,0.72)]">
                    {{ pickedSlot.dateLabel }}, {{ pickedSlot.time }}
                  </span>
                </button>

                <div class="ml-auto inline-grid grid-cols-2 rounded-full bg-[#F5F6F8] p-1">
                  <button class="seg-btn" :class="tabSeg===0 ? 'seg-btn--on' : ''" @click="tabSeg=0">Label 1</button>
                  <button class="seg-btn" :class="tabSeg===1 ? 'seg-btn--on' : ''" @click="tabSeg=1">Label 2</button>
                </div>
              </div>
            </section>

            <div class="h-px bg-[#D0D0D0]/40"></div>

            <!-- О менторе -->
            <section class="py-7 md:py-9 space-y-3">
              <h2 class="subheading">О менторе</h2>
              <p class="body-text">{{ current.aboutShort }}</p>
              <transition name="fade-slide">
                <p v-if="aboutOpen" class="body-text mt-1">{{ current.aboutLong }}</p>
              </transition>
              <button class="readmore-btn" @click="aboutOpen = !aboutOpen">
                <img :src="chevronIcon" class="h-4 w-4 transition-transform duration-300" :class="{'rotate-180': aboutOpen}" alt="" />
                {{ aboutOpen ? 'Свернуть' : 'Читать полностью' }}
              </button>
            </section>

            <div class="h-px bg-[#D0D0D0]/40"></div>

            <!-- Что даст менторство? -->
            <section class="py-7 md:py-9 space-y-3">
              <h2 class="subheading">Что даст менторство?</h2>
              <p class="body-text">{{ mentorFirst }}</p>
              <transition name="fade-slide">
                <p v-if="mentorshipOpen" class="body-text mt-1">{{ mentorHidden }}</p>
              </transition>
              <button class="readmore-btn" @click="mentorshipOpen = !mentorshipOpen">
                <img :src="chevronIcon" class="h-4 w-4 transition-transform duration-300" :class="{'rotate-180': mentorshipOpen}" alt="" />
                {{ mentorshipOpen ? 'Свернуть' : 'Читать полностью' }}
              </button>
            </section>

            <div class="h-px bg-[#D0D0D0]/40"></div>

            <!-- С чем поможет -->
            <section class="py-7 md:py-9 space-y-3">
              <h2 class="subheading">С чем поможет</h2>
              <div class="flex flex-wrap gap-2">
                <span v-for="t in current.helpWith" :key="'h-'+t" class="chip-tab">{{ t }}</span>
              </div>
            </section>

            <div class="h-px bg-[#D0D0D0]/40"></div>

            <!-- Достижения -->
            <section class="py-7 md:py-9 space-y-3">
              <h2 class="subheading">Достижения</h2>
              <div class="flex flex-wrap gap-2">
                <span v-for="a in current.achievements" :key="a" class="chip-tab">{{ a }}</span>
              </div>
            </section>
          </main>
        </div>

        <!-- Календарь (опционально) -->
        <CalendarModal
          v-if="openCalendar"
          :locationIcon="iconLocation"
          @close="openCalendar=false"
          @confirm="onBooked"
        />
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

import Header  from '@/components/profile/Header.vue'
import Stepper from '@/components/common/Stepper.vue'
import AppButton from '@/components/ui/AppButton.vue'
import SuitableMentors from '@/components/mentors/auto/SuitableMentors.vue'
import CalendarModal from '@/components/mentors/calendar/CalendarModal.vue'

/* ассеты */
import iconBack      from '@/src/assets/icons/mentor/arrow-back.svg'
import iconCalendar  from '@/src/assets/img/mentor/calendar-white.svg'
import iconWallet    from '@/src/assets/img/mentor/wallet.svg'
import iconClock     from '@/src/assets/img/mentor/clock.svg'
import iconTbank     from '@/src/assets/img/mentor/tbank.svg'
import iconLocation  from '@/src/assets/icons/CalendarModal/location.svg'
import chevronIcon   from '@/src/assets/img/mentor/chevron-down.svg'

/* демо-данные */
import avatar from '@/src/assets/img/mentor/avatarmentor.jpg'
import shot1  from '@/src/assets/img/mentor/phone.png'
import shot2  from '@/src/assets/img/mentor/phone.png'
import shot3  from '@/src/assets/img/mentor/phone.png'

const router = useRouter()

const mentors = [
  {
    id: 1,
    name: 'Имя Фамилия',
    subtitle: 'Старший продуктовый дизайнер в T-bank, ex. Orchestra, Sberbank, etc.',
    avatar,
    price: '3 900 ₽',
    shots: [shot1, shot2, shot3],
    tags: ['Продуктовый дизайн','Работа с визуалом','Исследования','Аналитика'],
    helpWith: ['Трудоустройство','Дизайн-системы','Софт-скиллы'],
    achievements: ['Жюри Awwwards','Публиковался в Made on Tilda','Вёл команды'],
    aboutShort: 'Knitted knitted bludger owl bludger cabbage in horseless...',
    aboutLong:  'Full-moon bezoar forbidden carriages petrified snape...'
  }
]

/* подходящие каруселью (заглушки путей можно заменить) */
const suitable = [
  { id: 1, avatar: '/images/mentors/m1.jpg' },
  { id: 2, avatar: '/images/mentors/m2.jpg' },
  { id: 3, avatar: '/images/mentors/m3.jpg' },
  { id: 4, avatar: '/images/mentors/m4.jpg' },
  { id: 5, avatar: '/images/mentors/m5.jpg' },
  { id: 6, avatar: '/images/mentors/m6.jpg' },
]
const pickedMentorId = ref<number|null>(suitable[0].id)

const selectedId = ref(mentors[0].id)
const current = computed(() => mentors.find(m => m.id === selectedId.value)!)
const openCalendar = ref(false)

const aboutOpen = ref(false)
const mentorshipOpen = ref(false)

/* доступность (локально, как на макете) */
const days = [
  { label: 'Сб 27', times: ['18:00','19:00','21:00'] },
  { label: 'Вс 28', times: ['18:00','19:00','21:00','21:30','22:00'] },
  { label: 'Пн 29', times: ['18:00','19:00','21:00','21:30','21:45','22:00'] },
  { label: 'Вт 30', times: ['18:00','19:00','21:00','21:30','21:45','22:00'] },
]
const pickedSlot = ref<{dateLabel:string,time:string}|null>(null)
const tabSeg = ref(0)

function isActive(d:string,t:string){
  return !!pickedSlot.value && pickedSlot.value.dateLabel===d && pickedSlot.value.time===t
}
function pick(d:string,t:string){
  if (isActive(d,t)) pickedSlot.value = null
  else pickedSlot.value = { dateLabel:d, time:t }
}
function bookAndGo(){
  if (!pickedSlot.value) return
  router.push('/mentors/auto/step3')
}

/* модал */
function onBooked() { openCalendar.value = false }

/* текст для секции «Что даст менторство?» */
const mentorFirst  = 'Короткий первый абзац: что получит ученик, какие навыки подтянет.'
const mentorHidden = 'Развёрнуто: примеры кейсов, результаты учеников, формат встреч и т.д.'
</script>

<style scoped>
/* чипы/табы */
.chip-tab{
  display:inline-flex; align-items:center;
  height:36px; padding:0 12px; border-radius:12px;
  background:#F7F8FA; color:#101012;
  font-size:16px; line-height:24px; letter-spacing:-.25px;
}

/* превью работ */
.preview-card{
  width:100%; height:200px; border-radius:16px; overflow:hidden; background:#ECEFF3;
  transform-origin:center; transition:transform .42s cubic-bezier(.22,1,.36,1), box-shadow .42s cubic-bezier(.22,1,.36,1);
}
@media (min-width:640px){ .preview-card{ height:240px; } }
.preview-card:hover{ transform:scale(1.04); box-shadow:0 28px 80px rgba(0,0,0,.28); }

/* типографика блоков */
.subheading{ font-size:22px; line-height:24px; letter-spacing:-.5px; font-weight:500; }
.body-text{ font-size:16px; line-height:24px; letter-spacing:-.25px; }

/* кнопка «Читать полностью» */
.readmore-btn{
  display:inline-flex; align-items:center; gap:8px;
  border:1px solid rgba(120,120,128,.16); background:#fff;
  border-radius:12px; padding:8px 16px; font-size:16px; line-height:24px;
  transition: background .15s ease;
}
.readmore-btn:hover{ background:#F7F8FA; }

/* time pills (как в макете) */
.time-pill{
  height:36px; padding:0 12px; border-radius:12px;
  border:1px solid rgba(120,120,128,.16); background:#fff;
  font-size:16px; line-height:24px; font-weight:500; letter-spacing:-.25px;
  transition: border-color .15s ease, background-color .15s ease;
}
.time-pill--active{ border-color:#007AFF; background:#F5F9FF; }

.seg-btn{
  height:32px; padding:0 12px; border-radius:9999px;
  font-size:13px; font-weight:500; color:#3C3C43;
}
.seg-btn--on{ background:#fff; color:#101012; box-shadow:0 1px 1px rgba(0,0,0,.03); }

/* анимация чтения */
.fade-slide-enter-from{ opacity:0; transform:translateY(-4px); }
.fade-slide-enter-active{ transition:all .28s cubic-bezier(.22,1,.36,1); }
.fade-slide-leave-to{ opacity:0; transform:translateY(-4px); }
.fade-slide-leave-active{ transition:all .2s ease; }
</style>
