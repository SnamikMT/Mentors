<template>
  <NuxtLayout name="app">
 <!-- Десктопный Header со степпером -->
    <Header class="hidden lg:block" :stepperBg="'#fff'">
      <template #left>
        <button
          @click="$router.back()"
          class="h-10 w-10 grid place-items-center rounded-full
                 outline outline-1 outline-[#787880]/10 hover:bg-black/5 transition"
          aria-label="Назад">
          <img :src="iconBack" class="w-5 h-5 opacity-70" alt="">
        </button>
      </template>
      <template #center>
        <Stepper
          :steps="['Парочку вопросов','Выбор ментора','Выбор тарифа','Оплата']"
          :current="0"
        />
      </template>
    </Header>

    <!-- Мобилка: только стрелка назад -->
    <div class="lg:hidden px-4 py-3">
      <button
        @click="$router.back()"
        class="h-10 w-10 grid place-items-center rounded-full
               outline outline-1 outline-[#787880]/10 hover:bg-black/5 transition"
        aria-label="Назад">
        <img :src="iconBack" class="w-5 h-5 opacity-70" alt="">
      </button>
    </div>

    <!-- Мобилка: степпер просто сверху, БЕЗ sticky -->
    <div class="lg:hidden px-4">
      <Stepper
        :steps="['Парочку вопросов','Выбор ментора','Выбор тарифа','Оплата']"
        :current="0"
        compact
      />
    </div>
    
    <div class="px-4 sm:px-6 lg:px-0">
      <div class="mx-auto w-full max-w-[1008px]">

        <!-- Единая верхняя линия над контентом -->
        <div class="mt-9 h-px bg-[#787880]/[0.16]"></div>

        <!-- === БЛОК 1: ЧИПЫ === -->
        <div class="mt-9">
          <div class="form-row">
            <!-- ЛЕВО: 96×96 видео + заголовок (отступ 24px под кружком) -->
            <aside class="flex flex-col items-start">
              <div class="w-24 h-24 rounded-full overflow-hidden ring-1 ring-black/5 bg-[#F5F6F8] shrink-0">
                <video
                  :src="rocketVideo"
                  class="w-full h-full object-cover"
                  autoplay muted loop playsinline preload="metadata"
                />
              </div>
              <h1 class="mt-6 text-[#101012] text-[22px] leading-[28px] sm:text-[28px] sm:leading-[32px] font-medium">
                Что хочешь<br/>прокачать?
              </h1>
            </aside>

            <!-- ПРАВО: секции чипов -->
            <section class="space-y-9">
              <ChipsBlock title="Дизайн"          :items="chips.design"     :active-set="selected" @toggle="toggle" />
              <ChipsBlock title="Не дизайн"        :items="chips.nonDesign"  :active-set="selected" @toggle="toggle" />
              <ChipsBlock title="Работа в команде" :items="chips.teamwork"   :active-set="selected" show-more :base-count="3" @toggle="toggle" />
              <ChipsBlock title="Чтобы работать"   :items="chips.toWork"     :active-set="selected" @toggle="toggle" />
            </section>
          </div>
        </div>

        <!-- Нижняя линия блока чипов -->
        <div class="mt-9 h-px bg-[#787880]/[0.16]"></div>

        <!-- === БЛОК 2: ОПЫТ (без кружка слева) === -->
        <ExperienceField class="mt-9" v-model:months="expMonths" />

        <!-- Линия между «Опыт» и «Что тебе ближе» -->
        <div class="mt-9 h-px bg-[#787880]/[0.16]"></div>

        <!-- === БЛОК 3: ЧТО ТЕБЕ БЛИЖЕ (с 96×96 видео слева, другой ролик) === -->
        <CloserField class="mt-9" v-model="closer" :video-src="closerVideo" />

        <!-- Линия перед временем -->
        <div class="mt-9 h-px bg-[#787880]/[0.16]"></div>

        <PreferencesField class="mt-9"
            v-model:tab="prefTab"
            v-model:gender="gender"
            v-model:ageMin="ageMin"
            v-model:ageMax="ageMax"
            v-model:companies="companies"
            v-model:awards="awards"
            v-model:mentorSpec="mentorSpec"
            />

        <!-- Линия перед временем -->
        <div class="mt-9 h-px bg-[#787880]/[0.16]"></div>

        <!-- === БЛОК 4: ВРЕМЯ (реюз из модалки) === -->
        <TimeField
          class="mt-9"
          v-model:tab="timeTab"
          v-model:date="timeDate"
          v-model:time="timeSlot"
        />

        <!-- Линия перед блоком стоимости -->
        <div class="mt-9 h-px bg-[#787880]/[0.16]"></div>

        <!-- === БЛОК 5: ПРЕДПОЧТЕНИЯ ПО СТОИМОСТИ === -->
        <PricePrefsField class="mt-9" v-model="priceTier" name="price-tier" />

        <!-- Кнопки снизу (AppButton внутри BottomActions), отступы по ТЗ -->
        <BottomActions
          class="mt-9"
          primaryLabel="Подобрать ментора"
          :primaryIcon="magicIcon"
          secondaryLabel="Выбрать вручную"
          @primary="handleAutoPick"
          @secondary="handleManual"
        />
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from '#imports' // ← ДОБАВИЛ
import Header  from '@/components/profile/Header.vue'
import Stepper from '@/components/common/Stepper.vue'

import ChipsBlock      from '@/components/mentors/auto/ChipsBlock.vue'
import ExperienceField from '@/components/mentors/auto/ExperienceField.vue'
import CloserField     from '@/components/mentors/auto/CloserField.vue'
import TimeField       from '@/components/mentors/auto/TimeField.vue'
import PricePrefsField from '@/components/mentors/auto/PricePrefsField.vue'
import PreferencesField from '@/components/mentors/auto/PreferencesField.vue'

import BottomActions from '@/components/common/BottomActions.vue'

import rocketVideo from '@/src/assets/video/rocket.mp4'
import closerVideo from '@/src/assets/video/closer.mp4'
import iconBack    from '@/src/assets/icons/mentor/arrow-back.svg'
import magicIcon   from '@/src/assets/icons/cta-magic.svg'

const router = useRouter() // ← ДОБАВИЛ

/* выбранные чипы */
const selected = ref<Set<string>>(new Set())

const chips = {
  design: ['Не знаю','UI','UX','Лендинги','Приложения','Адаптивы','Работа с цветом','Работа со шрифтами','Дизайн-системы','Брендинг','Вектор','Ретушь'],
  nonDesign: ['Нейросети','2D-графика','3D-графика','Анимации','Прототипы','Разработка','Исследования','Аналитика'],
  teamwork: ['Софт-скиллы','Работа с разработчиками','Дизайн-менеджмент','Фасилитация','Кодревью макетов','Созвоны с заказчиком','Планирование','Ретроспективы','Таск-менеджмент','Митинги','Коммуникации'],
  toWork: ['Портфолио','Резюме','Собеседования','Продажи','Поиск клиентов','Работа с клиентами','Договоры, счёты, налоги']
}

const toggle = (t: string) => {
  const s = new Set(selected.value)
  s.has(t) ? s.delete(t) : s.add(t)
  selected.value = s
}

/* анкета */
const expMonths  = ref(11)
const closer     = ref<'freelance'|'biz'|'studio'|'product'|'idk'>('freelance')

/* время */
const timeTab  = ref<'any'|'soon'|'exact'>('exact')
const timeDate = ref<Date|null>(new Date())
const timeSlot = ref('16:00')

/* стоимость */
const priceTier = ref<'low'|'mid'|'top'>('low')

/* Параметры «С кем работать» */
const prefTab    = ref<'any'|'have'>('any')
const gender     = ref<'m'|'f'>('m')
const ageMin     = ref(18)
const ageMax     = ref(23)
const companies  = ref<string[]>(['sber','sovcom','vk'])
const awards     = ref<string[]>(['awwwards','behance'])
const mentorSpec = ref(0)

/* ==== Переход на шаг 2 ==== */
const goStep2 = () => router.push('/mentors/auto/step2') // ← ДОБАВИЛ

const handleAutoPick = () => {
  // здесь при необходимости собери state и отправь на бэк
  goStep2() // ← ДОБАВИЛ
}
const handleManual = () => {
  goStep2() // ← ДОБАВИЛ
}
</script>


<style scoped>
/* Левая колонка 320px, правый контент — авто; на мобилке — одна колонка */
.form-row { display:grid; grid-template-columns: 1fr; gap: 24px; }
@media (min-width: 1024px){
  .form-row { grid-template-columns: 320px 1fr; gap: 36px; }
}
</style>
