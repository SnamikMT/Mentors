<template>
  <NuxtLayout name="app">
    <!-- ДЕСКТОПНЫЙ Header -->
    <Header class="hidden lg:block" :stepperBg="'#fff'">
      <template #left>
        <button
          @click="handleBack"
          class="h-10 w-10 grid place-items-center rounded-full
                 outline outline-1 outline-[#787880]/10 hover:bg-black/5 transition"
          aria-label="Назад"
        >
          <img :src="iconBack" class="w-5 h-5 opacity-70" alt="">
        </button>
      </template>
      <template #center>
        <Stepper :steps="stepTitles" :current="store.step" />
      </template>
    </Header>

    <!-- МОБИЛКА: просто блок, НЕ sticky -->
    <div class="lg:hidden px-4 pt-3 pb-2">
      <div class="flex items-center gap-3">
        <button
          @click="handleBack"
          class="h-10 w-10 grid place-items-center rounded-full
                 outline outline-1 outline-[#787880]/10 hover:bg-black/5 transition"
          aria-label="Назад"
        >
          <img :src="iconBack" class="w-5 h-5 opacity-70" alt="">
        </button>
        <div class="flex-1 min-w-0">
          <Stepper :steps="stepTitles" :current="store.step" compact />
        </div>
      </div>
    </div>

    <!-- КОНТЕНТ -->
    <div class="px-4 sm:px-6 lg:px-0">
      <div class="mx-auto w-full max-w-[1008px]">
        <div class="mt-6 h-px bg-[#787880]/[0.16]"></div>

        <KeepAlive>
          <component
            :is="currentComponent"
            v-bind="stepProps"
            @next="goNext"
            @prev="goPrev"
            @patch="patchStore"
            @toStep="goTo"
          />
        </KeepAlive>
      </div>
    </div>
  </NuxtLayout>
</template>


<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAutoFlowStore } from '@/stores/autoFlow'
import Header  from '@/components/profile/Header.vue'
import Stepper from '@/components/common/Stepper.vue'

import Step1 from '@/components/mentors/auto/step1.vue'
import Step2 from '@/components/mentors/auto/step2.vue'
import Step3 from '@/components/mentors/auto/step3.vue'
import Step4 from '@/components/mentors/auto/step4.vue'

import iconBack from '@/src/assets/icons/mentor/arrow-back.svg'

const router = useRouter()
const store  = useAutoFlowStore()

const stepTitles = [
  'Парочку вопросов',
  'Выбор ментора',
  'Выбор тарифа',
  'Оплата',
]

const components = [Step1, Step2, Step3, Step4]
const currentComponent = computed(() => components[store.step] ?? Step1)

const stepProps = computed(() => ({
  step: store.step,
  chips:       store.chips,
  expMonths:   store.expMonths,
  closer:      store.closer,
  prefTab:     store.prefTab,
  gender:      store.gender,
  ageMin:      store.ageMin,
  ageMax:      store.ageMax,
  companies:   store.companies,
  awards:      store.awards,
  mentorSpec:  store.mentorSpec,
  timeTab:     store.timeTab,
  timeDate:    store.timeDate,
  timeSlot:    store.timeSlot,
  priceTier:   store.priceTier,
  selectedMentorId: store.selectedMentorId,
  booking:          store.booking,
  tariff:           store.tariff,
  paymentMethod:    store.paymentMethod,
}))

function goNext() {
  if (store.step < stepTitles.length - 1) store.setStep(store.step + 1)
}
function goPrev() {
  if (store.step > 0) store.setStep(store.step - 1)
  else router.back()
}
function goTo(n:number) {
  if (n >= 0 && n < stepTitles.length) store.setStep(n)
}
function patchStore(payload: Record<string, unknown>) {
  store.merge(payload)
}
function handleBack() {
  if (store.step > 0) store.setStep(store.step - 1)
  else router.back()
}
</script>
