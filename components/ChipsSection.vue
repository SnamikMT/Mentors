<template>
  <section class="space-y-3">
    <h2 class="text-[#101012] font-medium" style="font-size:20px; line-height:20px; letter-spacing:-0.33px;">
      {{ title }}
    </h2>

    <div class="flex flex-wrap gap-2">
      <button
        v-for="(label, i) in visibleChips"
        :key="i"
        type="button"
        class="chip"
        :class="isActive(label) ? 'chip--active' : 'chip--idle'"
        @click="toggle(label)"
      >
        {{ label }}
      </button>

      <!-- Кнопка «Ещё N» (если нужно) -->
      <button
        v-if="hiddenCount > 0 && !expanded"
        type="button"
        class="chip chip--more"
        @click="expanded = true"
      >
        Ещё {{ hiddenCount }}
      </button>
    </div>

    <!-- Линк «Скрыть» -->
    <button
      v-if="canCollapse"
      type="button"
      class="inline-flex items-center gap-1 text-[#007AFF] text-sm font-medium"
      @click="expanded = !expanded"
    >
      {{ expanded ? 'Скрыть' : 'Показать' }}
      <svg class="w-4 h-4 transition-transform" :class="expanded ? 'rotate-180' : ''" viewBox="0 0 24 24" fill="none">
        <path d="m6 14 6-6 6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  title: { type: String, required: true },
  chips: { type: Array,  required: true },
  modelValue: { type: Object, default: () => new Set() }, // не используется (см. ниже)
  selected: { type: Object, required: true }, // Set<string>
  extraCount: { type: Number, default: 0 }    // сколько скрывать под «Ещё N» (для длинных списков)
})
const emit = defineEmits(['update:selected'])

const expanded = ref(false)
const baseLimit = 12 // на экране помещается примерно столько “таблеток”

const limit = computed(() => expanded.value ? Infinity : Math.max(baseLimit - props.extraCount, 8))
const visibleChips = computed(() => props.chips.slice(0, limit.value))
const hiddenCount = computed(() => Math.max(props.chips.length - visibleChips.value.length, 0))
const canCollapse = computed(() => props.chips.length > baseLimit - props.extraCount)

const isActive = (label) => props.selected.has(label)
const toggle = (label) => {
  const next = new Set(props.selected)
  next[ next.has(label) ? 'delete' : 'add' ](label)
  emit('update:selected', next)
}
</script>

<style scoped>
.chip{
  @apply h-8 px-3 rounded-[999px] text-sm font-medium whitespace-nowrap transition;
}
.chip--idle{
  @apply bg-[#F5F6F8] text-[#101012] hover:bg-[#ECEEF2];
  box-shadow: inset 0 -1px 0 rgba(2,2,3,.06);
}
.chip--active{
  @apply bg-[#101012] text-white;
  box-shadow: inset 0 -1px 0 rgba(255,255,255,.08);
}
.chip--more{
  @apply bg-white text-[#101012] border border-[#101012]/10 hover:bg-black/[.03];
}
</style>
