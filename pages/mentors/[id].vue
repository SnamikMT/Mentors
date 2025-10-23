<template>
  <div class="w-full max-w-[1440px] pr-48 bg-Backgrounds-Neutral-Primary inline-flex justify-start items-start gap-12 overflow-hidden relative">
    <Sidebar />

    <div class="w-full">
      <div class="mx-auto max-w-[1008px] pl-[29px] pr-6 py-6 md:py-10 text-[#101012]">

        <!-- back -->
        <div class="mb-6">
          <button
            type="button"
            class="inline-flex items-center gap-2 h-10 md:w-[191px] px-3 rounded-[12px] border bg-transparent
                   [border-color:rgba(120,120,128,0.16)]
                   text-[16px] leading-[24px] tracking-[0] text-[#101012] hover:bg-black/[0.02] transition"
            @click="goBack"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M15 18 9 12l6-6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>Вернуться назад</span>
          </button>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-[320px,1fr] gap-6 md:gap-8 lg:gap-9">
          <!-- левая -->
          <aside class="flex flex-col gap-4 overflow-visible">
            <div class="relative rounded-[20px] overflow-hidden bg-white border border-black/10 shadow-sm">
              <img :src="avatar" alt="mentor" class="w-full aspect-square object-cover" />
              <div class="absolute right-3 bottom-3 grid place-items-center">
                <div class="relative h-8 w-8 rounded-full bg-[#FFD60A] border-white grid place-items-center">
                  <img :src="iconTbank" class="h-4 w-4" alt="T-Bank" />
                </div>
              </div>
            </div>

            <button class="btn-primary" @click="isModalOpen = true">
              <img :src="iconCalendar" class="h-5 w-5" alt="" />
              <span class="text-[16px] leading-[24px]">Выбрать дату звонка</span>
            </button>

            <div class="grid grid-cols-2 gap-3">
              <div class="h-12 rounded-[16px] bg-[#F2F3F5] flex items-center justify-center gap-2 px-4 text-[16px] leading-[24px] text-[#101012]">
                <img :src="iconWallet" class="h-[18px] w-[18px] opacity-80" alt="" />
                <span>3 900 ₽</span>
              </div>
              <div class="h-12 rounded-[16px] bg-[#F2F3F5] flex items-center justify-center gap-2 px-4 text-[16px] leading-[24px] text-[#101012]">
                <img :src="iconClock" class="h-[18px] w-[18px] opacity-80" alt="" />
                <span>50 минут</span>
              </div>
            </div>

            <!-- 3 карточки -->
            <div class="flex flex-col space-y-3">
              <button class="preview-card" @click="openPreview(works[0])">
                <img :src="works[0]" class="w-full h-full object-cover" alt="">
              </button>
              <button class="preview-card" @click="openPreview(works[1])">
                <img :src="works[1]" class="w-full h-full object-cover" alt="">
              </button>
              <button class="preview-card" @click="openPreview(works[2])">
                <img :src="works[2]" class="w-full h-full object-cover" alt="">
              </button>
            </div>
          </aside>

          <!-- правая -->
          <main class="flex flex-col">
            <div class="flex items-center gap-2 mb-4">
              <span class="inline-flex h-7 items-center px-3 rounded-full text-[14px] font-medium text-white bg-[#5856D6]">Опытный ментор</span>
              <span class="inline-flex h-7 items-center px-3 rounded-full text-[14px] font-medium text-white bg-[#101012]">5+ лет в профессии</span>
            </div>

            <header class="mb-6">
              <h1 class="text-[48px] leading-[48px] font-medium tracking-[-2px]">Имя Фамилия</h1>
              <p class="mt-3 text-[16px] leading-[24px] tracking-[-0.25px] font-normal text-[#101012]">
                Старший продуктовый дизайнер<br class="hidden sm:block" />
                в T-bank, ex. Orchestra, Sberbank, etc.
              </p>
            </header>

            <div class="mb-6 flex flex-wrap gap-2">
              <button v-for="t in expertise" :key="t" class="chip-tab">{{ t }}</button>
            </div>

            <hr class="border-black/10">

            <!-- О менторе -->
            <section class="py-9 space-y-3">
              <h2 class="subheading">О менторе</h2>
              <p class="body-text">{{ aboutFirst }}</p>
              <transition name="fade-slide">
                <p v-if="aboutOpen" class="body-text mt-1">{{ aboutHidden }}</p>
              </transition>
              <button class="readmore-btn" @click="aboutOpen = !aboutOpen">
                <img :src="chevronIcon" class="h-4 w-4 transition-transform duration-300"
                     :class="{'rotate-180': aboutOpen}" alt="" />
                {{ aboutOpen ? 'Свернуть' : 'Читать полностью' }}
              </button>
            </section>

            <hr class="border-black/10">

            <!-- Что даст менторство -->
            <section class="py-9 space-y-3">
              <h2 class="subheading">Что даст менторство?</h2>
              <p class="body-text">{{ mentorFirst }}</p>
              <transition name="fade-slide">
                <p v-if="mentorshipOpen" class="body-text mt-1">{{ mentorHidden }}</p>
              </transition>
              <button class="readmore-btn" @click="mentorshipOpen = !mentorshipOpen">
                <img :src="chevronIcon" class="h-4 w-4 transition-transform duration-300"
                     :class="{'rotate-180': mentorshipOpen}" alt="" />
                {{ mentorshipOpen ? 'Свернуть' : 'Читать полностью' }}
              </button>
            </section>

            <hr class="border-black/10">

            <section class="py-9 space-y-3">
              <h2 class="subheading">С чем поможет</h2>
              <div class="flex flex-wrap gap-2">
                <button v-for="t in helpWith" :key="'h-'+t" class="chip-tab">{{ t }}</button>
              </div>
            </section>

            <hr class="border-black/10">

            <section class="py-9 space-y-3">
              <h2 class="subheading">Достижения</h2>
              <div class="flex flex-wrap gap-2">
                <span v-for="a in achievements" :key="a" class="chip-tab">{{ a }}</span>
              </div>
            </section>

            <hr class="border-black/10">

            <!-- карточка-подсказка (как раньше, без изменений) -->
            <section class="py-9">
              <div
                class="w-full lg:w-[652px] h-[160px] rounded-[16px] border border-black/10 bg-white p-6
                       grid grid-cols-[1fr,140px] gap-4 items-center"
              >
                <div class="flex flex-col gap-3">
                  <div class="text-[#101012] font-medium text-[24px] leading-[24px] [letter-spacing:-0.5px]">
                    Не знаешь, какого<br class="hidden sm:block" />
                    ментора лучше выбрать?
                  </div>

                  <button
                    type="button"
                    class="inline-flex items-center justify-center h-10 w-[226px] px-4 rounded-full
                           font-medium text-[16px] leading-[24px] [letter-spacing:0] text-[#007AFF]"
                    style="background: rgba(0,122,255,0.12);"
                  >
                    Выбрать автоматически
                  </button>
                </div>

                <div class="justify-self-end self-center hidden sm:block">
                  <img :src="autoPickIllustration" alt="" class="max-h-[112px] w-auto" />
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>

      <CalendarModal
        v-if="isModalOpen"
        :locationIcon="locationIconUrl"
        @close="isModalOpen=false"
        @confirm="onBooked"
      />
    </div>
  </div>

  <!-- Лайтбокс -->
  <teleport to="body">
    <div
      v-if="isPreviewOpen"
      class="fixed inset-0 z-[9998] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
      @click.self="isPreviewOpen=false"
      @keydown.esc.prevent="isPreviewOpen=false"
      tabindex="-1"
    >
      <img :src="previewSrc" class="max-w-[92vw] max-h-[92vh] rounded-2xl shadow-2xl" alt="">
      <button
        class="absolute top-4 right-4 h-9 w-9 grid place-items-center rounded-full bg-white/90 hover:bg-white transition"
        @click="isPreviewOpen=false" aria-label="Закрыть"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M18 6 6 18M6 6l12 12" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>
    </div>
  </teleport>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Sidebar from '@/components/profile/sidebar/Sidebar.vue'
import CalendarModal from '@/components/mentors/calendar/CalendarModal.vue'

import avatar from '../../src/assets/img/mentor/avatarmentor.jpg'
import shot1  from '../../src/assets/img/mentor/phone.png'
import shot2  from '../../src/assets/img/mentor/phone.png'
import shot3  from '../../src/assets/img/mentor/phone.png'
import locationIconUrl from '../../src/assets/icons/CalendarModal/location.svg'

import iconCalendar from '../../src/assets/img/mentor/calendar-white.svg'
import iconWallet   from '../../src/assets/img/mentor/wallet.svg'
import iconClock    from '../../src/assets/img/mentor/clock.svg'
import iconTbank    from '../../src/assets/img/mentor/tbank.svg'
import autoPickIllustration from '../../src/assets/img/mentor/auto-pick-illustration.png'

/* стрелка для «Читать полностью» — замени путь на свой */
import chevronIcon from '../../src/assets/img/mentor/chevron-down.svg'

const router = useRouter()
const goBack = () => router.back()

const isModalOpen = ref(false)
const aboutOpen = ref(false)
const mentorshipOpen = ref(false)

/* карточки */
const works = [shot1, shot2, shot3]

/* лайтбокс */
const isPreviewOpen = ref(false)
const previewSrc = ref('')
const openPreview = (src) => {
  previewSrc.value = src
  isPreviewOpen.value = true
  requestAnimationFrame(() => {
    const el = document.querySelector('[tabindex="-1"]')
    el?.focus?.()
  })
}

/* данные */
const expertise = ['Продуктовый дизайн','Работа с визуалом','Исследования','Аналитика']
const helpWith = ['Трудоустройство','Дизайн-системы','Софт-скиллы']
const achievements = ['Жюри Awwwards','Публиковался в Made on Tilda','Управлял командами в винтеджах']

/* тексты секций по твоим частям */
const aboutFirst = `Knitted knitted bludger owl bludger cabbage in horseless. Unicorn above hearing turban stroke treats love. Tail pigwidgeon charm trunks bertie blubber dead us. Grindylows hats hand ground quaffle. For snape dittany crookshanks ollivanders.`
const aboutHidden = `Full-moon bezoar forbidden carriages petrified snape. Gillyweed keeper them 9¾ I locket half-moon-glasses bat years. Phoenix stone expecto ridgeback trunks. Fat hat who cutting stroke cup cup avada time-turner leviosa. Gargoyles petrified bag fantastic restricted. Wheels fanged wand bagman half-blood transfiguration. Mimbletonia wheels easy minister do weekly for snivellus. Knitted hearing than umbridge maze minister. Flavor cannot.`

const mentorFirst = `Knitted knitted bludger owl bludger cabbage in horseless. Unicorn above hearing turban stroke treats love. Tail pigwidgeon charm trunks bertie blubber dead us. Grindylows hats hand ground quaffle. For snape dittany crookshanks ollivanders.`
const mentorHidden = `Full-moon bezoar forbidden carriages petrified snape. Gillyweed keeper them 9¾ I locket half-moon-glasses bat years. Phoenix stone expecto ridgeback trunks. Fat hat who cutting stroke cup cup avada time-turner leviosa. Gargoyles petrified bag fantastic restricted. Wheels fanged wand bagman half-blood transfiguration. Mimbletonia wheels easy minister do weekly for snivellus. Knitted hearing than umbridge maze minister. Flavor cannot.`

const onBooked = (payload) => {
  console.log('Booked:', payload)
  isModalOpen.value = false
}
</script>

<style scoped>
/* синяя кнопка */
.btn-primary{
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 56px;
  width: 100%;
  border-radius: 20px;
  color: #fff;
  font-weight: 500;
  background: #007AFF;
  overflow: hidden;
}
.btn-primary::after{
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0) 45%);
  pointer-events: none;
}

/* чипы/табы */
.chip-tab{
  @apply inline-flex items-center h-9 px-3 rounded-[12px] bg-[#F7F8FA] text-[#101012]
         text-[16px] leading-[24px] tracking-[-0.25px] font-normal;
}

/* типографика секций */
.subheading{ @apply text-[24px] leading-[24px] tracking-[-0.5px] font-medium; }
.body-text{ @apply text-[16px] leading-[24px] tracking-[-0.25px] font-normal text-[#101012]; }

/* кнопка «Читать полностью» */
.readmore-btn{
  @apply inline-flex items-center gap-2 rounded-[12px] border bg-white px-4 py-2
         text-[16px] leading-[24px] tracking-[0] font-normal transition hover:bg-black/[0.02];
  border-color: rgba(120,120,128,0.16);
}

/* плавная всплывашка карточки */
.preview-card{
  position: relative;
  width: 320px;
  height: 240px;
  border-radius: 16px;
  overflow: hidden;
  background: #ECEFF3;
  transform-origin: center center;
  will-change: transform;
  transition: transform .42s cubic-bezier(.22,1,.36,1),
              box-shadow .42s cubic-bezier(.22,1,.36,1),
              outline-color .42s cubic-bezier(.22,1,.36,1),
              z-index .42s cubic-bezier(.22,1,.36,1);
  z-index: 1;
}
.preview-card:hover,
.preview-card:focus-visible{
  transform: scale(1.3125);
  z-index: 60;
  outline: 1px solid #FFFFFF;
  box-shadow: 0 28px 80px rgba(0,0,0,0.28);
}

/* появление скрытого текста */
.fade-slide-enter-from{ opacity:0; transform: translateY(-4px); }
.fade-slide-enter-to{ opacity:1; transform: translateY(0); }
.fade-slide-enter-active{ transition: all .28s cubic-bezier(.22,1,.36,1); }
.fade-slide-leave-from{ opacity:1; transform: translateY(0); }
.fade-slide-leave-to{ opacity:0; transform: translateY(-4px); }
.fade-slide-leave-active{ transition: all .2s ease; }
</style>
