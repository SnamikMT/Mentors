<template>
  <div class="w-full h-[900px] bg-white flex flex-col overflow-hidden font-geist">
    <div class="w-full flex items-center px-32 py-6 pr-48">
      <img :src="logo" alt="logo" class="w-20 h-8" />
      
      <SegmentedSwitch
      v-model="selected"
      :segments="[
        { label: 'Ученикам', value: 1 },
        { label: 'Менторам', value: 2 },
        { label: 'Бизнесу', value: 3 },
        ]"
        :dividerAfter="[1]"
        aria-label="Аудитория"
        />
    </div>
    
    <div class="relative flex flex-1">
      <div class="absolute top-[196px] right-0 bottom-0 w-1/2 overflow-hidden pointer-events-none">
        <img
          :src="loginImage"
          alt="login illustration"
          class="absolute bottom-0 right-0 max-h-screen w-auto object-cover"
        />
      </div>
      
      <div class="relative z-10 w-1/2 px-32 pb-6 flex flex-col">
        <h1 class="mt-[72px] text-[48px] leading-[64px] font-medium text-black">
          Вход в Менторс
        </h1>
      
        <div class="mt-[48px] flex flex-col gap-2 w-full">
          <div
            :class="[
              'flex rounded-xl border transition-all duration-200',
              isFocused ? 'border-[#2F80ED] ring-2 ring-[#2F80ED]' : 'border-[#7878801A]'
            ]"
          >
            <div class="w-4 pl-3 py-4"></div>
            <div class="flex-1 flex flex-col">
              <div class="flex items-end h-4 -mt-1">
                <div class="h-6 px-1 flex items-center bg-white z-10">
                  <span class="text-sm font-medium text-[#787880B3] leading-3 whitespace-nowrap"
                  :class="(isFocused || mail) ? 'text-black' : 'text-[#787880B3]'">
                    Почта
                  </span>
                </div>
                <div class="flex-1 h-px"></div>
              </div>
              <div class="pl-1 pb-4 w-full">
                <input
                  v-model="mail"
                  @focus="isFocused = true"
                  @blur="isFocused = false"
                  type="email"
                  placeholder="example@mail.com"
                  class="w-full bg-transparent outline-none text-base text-[#787880AA] placeholder-[#78788066]"
                  :class="(isFocused || mail) ? 'text-black' : 'text-[#787880AA]'"
                />
              </div>
            </div>
          </div>
        </div>
        
        <button
          @click="goToPin"
          class="mt-4 flex items-center justify-center gap-2 py-4 w-full bg-gradient-to-b from-[#2F80ED] to-[#1C6DD0] rounded-2xl shadow-md"
        >
          <img :src="mailIcon" alt="mail" class="w-6 h-6" />
          <span class="text-base font-medium text-white">Получить код</span>
        </button>
       
        <div class="mt-12 flex flex-col items-center w-full">
          <p class="text-sm font-medium text-black text-center">или войди с помощью</p>
          <div class="mt-4 flex gap-4 w-full">
            <button class="flex-1 px-6 py-5 bg-white rounded-2xl outline outline-1 outline-gray-200 flex justify-center items-center">
              <img :src="yandexIcon" alt="Yandex" class="w-6 h-6" />
            </button>
            <button class="flex-1 px-6 py-5 bg-white rounded-2xl outline outline-1 outline-gray-200 flex justify-center items-center">
              <img :src="vkIcon" alt="VK" class="w-6 h-6" />
            </button>
            <button class="flex-1 px-6 py-5 bg-white rounded-2xl outline outline-1 outline-gray-200 flex justify-center items-center">
              <img :src="googleIcon" alt="Google" class="w-6 h-6" />
            </button>
            <button class="flex-1 px-6 py-5 bg-white rounded-2xl outline outline-1 outline-gray-200 flex justify-center items-center">
              <img :src="tinkoffIcon" alt="Tinkoff" class="w-6 h-6" />
            </button>
          </div>
        </div>
        
        <button class="mt-1 p-4 bg-white rounded-2xl w-full flex justify-center items-center gap-2 outline outline-1 outline-gray-200">
          <img :src="unlockIcon" alt="Unlock" class="w-5 h-5" />
          <span class="text-base font-medium text-black">Единый вход через SSO</span>
        </button>
       
        <div class="mt-auto pt-8 w-full text-center">
          <span class="text-[#3C3C43]/70 text-base">Продолжая, ты соглашаешься с</span>
          <span class="text-[#3C3C43]/70 text-base underline"> Правилами сервиса </span>
          <span class="text-[#3C3C43]/70 text-base">и</span>
          <span class="text-[#3C3C43]/70 text-base underline"> Политикой конфиденциальности</span>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script setup>
import { useRouter } from '#imports'
import { ref } from 'vue'
const mail = ref('')
const isFocused = ref(false)
const router = useRouter()
const selected = ref(1)

const goToPin = () => {
  if (mail.value.trim()) {
    router.push('/login/student/pin')
  } else {
    alert('Пожалуйста, введите ваш email')
  }
}
import SegmentedSwitch from '../components/login/SegmentedSwitch.vue'
import logo from '../src/assets/img/login-page/logo.svg'
import unlockIcon from '../src/assets/icons/login-page/unlock.svg'
import mailIcon from '../src/assets/icons/login-page/mail.svg'
import yandexIcon from '../src/assets/icons/login-page/yandex.svg'
import vkIcon from '../src/assets/icons/login-page/vk.svg'
import googleIcon from '../src/assets/icons/login-page/google.svg'
import tinkoffIcon from '../src/assets/icons/login-page/tinkoff.svg'
import loginImage from '../src/assets/img/login-page/image1.png'
</script>
