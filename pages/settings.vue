<template>
  <!-- Мобилка: столбец; ≥lg: Sidebar + контент -->
  <div
    class="w-full max-w-[1440px] bg-Backgrounds-Neutral-Primary flex flex-col lg:flex-row items-stretch gap-0 lg:gap-12 overflow-hidden"
  >
    <!-- Sidebar только на ≥lg -->
    <Sidebar class="hidden lg:flex" />

    <!-- Контент + шапки -->
    <div class="flex-1 pt-4 pb-12 flex flex-col">
      <!-- Моб. хедер -->
      <MobileHeader class="lg:hidden px-4 sm:px-6" />

      <!-- Хедер страницы -->
      <div class="px-4 sm:px-6 lg:px-0">
        <Header
          class="mb-6 lg:mb-9"
          sectionTitle="Настройки"
          :sectionIcon="sectionIcon"
        />
      </div>

      <!-- Сетка карточек: 1 колонка на мобилке, 2 на ≥lg -->
      <div class="w-full px-4 sm:px-6 lg:px-0">
        <div
          class="mx-auto w-full max-w-[1008px] grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          <ProfileSettings />
          <InterfaceSettings />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Sidebar from '@/components/profile/sidebar/Sidebar.vue'
import MobileHeader from '@/components/profile/header/MobileHeader.vue'
import Header from '@/components/profile/Header.vue'

import sectionIcon from '@/src/assets/icons/profile/header/drop-down/settings.svg'

import ProfileSettings from '@/components/profile/settings/ProfileSettings.vue'
import InterfaceSettings from '@/components/profile/settings/InterfaceSettings.vue'
</script>
