<template>
    <div class="w-full max-w-[1440px] mx-auto box-border overflow-x-hidden">
      <div class="flex justify-start items-start gap-[12px] overflow-x-clip">
        <Sidebar />
        
        <div class="flex-1 w-full min-w-0 pt-4 pl-[48px] pr-48 box-border flex flex-col gap-[16px]">
          <div class="flex items-center gap-3 w-full min-w-0">
            <div
              @click="goBack"
              class="mt-[-40px] w-full max-w-9 h-9 rounded-full outline outline-1 outline-offset-[-1px] outline-[#787880]/10 inline-flex justify-center items-center overflow-hidden cursor-pointer"
            >
              <div class="w-full max-w-6 h-6 relative overflow-hidden">
                <img :src="iconBack" alt="Back" class="absolute left-[2.5px] top-[2.5px] w-5 h-5 opacity-70"/>
              </div>
            </div>

            <Header sectionTitle="Задания от ментора" :sectionIcon="sectionIcon" />
          </div>

          <div class="flex gap-[24px] items-start w-full min-w-0">
            <div class="flex flex-col gap-12 w-full max-w-[585px]">
              <div class="flex flex-col gap-6">
                <h1 class="w-full text-5xl font-medium text-[#020203] leading-[48px]">
                  Оптимизация handoff<br />в разработке продукта
                </h1>
                <div class="flex gap-2 items-center text-base text-[#020203]">
                  <span>Звонок с</span>
                  <div class="flex gap-1 items-center">
                    <img :src="avatar" alt="Avatar" class="w-6 h-6 rounded-full" />
                    <span>Сашей · 22 марта 2025</span>
                  </div>
                </div>
              </div>

              <div class="flex flex-col gap-6">
                <div class="relative w-full h-80 rounded-2xl overflow-hidden">
                  <img :src="imgGood" alt="Call preview" class="w-full h-full object-cover" />
                  <div class="absolute bottom-0 w-full p-4 bg-gradient-to-t from-black/50 to-transparent">
                    <div class="w-full h-1 bg-white/10 rounded-full">
                      <div class="w-full max-w-20 h-1 bg-white rounded-full"></div>
                    </div>
                    <div class="flex justify-between items-center mt-3">
                      <div class="flex gap-3 items-center">
                        <img :src="iconPlay" class="w-5 h-5" />
                        <img :src="iconVolume" class="w-5 h-5" />
                      </div>
                      <img :src="iconScreen" class="w-5 h-5" />
                    </div>
                  </div>
                </div>
              
                <div class="flex gap-2">
                  <button class="flex justify-center items-center gap-1 bg-[#007AFF1A] rounded-full px-4 py-2 whitespace-nowrap max-w-[287px]">
                    <img :src="iconSend" class="w-5 h-5" />
                    <span class="text-[#007AFF] font-medium text-base">Отправить в Телеграм</span>
                  </button>
                  <button class="flex justify-center items-center gap-1 bg-[#3C3C431A] rounded-full px-4 py-2 whitespace-nowrap max-w-[287px]">
                    <img :src="iconCopy" class="w-5 h-5" />
                    <span class="text-[#020203] font-medium text-base">Ссылка на видео</span>
                  </button>
                </div>

                <p class="self-stretch text-center justify-center text-[#3C3C4340] text-sm font-medium leading-3">
                  Запись доступна ещё 28 дней
                </p>
              </div>
              
              <div class="p-6 bg-[#ffffff] rounded-2xl outline outline-1 outline-offset-[-1px] outline-[#7878801a] flex flex-col gap-6">
                <div class="flex justify-between">
                  <div class="flex gap-1 items-center">
                    <img :src="iconVideo" class="w-4 h-4" />
                    <span class="text-base font-normal text-[#020203]">1-й звонок</span>
                  </div>
                  <div class="flex gap-1 items-center">
                    <img :src="iconTime" class="w-4 h-4 opacity-70" />
                    <span class="text-base font-normal text-[#3C3C43B2]">4 всего</span>
                  </div>
                </div>
                <div class="flex gap-1">
                  <div class="flex-1 h-2 bg-[#007AFF] rounded-full"></div>
                  <div class="flex-1 h-2 bg-[#D9D9D91A] rounded-full"></div>
                  <div class="flex-1 h-2 bg-[#D9D9D91A] rounded-full"></div>
                  <div class="flex-1 h-2 bg-[#D9D9D91A] rounded-full"></div>
                </div>
              </div>
            </div>
         
            <div class="relative h-[575px] bg-white rounded-2xl outline outline-1 outline-offset-[-1px] outline-[#7878801a] w-full max-w-[380px] px-6 pt-[40px] pb-6 flex flex-col gap-3 mt-[285px]">
              <div class="absolute -top-[24px] left-6 flex gap-3">
                <button class="flex items-center gap-2 bg-[#F2F2F2] rounded-full px-4 py-2">
                  <img :src="iconCopy" class="w-5 h-5" />
                  <span class="text-[#020203] font-medium text-base">Скопировать</span>
                </button>
                <button class="flex items-center gap-2 bg-[#F2F2F2] rounded-full px-4 py-2">
                  <img :src="iconEdit" class="w-5 h-5" />
                  <span class="text-[#020203] font-medium text-base">Изменить</span>
                </button>
              </div>
            
              <div class="flex flex-col gap-4 flex-1 overflow-y-auto scrollbar-clean pr-2 max-h-[500px]">
                <div class="flex gap-2 items-start">
                  <span class="w-full max-w-12 text-xs font-medium text-[#007AFF] leading-3 pt-1">00:01</span>
                  <p class="text-base text-[#020203] font-normal">
                    Веб-дизайн — это не просто создание красивых страниц. Это искусство, которое сочетает в себе эстетику, функциональность и удобство использования. В этой статье мы рассмотрим ключевые аспекты веб-дизайна, которые помогут вам создать привлекательный и эффективный сайт.
                  </p>
                </div>
                <div class="flex gap-2 items-start">
                  <div class="w-full max-w-12 pt-1">
                    <div class="flex flex-col items-start gap-1">
                      <img :src="iconStar" class="w-3 h-3" />
                      <span class="text-xs font-medium text-[#007AFF] leading-3">00:30</span>
                    </div>
                  </div>
                  <p class="text-base text-[#020203] font-normal">
                    Веб-дизайн — это не просто создание красивых страниц. Это искусство, которое сочетает в себе эстетику, функциональность и удобство использования. В этой статье мы рассмотрим ключевые аспекты веб-дизайна, которые
                  </p>
                </div>
                <div class="flex gap-2 items-start">
                  <span class="w-full max-w-12 text-xs font-medium text-[#007AFF] leading-3 pt-1">01:00</span>
                  <p class="text-base text-[#020203] font-normal">
                    Веб-дизайн — это не просто создание красивых страниц. Это искусство, которое сочетает в себе эстетику, функциональность и удобство использования. В этой статье мы рассмотрим ключевые аспекты веб-дизайна, которые
                  </p>
                </div>
                <div class="flex gap-2 items-start">
                  <span class="w-full max-w-12 text-xs font-medium text-[#007AFF] leading-3 pt-1">01:30</span>
                  <p class="text-base text-[#020203] font-normal">
                    Веб-дизайн — это не просто создание красивых страниц...
                  </p>
                </div>
              </div>
              
              <div class="w-full max-w-80 p-0.5 bg-[#EDEDED1A] rounded-full flex overflow-hidden self-center">
                <div class="flex-1 p-3 bg-white rounded-full shadow-[0px_0px_1px_0px_rgba(2,2,3,0.10)] shadow-[0px_1px_1px_0px_rgba(2,2,3,0.05)] shadow-[0px_2px_2px_0px_rgba(2,2,3,0.03)] shadow-[0px_4px_2px_0px_rgба(2,2,3,0.01)] flex justify-center items-center">
                  <div class="text-center text-[#020203] text-sm font-medium leading-3">Весь звонок</div>
                </div>
                <div class="flex-1 p-3 flex justify-center items-center">
                  <div class="text-center text-[#3C3C43B2] text-sm font-medium leading-3">Только важное</div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div> 
</template>

<script setup>
const route = useRoute()
const router = useRouter()
const { id } = route.params

import { useRouter, useRoute} from '#app'
import Header from '../../components/profile/Header.vue'
import Sidebar from '../../components/profile/sidebar/Sidebar.vue'
import sectionIcon from '../../src/assets/icons/profile/mentors/call.svg'
import callImage from '../../src/assets/img/mentor/calls/calls.png'
import avatar from '../../src/assets/img/mentor/calls/Avatars.png'
import imgGood from '../../src/assets/img/mentor/calls/calls.png'
import iconSend from '../../src/assets/icons/mentor/calls/arrow-redo.svg'
import iconCopy from '../../src/assets/icons/mentor/calls/copy.svg'
import iconVideo from '../../src/assets/icons/mentor/calendar/video-camera.svg'
import iconTime from '../../src/assets/icons/mentor/calendar/video-camera2.svg'
import iconPlay from '../../src/assets/icons/mentor/calls/play.svg'
import iconVolume from '../../src/assets/icons/mentor/calls/volume-high.svg'
import iconScreen from '../../src/assets/icons/mentor/calls/scan.svg'
import iconEdit from '../../src/assets/icons/profile/header/pencil.svg'
import iconStar from '../../src/assets/icons/mentor/calls/star.svg'
import iconBack from '../../src/assets/icons/mentor/arrow-back.svg'

const call = ref({
  id: 1,
  title: 'Оптимизация handoff в разработке продукта',
  author: 'Даниил Ерошов',
  date: '22.03.2025',
  duration: '53:02',
  img: callImage
})

useHead({
  title: `Звонок: ${call.value.title}`
})

function goBack() {
  router.back()
}
</script>
