<template>
  <div>

    <!-- === БЛОК 1: ЧИПЫ === -->
    <div class="mt-9">
      <div class="form-row">
        <!-- ЛЕВО: 96×96 и заголовок -->
        <aside class="flex flex-col items-start">
          <div class="w-24 h-24 rounded-full overflow-hidden ring-1 ring-black/5 bg-[#F5F6F8] shrink-0">
            <video
              :src="rocketVideo"
              class="w-full h-full object-cover"
              autoplay
              muted
              loop
              playsinline
              preload="metadata"
            />
          </div>
          <h1
            class="mt-6 text-[#101012] text-[22px] leading-[28px]
                   sm:text-[28px] sm:leading-[32px] font-medium"
          >
            Что хочешь<br />прокачать?
          </h1>
        </aside>

        <!-- ПРАВО: секции чипов -->
        <section class="space-y-9">
          <ChipsBlock
            title="Дизайн"
            :items="chipsSource.design"
            :active-set="selectedSet"
            @toggle="toggleChip"
          />
          <ChipsBlock
            title="Не дизайн"
            :items="chipsSource.nonDesign"
            :active-set="selectedSet"
            @toggle="toggleChip"
          />
          <ChipsBlock
            title="Работа в команде"
            :items="chipsSource.teamwork"
            :active-set="selectedSet"
            show-more
            :base-count="3"
            @toggle="toggleChip"
          />
          <ChipsBlock
            title="Чтобы работать"
            :items="chipsSource.toWork"
            :active-set="selectedSet"
            @toggle="toggleChip"
          />
        </section>
      </div>
    </div>

    <!-- разделитель -->
    <div class="mt-9 h-px bg-[#787880]/[0.16]"></div>

    <!-- === БЛОК 2: ОПЫТ === -->
    <ExperienceField class="mt-9" v-model:months="localExpMonths" />

    <!-- разделитель -->
    <div class="mt-9 h-px bg-[#787880]/[0.16]"></div>

    <!-- === БЛОК 3: Что тебе ближе === -->
    <CloserField class="mt-9" v-model="localCloser" :video-src="closerVideo" />

    <!-- разделитель -->
    <div class="mt-9 h-px bg-[#787880]/[0.16]"></div>

    <!-- === БЛОК 4: Предпочтения к ментору === -->
    <PreferencesField
      class="mt-9"
      v-model:tab="localPrefTab"
      v-model:gender="localGender"
      v-model:ageMin="localAgeMin"
      v-model:ageMax="localAgeMax"
      v-model:companies="localCompanies"
      v-model:awards="localAwards"
      v-model:mentorSpec="localMentorSpec"
    />

    <!-- разделитель -->
    <div class="mt-9 h-px bg-[#787880]/[0.16]"></div>

    <!-- === БЛОК 5: Время === -->
    <TimeField
      class="mt-9"
      v-model:tab="localTimeTab"
      v-model:date="localTimeDate"
      v-model:time="localTimeSlot"
    />

    <!-- разделитель -->
    <div class="mt-9 h-px bg-[#787880]/[0.16]"></div>

    <!-- === БЛОК 6: Стоимость === -->
    <PricePrefsField class="mt-9" v-model="localPriceTier" name="price-tier" />

    <!-- кнопки -->
    <BottomActions
      class="mt-9"
      primaryLabel="Подобрать ментора"
      :primaryIcon="magicIcon"
      secondaryLabel="Выбрать вручную"
      @primary="submitAndNext"
      @secondary="submitAndNext"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

import ChipsBlock       from '@/components/mentors/auto/ChipsBlock.vue'
import ExperienceField  from '@/components/mentors/auto/ExperienceField.vue'
import CloserField      from '@/components/mentors/auto/CloserField.vue'
import PreferencesField from '@/components/mentors/auto/PreferencesField.vue'
import TimeField        from '@/components/mentors/auto/TimeField.vue'
import PricePrefsField  from '@/components/mentors/auto/PricePrefsField.vue'
import BottomActions    from '@/components/common/BottomActions.vue'

import rocketVideo from '@/src/assets/video/rocket.mp4'
import closerVideo from '@/src/assets/video/closer.mp4'
import magicIcon   from '@/src/assets/icons/cta-magic.svg'

const props = defineProps<{
  // то, что пришло из стора
  chips?: string[]
  expMonths?: number
  closer?: 'freelance'|'biz'|'studio'|'product'|'idk'
  prefTab?: 'any'|'have'
  gender?: 'm'|'f'
  ageMin?: number
  ageMax?: number
  companies?: string[]
  awards?: string[]
  mentorSpec?: number
  timeTab?: 'any'|'soon'|'exact'
  timeDate?: Date|null
  timeSlot?: string
  priceTier?: 'low'|'mid'|'top'
}>()

const emit = defineEmits<{
  (e: 'patch', payload: Record<string, unknown>): void
  (e: 'next'): void
}>()

/**
 * Чипы — у нас в сторе будем хранить просто массив строк,
 * а внутри компонента работаем Set’ом.
 */
const selectedSet = ref<Set<string>>(new Set(props.chips ?? []))

const chipsSource = {
  design: [
    'Не знаю','UI','UX','Лендинги','Приложения','Адаптивы',
    'Работа с цветом','Работа со шрифтами','Дизайн-системы','Брендинг',
    'Вектор','Ретушь'
  ],
  nonDesign: [
    'Нейросети','2D-графика','3D-графика','Анимации','Прототипы',
    'Разработка','Исследования','Аналитика'
  ],
  teamwork: [
    'Софт-скиллы','Работа с разработчиками','Дизайн-менеджмент',
    'Фасилитация','Кодревью макетов','Созвоны с заказчиком','Планирование',
    'Ретроспективы','Таск-менеджмент','Митинги','Коммуникации'
  ],
  toWork: [
    'Портфолио','Резюме','Собеседования','Продажи','Поиск клиентов',
    'Работа с клиентами','Договоры, счёты, налоги'
  ]
}

function toggleChip(t: string) {
  const s = new Set(selectedSet.value)
  s.has(t) ? s.delete(t) : s.add(t)
  selectedSet.value = s
}

/* локальные копии пропсов — чтобы форма была контролируемой внутри */
const localExpMonths  = ref(props.expMonths ?? 11)
const localCloser     = ref(props.closer ?? 'freelance')

const localPrefTab    = ref(props.prefTab ?? 'any')
const localGender     = ref(props.gender ?? 'm')
const localAgeMin     = ref(props.ageMin ?? 18)
const localAgeMax     = ref(props.ageMax ?? 23)
const localCompanies  = ref<string[]>(props.companies ? [...props.companies] : ['sber','sovcom','vk'])
const localAwards     = ref<string[]>(props.awards ? [...props.awards] : ['awwwards','behance'])
const localMentorSpec = ref(props.mentorSpec ?? 0)

const localTimeTab  = ref(props.timeTab ?? 'exact')
const localTimeDate = ref<Date|null>(props.timeDate ?? new Date())
const localTimeSlot = ref(props.timeSlot ?? '16:00')

const localPriceTier = ref(props.priceTier ?? 'low')

/**
 * отправляем наверх и двигаем шаг
 */
function submitAndNext() {
  emit('patch', {
    chips: Array.from(selectedSet.value),
    expMonths: localExpMonths.value,
    closer: localCloser.value,
    prefTab: localPrefTab.value,
    gender: localGender.value,
    ageMin: localAgeMin.value,
    ageMax: localAgeMax.value,
    companies: localCompanies.value,
    awards: localAwards.value,
    mentorSpec: localMentorSpec.value,
    timeTab: localTimeTab.value,
    timeDate: localTimeDate.value,
    timeSlot: localTimeSlot.value,
    priceTier: localPriceTier.value,
  })
  emit('next')
}
</script>

<style scoped>
.form-row {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
}
@media (min-width: 1024px) {
  .form-row {
    grid-template-columns: 320px 1fr;
    gap: 36px;
  }
}
</style>
