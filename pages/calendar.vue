<template>
  <NuxtLayout name="app">
    <!-- Заголовок страницы -->
    <PageHeader class="hidden lg:block mb-[71px]" />

    <!-- Заголовок блока -->
    <div class="mt-0 w-full max-w-[440px] h-auto lg:h-[144px]">
      <div class="text-xl sm:text-2xl font-medium text-[#C3C3C3]">Следующий звонок</div>
      <div
        class="text-[28px] sm:text-[34px] lg:text-[40px] leading-[36px] sm:leading-[44px] lg:leading-[48px] font-medium text-[#020203] mt-2"
      >
        10 сентября<br class="hidden sm:block" />вторник, 18:00
      </div>
    </div>

    <!-- CTA -->
    <div class="mt-8 lg:mt-[64px] flex flex-col sm:flex-row gap-3">
      <!-- 193×56, иконка 24px -->
      <AppButton
        size="lg"
        class="w-[193px] shrink-0"
        :leftIcon="joinCallIcon"
        :iconSize="24"
        @click="joinCall"
      >
        Зайти в звонок
      </AppButton>

      <!-- Ghost-версия, 157×56 -->
      <AppButton
        size="lg"
        variant="ghost"
        class="w-[157px] shrink-0"
        :leftIcon="rescheduleIcon"
        :iconSize="24"
        @click="toggleCalendar"
      >
        Перенести
      </AppButton>
    </div>

    <!-- Календарь: поповер на десктопе / модалка на мобиле -->
    <Calendar
      v-if="isCalendarOpen && isDesktop"
      class="absolute top-[420px] left-0 z-[50]"
      @close="isCalendarOpen = false"
    />

    <teleport to="body">
      <div
        v-if="isCalendarOpen && !isDesktop"
        class="fixed inset-0 z-[9998] bg-black/45 backdrop-blur-md flex items-center justify-center p-4"
        @click.self="isCalendarOpen = false"
      >
        <div class="relative w-full max-w-[640px] rounded-2xl bg-white shadow-xl">
          <Calendar @close="isCalendarOpen = false" />
          <button
            class="absolute -top-3 -right-3 h-9 w-9 grid place-items-center rounded-full bg-white shadow"
            @click="isCalendarOpen = false"
            aria-label="Закрыть"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M18 6 6 18M6 6l12 12" stroke-width="2" stroke-linecap="round" />
            </svg>
          </button>
        </div>
      </div>
    </teleport>

    <!-- Прогресс + карточки -->
    <div class="flex flex-col lg:flex-row gap-3 lg:gap-[12px] mt-20 lg:mt-[164px] relative">
      <!-- Первая карточка -->
      <div
        class="w-full lg:max-w-[498px] h-auto lg:h-[196px] p-5 lg:p-6 bg-Backgrounds-Neutral-Grouped-Secondary rounded-[24px] lg:rounded-[32px] outline outline-1 outline-offset-[-1px] outline-[#7878801a] backdrop-blur-xl flex flex-col justify-between gap-4 relative"
      >
        <img
          :src="chevronUpIcon"
          alt="calendar toggle"
          class="absolute top-5 right-5 w-5 h-5 cursor-pointer z-[60]"
          @click="toggleCalendar"
        />
        <div class="flex flex-col gap-4 w-full">
          <div class="flex justify-between items-start w-full">
            <div class="text-lg lg:text-xl font-medium text-Labels-Neutral-Primary leading-tight">
              У тебя осталось 3 звонка
            </div>
            <div class="w-6 h-6 relative overflow-hidden shrink-0">
              <div class="w-3.5 h-2 absolute left-[5px] top-[7.8px] bg-Labels-Neutral-Secondary/70"></div>
            </div>
          </div>
          <div class="flex flex-col gap-3 w-full">
            <div class="flex justify-between w-full">
              <div class="flex items-center gap-1">
                <img :src="camIcon" class="w-4 h-4" alt="cam" />
                <div class="text-base font-normal text-Labels-Neutral-Primary leading-normal">1</div>
              </div>
              <div class="flex items-center gap-1">
                <img :src="cameraIcon" class="w-4 h-4" alt="cam2" />
                <div class="text-base font-normal text-Labels-Neutral-Secondary/70 leading-normal">4 осталось</div>
              </div>
            </div>
            <div class="flex gap-1 w-full">
              <div class="flex-1 h-2 bg-[#007AFF] rounded-full"></div>
              <div class="flex-1 h-2 bg-[#F2F2F7] rounded-full"></div>
              <div class="flex-1 h-2 bg-[#F2F2F7] rounded-full"></div>
              <div class="flex-1 h-2 bg-[#F2F2F7] rounded-full"></div>
            </div>
          </div>
        </div>

        <div class="flex flex-wrap gap-2">
          <button
            class="px-4 py-2 bg-[#007AFF1A] text-[#007AFF] rounded-full font-medium text-sm"
            @click="isModalOpen = true"
          >
            Назначить ещё звонок
          </button>

          <CalendarModal
            v-if="isModalOpen"
            :locationIcon="locationIconUrl"
            @close="isModalOpen = false"
            @confirm="handleBooked"
          />

          <button class="px-4 py-2 text-[rgb(0,122,255)] rounded-full font-medium text-sm border border-transparent">
            Ввести сертификат
          </button>
        </div>
      </div>

      <!-- Вторая карточка -->
      <div
        class="w-full lg:max-w-[498px] h-auto lg:h-[196px] p-5 lg:p-6 bg-Backgrounds-Neutral-Grouped-Secondary rounded-[24px] lg:rounded-[32px] outline outline-1 outline-offset-[-1px] outline-[#7878801a] backdrop-blur-xl flex justify-between gap-4"
      >
        <div class="flex flex-col justify-between">
          <div class="w-full text-lg lg:text-xl font-medium text-[#020203] leading-tight">
            Что будет на первом занятии?
          </div>
          <button class="mt-4 px-4 py-2 text-[#020203] bg-[#F2F2F7] rounded-full font-medium w-max text-sm">
            Читать гайд
          </button>
        </div>
        <div class="relative top-0 -right-2 lg:-right-6 h-[120px] sm:h-[150px] lg:h-full w-[160px] sm:w-[190px] lg:w-[218px]">
          <img :src="guideImg" alt="guide" class="w-full h-full object-cover rounded-xl lg:rounded-none" />
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

import AppButton from '@/components/ui/AppButton.vue'
import PageHeader from '@/components/mentors/PageHeader.vue'

import camIcon from '@/src/assets/icons/mentor/calendar/video-camera.svg'
import cameraIcon from '@/src/assets/icons/mentor/calendar/video-camera2.svg'
import joinCallIcon from '@/src/assets/icons/mentor/calendar/video-camera1.svg'
import rescheduleIcon from '@/src/assets/icons/mentor/calendar/time.svg'
import guideImg from '@/src/assets/img/mentor/image.png'
import chevronUpIcon from '@/src/assets/icons/profile/header/chevron-up.svg'

import Calendar from '@/components/mentors/calendar/Calendar.vue'
import CalendarModal from '@/components/mentors/calendar/CalendarModal.vue'
import locationIconUrl from '@/src/assets/icons/CalendarModal/location.svg'

const isModalOpen = ref(false)
const handleBooked = (payload) => {
  console.log('Booked:', payload)
  isModalOpen.value = false
}

const isCalendarOpen = ref(false)
const toggleCalendar = () => { isCalendarOpen.value = !isCalendarOpen.value }

const joinCall = () => {
  // Заглушка: сюда навигацию в комнату/линк
  console.log('Join call clicked')
}

/* SSR-safe брейкпоинт */
const isDesktop = ref(false)
let mql = null
let cleanup = null

onMounted(() => {
  if (typeof window !== 'undefined' && 'matchMedia' in window) {
    mql = window.matchMedia('(min-width: 1024px)')
    const update = (e) => (isDesktop.value = e.matches)
    isDesktop.value = mql.matches
    if (mql.addEventListener) {
      mql.addEventListener('change', update)
      cleanup = () => mql.removeEventListener('change', update)
    } else if (mql.addListener) {
      mql.addListener(update)
      cleanup = () => mql.removeListener(update)
    }
  }
})
onBeforeUnmount(() => { if (cleanup) cleanup() })

definePageMeta({ headerType: 'mentor-inline' })
</script>
