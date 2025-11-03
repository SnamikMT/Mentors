<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  size?: 'sm'|'md'|'lg'
  full?: boolean
  leftIcon?: string | null
  rightIcon?: string | null
  iconSize?: number
  radius?: 'md'|'lg'|'xl'|'full'
  loading?: boolean
  type?: 'button'|'submit'
  variant?: 'primary'|'ghost'
}>(), {
  size: 'md',
  full: false,
  leftIcon: null,
  rightIcon: null,
  iconSize: 20,
  radius: 'xl',
  loading: false,
  type: 'button',
  variant: 'primary'
})

const sizeMap = { sm: 'h-10 px-3', md: 'h-12 px-4', lg: 'h-14 px-5' }
const radiusMap = { md: 'rounded-[12px]', lg: 'rounded-[16px]', xl: 'rounded-[20px]', full: 'rounded-full' }

const base = 'inline-flex items-center justify-center gap-2 font-medium text-[16px] leading-[24px] ' +
             'transition focus:outline-none focus-visible:ring-2 focus-visible:ring-black/10 ' +
             'disabled:opacity-60 disabled:pointer-events-none overflow-hidden'

const variantMap = {
  primary: 'text-white bg-[#007AFF] hover:opacity-95 active:opacity-90',
  ghost:   'text-[#020203] bg-transparent border border-[#7878801a] hover:bg-black/[0.02]'
}

const widthCls = computed(() => (props.full ? 'w-full' : 'w-auto'))
const classes = computed(() => [base, sizeMap[props.size!], radiusMap[props.radius!], variantMap[props.variant!], widthCls.value])
</script>

<template>
  <button :type="type" :class="classes" :disabled="loading" :aria-busy="loading ? 'true' : 'false'">
    <span v-if="leftIcon" class="grid place-items-center" :style="{ width: iconSize + 'px', height: iconSize + 'px' }">
      <img :src="leftIcon" alt="" class="w-full h-full" />
    </span>
    <span><slot /></span>
    <span v-if="rightIcon" class="grid place-items-center" :style="{ width: iconSize + 'px', height: iconSize + 'px' }">
      <img :src="rightIcon" alt="" class="w-full h-full" />
    </span>
    <span v-if="variant==='primary'" class="btn-gloss pointer-events-none" />
  </button>
</template>

<style scoped>
button { position: relative; }
.btn-gloss{ content:""; position:absolute; inset:0; background:linear-gradient(180deg, rgba(255,255,255,.22) 0%, rgba(255,255,255,0) 45%); }
</style>
