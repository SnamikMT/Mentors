<template>
  <div
    class="ml-auto inline-flex items-center justify-center overflow-hidden rounded-full bg-[#787880]/10 p-0.5"
    role="tablist"
    :aria-label="ariaLabel"
  >
    <div v-for="(seg, i) in segments" :key="seg.value" class="inline-flex items-center">
      <button
        role="tab"
        type="button"
        class="relative rounded-full focus:outline-none whitespace-nowrap"
        :class="[ itemPadding, isSelected(seg) ? activeBase : inactiveBase ]"
        :aria-selected="isSelected(seg) ? 'true' : 'false'"
        :tabindex="isSelected(seg) ? 0 : -1"
        @click="select(seg.value)"
      >
        <span :class="isSelected(seg) ? activeLabel : inactiveLabel">{{ seg.label }}</span>
      </button>
    
      <div
        v-if="dividerAfter?.includes(i) && i < segments.length - 1"
        class="mx-2 flex items-center self-stretch"
        aria-hidden="true"
      >
        <div class="h-5 w-px bg-[#787880]/20" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

type Segment = { label: string; value: string | number }

const props = defineProps<{
  segments: Segment[]
  modelValue: string | number
  ariaLabel?: string
  itemPadding?: string
  dividerAfter?: number[]
  routes?: Record<string, string>
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
  (e: 'change', value: string | number): void
}>()

const router = useRouter()

const itemPadding = props.itemPadding ?? 'px-4 py-2'

const activeBase = 'bg-white shadow-sm'
const inactiveBase = 'bg-transparent'
const activeLabel = 'text-sm font-medium leading-3 text-[#020203]'
const inactiveLabel = 'text-sm font-medium leading-3 text-[#3C3C43]/70'

function isSelected(seg: Segment) {
  return seg.value === props.modelValue
}

function select(value: string | number) {
  if (value !== props.modelValue) {
    emit('update:modelValue', value)
    emit('change', value)
  }

  // если переданы маршруты пропсом — используем их
  const mapped = props.routes?.[String(value)]
  if (mapped) {
    router.push(mapped)
    return
  }
  
  if (value === 1 || value === '1') router.push('/login/student')
  else if (value === 2 || value === '2') router.push('/login/mentor')
  else if (value === 3 || value === '3') router.push('/login/business')
}
</script>
