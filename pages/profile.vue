<template>
  <div class="max-w-[1440px] w-full pr-48 bg-Backgrounds-Neutral-Primary inline-flex justify-start items-start gap-12 overflow-hidden">
    <Sidebar />
    
    <div class="flex-1 pt-4 pb-12 inline-flex flex-col justify-start items-start gap-9">
      <Header :user="user"
      sectionTitle="Профиль"
      :sectionIcon="sectionIcon"/>

      <div class="w-full flex flex-col items-start">
      <div class="w-full h-48 px-24 py-12 relative rounded-3xl outline outline-1 outline-offset-[-0.5px] outline-[#D0D0D0]/10 flex flex-col justify-center items-center gap-6 overflow-hidden z-0">
        <img src="../src/assets/img/profile/BG-Vector.svg" alt="BG Vector" class="w-[2002px] h-[2002px] absolute top-[-700.33px] object-fill z-0 pointer-events-none" />
      </div>
      <div class="w-full flex flex-col items-center gap-4 mt-[-78px] z-10">
        <div class="w-24 h-24 relative rounded-full overflow-hidden">
          <div class="absolute inset-0 bg-[#3E87FF] mix-blend-hue rounded-full"></div>
          <img :src="avatar" alt="Avatar" class="absolute left-0 top-0 w-[96px] h-[93px] z-10" />
          <div class="absolute inset-0 mix-blend-color bg-[#3E87FF] rounded-full"></div>
        </div>
        <div class="text-[#020203] text-5xl font-medium leading-[48px]">Антон Рязанов</div>
        <button class="px-4 py-3 rounded-2xl outline outline-1 outline-offset-[-1px] outline-[#D0D0D0]/10 flex items-center gap-2">
          <img :src="editIcon" alt="Edit" class="w-5 h-5" />
          <span class="text-base font-medium text-[#020203] leading-normal">Настроить профиль</span>
        </button>
      </div>
    </div>
      
      <div class="self-stretch inline-flex justify-start items-start gap-6 flex-wrap content-start">
        <div class="flex-1 inline-flex flex-col justify-center items-start gap-6">
          <Skills :skills="user.skills" :score="user.score" />
        </div>
        <div class="w-72 inline-flex flex-col justify-start items-start gap-6">
          <Activity :activity="user.activity" :stats="user.stats" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import avatar from '../../src/assets/icons/profile/header/Avatar.png'
import editIcon from '../../src/assets/icons/profile/header/pencil.svg'
import sectionIcon from '../src/assets/icons/profile/header/person.svg'
import Sidebar from '@/components/profile/sidebar/Sidebar.vue'
import Header from '@/components/profile/Header.vue'
import Skills from '@/components/profile/Skills.vue'
import Activity from '@/components/profile/Activity.vue'

const user = {
  name: 'Антон Рязанов',
  score: {
    current: 36,
    max: 90
  },
  skills: [
    { name: 'Насмотренность', value: 3 },
    { name: 'Работа с UI', value: 5 },
    { name: 'Работа с UX', value: 3 },
    { name: 'Продукт', value: 4 },
    { name: 'Команда', value: 2 },
    { name: 'Инструменты', value: 4 }
  ],
  courses: [
    'Основы User Interface',
    'Основы User Experience',
    'Основы Design Research'
  ],
  certificates: [
    'Продуктовый дизайнер',
    'Исследователь',
    'Визуальный дизайнер'
  ],
  activity: {
    курсов: 10,
    часов: 15,
    сертификатов: 2,
    звонков: 7
  },
  stats: {
    звёзд: 10,
    лига: 'Бронза',
    стрик: 0,
    топСтрик: 10
  }
}
</script>
