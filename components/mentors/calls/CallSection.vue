<template>
  <section class="flex flex-col gap-6 w-full">
    <!-- заголовок с линиями -->
    <div class="flex items-center gap-2 w-full">
      <div class="w-4 h-px bg-Border-Neutral-Base/10" />
      <h2 class="text-[22px] sm:text-[24px] lg:text-3xl font-medium leading-tight text-Labels-Neutral-Primary">
        {{ title }}
      </h2>
      <div class="flex-1 h-px bg-Border-Neutral-Base/10" />
    </div>

    <!-- адаптивная сетка: 1 / 2 / 3 -->
    <div class="call-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 lg:gap-6">
      <CallCard
        v-for="(call, idx) in calls"
        :key="call.id ?? idx"
        v-bind="call"
      />
    </div>
  </section>
</template>

<script setup>
import CallCard from './CallCard.vue'

defineProps({
  title: { type: String, required: true },
  calls: { type: Array,  required: true }
})
</script>
