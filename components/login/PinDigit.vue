<template>
  <div
    class="relative w-14 h-16 rounded-xl outline outline-1 flex items-center justify-center transition-colors duration-150"
    :class="isHighlighted ? 'outline-blue-500 bg-white' : 'outline-neutral-200 bg-white'"
  >
    <span
      v-if="modelValue && showDigit"
      class="absolute inset-0 flex items-center justify-center text-2xl leading-none text-black select-none pointer-events-none"
    >
      {{ modelValue }}
    </span>
    
    <img
      v-else-if="modelValue"
      :src="dotIcon"
      alt="•"
      class="w-3 h-3 select-none pointer-events-none"
    />
   
    <input
      ref="inputEl"
      type="text"
      inputmode="numeric"
      autocomplete="one-time-code"
      pattern="[0-9]*"
      maxlength="1"
      class="absolute inset-0 w-full h-full text-center text-2xl bg-transparent text-transparent caret-transparent selection:bg-transparent outline-none"
      :value="modelValue"
      @focus="setActive(true)"
      @blur="setActive(false)"
      @input="onInput"
      @keydown="onKeydown"
      @paste="onPaste"
    />
  </div>
</template>

<script setup>
import { ref, computed, nextTick, defineProps, defineEmits, defineExpose, onBeforeUnmount } from 'vue'
import dotIcon from '../../src/assets/icons/login-page/Dot.svg'

const props = defineProps({
  modelValue: { type: String, default: '' },
  index: { type: Number, required: true },
})

const emit = defineEmits(['update:modelValue','move-next','move-prev','paste-digits'])

const inputEl = ref(null)
const isActive = ref(false)
const isHighlighted = computed(() => isActive.value || !!props.modelValue)
const showDigit = ref(false)
let hideTimer = null
const DISPLAY_MS = 350

defineExpose({
  focus: () => inputEl.value?.focus(),
  select: () => inputEl.value?.select(),
})

const setActive = (v) => { isActive.value = v }

const flashDigit = () => {
  showDigit.value = true
  if (hideTimer) clearTimeout(hideTimer)
  hideTimer = setTimeout(() => { showDigit.value = false }, DISPLAY_MS)
}

const onInput = (e) => {
  const v = (e.target.value || '').replace(/\D/g, '')
  const digit = v.slice(-1)
  emit('update:modelValue', digit)
  if (digit) {
    flashDigit()
    nextTick(() => emit('move-next', props.index))
  }
}

const onKeydown = (e) => {
  const val = props.modelValue || ''
  if (e.key === 'Backspace') {
    if (val) {
      emit('update:modelValue', '')
      showDigit.value = false
      e.preventDefault()
      return
    }
    emit('move-prev', props.index)
    e.preventDefault()
  }
  if (e.key === 'ArrowLeft') { emit('move-prev', props.index); e.preventDefault() }
  if (e.key === 'ArrowRight'){ emit('move-next', props.index); e.preventDefault() }
}

const onPaste = (e) => {
  const text = (e.clipboardData?.getData('text') || '').replace(/\D/g, '')
  if (!text) return
  e.preventDefault()
  flashDigit()
  emit('paste-digits', { start: props.index, digits: text.split('') })
}

onBeforeUnmount(() => { if (hideTimer) clearTimeout(hideTimer) })
</script>
