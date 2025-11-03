<template>
  <NuxtLayout name="app">
    <!-- ВЕРХНИЙ БЛОК -->
    <div class="flex flex-col lg:flex-row items-start gap-4 sm:gap-6 lg:gap-8 mb-6 lg:mb-8">
      <div class="flex-1">
        <h1 class="text-[#101012] font-medium tracking-[-1px]
                   text-[28px] leading-[32px]
                   sm:text-[36px] sm:leading-[40px]
                   lg:text-[48px] lg:leading-[48px]">
          Давай выберем<br class="hidden sm:block" />
          нового ментора
        </h1>
      </div>

      <div
        class="w-full lg:w-[436px] rounded-[16px] border border-[#000]/10 bg-white p-4 sm:p-6
               grid grid-cols-1 sm:grid-cols-[120px,1fr] gap-4 items-center"
      >
        <video
          :src="autoPickVideo"
          :poster="autoPickPoster"
          class="h-[140px] sm:h-[112px] w-full sm:w-[120px] rounded-md object-cover"
          autoplay muted loop playsinline preload="metadata"
        />
        <div class="flex flex-col gap-3">
          <div class="text-[#101012] font-medium text-[20px] leading-[24px] [letter-spacing:-0.5px] sm:text-[24px]">
            Я не знаю, какого<br class="hidden sm:block"/> ментора мне выбрать
          </div>
          <button
            type="button"
            class="inline-flex items-center justify-center h-10 px-4 w-full sm:w-[226px] rounded-full font-medium text-[16px] leading-[24px] text-[#007AFF]"
            style="background: rgba(0,122,255,0.12);"
          >
            Выбрать автоматически
          </button>
        </div>
      </div>
    </div>

    <!-- ФИЛЬТРЫ + ПОИСК -->
    <div class="mt-6 sm:mt-9 mb-6 sm:mb-9">
      <div class="flex flex-col sm:flex-row gap-3 sm:gap-2">
        <div class="sm:flex-1">
          <div class="sm:hidden -mx-4 px-4 overflow-x-auto whitespace-nowrap no-scrollbar">
            <button class="chip mr-2">Направление</button>
            <button class="chip mr-2">Компания</button>
            <button class="chip mr-2">Цель</button>
            <button class="chip">Уровень ментора</button>
          </div>
          <div class="hidden sm:flex seg-group h-12">
            <button class="seg-btn"><span>Направление</span><img :src="chevronDown" class="w-4 h-4 opacity-70" alt=""></button>
            <button class="seg-btn"><span>Компания</span><img :src="chevronDown" class="w-4 h-4 opacity-70" alt=""></button>
            <button class="seg-btn"><span>Цель</span><img :src="chevronDown" class="w-4 h-4 opacity-70" alt=""></button>
            <button class="seg-btn"><span>Уровень ментора</span><img :src="chevronDown" class="w-4 h-4 opacity-70" alt=""></button>
          </div>
        </div>

        <div class="h-12 sm:ml-2 w-full sm:w-[387px]">
          <label class="sr-only" for="mentor-search">Найти ментора</label>
          <div class="search-wrap">
            <img :src="searchIcon" class="w-4 h-4 opacity-60" alt="">
            <input id="mentor-search" v-model="query" type="text" placeholder="Найти ментора" class="search-input" />
          </div>
        </div>
      </div>
    </div>

    <!-- СЕТКА -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 pb-24 lg:pb-28">
      <MentorCard v-for="m in fourMentors" :key="m.id" :mentor="m" @open="openMentor(m.id)" />
    </div>
  </NuxtLayout>
</template>

<script setup>
import { ref, computed } from 'vue'
import MentorCard from '@/components/mentors/MentorCard.vue'
import searchIcon from '@/src/assets/icons/profile/header/search.svg'
import chevronDown from '@/src/assets/icons/profile/header/chevron-down.svg'
import autoPickVideo from '@/src/assets/video/auto-pick.mp4'
import autoPickPoster from '@/src/assets/img/mentor/auto-pick-poster.jpg'
import avatar from '@/src/assets/img/mentor/avatarmentor.jpg'
import shot1  from '@/src/assets/img/mentor/phone.png'
import shot2  from '@/src/assets/img/mentor/phone.png'
import shot3  from '@/src/assets/img/mentor/phone.png'

const query = ref('')
const mentors = ref([
  { id:'m1', levelBadge:{text:'Может подойти',color:'#8E8E93'}, expBadge:{text:'5+ лет в профессии',color:'#101012'}, name:'Имя Фамилия', role:'Старший продуктовый дизайнер\nв T-bank, ex. Orchestra, Sberbank, etc.', price:'3 900 ₽', duration:'50 минут', tagsPrimary:['Продуктовый дизайн'], tagsSecondary:['Работа с визуалом','Исследования','Аналитика'], avatar, works:[shot1,shot2,shot3] },
  { id:'m2', levelBadge:{text:'Опытный ментор',color:'#5856D6'}, expBadge:{text:'5+ лет в професссии',color:'#101012'}, name:'Имя Фамилия', role:'Старший продуктовый дизайнер\nв T-bank, ex. Orchestra, Sberbank, etc.', price:'3 900 ₽', duration:'50 минут', tagsPrimary:['Продуктовый дизайн'], tagsSecondary:['Работа с визуалом','Исследования','Аналитика'], avatar, works:[shot2,shot1,shot3] },
  { id:'m3', levelBadge:{text:'Опытный ментор',color:'#5856D6'}, expBadge:{text:'5+ лет в професссии',color:'#101012'}, name:'Имя Фамилия', role:'Старший продуктовый дизайнер\nв T-bank, ex. Orchestra, Sberbank, etc.', price:'3 900 ₽', duration:'50 минут', tagsPrimary:['Продуктовый дизайн'], tagsSecondary:['Работа с визуалом','Исследования','Аналитика'], avatar, works:[shot3,shot1,shot2] },
  { id:'m4', levelBadge:{text:'Может подойти',color:'#8E8E93'}, expBadge:{text:'5+ лет в професссии',color:'#101012'}, name:'Имя Фамилия', role:'Старший продуктовый дизайнер\nв T-bank, ex. Orchestra, Sberbank, etc.', price:'3 900 ₽', duration:'50 минут', tagsPrimary:['Продуктовый дизайн'], tagsSecondary:['Работа с визуалом','Исследования','Аналитика'], avatar, works:[shot1,shot3,shot2] },
])

const fourMentors = computed(() => {
  const q = query.value.trim().toLowerCase()
  const list = !q
    ? mentors.value
    : mentors.value.filter(m =>
        m.name.toLowerCase().includes(q) ||
        m.role.toLowerCase().includes(q)
      )
  return list.slice(0, 4)
})

function openMentor(id) {
  console.log('open mentor', id)
}
</script>

<style scoped>
.chip{ @apply inline-flex items-center h-10 px-4 rounded-full bg-white border text-[#101012] text-[16px] leading-[24px] tracking-[-0.25px]; border-color: rgba(120,120,128,0.16); }
.no-scrollbar::-webkit-scrollbar{ display:none; } .no-scrollbar{ -ms-overflow-style:none; scrollbar-width:none; }
.seg-group{ @apply w-full rounded-[12px] border bg-white flex overflow-hidden; border-color: rgba(120,120,128,0.16); }
.seg-btn{ @apply flex-1 h-12 px-4 inline-flex items-center justify-between gap-2 text-[16px] leading-[24px] tracking-[-0.25px] text-[#101012] select-none; }
.search-wrap{ @apply h-12 w-full rounded-[12px] border bg-white flex items-center gap-2 px-3; border-color: rgba(120,120,128,0.16); }
.search-input{ @apply w-full outline-none text-[16px] leading-[24px] tracking-[-0.25px] placeholder-black/40; }
</style>
