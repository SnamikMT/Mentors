<template>
  <NuxtLayout name="app">
    <!-- Десктопный заголовок -->
    <Header
      class="hidden lg:block mb-6"
      sectionTitle="История звонков"
      :sectionIcon="sectionIcon"
    />

    <!-- Мобильный мини-заголовок -->
    <div class="lg:hidden flex items-center gap-2 mb-4">
      <img :src="sectionIcon" alt="" class="w-5 h-5" />
      <span class="text-base font-medium text-[#020203] leading-normal">
        История звонков
      </span>
    </div>

    <!-- Поиск -->
    <div class="mb-8">
      <SearchInput class="w-full" />
    </div>

    <!-- Секции со звонками -->
    <div class="flex flex-col gap-9 lg:gap-[36px]">
      <CallSection title="Март, 2025" :calls="marchCalls" />
      <CallSection title="Февраль, 2025" :calls="februaryCalls" />
    </div>
  </NuxtLayout>
</template>

<script setup>
import Header from '@/components/profile/Header.vue'
import SearchInput from '@/components/mentors/calls/SearchInput.vue'
import CallSection from '@/components/mentors/calls/CallSection.vue'
import sectionIcon from '@/src/assets/icons/profile/mentors/call.svg'
import callImage from '@/src/assets/img/mentor/calls/calls.png'

useHead(() => ({ title: 'История звонков' }))

const mockCall = {
  title: 'Оптимизация handoff в разработке продукта',
  author: 'Даниил Ерошов',
  date: '22.03.2025',
  duration: '53:02',
  img: callImage
}

const marchCalls = Array(9).fill(null).map((_, i) => ({
  ...mockCall,
  id: `march-${i + 1}`
}))

const februaryCalls = Array(6).fill(null).map((_, i) => ({
  ...mockCall,
  id: `february-${i + 1}`,
  date: '22.02.2025'
}))
</script>

<style scoped>
/* Мягкая адаптивная сетка карточек, если внутри CallSection задан класс .call-grid */
:deep(.call-grid){
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
}
@media (min-width: 640px){
  :deep(.call-grid){ grid-template-columns: 1fr 1fr; gap: 16px; }
}
@media (min-width: 1024px){
  :deep(.call-grid){ grid-template-columns: 1fr 1fr 1fr; gap: 20px; }
}
</style>
