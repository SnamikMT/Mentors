<template>
  <div class="w-full flex justify-center px-8">
    <div class="w-full max-w-[1008px] flex flex-col gap-6">
    
      <section class="relative rounded-[32px] bg-Backgrounds-Neutral-Primary border border-Border-Neutral-Base/20 pt-9 pb-6 flex flex-col gap-6">
        <div class="px-6 flex items-center gap-4">
          <div class="flex-1 flex items-center gap-2">
            <div class="w-8 h-6 rounded-sm bg-[#101012] outline outline-1 outline-[#101012]/20 grid place-items-center">
              <img :src="IconCardMini" alt="" class="w-4 h-4" />
            </div>
            <div class="text-base font-medium font-geist text-Labels-Neutral-Primary leading-normal">
              MIR •• 9547
            </div>
          </div>
          <img :src="IconAlert" alt="" class="w-6 h-6" />
        </div>

        <div class="pl-6">
          <div class="h-px w-full bg-transparent  border border-Border-Neutral-Base/20"></div>
        </div>

        <div class="px-6 flex flex-col gap-3">
          <div class="inline-flex items-center gap-2">
            <button
              type="button"
              role="switch"
              :aria-checked="autoPay"
              class="w-9 h-6 rounded-full relative transition"
              @click="autoPay = !autoPay"
            >
              <div class="absolute inset-0 rounded-full" :class="autoPay ? 'bg-blue-500' : 'bg-[#787880]/10'"/>
              <div class="absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white shadow" :class="autoPay ? 'right-0.5' : 'left-0.5'"/>
            </button>
            <div class="text-base font-normal font-geist text-Labels-Neutral-Primary leading-normal">
              Авто-платеж
            </div>
          </div>

          <p class="text-base font-normal font-geist text-[#3C3C43]/70 leading-normal">
            Мы не отменим забронированный звонок, даже если баланс будет 0 ₽, а просто спишем стоимость звонка
            с выбранной карты за сутки до его начала.
          </p>
        </div>

        <div class="absolute left-5 top-0 -translate-y-1/2 bg-white px-2 py-0.5 rounded text-sm font-medium text-Labels-Neutral-Primary">
          Оплата
        </div>
      </section>

      <section class="relative rounded-[32px] bg-Backgrounds-Neutral-Primary  border border-Border-Neutral-Base/20 pt-9 pb-6 flex flex-col gap-6">

        <div class="px-6 flex flex-col gap-4">
          <div class="text-sm font-medium font-geist leading-3 text-[#3C3C43]/70">Тема</div>
          <SegmentedSwitch class="!mx-auto !ml-0" v-model="theme" :segments="themeSegments" :divider-after="[1]" />
        </div>

        <div class="pl-6">
          <div class="h-px w-full border border-Border-Neutral-Base/20"></div>
        </div>

        <div class="px-6 flex flex-col gap-4">
          <div class="text-sm font-medium font-geist leading-3 text-[#3C3C43]/70">Временной формат</div>
          <SegmentedSwitch class="!mx-auto !ml-0" v-model="timeFormat" :segments="timeFormatSegments" />
        </div>

        <div class="pl-6">
          <div class="h-px w-full border border-Border-Neutral-Base/20"></div>
        </div>

        <div class="px-6 flex flex-col gap-4">
          <div class="text-sm font-medium font-geist leading-3 text-[#3C3C43]/70">Начало недели</div>
          <SegmentedSwitch class="!mx-auto !ml-0" v-model="weekStart" :segments="weekStartSegments" :divider-after="[1]" />
        </div>

        <div class="pl-6">
          <div class="h-px w-full border border-Border-Neutral-Base/20"></div>
        </div>

        <div class="px-6 flex flex-col gap-4">
          <div class="text-sm font-medium font-geist leading-3 text-[#3C3C43]/70">Часовой пояс</div>
          <button type="button" class="w-full rounded-xl border border-Border-Neutral-Base/20 overflow-hidden text-left">
            <div class="pl-4 pr-3 py-3 flex items-center gap-2">
              <div class="font-geist text-base leading-normal">
                <span class="text-Labels-Neutral-Primary">Европа / Москва&nbsp;</span>
                <span class="text-[#3C3C43]/40">UTC+3:00</span>
              </div>
              <img :src="IconChevron" alt="" class="w-4 h-4 ml-auto" />
            </div>
          </button>
        </div>

        <div class="pl-6">
          <div class="h-px w-full border border-Border-Neutral-Base/20"></div>
        </div>

        <div class="px-6 flex flex-col gap-4">
          <div class="text-sm font-medium font-geist leading-3 text-[#3C3C43]/70">Язык</div>
          <button type="button" class="w-full rounded-xl border border-Border-Neutral-Base/20 overflow-hidden text-left">
            <div class="pl-4 pr-3 py-3 flex items-center gap-2">
              <div class="text-base font-normal font-geist text-Labels-Neutral-Primary leading-normal">Русский</div>
              <img :src="IconChevron" alt="" class="w-4 h-4 ml-auto" />
            </div>
          </button>
        </div>

        <div class="absolute left-5 top-0 -translate-y-1/2 bg-white px-2 py-0.5 rounded text-sm font-medium text-Labels-Neutral-Primary">
          Интерфейс
        </div>
      </section>

      <section class="relative rounded-[32px] bg-Backgrounds-Neutral-Primary border border-Border-Neutral-Base/20 px-6 pt-9 pb-6 flex flex-col gap-3">
        <div class="inline-flex items-center gap-2">
          <button
            type="button"
            role="switch"
            :aria-checked="recordCalls"
            class="w-9 h-6 rounded-full relative transition"
            @click="recordCalls = !recordCalls"
          >
            <div class="absolute inset-0 rounded-full" :class="recordCalls ? 'bg-blue-500' : 'bg-[#787880]/10'"/>
            <div class="absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white shadow" :class="recordCalls ? 'right-0.5' : 'left-0.5'"/>
          </button>
          <div class="text-base font-normal font-geist text-Labels-Neutral-Primary leading-normal">Хранить записи звонков</div>
        </div>

        <p class="text-base font-normal font-geist text-[#3C3C43]/70 leading-normal">
          Записи можно пересмотреть, они резюмируются искусственным интеллектом и помогают в случае конфликтных ситуаций.
        </p>

        <div class="absolute left-5 top-0 -translate-y-1/2 bg-white px-2 py-0.5 rounded text-sm font-medium text-Labels-Neutral-Primary">
          Конфиденциальность
        </div>
      </section>

    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue'
import IconCardMini from '../../../src/assets/icons/profile/settings/logo.svg'
import IconAlert    from '../../../src/assets/icons/profile/settings/bin.svg'         
import IconChevron  from '../../../src/assets/icons/profile/header/chevron-down.svg'  
import SegmentedSwitch from '../../login/SegmentedSwitch.vue'

const themeSegments = [
  { label: 'Label 1', value: 'Label1' },
  { label: 'Label 2', value: 'Label2' },
  { label: 'Label 3', value: 'Label3' },
]
const timeFormatSegments = [
  { label: 'Label 1', value: 'Label1' },
  { label: 'Label 2', value: 'Label2' },
]
const weekStartSegments = [
  { label: 'Label 1', value: 'Label1' },
  { label: 'Label 2', value: 'Label2' },
  { label: 'Label 3', value: 'Label3' },
]

const autoPay = ref(true)
const recordCalls = ref(true)
const theme = ref('Label1')
const timeFormat = ref('Label1')
const weekStart = ref('Label1')
</script>
