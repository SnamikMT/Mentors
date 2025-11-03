<template>
  <div class="min-h-screen w-full bg-white flex flex-col font-geist overflow-x-hidden">
    <!-- HEADER -->
    <header class="w-full flex items-center justify-between px-6 sm:px-12 lg:px-32 py-6">
      <img :src="logo" alt="logo" class="w-16 sm:w-20 h-6 sm:h-8" />
      <SegmentedSwitch
        v-model="selected"
        :segments="[
          { label: 'Ученикам', value: 1 },
          { label: 'Менторам', value: 2 },
          { label: 'Бизнесу',  value: 3 }
        ]"
        :dividerAfter="[1]"
        aria-label="Аудитория"
      />
    </header>

    <!-- MAIN -->
    <main
      class="flex-1 relative px-6 sm:px-12 lg:px-32"
      :style="isDesktop ? { paddingRight: 'calc(min(50vw, 1100px) + 32px)' } : {}"
    >
      <!-- Левая колонка (единый столбец) -->
      <section class="w-full max-w-[760px] py-10 lg:py-16">
        <h1 class="text-[32px] sm:text-[40px] lg:text-[48px] font-medium leading-tight text-black">
          Вход в Менторс
        </h1>

        <!-- ЕДИНЫЙ СТОЛБЕЦ ФОРМЫ -->
        <div class="form-col mt-8">
          <!-- Email (флоат-лейбл, лейбл поверх бордера) -->
          <div>
            <div class="relative" :class="isFocused ? 'z-10' : ''">
              <label
                class="absolute -top-2 left-3 px-1 bg-white text-sm font-medium transition-colors"
                :class="(isFocused || mail) ? 'text-black' : 'text-[#787880B3]'"
              >
                Почта
              </label>

              <div
                :class="[
                  'flex items-center rounded-xl border bg-white transition-all duration-200',
                  isFocused ? 'border-[#2F80ED] ring-2 ring-[#2F80ED]/30' : 'border-[#7878801A]'
                ]"
              >
                <div class="w-4 pl-3 py-4"></div>
                <input
                  v-model="mail"
                  @focus="isFocused = true"
                  @blur="isFocused = false"
                  type="email"
                  placeholder="example@mail.com"
                  class="flex-1 bg-transparent outline-none px-2 py-4 text-base placeholder-[#78788066]"
                  :class="(isFocused || mail) ? 'text-black' : 'text-[#787880AA]'"
                />
              </div>
            </div>
          </div>

          <!-- Кнопка -->
          <AppButton
            full
            size="lg"
            :leftIcon="mailIcon"
            :iconSize="24"
            @click="goToPin"
            class="mt-6"
          >
            Получить код
          </AppButton>

          <!-- Социальные -->
          <div class="mt-10 flex flex-col items-center">
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

          <!-- SSO -->
          <button
            class="mt-3 py-4 bg-white rounded-2xl border border-gray-200 flex justify-center items-center gap-2 hover:shadow-sm transition"
          >
            <img :src="unlockIcon" alt="Unlock" class="w-5 h-5" />
            <span class="text-base font-medium text-black">Единый вход через SSO</span>
          </button>

          <!-- Agreement: центр текста, но выравнен по левому краю формы -->
          <div class="mt-10 sm:mt-12 lg:mt-16 text-center text-sm sm:text-base text-[#3C3C43]/70 leading-relaxed">
            <p>Продолжая, ты соглашаешься с <a href="#" class="underline">Правилами</a></p>
            <p>сервиса и <a href="#" class="underline">Политикой конфиденциальности</a></p>
          </div>
        </div>
      </section>

      <!-- Иллюстрация: справа-снизу, крупная -->
      <img
        :src="loginImage"
        alt="login illustration"
        class="pointer-events-none select-none"
        :style="isDesktop
          ? {
              position: 'fixed',
              right: '0',
              bottom: '0',
              height: 'clamp(420px, 58vh, 980px)',
              maxWidth: 'min(50vw, 1100px)',
              objectFit: 'contain'
            }
          : {
              display: 'block',
              margin: '24px auto 0',
              height: '340px',
              objectFit: 'contain'
            }"
      />
    </main>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { useRouter } from '#imports'
import SegmentedSwitch from '../components/login/SegmentedSwitch.vue'
import AppButton from '@/components/ui/AppButton.vue'

import logo        from '../src/assets/img/login-page/logo.svg'
import unlockIcon  from '../src/assets/icons/login-page/unlock.svg'
import mailIcon    from '../src/assets/icons/login-page/mail.svg'
import yandexIcon  from '../src/assets/icons/login-page/yandex.svg'
import vkIcon      from '../src/assets/icons/login-page/vk.svg'
import googleIcon  from '../src/assets/icons/login-page/google.svg'
import tinkoffIcon from '../src/assets/icons/login-page/tinkoff.svg'
import loginImage  from '../src/assets/img/login-page/image1.png'

const router   = useRouter()
const mail     = ref('')
const isFocused= ref(false)
const selected = ref(1)

const isDesktop = ref(false)
let mql, off
onMounted(() => {
  if ('matchMedia' in window) {
    mql = window.matchMedia('(min-width: 1024px)')
    const update = e => (isDesktop.value = e.matches)
    isDesktop.value = mql.matches
    if (mql.addEventListener) { mql.addEventListener('change', update); off = () => mql.removeEventListener('change', update) }
    else { mql.addListener(update); off = () => mql.removeListener(update) }
  }
})
onBeforeUnmount(() => { off && off() })

const goToPin = () => {
  if (mail.value.trim()) router.push('/login/student/pin')
  else alert('Пожалуйста, введите ваш email')
}
</script>

<style scoped>
/* Единая ширина для всех элементов формы: ровная колонка */
.form-col{
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* всё — по левому краю */
}
/* каждому прямому ребёнку — одинаковая ширина */
.form-col > *{
  width: 100%;
  max-width: 28rem; /* = max-w-md */
}
</style>
