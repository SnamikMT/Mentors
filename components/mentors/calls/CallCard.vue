<template>
  <NuxtLink
    :to="`/calls/${id}`"
    class="block w-full rounded-2xl overflow-hidden border outline outline-1 outline-offset-[-1px] outline-[#7878801a]
           bg-Backgrounds-Neutral-Grouped-Secondary hover:shadow-md transition-shadow"
    :aria-label="title"
  >
    <!-- превью 16:9 -->
    <div class="relative w-full bg-black">
      <img :src="img" class="w-full aspect-[16/9] object-cover" alt="" />

      <div class="absolute top-2 right-2 px-2 py-1 rounded-xl bg-black/45 backdrop-blur-sm">
        <span class="text-xs font-medium text-white leading-none">{{ duration }}</span>
      </div>
    </div>

    <div class="p-4 sm:p-5 lg:p-6 border-t border-Border-Neutral-Base/10">
      <h3
        class="text-[#101012] text-base sm:text-[17px] lg:text-xl font-medium leading-snug line-clamp-3"
        :title="title"
      >
        {{ title }}
      </h3>

      <p class="mt-2 text-sm sm:text-base text-Labels-Neutral-Secondary/70">
        {{ author }} · {{ date }}
      </p>
    </div>
  </NuxtLink>
</template>

<script setup>
defineProps({
  id:       { type: String, required: true },
  title:    { type: String, default: '' },
  author:   { type: String, default: '' },
  date:     { type: String, default: '' },
  duration: { type: String, default: '' },
  img:      { type: String, default: '' }
})
</script>
