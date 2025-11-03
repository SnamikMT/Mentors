<template>
  <NuxtLayout name="app">
    <div class="pb-24 lg:pb-28"><!-- нижний запас локально -->
      <!-- Десктопный заголовок -->
      <Header
        class="hidden lg:block mb-6"
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
  </NuxtLayout>
</template>

<script setup>
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

<style scoped>
/* Мягкая адаптация сетки карточек, если в TasksSection есть .tasks-grid */
:deep(.tasks-grid){
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
}
@media (min-width: 640px){
  :deep(.tasks-grid){ grid-template-columns: 1fr 1fr; gap: 16px; }
}
@media (min-width: 1024px){
  :deep(.tasks-grid){ grid-template-columns: 1fr 1fr 1fr; gap: 20px; }
}
</style>
