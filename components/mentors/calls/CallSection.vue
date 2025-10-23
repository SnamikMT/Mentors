<template>
  <div class="flex flex-col gap-[36px] w-full">
    <div class="flex items-center gap-2 w-full">
      <div class="w-full max-w-4 h-px bg-Border-Neutral-Base/10" />
      <h2 class="text-3xl font-medium leading-loose text-Labels-Neutral-Primary">{{ title }}</h2>
      <div class="flex-1 h-px bg-Border-Neutral-Base/10" />
    </div>
    
    <!-- gap 24px как в макете -->
    <div class="grid grid-cols-3 gap-6">
      <CallCard
        v-for="(call, idx) in calls"
        :key="idx"
        v-bind="call"
      />
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  calls: Array
})
import CallCard from './CallCard.vue'
</script>
