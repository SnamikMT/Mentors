<template>
  <section>
    <h2 class="text-[18px] leading-[20px] font-medium text-[#101012] mb-3">{{ title }}</h2>

    <div class="flex flex-wrap gap-2">
      <button
        v-for="t in shown" :key="t"
        class="chip" :class="activeSet?.has(t) ? 'chip--active' : ''"
        @click="$emit('toggle', t)"
      >{{ t }}</button>
    </div>

    <div class="mt-3" v-if="showMore && extraCount > 0">
      <button type="button" class="more-pill" @click="expanded = !expanded">
        Ещё {{ extraCount }}
        <svg class="w-3 h-3 transition" :class="expanded ? 'rotate-180' : ''" viewBox="0 0 24 24" fill="none">
          <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>

    <div class="mt-3" v-else>
      <button type="button" class="link-pill">
        Скрыть
        <svg class="w-3 h-3 rotate-180" viewBox="0 0 24 24" fill="none">
          <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
  title: string
  items: string[]
  activeSet?: Set<string>
  showMore?: boolean
  baseCount?: number
}>()

const expanded  = ref(false)
const baseCount = computed(() => props.baseCount ?? props.items.length)
const extraCount = computed(() => Math.max(props.items.length - baseCount.value, 0))
const shown = computed(() => (props.showMore && !expanded.value) ? props.items.slice(0, baseCount.value) : props.items)
</script>

<style scoped>
.chip{
  height:36px; padding:0 12px; border-radius:9999px;
  background:#fff; border:1px solid rgba(120,120,128,.16);
  color:#101012; font-size:14px; line-height:14px; font-weight:500;
  display:inline-flex; align-items:center; justify-content:center;
  transition:background .15s, color .15s, border-color .15s;
}
.chip:hover{ background:#F7F8FA; }
.chip--active{ background:#101012; color:#fff; border-color:#101012; }

.link-pill, .more-pill{
  display:inline-flex; align-items:center; gap:6px;
  height:32px; padding:0 12px; border-radius:9999px;
  font-size:14px; line-height:14px; font-weight:500;
  color:#007AFF; border:1px solid #007AFF; background:rgba(0,122,255,.08);
}
.link-pill:hover, .more-pill:hover{ background:rgba(0,122,255,.12); }
</style>
