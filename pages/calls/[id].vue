<template>
  <NuxtLayout name="app">
    <!-- Верхнее меню: back 40×40 + заголовок на одной линии, отступ снизу 24px -->
    <div class="flex items-center gap-3 mb-6">
      <button
        type="button"
        @click="goBack"
        class="h-10 w-10 grid place-items-center rounded-full
               outline outline-1 outline-[#787880]/10
               hover:bg-black/[.03] transition"
        aria-label="Назад"
      >
        <img :src="iconBack" class="w-5 h-5 opacity-70" alt="Назад" />
      </button>
      <Header sectionTitle="История звонков" :sectionIcon="sectionIcon" />
    </div>

    <!-- Шапка звонка -->
    <div class="flex flex-col gap-3">
      <h1
        class="text-[#020203] font-medium
               text-[28px] leading-[36px]
               sm:text-[32px] sm:leading-[40px]
               lg:text-[48px] lg:leading-[48px]"
      >
        {{ call.title }}
      </h1>

      <div class="flex flex-wrap items-center gap-2 text-base text-[#020203]">
        <span>Звонок с</span>
        <span class="inline-flex items-center gap-1">
          <img :src="avatar" alt="" class="w-6 h-6 rounded-full" />
          Сашей · 22 марта 2025
        </span>
      </div>
    </div>

    <!-- Две колонки: слева видео и прогресс, справа — конспект -->
    <div class="grid grid-cols-1 lg:grid-cols-[1fr,380px] gap-4 lg:gap-6 items-start mt-6">
      <!-- Левая колонка -->
      <div class="flex flex-col gap-6">
        <!-- Видео -->
        <div class="relative w-full rounded-2xl overflow-hidden h-[233px] sm:h-[260px] lg:h-80">
          <img :src="imgGood" class="w-full h-full object-cover" alt="Call preview" />
          <div class="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/50 to-transparent">
            <div class="h-1 rounded-full bg-white/10">
              <div class="h-1 w-20 bg-white rounded-full"></div>
            </div>
            <div class="mt-3 flex items-center justify-between">
              <div class="flex items-center gap-3">
                <img :src="iconPlay" class="w-5 h-5" alt="Play" />
                <img :src="iconVolume" class="w-5 h-5" alt="Volume" />
              </div>
              <img :src="iconScreen" class="w-5 h-5" alt="Fullscreen" />
            </div>
          </div>
        </div>

        <!-- Кнопки действия -->
        <div class="flex flex-col sm:flex-row gap-2">
          <button
            class="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-[#007AFF1A] text-[#007AFF] font-medium"
          >
            <img :src="iconSend" class="w-5 h-5" alt="" />
            Отправить в Телеграм
          </button>
          <button
            class="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-[#3C3C431A] text-[#020203] font-medium"
          >
            <img :src="iconCopy" class="w-5 h-5" alt="" />
            Ссылка на видео
          </button>
        </div>

        <p class="text-center text-sm font-medium text-[#3C3C43]/25">
          Запись доступна ещё 28 дней
        </p>

        <!-- Прогресс по созвонам -->
        <div class="p-6 bg-white rounded-2xl border border-[#7878801a] flex flex-col gap-6">
          <div class="flex items-center justify-between">
            <div class="inline-flex items-center gap-1">
              <img :src="iconVideo" class="w-4 h-4" alt="" />
              <span class="text-base">1-й звонок</span>
            </div>
            <div class="inline-flex items-center gap-1">
              <img :src="iconTime" class="w-4 h-4 opacity-70" alt="" />
              <span class="text-base text-[#3C3C43B2]">4 всего</span>
            </div>
          </div>
          <div class="flex gap-1">
            <div class="flex-1 h-2 bg-[#007AFF] rounded-full"></div>
            <div class="flex-1 h-2 bg-[#D9D9D91A] rounded-full"></div>
            <div class="flex-1 h-2 bg-[#D9D9D91A] rounded-full"></div>
            <div class="flex-1 h-2 bg-[#D9D9D91A] rounded-full"></div>
          </div>
        </div>

        <!-- Конспект (мобилка) -->
        <div class="lg:hidden relative bg-white rounded-2xl border border-[#7878801a] px-4 sm:px-6 pt-10 pb-6 flex flex-col gap-4">
          <div class="absolute -top-3 left-4 sm:left-6 flex gap-2">
            <button class="px-4 py-2 rounded-full bg-[#F2F2F2] inline-flex items-center gap-2">
              <img :src="iconCopy" class="w-5 h-5" alt="" />
              <span class="font-medium text-base">Скопировать</span>
            </button>
            <button class="px-4 py-2 rounded-full bg-[#F2F2F2] inline-flex items-center gap-2">
              <img :src="iconEdit" class="w-5 h-5" alt="" />
              <span class="font-medium text-base">Изменить</span>
            </button>
          </div>

          <div class="flex flex-col gap-4 max-h-[520px] overflow-y-auto pr-1 scrollbar-clean">
            <div class="flex gap-2 items-start">
              <span class="w-12 shrink-0 text-xs font-medium text-[#007AFF] leading-3 pt-1">00:01</span>
              <p class="text-base text-[#020203]">
                Веб-дизайн — это не просто создание красивых страниц. Это искусство, которое сочетает…
              </p>
            </div>
            <div class="flex gap-2 items-start">
              <div class="w-12 shrink-0 pt-1">
                <img :src="iconStar" class="w-3 h-3 mb-1" alt="" />
                <span class="text-xs font-medium text-[#007AFF] leading-3">00:30</span>
              </div>
              <p class="text-base text-[#020203]">
                Веб-дизайн — это не просто создание красивых страниц. Это искусство…
              </p>
            </div>
            <div class="flex gap-2 items-start">
              <span class="w-12 shrink-0 text-xs font-medium text-[#007AFF] leading-3 pt-1">01:00</span>
              <p class="text-base text-[#020203]">…ключевые аспекты веб-дизайна…</p>
            </div>
          </div>

          <div class="mx-auto w-[320px] max-w-full p-0.5 bg-[#EDEDED1A] rounded-full flex overflow-hidden">
            <div class="flex-1 p-3 bg-white rounded-full text-center text-sm font-medium">Весь звонок</div>
            <div class="flex-1 p-3 text-center text-sm font-medium text-[#3C3C43B2]">Только важное</div>
          </div>
        </div>
      </div>

      <!-- Правая колонка (≥lg): конспект -->
      <aside class="hidden lg:flex relative bg-white rounded-2xl border border-[#7878801a] w-full max-w-[380px] px-6 pt-10 pb-6 flex-col gap-4">
        <div class="absolute -top-[24px] left-6 flex gap-3">
          <button class="flex items-center gap-2 bg-[#F2F2F2] rounded-full px-4 py-2">
            <img :src="iconCopy" class="w-5 h-5" alt="" />
            <span class="text-[#020203] font-medium text-base">Скопировать</span>
          </button>
          <button class="flex items-center gap-2 bg-[#F2F2F2] rounded-full px-4 py-2">
            <img :src="iconEdit" class="w-5 h-5" alt="" />
            <span class="text-[#020203] font-medium text-base">Изменить</span>
          </button>
        </div>

        <div class="flex flex-col gap-4 flex-1 overflow-y-auto scrollbar-clean pr-2 max-h-[500px]">
          <div class="flex gap-2 items-start">
            <span class="w-12 text-xs font-medium text-[#007AFF] leading-3 pt-1">00:01</span>
            <p class="text-base text-[#020203]">Веб-дизайн — это не просто создание красивых страниц…</p>
          </div>
          <div class="flex gap-2 items-start">
            <div class="w-12 pt-1">
              <img :src="iconStar" class="w-3 h-3 mb-1" alt="" />
              <span class="text-xs font-medium text-[#007AFF] leading-3">00:30</span>
            </div>
            <p class="text-base text-[#020203]">Веб-дизайн — это не просто создание красивых страниц…</p>
          </div>
          <div class="flex gap-2 items-start">
            <span class="w-12 text-xs font-medium text-[#007AFF] leading-3 pt-1">01:00</span>
            <p class="text-base text-[#020203]">…ключевые аспекты веб-дизайна…</p>
          </div>
        </div>

        <div class="w-80 mx-auto max-w-full p-0.5 bg-[#EDEDED1A] rounded-full flex overflow-hidden">
          <div class="flex-1 p-3 bg-white rounded-full text-center text-sm font-medium">Весь звонок</div>
          <div class="flex-1 p-3 text-center text-sm font-medium text-[#3C3C43B2]">Только важное</div>
        </div>
      </aside>
    </div>
  </NuxtLayout>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from '#app'
import Header from '@/components/profile/Header.vue'

import sectionIcon from '@/src/assets/icons/profile/mentors/call.svg'
import callImage from '@/src/assets/img/mentor/calls/calls.png'
import avatar from '@/src/assets/img/mentor/calls/Avatars.png'
import imgGood from '@/src/assets/img/mentor/calls/calls.png'

import iconSend from '@/src/assets/icons/mentor/calls/arrow-redo.svg'
import iconCopy from '@/src/assets/icons/mentor/calls/copy.svg'
import iconVideo from '@/src/assets/icons/mentor/calendar/video-camera.svg'
import iconTime from '@/src/assets/icons/mentor/calendar/video-camera2.svg'
import iconPlay from '@/src/assets/icons/mentor/calls/play.svg'
import iconVolume from '@/src/assets/icons/mentor/calls/volume-high.svg'
import iconScreen from '@/src/assets/icons/mentor/calls/scan.svg'
import iconEdit from '@/src/assets/icons/profile/header/pencil.svg'
import iconStar from '@/src/assets/icons/mentor/calls/star.svg'
import iconBack from '@/src/assets/icons/mentor/arrow-back.svg'

const router = useRouter()
const route = useRoute()
const { id } = route.params

const call = ref({
  id,
  title: 'Оптимизация handoff в разработке продукта',
  author: 'Даниил Ерошов',
  date: '22.03.2025',
  duration: '53:02',
  img: callImage
})

useHead(() => ({ title: `Звонок: ${call.value.title}` }))

function goBack () { router.back() }
</script>

<style scoped>
/* Аккуратный скролл в конспекте */
.scrollbar-clean::-webkit-scrollbar{ width:8px; height:8px }
.scrollbar-clean::-webkit-scrollbar-thumb{ background:#E6E6E6; border-radius:8px }
.scrollbar-clean::-webkit-scrollbar-track{ background:transparent }
</style>
