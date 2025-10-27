<template>
  <div class="min-h-screen w-full bg-white flex flex-col font-geist overflow-hidden">
    <!-- HEADER -->
    <header class="w-full flex items-center justify-between px-6 sm:px-12 lg:px-32 py-6">
      <img :src="logo" alt="logo" class="w-16 sm:w-20 h-6 sm:h-8" />
      <SegmentedSwitch
        v-model="selected"
        :segments="[
          { label: 'Ученикам', value: 1 },
          { label: 'Менторам', value: 2 },
          { label: 'Бизнесу', value: 3 }
        ]"
        :dividerAfter="[]"
        aria-label="Аудитория"
      />
    </header>

    <!-- MAIN -->
    <main class="flex flex-col-reverse lg:flex-row flex-1 relative">
      <!-- Левая колонка: форма -->
      <section class="w-full lg:w-1/2 px-6 sm:px-12 lg:px-32 py-10 flex flex-col">
        <h1 class="text-[32px] sm:text-[40px] lg:text-[48px] font-medium leading-tight text-black">
          Вход в Менторс<br />
          <span class="text-[#3C3C43]/40">для менторов</span>
        </h1>

        <!-- Email -->
        <div class="mt-8 w-full max-w-md">
          <div
            :class="[
              'flex rounded-xl border transition-all duration-200 bg-white',
              isFocused ? 'border-[#2F80ED] ring-2 ring-[#2F80ED]/30' : 'border-[#7878801A]'
            ]"
          >
            <div class="w-4 pl-3 py-4"></div>
            <div class="flex-1 flex flex-col">
              <label
                class="text-sm font-medium text-[#787880B3] leading-3 bg-white px-1 ml-1 mt-1"
                :class="(isFocused || mail) ? 'text-black' : 'text-[#787880B3]'"
              >
                Почта
              </label>
              <input
                v-model="mail"
                @focus="isFocused = true"
                @blur="isFocused = false"
                type="email"
                placeholder="example@mail.com"
                class="w-full bg-transparent outline-none px-2 pb-3 text-base text-[#787880AA] placeholder-[#78788066]"
                :class="(isFocused || mail) ? 'text-black' : 'text-[#787880AA]'"
              />
            </div>
          </div>
        </div>

        <!-- Кнопка -->
        <button
          @click="goToPin"
          class="mt-6 flex items-center justify-center gap-2 py-4 w-full max-w-md bg-gradient-to-b from-[#2F80ED] to-[#1C6DD0] rounded-2xl shadow-md"
        >
          <img :src="mailIcon" alt="mail" class="w-6 h-6" />
          <span class="text-base font-medium text-white">Получить код</span>
        </button>

        <!-- Соц вход -->
        <div class="mt-10 flex flex-col items-center w-full max-w-md">
          <p class="text-sm font-medium text-black text-center">или войди с помощью</p>
          <div class="mt-4 grid grid-cols-4 gap-3 sm:gap-4 w-full">
            <button
              v-for="icon in [yandexIcon, vkIcon, googleIcon, tinkoffIcon]"
              :key="icon"
              class="flex justify-center items-center py-4 bg-white rounded-2xl border border-gray-200 hover:shadow-sm transition"
            >
              <img :src="icon" alt="" class="w-6 h-6" />
            </button>
          </div>
        </div>

        <!-- Agreement -->
        <div class="mt-10 sm:mt-12 lg:mt-auto text-center text-sm sm:text-base text-[#3C3C43]/70 leading-relaxed">
          Продолжая, ты соглашаешься с
          <span class="underline">Правилами сервиса</span>
          и
          <span class="underline">Политикой конфиденциальности</span>
        </div>
      </section>

      <!-- Правая колонка: изображение -->
      <section class="relative w-full lg:w-1/2 flex justify-center items-end lg:items-stretch bg-[#F8FAFC]">
        <img
          :src="loginImage"
          alt="login illustration"
          class="max-h-[300px] sm:max-h-[400px] lg:max-h-none w-auto object-contain lg:object-cover lg:absolute lg:right-0 lg:bottom-0"
        />
      </section>
    </main>
  </div>
</template>

<script setup>
import { useRouter } from '#imports'
import { ref } from 'vue'
import SegmentedSwitch from '../components/login/SegmentedSwitch.vue'

import logo from '../src/assets/img/login-page/logo.svg'
import mailIcon from '../src/assets/icons/login-page/mail.svg'
import yandexIcon from '../src/assets/icons/login-page/yandex.svg'
import vkIcon from '../src/assets/icons/login-page/vk.svg'
import googleIcon from '../src/assets/icons/login-page/google.svg'
import tinkoffIcon from '../src/assets/icons/login-page/tinkoff.svg'
import loginImage from '../src/assets/img/login-page/image3.png'

const router = useRouter()
const mail = ref('')
const isFocused = ref(false)
const selected = ref(2)

const goToPin = () => {
  if (mail.value.trim()) router.push('/login/mentor/pin')
  else alert('Пожалуйста, введите ваш email')
}
</script>
