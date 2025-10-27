<template>
  <!-- Мобильная колонка; на десктопе — сайдбар + контент -->
  <div
    class="w-full max-w-[1440px] mx-auto bg-Backgrounds-Neutral-Primary flex flex-col lg:flex-row gap-0 lg:gap-12 overflow-hidden"
  >
    <!-- Sidebar только ≥lg -->
    <Sidebar class="hidden lg:flex shrink-0" />

    <!-- Мобильный Header только <lg -->
    <MobileHeader class="lg:hidden" />

    <!-- Контент -->
    <div class="flex-1 w-full">
      <!-- Внутренний контейнер: центрируем, 1008 на десктопе -->
      <div class="mx-auto w-full max-w-[1008px] px-4 sm:px-6 lg:px-12 py-4 lg:py-8">
        <!-- Заголовок/хлебные на десктопе -->
        <Header
          class="hidden lg:block mb-4"
          sectionTitle="Задания от ментора"
          :sectionIcon="sectionIcon"
        />

        <!-- Мобильный заголовок -->
        <div class="lg:hidden mb-4">
          <div class="text-[22px] leading-[28px] font-medium text-[#101012]">
            Задания от ментора
          </div>
        </div>

        <!-- Секции задач -->
        <div class="flex flex-col gap-6 lg:gap-8">
          <TasksSection
            label="Активные"
            theme="orange"
            :icon="iconActive"
            :items="activeTasks"
          />

          <TasksSection
            label="На проверке"
            theme="blue"
            :icon="iconReview"
            :items="reviewTasks"
          />

          <TasksSection
            label="Проверенные"
            theme="green"
            :icon="iconVerified"
            :items="verifiedTasks"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Sidebar from '@/components/profile/sidebar/Sidebar.vue'
import MobileHeader from '@/components/profile/header/MobileHeader.vue'
import Header from '@/components/profile/Header.vue'
import TasksSection from '@/components/mentors/tasks/TasksSection.vue'

import sectionIcon   from '@/src/assets/icons/mentor/tasks/golf.svg'
import iconActive    from '@/src/assets/icons/mentor/tasks/alert-circle.svg'
import iconReview    from '@/src/assets/icons/mentor/tasks/time.svg'
import iconVerified  from '@/src/assets/icons/mentor/tasks/checkmark-circle.svg'

const baseDesc =
  'Knitted knitted bludger owl bludger cabbage in horseless. Unicorn above hearing turban stroke treats love.'
const baseInfo = '#3912 · вчера'

const activeTasks = [
  { title: 'Сделать дизайн-концепцию', description: baseDesc, info: baseInfo },
  { title: 'Подготовить бриф',          description: baseDesc, info: baseInfo },
  { title: 'Сверстать первый экран',    description: baseDesc, info: baseInfo }
]

const reviewTasks = [
  { title: 'UX-флоу регистрации',       description: baseDesc, info: baseInfo },
  { title: 'Онбординг-скрины',          description: baseDesc, info: baseInfo },
  { title: 'Стили и токены',            description: baseDesc, info: baseInfo }
]

const verifiedTasks = [
  { title: 'UI-кит базовый',            description: baseDesc, info: baseInfo },
  { title: 'Иконки и иллюстрации',      description: baseDesc, info: baseInfo },
  { title: 'Карточки курсов',           description: baseDesc, info: baseInfo }
]
</script>
