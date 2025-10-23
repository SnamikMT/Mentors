<template>
  <div class="w-full max-w-[1440px] pr-48 bg-Backgrounds-Neutral-Primary inline-flex justify-start items-start gap-12 overflow-hidden">
    <Sidebar />
    <div class="flex-1 pt-4 pl-[48px] flex flex-col gap-[16px]">
      <Header sectionTitle="История звонков" :sectionIcon="sectionIcon"/>
      <SearchInput />
      <div class="flex flex-col gap-[36px]">
        <CallSection title="Март, 2025" :calls="marchCalls" />
        <CallSection title="Февраль, 2025" :calls="februaryCalls" />
      </div>
    </div>
  </div>
</template>

<script setup>
import Sidebar from '../components/profile/sidebar/Sidebar.vue'
import Header from '../components/profile/Header.vue'
import SearchInput from '../components/mentors/calls/SearchInput.vue'
import CallSection from '../components/mentors/calls/CallSection.vue'
import sectionIcon from '../src/assets/icons/profile/mentors/call.svg'
import callImage from '../src/assets/img/mentor/calls/calls.png'

const mockCall = {
  title: 'Оптимизация handoff в разработке продукта',
  author: 'Даниил Ерошов',
  date: '22.03.2025',
  duration: '53:02',
  img: callImage
}

const marchCalls = Array(9).fill(null).map((_, i) => ({
  ...mockCall,
  id: `march-${i+1}`
}))

const februaryCalls = Array(3).fill(null).map((_, i) => ({
  ...mockCall,
  id: `february-${i+1}`,
  date: '22.02.2025'
}))
</script>
