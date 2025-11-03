<template>
  <NuxtLayout name="app">
    <Header :stepperBg="'#fff'">
      <template #left>
        <button
          @click="$router.back()"
          class="h-10 w-10 grid place-items-center rounded-full outline outline-1 outline-[#787880]/10 hover:bg-black/5 transition"
          aria-label="Назад"
        >
          <img :src="iconBack" class="w-5 h-5 opacity-70" alt="">
        </button>
      </template>

      <template #center>
        <Stepper
          :steps="['Парочку вопросов','Выбор ментора','Выбор тарифа','Оплата']"
          :current="3"
        />
      </template>
    </Header>

    <div class="px-4 sm:px-6 lg:px-0">
      <div class="mx-auto w-full max-w-[1008px]">

        <!-- Таймер брони с убывающей заливкой -->
        <div
          class="mt-4 inline-flex items-center h-8 px-3 rounded-full relative overflow-hidden text-[13px] text-[#3C3C43]"
          style="background:#F2F3F5"
          aria-live="polite"
        >
          <span
            class="absolute inset-0 pointer-events-none transition-[width] duration-250 ease-linear"
            :style="{ width: progressPct+'%', background:'#E5E7EB' }"
          />
          <span class="relative z-10">Бронь действует ещё&nbsp;<span class="tabular-nums font-medium">{{ timeLeft }}</span></span>
        </div>

        <!-- Две колонки: 1fr + 360 -->
        <div class="mt-6 grid grid-cols-1 lg:grid-cols-[1fr,360px] gap-6 lg:gap-8">
          <!-- ЛЕВАЯ КОЛОНКА -->
          <main>
            <h1 class="text-[32px] leading-[32px] tracking-[-1px] font-medium text-[#101012]">
              Теперь осталось оплатить
            </h1>
            <p class="mt-2 text-[16px] leading-[24px] tracking-[-0.25px] text-[rgba(60,60,67,0.72)]">
              После оплаты время первого звонка будет зафиксировано
            </p>

            <!-- Методы оплаты (две колонки) -->
            <section class="mt-7">
              <div class="text-[16px] leading-[24px] font-medium text-[#101012] mb-3">
                Выберите метод оплаты
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label
                  v-for="m in payMethods"
                  :key="m.id"
                  class="pay-card"
                  :class="method===m.id ? 'pay-card--on' : ''"
                >
                  <div class="flex items-center gap-3">
                    <img :src="m.logo" class="h-6 w-auto" alt="" />
                    <span class="ml-auto radio-outer" :class="method===m.id ? 'on' : 'off'">
                      <span v-if="method===m.id" class="radio-inner"></span>
                    </span>
                  </div>
                  <div class="mt-1 text-[16px] leading-[24px] tracking-[-0.25px] text-[rgba(60,60,67,0.72)]">
                    {{ m.note }}
                  </div>
                  <input class="sr-only" type="radio" name="pay" :value="m.id" :checked="method===m.id" @change="method=m.id" />
                </label>

                <!-- Списать с баланса -->
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
                  <button type="button" class="switch" :class="bindCard ? 'switch--on' : ''" @click="bindCard=!bindCard">
                    <span class="switch__dot"></span>
                  </button>
                  <div>
                    <div class="text-[16px] leading-[24px] tracking-[-0.25px] text-[#101012] font-medium">
                      Привязать карту для будущих звонков
                    </div>
                    <div class="text-[14px] leading-[20px] text-[rgba(60,60,67,0.72)]">
                      Оплата будет списана за сутки до звонка, если на балансе нет нужной суммы. Мы не храним данные карты.
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

          <!-- ПРАВАЯ КОЛОНКА — СВОДКА -->
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
                      <div class="text-[14px] text-[#101012] font-medium">Фамилия И.</div>
                    </div>
                    <div class="row__r text-right">
                      <div class="text-[13px] line-through text-[#3C3C43]/50">{{ oldPriceFmt }}</div>
                      <div class="text-[16px] leading-[20px] tabular-nums">{{ pricePerFmt }}</div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="row__l text-[14px] text-[#101012]">Количество звонков</div>
                    <div class="row__r">
                      <div class="inline-flex items-center rounded-[12px] border bg-white [border-color:rgba(120,120,128,0.16)]">
                        <button class="h-8 w-8" @click="decQty" :disabled="qty<=1">−</button>
                        <div class="h-8 w-8 grid place-items-center tabular-nums">{{ qty }}</div>
                        <button class="h-8 w-8" @click="incQty" :disabled="qty>=16">+</button>
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="row__l text-[14px] text-[#101012]">Работа сервиса</div>
                    <div class="row__r text-[14px]">{{ (feeRate*100).toFixed(0) }}%</div>
                  </div>

                  <div class="row">
                    <div class="row__l text-[14px] text-[#101012]">Скидка за тариф</div>
                    <div class="row__r text-[14px] text-[#007AFF]">−{{ discountFmt }}</div>
                  </div>

                  <div class="row">
                    <div class="row__l text-[14px] text-[#101012]">Сертификат</div>
                    <div class="row__r text-[14px] text-[#007AFF]">−{{ couponAppliedFmt }}</div>
                  </div>

                  <div>
                    <button class="text-[14px] text-[#007AFF] underline underline-offset-2" @click="toggleCoupon">
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
                      <div v-if="hasDiscount" class="text-[12px] text-[#3C3C43]/60 line-through tabular-nums">{{ totalBeforeFmt }}</div>
                      <div class="text-[24px] leading-[24px] font-medium tabular-nums">{{ totalFmt }}</div>
                    </div>
                  </div>

                  <AppButton
                    class="w-full mt-3"
                    size="lg"
                    radius="lg"
                    :disabled="!agree"
                    @click="pay"
                  >
                    Оплатить&nbsp;{{ totalFmt }}
                  </AppButton>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import Header  from '@/components/profile/Header.vue'
import Stepper from '@/components/common/Stepper.vue'
import AppButton from '@/components/ui/AppButton.vue'
import iconBack from '@/src/assets/icons/mentor/arrow-back.svg'

import yoLogo     from '@/src/assets/pay/yo.svg'
import stripeLogo from '@/src/assets/pay/stripe.svg'
import paypalLogo from '@/src/assets/pay/paypal.svg'
import cryptoLogo from '@/src/assets/pay/crypto.svg'

const router = useRouter()

/* ====== таймер с визуальным прогрессом ====== */
const totalMs   = 10 * 60 * 1000  // 10 минут
const endAt     = Date.now() + totalMs
const timeLeft  = ref('10:00')
const progressPct = ref(100)      // ширина серой заливки
let t:any
onMounted(() => {
  t = setInterval(() => {
    const left = Math.max(0, endAt - Date.now())
    const m = Math.floor(left/60000)
    const s = Math.floor((left%60000)/1000)
    timeLeft.value = `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`
    progressPct.value = Math.max(0, (left/totalMs)*100)
    if (left<=0) clearInterval(t)
  }, 250)
})
onBeforeUnmount(()=> clearInterval(t))

/* ====== расчёты ====== */
const pricePer = ref(3800)
const oldPrice = ref(3900)
const qty      = ref(6)
const feeRate  = 0.10
const discount = ref(600)
const couponApplied = ref(2000)

const hasDiscount = computed(()=> (discount.value + couponApplied.value) > 0)
const subtotal    = computed(()=> pricePer.value * qty.value)
const serviceFee  = computed(()=> Math.round(subtotal.value * feeRate))
const totalBefore = computed(()=> subtotal.value + serviceFee.value)
const total       = computed(()=> Math.max(totalBefore.value - discount.value - couponApplied.value, 0))

const pricePerFmt      = computed(()=> fmt(pricePer.value))
const oldPriceFmt      = computed(()=> fmt(oldPrice.value))
const discountFmt      = computed(()=> fmt(discount.value))
const couponAppliedFmt = computed(()=> fmt(couponApplied.value))
const totalFmt         = computed(()=> fmt(total.value))
const totalBeforeFmt   = computed(()=> fmt(totalBefore.value))

function fmt(n:number){ return n.toLocaleString('ru-RU') + ' ₽' }
function incQty(){ if(qty.value<16) qty.value++ }
function decQty(){ if(qty.value>1)  qty.value-- }

/* методы оплаты */
const method = ref<'yo'|'stripe'|'paypal'|'crypto'>('yo')
const payMethods = [
  { id:'yo',     logo: yoLogo,     note:'Карты РФ 1%' },
  { id:'stripe', logo: stripeLogo, note:'Любые карты 0%' },
  { id:'paypal', logo: paypalLogo, note:'PayPal 5%' },
  { id:'crypto', logo: cryptoLogo, note:'Криптовалюта 0%' },
]

/* прочее */
const bindCard = ref(false)
const agree    = ref(true)

const couponOpen = ref(false)
const couponCode = ref('')
function toggleCoupon(){ couponOpen.value = !couponOpen.value }
function applyCoupon(){ couponApplied.value = couponCode.value.trim().toUpperCase()==='GIFT2000' ? 2000 : 0 }

function pay(){ if(!agree.value) return; router.push('/mentors/auto/success') }
</script>

<style scoped>
.tabular-nums{ font-variant-numeric: tabular-nums; }

/* сводка — двуколоночные строки */
.row{ display:flex; align-items:center; justify-content:space-between; gap:12px; }
.row__l{ display:flex; flex-direction:column; gap:2px; }
.row__r{ display:flex; align-items:center; gap:8px; }

/* карточки оплаты */
.pay-card{
  @apply rounded-[16px] border bg-white p-4 sm:p-5 cursor-pointer transition;
  border-color: rgba(120,120,128,.16);
}
.pay-card:hover{ background:#FAFAFB; }
.pay-card--on{ border-color:#007AFF; box-shadow:0 0 0 1px rgba(0,122,255,.12) inset; }

/* radio 20×20 */
.radio-outer{
  width:20px; height:20px; border-radius:9999px; display:inline-grid; place-items:center;
  border:1px solid #D0D0D0; background:#fff;
}
.radio-outer.on{ border-color:#007AFF; background:#007AFF; }
.radio-inner{ width:10px; height:10px; border-radius:9999px; background:#fff; }

/* switch */
.switch{ width:44px; height:26px; border-radius:9999px; background:#DADDE2; position:relative; transition:.18s; }
.switch__dot{ position:absolute; top:3px; left:3px; width:20px; height:20px; border-radius:9999px; background:#fff; box-shadow:0 1px 2px rgba(0,0,0,.12); transition:.18s; }
.switch--on{ background:#34C759; } .switch--on .switch__dot{ left:21px; }

/* анимации */
.fade-slide-enter-from{ opacity:0; transform:translateY(-4px); }
.fade-slide-enter-active{ transition:all .2s ease; }
</style>
