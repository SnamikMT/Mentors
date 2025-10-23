<template>
  <div class="w-full max-w-[1440px] pr-48 bg-Backgrounds-Neutral-Primary inline-flex justify-start items-start gap-12 overflow-hidden relative">
    <Sidebar />

    <div class="w-full max-w-[1008px] pt-[16px] pl-[64px] pr-[64px] flex flex-col relative">
      <PageHeader class="mb-[71px]" />

      <!-- Заголовок -->
      <div class="mt-0 w-full max-w-[440px] h-[144px]">
        <div class="text-3xl font-medium text-[#C3C3C3]">Следующий звонок</div>
        <div class="text-[40px] leading-[48px] font-medium text-[#020203] mt-2">
          10 сентября<br />вторник, 18:00
        </div>
      </div>

      <!-- CTA кнопки -->
      <div class="mt-[64px] flex gap-3">
        <button class="flex items-center justify-center gap-2 p-4 bg-gradient-to-b from-[#2F80ED] to-[#1C6DD0] rounded-2xl shadow-md text-white font-medium">
          <img :src="joinCallIcon" class="w-6 h-6" alt="Join Icon" />
          Зайти в звонок
        </button>
        <button class="p-4 border rounded-2xl border-[#7878801a] text-[#020203] font-medium flex items-center gap-2">
          <img :src="rescheduleIcon" class="w-6 h-6" alt="Reschedule Icon" />
          Перенести
        </button>
      </div>

      <!-- Календарь — плавающее окно -->
      <Calendar v-if="isCalendarOpen" class="absolute top-[420px] left-0 z-[50]"
      @close="isCalendarOpen = false"
      />

      <!-- Прогресс + карточки -->
      <div class="flex gap-[12px] mt-[164px]">
        <!-- Первая карточка -->
        <div class="w-full max-w-[498px] h-[196px] p-6 bg-Backgrounds-Neutral-Grouped-Secondary rounded-[32px] outline outline-1 outline-offset-[-1px] outline-[#7878801a] backdrop-blur-xl flex flex-col justify-between gap-4 relative">
          <img
            :src="chevronUpIcon"
            alt="calendar toggle"
            class="absolute top-6 right-6 w-full max-w-5 h-5 cursor-pointer z-[60]"
            @click="toggleCalendar"
          />
          <div class="flex flex-col gap-4 w-full">
            <div class="flex justify-between items-start w-full">
              <div class="text-xl font-medium text-Labels-Neutral-Primary leading-tight">
                У тебя осталось 3 звонка
              </div>
              <div class="w-full max-w-6 h-6 relative overflow-hidden">
                <div class="w full max-w-3.5 h-2 absolute left-[5px] top-[7.8px] bg-Labels-Neutral-Secondary/70"></div>
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
            <div class="flex gap-2">
            <!-- кнопка -->
            <button class="px-4 py-2 bg-[#007AFF1A] text-[#007AFF] rounded-full font-medium text-sm"
                    @click="isModalOpen = true">
              Назначить ещё звонок
            </button>

            <!-- модалка -->
            <CalendarModal
              v-if="isModalOpen"
              :locationIcon="locationIconUrl"  
              @close="isModalOpen=false"
              @confirm="handleBooked"
            />
              <button class="px-4 py-2 text-[rgb(0,122,255)] rounded-full font-medium text-sm border border-transparent">
                Ввести сертификат
              </button>
            </div>
        </div>

        <!-- Вторая карточка -->
        <div class="w-full max-w-[498px] h-[196px] p-6 bg-Backgrounds-Neutral-Grouped-Secondary rounded-[32px] outline outline-1 outline-offset-[-1px] outline-[#7878801a] backdrop-blur-xl flex justify-between">
          <div class="flex flex-col justify-between">
            <div class="w-full text-xl font-medium text-[#020203] leading-tight">Что будет на первом занятии?</div>
            <button class="mt-4 px-4 py-2 text-[#020203] bg-[#F2F2F7] rounded-full font-medium w-max text-sm">
              Читать гайд
            </button>
          </div>
          <div class="relative top-0 -right-6 h-full w-full max-w-[218px]">
            <img :src="guideImg" alt="guide" class="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

import Sidebar from '../components/profile/sidebar/Sidebar.vue'
import PageHeader from '../components/mentors/PageHeader.vue'

import camIcon from '../src/assets/icons/mentor/calendar/video-camera.svg'
import cameraIcon from '../src/assets/icons/mentor/calendar/video-camera2.svg'
import joinCallIcon from '../src/assets/icons/mentor/calendar/video-camera1.svg'
import rescheduleIcon from '../src/assets/icons/mentor/calendar/time.svg'
import guideImg from '../src/assets/img/mentor/image.png'
import chevronUpIcon from '../src/assets/icons/profile/header/chevron-up.svg'
import Calendar from '../components/mentors/calendar/Calendar.vue'

import CalendarModal from '@/components/mentors/calendar/CalendarModal.vue'

import locationIconUrl from '../src/assets/icons/CalendarModal/location.svg'

const isModalOpen = ref(false)
const handleBooked = (payload) => {
  console.log('Booked:', payload)
  isModalOpen.value = false
}

const isCalendarOpen = ref(false)
const toggleCalendar = () => {
  isCalendarOpen.value = !isCalendarOpen.value
}

definePageMeta({
  headerType: 'mentor-inline'
})
</script>
