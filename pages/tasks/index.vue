<template>
  <div class="w-full max-w-[1440px] pr-48 bg-Backgrounds-Neutral-Primary inline-flex justify-start items-start gap-12 overflow-hidden">
    <Sidebar />
    <div class="flex-1 pt-4 pl-[48px] flex flex-col gap-[16px]">
      <Header sectionTitle="Задания от ментора"
      :sectionIcon="sectionIcon"/>
      <div class="mt-[16px] flex flex-col gap-[24px]">
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
</template>

<script setup>
import Sidebar from '../components/profile/sidebar/Sidebar.vue'
import Header from '../components/profile/Header.vue'
import sectionIcon from '../../src/assets/icons/mentor/tasks/golf.svg'
import TasksSection from '../../components/mentors/tasks/TasksSection.vue'
import iconActive   from '../../src/assets/icons/mentor/tasks/alert-circle.svg'
import iconReview   from '../../src/assets/icons/mentor/tasks/time.svg'
import iconVerified from '../../src/assets/icons/mentor/tasks/checkmark-circle.svg'


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