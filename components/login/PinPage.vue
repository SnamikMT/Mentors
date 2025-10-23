<template>
  <div class="relative max-w-[1440px] h-[900px] w-full mx-auto px-32 py-6 bg-white overflow-hidden font-geist">
    <div class="relative z-10 flex flex-col justify-between items-start h-full">
      <img :src="logo" alt="logo" class="w-20 h-8" />

      <div class="flex flex-col gap-12 mt-16">
        <div class="flex flex-col gap-2">
          <h1 class="text-[48px] leading-[64px] font-medium text-[#020203]">А теперь введи код</h1>
          <p class="text-base leading-relaxed text-[#020203]">
            Мы прислали его на почту
            <span class="font-normal underline">{{ emailText }}</span>
          </p>
        </div>

        <div class="flex gap-3">
          <PinDigit
            v-for="(_, index) in pin"
            :key="index"
            :index="index"
            v-model="pin[index]"
            ref="pinRefs"
            @move-next="handleMoveNext"
            @move-prev="handleMovePrev"
            @paste-digits="handlePaste"
          />
        </div>

        <div class="w-96 p-4 bg-gray-100 rounded-2xl flex justify-center items-center">
          <span class="text-base font-medium text-gray-500">
            Новый код через {{ seconds }} сек
          </span>
        </div>
      </div>

      <button
        class="w-96 mt-auto p-4 bg-gray-100 rounded-2xl flex justify-center items-center"
        @click="goBack"
      >
        <span class="text-base font-medium text-black">Попробовать другую почту</span>
      </button>
    </div>

    <img
      :src="image"
      alt="illustration"
      class="absolute top-[340px] right-0 left-[500px] w-[800px] h-auto object-fit z-[999] pointer-events-none select-none"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, nextTick, computed } from 'vue'
import { useRouter } from '#imports'
import PinDigit from './PinDigit.vue'

import logo from '../../src/assets/img/login-page/logo.svg'
import image from '../../src/assets/img/login-page/image2.png'

const props = defineProps<{
  role: 'student' | 'mentor' | 'business'
  email?: string
}>()

const router = useRouter()

const emailText = computed(() => props.email || 'example@mail.com')

const seconds = ref(60)
const pin = ref<string[]>(['', '', '', ''])
const pinRefs = ref<any[]>([])

const focusIndex = (i: number, { select = false } = {}) => {
  const inst = pinRefs.value?.[i]
  if (!inst) return
  select ? inst.select?.() : inst.focus?.()
}

const handleMoveNext = (from: number) => {
  const next = Math.min(from + 1, pin.value.length - 1)
  if (from !== next) focusIndex(next, { select: true })
  checkComplete()
}

const handleMovePrev = (from: number) => {
  const prev = Math.max(from - 1, 0)
  if (from !== prev) focusIndex(prev, { select: true })
}

const handlePaste = ({ start, digits }: { start: number; digits: string[] }) => {
  let i = start
  digits.forEach((d) => {
    if (i > pin.value.length - 1) return
    pin.value[i] = String(d).replace(/\D/g, '').slice(-1)
    i++
  })
  nextTick(() => {
    const last = Math.min(i, pin.value.length - 1)
    focusIndex(last, { select: true })
    checkComplete()
  })
}

const checkComplete = () => {
  if (pin.value.every((d) => d !== '')) {
    if (props.role === 'mentor') router.push('/mentor/dashboard')
    else if (props.role === 'business') router.push('/business/dashboard')
    else router.push('/profile')
  }
}

const goBack = () => {
  router.push(`/login/${props.role}`)
}

watch(() => [...pin.value], (val) => {
  if (val.every(d => d !== '')) checkComplete()
})

onMounted(() => {
  const interval = setInterval(() => {
    if (seconds.value > 0) seconds.value--
    else clearInterval(interval)
  }, 1000)
})
</script>
