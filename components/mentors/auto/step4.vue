<template>
  <div>
    <!-- Таймер брони с убывающей заливкой -->
    <div
      class="mt-4 inline-flex items-center h-8 px-3 rounded-full relative overflow-hidden text-[13px] text-[#3C3C43]"
      style="background:#F2F3F5"
      aria-live="polite"
    >
      <span
        class="absolute inset-0 pointer-events-none transition-[width] duration-200 ease-linear"
        :style="{ width: progressPct + '%', background: '#E5E7EB' }"
      />
      <span class="relative z-10">
        Бронь действует ещё&nbsp;<span class="tabular-nums font-medium">{{ timeLeft }}</span>
      </span>
    </div>

    <!-- Две колонки -->
    <div class="mt-6 grid grid-cols-1 lg:grid-cols-[1fr,360px] gap-6 lg:gap-8">
      <!-- ЛЕВО -->
      <main>
        <h1 class="text-[32px] leading-[32px] tracking-[-1px] font-medium text-[#101012]">
          Теперь осталось оплатить
        </h1>
        <p class="mt-2 text-[16px] leading-[24px] tracking-[-0.25px] text-[rgba(60,60,67,0.72)]">
          После оплаты время первого звонка будет зафиксировано
        </p>

        <!-- Методы оплаты -->
        <section class="mt-7">
          <div class="text-[16px] leading-[24px] font-medium text-[#101012] mb-3">
            Выберите метод оплаты
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <label
              v-for="m in payMethods"
              :key="m.id"
              class="pay-card"
              :class="payMethod === m.id ? 'pay-card--on' : ''"
            >
              <div class="flex items-center gap-3">
                <img v-if="m.logo" :src="m.logo" class="h-6 w-auto" alt="">
                <span v-else class="text-[16px] text-[#101012]">{{ m.label }}</span>
                <span class="ml-auto radio-outer" :class="payMethod === m.id ? 'on' : 'off'">
                  <span v-if="payMethod === m.id" class="radio-inner"></span>
                </span>
              </div>
              <div class="mt-1 text-[16px] leading-[24px] tracking-[-0.25px] text-[rgba(60,60,67,0.72)]">
                {{ m.note }}
              </div>
              <input class="sr-only" type="radio" name="pay" :value="m.id" :checked="payMethod === m.id" @change="payMethod = m.id" />
            </label>

            <!-- «Списать с баланса» (пока заглушка) -->
            <label class="sm:col-span-2 pay-card">
              <div class="flex items-center gap-3">
                <span class="text-[16px] leading-[24px] tracking-[-0.25px] text-[#101012]">Списать с баланса</span>
                <span class="ml-auto radio-outer off"></span>
              </div>
            </label>
          </div>

          <!-- Привязка карты -->
          <div class="mt-4 rounded-[16px] bg-[#E8F1FF] border border-[#CFE3FF] p-4 sm:p-5">
            <label class="flex items-center gap-3 cursor-pointer select-none">
              <button type="button" class="switch" :class="bindCard ? 'switch--on' : ''" @click="bindCard = !bindCard">
                <span class="switch__dot"></span>
              </button>
              <div>
                <div class="text-[16px] leading-[24px] tracking-[-0.25px] text-[#101012] font-medium">
                  Привязать карту для будущих звонков
                </div>
                <div class="text-[14px] leading-[20px] text-[rgba(60,60,67,0.72)]">
                  Списывать будем перед созвоном, если на балансе пусто. Данные карты не храним.
                </div>
              </div>
            </label>
          </div>
        </section>

        <!-- Согласие -->
        <label class="mt-6 flex items-start gap-3">
          <input type="checkbox" v-model="agree" class="mt-[3px] h-4 w-4 rounded border border-[#D0D0D0]" />
          <span class="text-[14px] leading-[20px] text-[#101012]">
            Согласен с <a href="#" class="underline">Правилами сервиса</a>
          </span>
        </label>
      </main>

      <!-- ПРАВО: сводка -->
      <aside>
        <div class="sticky top-4">
          <div class="rounded-[20px] border border-[#E6E6E6] bg-white overflow-hidden shadow-[0_1px_0_rgba(0,0,0,0.02)]">
            <div class="px-4 sm:px-5 py-4 border-b border-[#E6E6E6] text-[18px] leading-[20px] font-medium">
              Оплата менторства
            </div>

            <div class="px-4 sm:px-5 py-4 space-y-4">
              <div class="row">
                <div class="row__l">
                  <div class="text-[14px] text-[rgba(60,60,67,0.72)]">Стоимость ментора</div>
                  <div class="text-[14px] text-[#101012] font-medium">{{ mentorName || 'Имя ментора' }}</div>
                </div>
                <div class="row__r text-right">
                  <div v-if="showOld" class="text-[13px] line-through text-[#3C3C43]/50">{{ fmtMinor(oldPriceMinor) }}</div>
                  <div class="text-[16px] leading-[20px] tabular-nums">{{ fmtMinor(quote?.pricePerMinor || 0) }}</div>
                </div>
              </div>

              <div class="row">
                <div class="row__l text-[14px] text-[#101012]">Количество звонков</div>
                <div class="row__r">
                  <div class="inline-flex items-center rounded-[12px] border bg-white [border-color:rgba(120,120,128,0.16)]">
                    <button class="h-8 w-8" @click="decQty" :disabled="qty <= minQty">−</button>
                    <div class="h-8 w-8 grid place-items-center tabular-nums">{{ qty }}</div>
                    <button class="h-8 w-8" @click="incQty" :disabled="qty >= maxQty">+</button>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="row__l text-[14px] text-[#101012]">Работа сервиса</div>
                <div class="row__r text-[14px]">{{ serviceFeePct }}</div>
              </div>

              <div class="row">
                <div class="row__l text-[14px] text-[#101012]">Скидка за тариф</div>
                <div class="row__r text-[14px] text-[#007AFF]">−{{ fmtMinor(quote?.discountMinor || 0) }}</div>
              </div>

              <div class="row">
                <div class="row__l text-[14px] text-[#101012]">Сертификат</div>
                <div class="row__r text-[14px] text-[#007AFF]">−{{ fmtMinor(quote?.couponMinor || 0) }}</div>
              </div>

              <!-- Купон -->
              <div>
                <button class="text-[14px] text-[#007AFF] underline underline-offset-2" @click="couponOpen = !couponOpen">
                  Ввести сертификат
                </button>
                <transition name="fade-slide">
                  <div v-if="couponOpen" class="mt-2 flex gap-2">
                    <input
                      v-model="couponCode"
                      placeholder="Код"
                      class="h-9 flex-1 rounded-[10px] border px-3 text-[14px] [border-color:rgba(120,120,128,0.16)]"
                    />
                    <button class="h-9 px-3 rounded-[10px] bg-[#F2F3F5]" @click="applyCoupon">Применить</button>
                  </div>
                </transition>
              </div>
            </div>

            <div class="px-4 sm:px-5 py-4 border-t border-[#E6E6E6]">
              <div class="flex items-center justify-between">
                <div class="text-[14px] text-[#101012]">Итого</div>
                <div class="text-right">
                  <div v-if="hasDiscount" class="text-[12px] text-[#3C3C43]/60 line-through tabular-nums">
                    {{ fmtMinor(quote?.totalBeforeMinor || 0) }}
                  </div>
                  <div class="text-[24px] leading-[24px] font-medium tabular-nums">
                    {{ fmtMinor(quote?.totalMinor || 0) }}
                  </div>
                </div>
              </div>

              <AppButton class="w-full mt-3" size="lg" radius="lg" :disabled="!agree" @click="submitPay">
                Оплатить&nbsp;{{ fmtMinor(quote?.totalMinor || 0) }}
              </AppButton>
            </div>
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import AppButton from '@/components/ui/AppButton.vue'

type PayMethod = 'yo'|'stripe'|'paypal'|'crypto'

/**
 * Пропы:
 * - quote          — серверная котировка (в минимальных единицах)
 * - mentorName     — имя в шапке сводки
 * - qty            — текущее количество (UI)
 * - feeRate        — показываемая ставка сервиса (для подписи), сервер считает сам
 * - oldPriceMinor  — старая цена за звонок (для перечёркнутого, если есть)
 * - timerMs        — время брони
 */
const props = withDefaults(defineProps<{
  quote?: {
    planId: string
    qty: number
    pricePerMinor: number
    subtotalMinor: number
    serviceFeeMinor: number
    discountMinor: number
    couponMinor: number
    totalBeforeMinor: number
    totalMinor: number
    currency: 'RUB'|'USD'|'EUR'
  } | null
  mentorName?: string
  qty?: number
  feeRate?: number
  oldPriceMinor?: number
  timerMs?: number
  minQty?: number
  maxQty?: number
}>(), {
  quote: null,
  mentorName: 'Имя ментора',
  qty: 1,
  feeRate: 0.10,
  oldPriceMinor: 0,
  timerMs: 10 * 60 * 1000,
  minQty: 1,
  maxQty: 16,
})

const emit = defineEmits<{
  (e:'patch', payload: Record<string, unknown>): void         // смена qty, метода, bindCard и т.п.
  (e:'requote', payload: { qty: number; couponCode?: string }): void // запрос новой котировки родителем
  (e:'checkout', payload: { method: PayMethod; bindCard: boolean }): void // запуск оплаты родителем
}>()

/* ===== Таймер брони с прогрессом ===== */
const timeLeft = ref('10:00')
const progressPct = ref(100)
let timer: any = null
const endAt = Date.now() + (props.timerMs || 0)
onMounted(() => {
  timer = setInterval(() => {
    const left = Math.max(0, endAt - Date.now())
    const m = Math.floor(left / 60000)
    const s = Math.floor((left % 60000) / 1000)
    timeLeft.value = `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`
    progressPct.value = Math.max(0, (left / (props.timerMs || 1)) * 100)
    if (left <= 0) clearInterval(timer)
  }, 250)
})
onBeforeUnmount(() => timer && clearInterval(timer))

/* ===== Методы оплаты / bind card / согласие ===== */
const payMethod = ref<PayMethod>('yo')
const bindCard = ref(false)
const agree = ref(true)
const payMethods = [
  { id: 'yo',     label: 'ЮKassa',  logo: '', note: 'Карты РФ 1%' },
  { id: 'stripe', label: 'Stripe',  logo: '', note: 'Любые карты 0%' },
  { id: 'paypal', label: 'PayPal',  logo: '', note: 'PayPal 5%' },
  { id: 'crypto', label: 'Crypto',  logo: '', note: 'Криптовалюта 0%' },
] as const

/* ===== Кол-во / купоны (UI) ===== */
const qty = ref(props.qty)
watch(() => props.quote?.qty, (q) => { if (typeof q === 'number') qty.value = q }, { immediate: true })

const minQty = computed(() => props.minQty!)
const maxQty = computed(() => props.maxQty!)

function incQty() {
  if ((qty.value ?? 1) >= maxQty.value) return
  qty.value! += 1
  emit('patch', { qty: qty.value })
  emit('requote', { qty: qty.value })
}
function decQty() {
  if ((qty.value ?? 1) <= minQty.value) return
  qty.value! -= 1
  emit('patch', { qty: qty.value })
  emit('requote', { qty: qty.value })
}

/* Купон — только инициируем requote наверх */
const couponOpen = ref(false)
const couponCode = ref('')
function applyCoupon() {
  emit('requote', { qty: qty.value!, couponCode: couponCode.value.trim() })
}

/* ===== Вся денежка только серверная ===== */
function fmtMinor(minor: number) {
  // RUB: 100 = 1 ₽
  const major = (minor || 0) / 100
  return major.toLocaleString('ru-RU', { style: 'currency', currency: props.quote?.currency || 'RUB', maximumFractionDigits: 2 })
}
const showOld = computed(() => (props.oldPriceMinor || 0) > (props.quote?.pricePerMinor || 0))
const oldPriceMinor = computed(() => props.oldPriceMinor || 0)
const hasDiscount = computed(() => ((props.quote?.discountMinor || 0) + (props.quote?.couponMinor || 0)) > 0)
const serviceFeePct = computed(() => {
  const before = props.quote?.subtotalMinor || 0
  const fee = props.quote?.serviceFeeMinor || 0
  if (!before) return '0%'
  return Math.round((fee / before) * 100) + '%'
})

/* ===== Оплата ===== */
function submitPay() {
  if (!agree.value) return
  emit('patch', { payMethod: payMethod.value, bindCard: bindCard.value })
  emit('checkout', { method: payMethod.value, bindCard: bindCard.value })
}
</script>

<style scoped>
.tabular-nums{ font-variant-numeric: tabular-nums; }

.row{ display:flex; align-items:center; justify-content:space-between; gap:12px; }
.row__l{ display:flex; flex-direction:column; gap:2px; }
.row__r{ display:flex; align-items:center; gap:8px; }

/* карточки оплаты */
.pay-card{
  border:1px solid rgba(120,120,128,.16);
  border-radius:16px;
  background:#fff;
  padding:16px 16px 14px 16px;
  cursor:pointer;
  transition:.15s ease;
}
.pay-card:hover{ background:#FAFAFB; }
.pay-card--on{ border-color:#007AFF; box-shadow:0 0 0 1px rgba(0,122,255,.12) inset; }

/* radio 20×20 */
.radio-outer{
  width:20px; height:20px; border-radius:9999px;
  display:inline-grid; place-items:center;
  border:1px solid #D0D0D0; background:#fff;
}
.radio-outer.on{ border-color:#007AFF; background:#007AFF; }
.radio-inner{ width:10px; height:10px; border-radius:9999px; background:#fff; }

/* switch */
.switch{ width:44px; height:26px; border-radius:9999px; background:#DADDE2; position:relative; transition:.18s; }
.switch__dot{ position:absolute; top:3px; left:3px; width:20px; height:20px; border-radius:9999px; background:#fff; box-shadow:0 1px 2px rgba(0,0,0,.12); transition:.18s; }
.switch--on{ background:#34C759; } .switch--on .switch__dot{ left:21px; }

/* анимация купона */
.fade-slide-enter-from{ opacity:0; transform:translateY(-4px); }
.fade-slide-enter-active{ transition:all .2s ease; }
</style>
