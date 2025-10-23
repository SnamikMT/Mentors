<template>
  <div class="flex flex-col gap-6">
    <div class="relative bg-white rounded-[32px] p-6 pt-9 border border-Border-Neutral-Base/20">
      <div class="absolute left-5 top-0 -translate-y-1/2 bg-white px-2 py-0.5 rounded text-sm font-medium text-Labels-Neutral-Primary">
        Профиль
      </div>

      <div class="flex items-center gap-4 mb-6">
        <img :src="avaIcon" class="w-16 h-16 rounded-full object-cover" alt="Avatar" />
        <div>
          <div class="flex items-center gap-2 text-xl font-medium text-Labels-Neutral-Primary">
            Антон Рязанов
            <img :src="pencilIcon" class="w-5 h-5" alt="edit" />
          </div>
          <div class="text-base text-[#3C3C43]/70">Номер профиля 1033</div>
        </div>
      </div>

      <div class="space-y-4 flex flex-col gap-3">
        <Input label="Номер телефона" value="+7 918 105 00 00" editable edit-field="phone" @edit="openEdit" />
        <Input label="Ник в Телеграм" value="@designer" editable edit-field="telegram" @edit="openEdit"/>
        <Input label="Почта" value="lmnsq@ya.ru" editable edit-field="email" @edit="openEdit" />
        <label class="flex items-center gap-2 px-1 select-none">
          <span class="relative inline-flex items-center justify-center w-4 h-4 rounded border border-Border-Neutral-Base/20 bg-[#787880]/20">
            <input type="checkbox" class="peer sr-only" />
            <svg class="hidden peer-checked:block w-3 h-3" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M2 6l2 2 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
          <span class="text-Labels-Neutral-Primary text-base font-normal font-geist">
            Получать письма об акциях
          </span>
        </label>
      </div>
    </div>

    <div class="relative bg-white rounded-[32px] p-6 pt-9 outline outline-1 outline-gray-200 space-y-6">
      <div class="absolute left-5 -top-3 bg-white px-2 py-0.5 rounded text-sm font-medium text-gray-900">
        Интеграции
      </div>

      <div class="space-y-6">
        <div v-for="(integration, index) in integrations" :key="index" class="space-y-2">
          <div class="flex items-start gap-2">
            <img :src="integration.icon" class="w-6 h-6" />
            <div>
              <div class="text-base font-medium text-gray-900">{{ integration.title }}</div>
              <div class="text-base text-gray-500">{{ integration.desc }}</div>
            </div>
          </div>
          <button
            class="text-base font-medium rounded-full px-4 py-1.5"
            :class="integration.danger ? 'text-red-600' : 'text-blue-600'"
          >
            {{ integration.button }}
          </button>

          <div v-if="index !== integrations.length - 1" class="border-t border-gray-200"></div>
        </div>
      </div>
    </div>
  </div>

  <teleport to="body">
    <transition name="fade">
      <div
        v-if="isModalOpen"
        class="fixed inset-0 z-[100] flex items-center justify-center bg-white/70 backdrop-blur-sm"
        @keydown.esc="closeModal"
      >
        <div
          v-if="modalStep === 'edit'"
          class="inline-flex flex-col items-center gap-9 px-6"
          role="dialog"
          aria-modal="true"
        >
          <div class="w-full inline-flex justify-between items-center">
            <div class="text-Labels-Neutral-Primary text-2xl font-medium leading-normal font-geist">
              {{ editTitle }}
            </div>
            <button
              type="button"
              class="size-10 p-2 bg-[#787880]/10 rounded-full flex justify-center items-center"
              @click="closeModal"
              aria-label="Закрыть"
            >
              <div class="relative size-5">
                <div class="size-2.5 absolute left-[6.85px] top-[6.85px] bg-Labels-Neutral-Primary rounded-sm"></div>
                <img :src="closeIcon" width="24" height="24" />
              </div>
            </button>
          </div>

          <div class="w-[504px] p-6 bg-Backgrounds-Neutral-Tertiary rounded-[32px]
         shadow-[0px_16px_36px_0px_rgba(16,16,18,0.12)]
         shadow-[0px_24px_48px_0px_rgba(16,16,18,0.04)]
         shadow-[0px_36px_64px_0px_rgba(16,16,18,0.02)]
         shadow-[0px_48px_96px_0px_rgba(16,16,18,0.01)]
         border border-Border-Neutral-Base/20
         flex items-center justify-between"
         >
            <div class="text-3xl font-medium leading-loose font-geist">
              <template v-if="field === 'phone'">
                <span class="text-Labels-Neutral-Primary">+7 </span>
                <span class="text-[#3C3C43]/50">000 000 00 00</span>
              </template>
              <template v-else-if="field === 'telegram'">
                <span class="text-Labels-Neutral-Primary">@</span>
                <span class="text-[#3C3C43]/50">username</span>
              </template>
              <template v-else>
                <span class="text-[#3C3C43]/50">name@example.com</span>
              </template>
            </div>

            <button
              type="button"
              class="size-14 p-2 rounded-2xl bg-blue-500 shadow-[inset_0_-1px_1px_0_rgba(16,16,18,0.12)] grid place-items-center"
              @click="goVerify"
              aria-label="Продолжить"
            >
              <img :src="checkIcon" width="41" height="40">
            </button>
          </div>
        </div>

        <div
          v-else
          class="inline-flex flex-col items-center gap-9 px-6"
          role="dialog"
          aria-modal="true"
        >
          <div class="w-full inline-flex justify-between items-start">
            <div class="inline-flex flex-col gap-3">
              <div class="text-Labels-Neutral-Primary text-2xl font-medium leading-normal font-geist">
                Введи код
              </div>
              <div class="text-[#3C3C43]/70 text-base leading-normal font-geist">
                Мы прислали его на {{ field === 'phone' ? 'телефон' : (field === 'email' ? 'почту' : 'Телеграм') }}
                <br />
                <span class="whitespace-nowrap">+ 7 918 105 22 22</span>
              </div>
            </div>

            <button
              type="button"
              class="size-10 p-2 bg-[#787880]/10 rounded-full flex justify-center items-center"
              @click="closeModal"
              aria-label="Закрыть"
            >
              <img :src="closeIcon" width="24" height="24" />
            </button>
          </div>

          <div class="inline-flex items-start gap-4">
            <PinDigit
            v-for="(d, i) in code"
            :key="i"
            v-model="code[i]"
            :index="i"
            ref="pinRefs"
            @move-next="handleNext"
            @move-prev="handlePrev"
            @paste-digits="handlePaste"
            />
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup>
import { ref, computed, nextTick, onMounted, onBeforeUnmount } from 'vue'
import Input from '../Input.vue'
import PinDigit from '../../login/PinDigit.vue'

import closeIcon from '../../../src/assets/icons/profile/settings/close.svg'
import checkIcon from '../../../src/assets/icons/profile/settings/checkmark.svg'
import avaIcon from '../../../src/assets/icons/profile/settings/ava.svg'
import pencilIcon from '../../src/assets/icons/profile/header/pencil.svg'
import telegramIcon from '../../../src/assets/icons/profile/settings/telegram.svg'
import yandexIcon from '../../../src/assets/icons/profile/settings/yandex.svg'
import googleIcon from '../../../src/assets/icons/profile/settings/google.svg'
import appleIcon from '../../../src/assets/icons/profile/settings/apple.svg'

const integrations = [
  { icon: telegramIcon, title: 'Телеграм-бот', desc: 'Получайте уведомления о звонках, их переносе или отмене', button: 'Привязать', danger: false },
  { icon: yandexIcon,   title: 'Яндекс Календарь', desc: 'Чтобы добавить занятия в календарь',                  button: 'Привязать', danger: false },
  { icon: googleIcon,   title: 'Google Calendar',  desc: 'Чтобы добавить занятия в календарь',                  button: 'Отвязать',  danger: true  },
  { icon: appleIcon,    title: 'Apple Calendar',   desc: 'Чтобы добавить занятия в календарь',                  button: 'Отвязать',  danger: true  },
]

const isModalOpen = ref(false)
const modalStep = ref('edit')          
const field = ref('phone')             
const code = ref(['', '', '', ''])

const pinRefs = ref([])

function handleNext(idx) {
  if (idx < code.value.length - 1) pinRefs.value[idx + 1]?.focus()
}

function handlePrev(idx) {
  if (idx > 0) pinRefs.value[idx - 1]?.focus()
}

function handlePaste({ start, digits }) {
  let i = start
  for (const d of digits) {
    if (i >= code.value.length) break
    code.value[i] = d
    i++
  }
  if (i < code.value.length) pinRefs.value[i]?.focus()
}

const editTitle = computed(() => {
  switch (field.value) {
    case 'phone':    return 'Смена номера телефона'
    case 'telegram': return 'Смена ника в Телеграм'
    case 'email':    return 'Смена почты'
    default:         return 'Изменение'
  }
})

function openEdit(kind) {
  field.value = kind
  modalStep.value = 'edit'
  isModalOpen.value = true
  lockScroll(true)
}

function goVerify() {
  modalStep.value = 'verify'
  nextTick(() => digitRefs.value?.[0]?.focus())
}

function closeModal() {
  isModalOpen.value = false
  modalStep.value = 'edit'
  code.value = ['', '', '', '']
  lockScroll(false)
}

function lockScroll(lock) {
  const html = document.documentElement
  if (lock) html.classList.add('overflow-hidden')
  else html.classList.remove('overflow-hidden')
}

onBeforeUnmount(() => lockScroll(false))
onMounted(() => {
  if (!isModalOpen.value) lockScroll(false)
})

</script>

<style scoped>
.fade-enter-active,
.fade-leave-active { transition: opacity .15s ease; }
.fade-enter-from,
.fade-leave-to { opacity: 0; }
</style>
