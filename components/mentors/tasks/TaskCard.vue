<template>
  <NuxtLink
    :to="`/tasks/${id}`"
    class="w-full p-6 bg-Backgrounds-Neutral-Grouped-Secondary rounded-2xl outline outline-1 outline-offset-[-1px] outline-[#7878801a] flex flex-col gap-3 min-w-0"
  >
    <div class="flex flex-col gap-2 min-w-0">
      <h3 class="text-Labels-Neutral-Primary text-xl font-medium leading-tight break-words hyphens-auto line-clamp-2">
        {{ title }}
      </h3>
      
      <p class="text-Labels-Neutral-Secondary/70 text-base leading-normal overflow-hidden break-words line-clamp-2">
        {{ description }}
      </p>
    </div>

    <p class="text-Labels-Neutral-Secondary/70 text-base leading-normal mt-auto mb-1">
      {{ info }}
    </p>
  </NuxtLink>
</template>

<script setup>
defineProps({
  id:   { type: String, required: true },
  title:{ type: String, required: true },
  description:{ type: String, required: true },
  info: { type: String, required: true },
})
</script>
