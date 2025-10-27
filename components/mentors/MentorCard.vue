<template>
  <article class="rounded-[20px] border border-black/10 bg-white overflow-hidden shadow-sm flex flex-col">
    <!-- бейджи -->
    <div class="p-4 md:p-5">
      <div class="flex items-center gap-2 mb-3">
        <span class="inline-flex h-7 items-center px-3 rounded-full text-[13px] font-medium text-white"
              :style="{ background: mentor.levelBadge.color }">
          {{ mentor.levelBadge.text }}
        </span>
        <span class="inline-flex h-7 items-center px-3 rounded-full text-[13px] font-medium text-white"
              :style="{ background: mentor.expBadge.color }">
          {{ mentor.expBadge.text }}
        </span>
      </div>

      <!-- имя/роль -->
      <div class="flex gap-3 items-start">
        <img :src="mentor.avatar" class="w-10 h-10 rounded-full object-cover mt-0.5" alt="" />
        <div class="flex-1">
          <div class="text-[18px] leading-[20px] font-semibold text-[#101012]">
            {{ mentor.name }}
          </div>
          <div class="mt-1 whitespace-pre-line text-[14px] leading-[20px] text-black/70">
            {{ mentor.role }}
          </div>
        </div>
      </div>

      <!-- чипы -->
      <div class="mt-3 flex flex-wrap gap-2">
        <div class="icon-chip">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7H14a3.5 3.5 0 0 1 0 7H6" stroke-width="2" stroke-linecap="round"/>
          </svg>
          <span>{{ mentor.price }}</span>
        </div>
        <div class="icon-chip">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="12" cy="12" r="9" stroke-width="2"/>
            <path d="M12 7v5l3 2" stroke-width="2" stroke-linecap="round"/>
          </svg>
          <span>{{ mentor.duration }}</span>
        </div>
        <span class="pill">{{ mentor.tagsPrimary[0] }}</span>
      </div>

      <div class="mt-2 flex flex-wrap gap-2">
        <span v-for="t in mentor.tagsSecondary" :key="t" class="pill pill--soft">{{ t }}</span>
      </div>
    </div>

    <!-- слайдер работ -->
    <div class="relative">
      <button class="absolute left-2 top-1/2 -translate-y-1/2 z-10 grid place-items-center h-8 w-8 rounded-full bg-white/80 shadow"
              @click.stop="prev" aria-label="prev">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M15 18 9 12l6-6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <button class="absolute right-2 top-1/2 -translate-y-1/2 z-10 grid place-items-center h-8 w-8 rounded-full bg-white/80 shadow"
              @click.stop="next" aria-label="next">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M9 6l6 6-6 6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>

      <div class="h-[220px] bg-[#F2F3F5]">
        <img :src="mentor.works[slide]" class="w-full h-full object-cover" :alt="mentor.name" />
      </div>

      <div class="py-2 grid place-items-center">
        <div class="inline-flex items-center gap-1.5 bg-white/80 rounded-full px-2 py-1">
          <span v-for="(w,i) in mentor.works" :key="i"
                class="h-1.5 rounded-full transition"
                :class="i===slide ? 'w-3 bg-[#101012]' : 'w-1.5 bg-black/30'"/>
        </div>
      </div>
    </div>

    <div class="p-4 pt-0">
      <button
        class="w-full h-11 rounded-[12px] border [border-color:rgba(120,120,128,0.16)] hover:bg-black/[0.02] transition text-[16px] font-medium"
        @click="$emit('open')"
      >
        Открыть профиль
      </button>
    </div>
  </article>
</template>

<script setup>
import { ref } from 'vue'
defineProps({ mentor: { type: Object, required: true } })
defineEmits(['open'])

const slide = ref(0)
const next = () => slide.value = (slide.value + 1) % (/** @type any */(getCurrentInstance()).props.mentor.works.length)
const prev = () => slide.value = (slide.value - 1 + (/** @type any */(getCurrentInstance()).props.mentor.works.length)) % (/** @type any */(getCurrentInstance()).props.mentor.works.length)
</script>

<style scoped>
.pill{
  @apply inline-flex items-center px-3 py-1 rounded-full bg-white text-[#101012] border;
  border-color: rgba(120,120,128,0.16);
  font-size:14px; line-height:20px; font-weight:500;
}
.pill--soft{ @apply bg-[#F7F8FA]; }
.icon-chip{
  @apply inline-flex items-center gap-2 h-9 px-3 rounded-[12px] border bg-white text-[#101012];
  border-color: rgba(120,120,128,0.16);
  font-size:16px; line-height:24px;
}
</style>
