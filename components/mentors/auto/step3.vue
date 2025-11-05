<template>
  <div>
    <!-- маленький таймер-бейдж -->
    <div
      class="mt-4 inline-flex items-center h-8 px-3 rounded-full bg-[#F2F3F5]
             text-[13px] text-[#3C3C43]"
      v-if="showTimer"
    >
      Бронь действует ещё&nbsp;
      <span class="tabular-nums font-medium">{{ timeLeft }}</span>
    </div>

    <!-- верхний блок: слева текст, справа тарифы -->
    <div class="mt-6 grid grid-cols-1 lg:grid-cols-[320px,1fr] gap-6 lg:gap-[128px]">
      <!-- ЛЕВО -->
      <aside>
        <h1 class="text-[#101012] text-[32px] leading-[32px] tracking-[-1px] font-medium">
          Выбери тариф,<br />который тебе ближе
        </h1>
        <p
          class="mt-2 text-[16px] leading-[24px] tracking-[-0.25px]
                 text-[rgba(60,60,67,0.72)]"
        >
          Чем больше занятий, тем обучение будет выгоднее и эффективнее
        </p>
      </aside>

      <!-- ПРАВО: тарифы -->
      <section>
        <!-- карточки -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <label
            v-for="plan in innerPlans"
            :key="plan.id"
            class="group relative block rounded-[16px] border p-4 sm:p-5 bg-white cursor-pointer transition"
            :class="selectedPlanId === plan.id
              ? 'border-[#007AFF] ring-1 ring-[#007AFF]/20'
              : 'border-[#787880]/20 hover:bg-black/[.03]'"
          >
            <!-- radio справа сверху -->
            <span class="absolute right-4 top-4">
              <span
                class="radio-outer"
                :class="selectedPlanId === plan.id ? 'on' : 'off'"
              >
                <span v-if="selectedPlanId === plan.id" class="radio-inner"></span>
              </span>
            </span>

            <div class="text-[16px] leading-[20px] font-semibold text-[#101012]">
              {{ plan.title }}
            </div>
            <div
              class="mt-1 text-[16px] leading-[24px] tracking-[-0.25px]
                     text-[rgba(60,60,67,0.72)]"
            >
              {{ plan.subtitle }}
            </div>
            <div
              class="mt-3 text-[16px] leading-[20px] tracking-[-0.25px]
                     text-[#101012]"
            >
              {{ formatPrice(plan.pricePer) }} × {{ displayQty(plan) }}
            </div>

            <input
              class="sr-only"
              type="radio"
              name="tariff"
              :value="plan.id"
              :checked="selectedPlanId === plan.id"
              @change="selectPlan(plan)"
            />
          </label>
        </div>

        <!-- количество + CTA -->
        <div class="mt-5 flex flex-wrap items-center gap-3">
          <!-- счетчик -->
          <div
            class="inline-flex items-center rounded-[12px] border bg-white
                   [border-color:rgba(120,120,128,0.16)]"
          >
            <button
              class="h-10 w-12 text-[18px]"
              :class="qtyDisabled ? 'opacity-40 pointer-events-none' : ''"
              type="button"
              @click="decQty"
            >−</button>
            <div class="h-10 w-12 grid place-items-center text-[16px]">
              {{ qty }}
            </div>
            <button
              class="h-10 w-12 text-[18px]"
              :class="qtyDisabled ? 'opacity-40 pointer-events-none' : ''"
              type="button"
              @click="incQty"
            >+</button>
          </div>

          <AppButton
            class="ml-auto"
            radius="lg"
            @click="goPay"
          >
            Перейти к оплате&nbsp;{{ formatPrice(total) }}
          </AppButton>
        </div>
      </section>
    </div>

    <!-- линия -->
    <div class="mt-8 h-px bg-[#E6E6E6]"></div>

    <!-- Частые вопросы -->
    <div class="mt-8 grid grid-cols-1 lg:grid-cols-[320px,1fr] gap-6 lg:gap-[128px]">
      <aside>
        <div
          class="text-[32px] leading-[32px] tracking-[-1px] font-medium text-[#101012]"
        >
          Частые вопросы
        </div>
        <p
          class="mt-2 text-[16px] leading-[24px] tracking-[-0.25px]
                 text-[rgba(60,60,67,0.72)]"
        >
          Собрали ответы на самые популярные вопросы — чтобы всё было понятно заранее.
        </p>
      </aside>

      <section class="divide-y divide-[#E6E6E6] lg:max-w-[560px]">
        <details v-for="(q,i) in faqs" :key="i" class="py-3">
          <summary
            class="flex items-center justify-between cursor-pointer
                   text-[16px] leading-[24px]"
          >
            <span>{{ q.q }}</span>
            <svg class="w-4 h-4 transition" viewBox="0 0 24 24" fill="none">
              <path
                d="M6 9l6 6 6-6"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
          </summary>
          <p
            class="mt-2 text-[16px] leading-[24px] tracking-[-0.25px]
                   text-[rgba(60,60,67,0.72)]"
          >
            {{ q.a }}
          </p>
        </details>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount, ref } from 'vue'
import AppButton from '@/components/ui/AppButton.vue'

type Plan = {
  id: string
  title: string
  subtitle: string
  pricePer: number
  fixedQty?: number
}

const props = withDefaults(defineProps<{
  plans?: Plan[]
  selectedPlanId?: string | null
  qty?: number
  showTimer?: boolean
  reserveMs?: number
}>(), {
  plans: () => ([
    { id:'p1',  title:'1 звонок',  subtitle:'Понять, подходит ли ментор и формат',         pricePer: 3900 },
    { id:'p6',  title:'6 звонков', subtitle:'Закрыть пробелы и точечные вопросы',           pricePer: 3800, fixedQty: 6 },
    { id:'p11', title:'11 звонков',subtitle:'Как дизайн-курс, но индивидуально',           pricePer: 3700, fixedQty: 11 },
    { id:'p16', title:'16 звонков',subtitle:'Повысить свой грейд и улучшить навыки',        pricePer: 3600, fixedQty: 16 },
  ]),
  selectedPlanId: null,
  qty: 1,
  showTimer: true,
  reserveMs: 15 * 60 * 1000,
})

const emit = defineEmits<{
  (e:'patch', payload: Record<string, unknown>): void
  (e:'next'): void
}>()

/* тарифы в работе */
const innerPlans = ref<Plan[]>(props.plans)

/* выбранный тариф */
const selectedPlanId = ref<string>(
  props.selectedPlanId ?? innerPlans.value[0]?.id ?? 'p1'
)

/* количество */
const qty = ref<number>(props.qty ?? 1)

/* блокировка +/- если тариф фиксированный */
const currentPlan = computed<Plan | undefined>(() =>
  innerPlans.value.find(p => p.id === selectedPlanId.value)
)
const qtyDisabled = computed(() => !!currentPlan.value?.fixedQty)

function selectPlan(p: Plan) {
  selectedPlanId.value = p.id
  if (p.fixedQty) qty.value = p.fixedQty
}

function incQty() {
  if (qtyDisabled.value) return
  if (qty.value < 10) qty.value++
}
function decQty() {
  if (qtyDisabled.value) return
  if (qty.value > 1) qty.value--
}

/* итоговая сумма */
const total = computed(() => {
  const plan = currentPlan.value
  if (!plan) return 0
  const count = plan.fixedQty ?? qty.value
  return plan.pricePer * count
})

function formatPrice(n: number) {
  return n.toLocaleString('ru-RU') + ' ₽'
}

/* как выводим количество в карточке */
function displayQty(p: Plan) {
  return p.fixedQty ?? 1
}

/* таймер */
const timeLeft = ref('15:00')
let timer: any = null
let endAt = Date.now() + props.reserveMs

onMounted(() => {
  if (!props.showTimer) return
  timer = setInterval(() => {
    const left = Math.max(0, endAt - Date.now())
    const m = Math.floor(left / 60000)
    const s = Math.floor((left % 60000) / 1000)
    timeLeft.value = `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`
    if (left <= 0) {
      clearInterval(timer)
    }
  }, 250)
})

onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})

/* переход к оплате — но мы тут только говорим родителю */
function goPay() {
  emit('patch', {
    planId: selectedPlanId.value,
    qty: qty.value,
    total: total.value,
  })
  emit('next')
}

/* FAQ */
const faqs = [
  {
    q: 'Как перенести или отменить звонок?',
    a: 'Перенос возможен не позднее чем за 24 часа до встречи. Отмена — в личном кабинете.',
  },
  {
    q: 'Что будет после оплаты?',
    a: 'Получишь письмо, напоминания и доступ к чату с ментором.',
  },
  {
    q: 'Что если ментор не понравится?',
    a: 'Подберём другого без доплаты — бронь и прогресс сохранятся.',
  },
  {
    q: 'Можно ли задавать вопросы после звонка?',
    a: 'Да, в рамках тарифа доступен чат и короткие фоллоу-апы.',
  },
  {
    q: 'Будут ли домашние задания?',
    a: 'По желанию: чек-листы и задания для закрепления результата.',
  },
]
</script>

<style scoped>
.radio-outer{
  width:20px; height:20px;
  border-radius:9999px;
  display:inline-grid;
  place-items:center;
  border:1px solid #D0D0D0;
  background:#fff;
}
.radio-outer.on{
  border-color:#007AFF;
  background:#007AFF;
}
.radio-inner{
  width:10px; height:10px;
  border-radius:9999px;
  background:#fff;
}

.tabular-nums{ font-variant-numeric: tabular-nums; }

details[open] summary svg { transform: rotate(180deg); }
</style>
