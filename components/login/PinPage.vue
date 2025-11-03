<template>
  <div class="min-h-screen w-full bg-white overflow-hidden font-geist flex flex-col">
    <!-- header -->
    <header class="w-full px-6 sm:px-10 lg:px-32 py-6">
      <img :src="logo" alt="logo" class="w-16 sm:w-20 h-6 sm:h-8" />
    </header>

    <!-- main -->
    <main class="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0 items-stretch">
      <!-- контент -->
      <section class="px-6 sm:px-10 lg:pl-32 lg:pr-0 pb-8 flex flex-col gap-8">
        <div class="flex flex-col gap-3 mt-2 sm:mt-6">
          <h1 class="text-[28px] leading-[36px] sm:text-[40px] sm:leading-[52px] lg:text-[48px] lg:leading-[64px] font-medium text-[#020203]">
            А теперь введи код
          </h1>
          <p class="text-base leading-relaxed text-[#020203]">
            Мы прислали его на почту
            <span class="underline">{{ emailText }}</span>
          </p>
        </div>

        <!-- PIN -->
        <div class="flex gap-2 sm:gap-3">
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

        <!-- таймер -->
        <div class="w-full max-w-md p-3 sm:p-4 bg-gray-100 rounded-2xl flex justify-center items-center">
          <span class="text-sm sm:text-base font-medium text-gray-500">
            Новый код через {{ seconds }} сек
          </span>
        </div>

        <!-- другая почта -->
        <button
          class="w-full max-w-md mt-auto p-3 sm:p-4 bg-gray-100 rounded-2xl flex justify-center items-center hover:bg-gray-200 transition"
          @click="goBack"
        >
          <span class="text-base font-medium text-black">Попробовать другую почту</span>
        </button>
      </section>

      <!-- иллюстрация -->
 <section class="relative flex items-end justify-center lg:justify-end px-6 sm:px-10 lg:px-0 lg:pl-[17px]">
    <img
      :src="image"
      alt=""
      class="
        h-auto object-contain select-none
        max-h-[260px] sm:max-h-[360px]                /* мобилки/планшеты */
        lg:max-h-none lg:w-[46vw]                     /* крупнее на десктопе */
        lg:min-w-[640px] lg:max-w-[980px]             /* пределы, чтобы не была мелкой */
        2xl:w-[48vw] 2xl:min-w-[640px] 2xl:max-w-[1180px]
        mr-0                                          /* без правого отступа */
      "
    />
  </section>

    </main>
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

const goBack = () => { router.push(`/login/${props.role}`) }

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
