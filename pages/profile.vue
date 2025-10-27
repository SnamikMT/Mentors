<template>
  <!-- Мобилка: столбец; Десктоп: две колонки -->
  <div class="w-full max-w-[1440px] bg-Backgrounds-Neutral-Primary flex flex-col lg:flex-row gap-0 lg:gap-12 overflow-hidden">
    <!-- Sidebar только ≥lg -->
    <Sidebar class="hidden lg:flex" />

    <!-- Контент -->
    <div class="w-full lg:max-w-[1008px] px-4 sm:px-6 lg:pl-[48px] lg:pr-12 pt-4 lg:pt-6 flex flex-col gap-6">

      <!-- Десктопный Header-компонент -->
      <Header
        class="hidden lg:block"
        :user="user"
        sectionTitle="Профиль"
        :sectionIcon="sectionIcon"
      />

      <!-- Мобильная шапка: аватар, имя, кнопка -->
      <div class="lg:hidden w-full">
        <!-- фон-плашка -->
        <div
          class="relative h-40 rounded-3xl border border-[#D0D0D0]/10 overflow-hidden"
          aria-hidden="true"
        >
          <img
            src="../src/assets/img/profile/BG-Vector.svg"
            alt=""
            class="absolute inset-0 w-[1400px] max-w-none -top-[540px] left-1/2 -translate-x-1/2 pointer-events-none"
          />
        </div>

        <!-- аватар + имя + кнопка -->
        <div class="-mt-12 w-full flex flex-col items-center gap-4">
          <div class="relative size-24 rounded-full overflow-hidden">
            <div class="absolute inset-0 bg-[#3E87FF] mix-blend-hue rounded-full"></div>
            <img :src="avatar" alt="Avatar" class="absolute inset-0 w-full h-full object-cover z-10" />
            <div class="absolute inset-0 mix-blend-color bg-[#3E87FF] rounded-full"></div>
          </div>

          <div class="text-[#020203] text-2xl sm:text-3xl lg:text-5xl font-medium leading-snug text-center">
            {{ user.name }}
          </div>

          <button
            class="px-4 py-3 rounded-2xl border border-[#D0D0D0]/10 inline-flex items-center gap-2 bg-white"
          >
            <img :src="editIcon" alt="" class="w-5 h-5" />
            <span class="text-base font-medium text-[#020203]">Настроить профиль</span>
          </button>
        </div>
      </div>

      <!-- ДЕСКТОПНАЯ шапка (фон/аватар/кнопка) как в макете -->
      <div class="hidden lg:block">
        <div class="relative h-48 rounded-3xl border border-[#D0D0D0]/10 overflow-hidden">
          <img
            src="../src/assets/img/profile/BG-Vector.svg"
            alt="BG Vector"
            class="absolute top-[-700px] left-1/2 -translate-x-1/2 w-[2002px] pointer-events-none"
          />
        </div>
        <div class="-mt-[78px] w-full flex flex-col items-center gap-4">
          <div class="relative size-24 rounded-full overflow-hidden">
            <div class="absolute inset-0 bg-[#3E87FF] mix-blend-hue rounded-full"></div>
            <img :src="avatar" alt="Avatar" class="absolute inset-0 w-[96px] h-[96px] object-cover z-10" />
            <div class="absolute inset-0 mix-blend-color bg-[#3E87FF] rounded-full"></div>
          </div>
          <div class="text-[#020203] text-5xl font-medium leading-[48px]">{{ user.name }}</div>
          <button
            class="px-4 py-3 rounded-2xl border border-[#D0D0D0]/10 inline-flex items-center gap-2 bg-white"
          >
            <img :src="editIcon" alt="" class="w-5 h-5" />
            <span class="text-base font-medium text-[#020203]">Настроить профиль</span>
          </button>
        </div>
      </div>

      <!-- Контент: слева Skills (растягивается), справа Activity (фикс ширина на десктопе) -->
      <div class="w-full flex flex-col-reverse lg:flex-row gap-6">
        <!-- Левая колонка -->
        <div class="w-full lg:flex-1">
          <Skills :skills="user.skills" :score="user.score" />
        </div>

        <!-- Правая колонка -->
        <div class="w-full lg:w-72 shrink-0">
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
  score: { current: 36, max: 90 },
  skills: [
    { name: 'Насмотренность', value: 3 },
    { name: 'Работа с UI', value: 5 },
    { name: 'Работа с UX', value: 3 },
    { name: 'Продукт', value: 4 },
    { name: 'Команда', value: 2 },
    { name: 'Инструменты', value: 4 }
  ],
  courses: ['Основы User Interface', 'Основы User Experience', 'Основы Design Research'],
  certificates: ['Продуктовый дизайнер', 'Исследователь', 'Визуальный дизайнер'],
  activity: { курсов: 10, часов: 15, сертификатов: 2, звонков: 7 },
  stats: { звёзд: 10, лига: 'Бронза', стрик: 0, топСтрик: 10 }
}
</script>
