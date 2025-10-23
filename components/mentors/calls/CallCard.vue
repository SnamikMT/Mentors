<template>
  <NuxtLink 
    :to="`/calls/${id}`"
    class="relative rounded-2xl overflow-hidden border outline outline-1 outline-offset-[-1px] outline-[#7878801a]
           flex flex-col cursor-pointer hover:shadow-md transition-shadow block w-full"
  >
    <img :src="img" class="w-full h-48 object-cover" />
    
    <div class="absolute top-3 right-3 p-2 bg-black/20 rounded-xl backdrop-blur-3xl flex items-center justify-center">
      <span class="text-xs font-medium text-white">{{ duration }}</span>
    </div>

    <div class="p-6 bg-Backgrounds-Neutral-Grouped-Secondary border-t border-Border-Neutral-Base/10 flex flex-col gap-3 min-w-0">
      <!-- мера строки: не шире 36 символов, но текст переносится полностью -->
      <div class="w-full max-w-[36ch] min-w-0">
        <h3 class="text-xl font-medium leading-tight text-Labels-Neutral-Primary break-words hyphens-auto">
          {{ title }}
        </h3>
      </div>

      <div class="w-full max-w-[36ch] min-w-0">
        <p class="text-base text-Labels-Neutral-Secondary/70 font-normal leading-normal break-words">
          {{ author }} · {{ date }}
        </p>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup>
defineProps({
  id: { type: String, required: true },
  title: String,
  author: String,
  date: String,
  duration: String,
  img: String
})
</script>
