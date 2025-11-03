<template>
  <section class="flex flex-col gap-6 w-full">
    <!-- заголовок с линиями -->
<!-- заголовок с короткой левой линией (16px), отступом 8px и продолжением справа -->
<div class="w-full flex items-center">
  <!-- левая палочка 16px -->
  <div class="w-4 h-px" style="background:rgba(120,120,128,0.16)"></div>

  <!-- зазор 8px -->
  <div class="w-2"></div>

  <!-- сам заголовок; фон «затирает» линию под ним -->
  <h2
    class="px-2 sm:px-3
           text-[22px] sm:text-[24px] lg:text-[32px]
           font-medium leading-tight
           text-Labels-Neutral-Primary
           bg-Backgrounds-Neutral-Primary"
  >
    {{ title }}
  </h2>

  <!-- линия после заголовка до конца -->
  <div class="flex-1 h-px" style="background:rgba(120,120,128,0.16)"></div>
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
