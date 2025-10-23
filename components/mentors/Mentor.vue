<template>
  <div class="w-full inline-flex justify-start items-start gap-11 pr-[47px]">
    <div class="flex justify-end items-center">
      <div class="p-4 bg-Backgrounds-Neutral-Grouped-Secondary rounded-[32px] outline outline-1 outline-offset-[-1px] outline-[#7878801a] flex justify-start items-center gap-9 overflow-hidden">
       
        <div class="flex justify-start items-center gap-3">
          <div class="w-12 h-12 relative rounded-full overflow-hidden">
            <div class="w-12 h-12 absolute left-0 top-0 bg-[#FF3030] rounded-full mix-blend-hue"></div>
            <div class="absolute left-0 top-0">
              <img :src="mentorIcon" alt="avatar" class="w-12 h-12" />
            </div>
          </div>
          <div class="flex flex-col items-start gap-1">
            <div class="text-base font-medium text-[#020203]">{{ name }}</div>
            <div class="text-sm font-medium text-[#3C3C43B3] leading-3">{{ subtitle }}</div>
          </div>
        </div>

        
        <div class="flex items-center gap-2">
          <div class="p-3 bg-[#D1D1D6]/10 rounded-2xl flex justify-center items-center overflow-hidden">
            <button class="px-2 flex items-center gap-2">
              <img :src="profileIcon" alt="person" class="w-6 h-6" />
              <span class="text-base font-medium text-[#020203]">Профиль</span>
            </button>
          </div>

          <button class="p-3 rounded-2xl outline outline-1 outline-offset-[-1px] outline-[#7878801a] flex justify-center items-center overflow-hidden">
            <img :src="syncIcon" alt="settings" class="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import mentorIcon from '../../src/assets/icons/mentor/Avatar.png'
import syncIcon from '../../src/assets/icons/mentor/sync.svg'
import profileIcon from '../../src/assets/icons/mentor/person.svg'

defineProps({
  name: {
    type: String,
    default: 'Даниил Ерошов'
  },
  subtitle: {
    type: String,
    default: 'Ваш ментор'
  }
})
</script>

<style scoped>
</style>
