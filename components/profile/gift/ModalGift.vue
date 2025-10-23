<template>
  <teleport to="body">
    <div
      v-if="visible"
      class="fixed inset-0 z-[999]"
      @keydown.esc.prevent="close"
    >
      <div class="absolute inset-0" @click="close" />
      
      <div
        class="absolute inset-0 p-3 md:p-4 lg:p-6
               bg-Backgrounds-Overlay-Soft/20 backdrop-blur-md
               inline-flex justify-end items-end gap-6"
        role="dialog"
        aria-modal="true"
        aria-labelledby="gc-title"
      >
        
        <div class="origin-bottom-right will-change-transform" :style="{ transform: `scale(${scale})` }">
          <div
            ref="panelRef"
            class="w-[480px] max-w-[95vw] p-9 relative
                   bg-white rounded-[32px]
                   shadow-[0px_16px_36px_0px_rgba(16,16,18,0.12),0px_24px_48px_0px_rgba(16,16,18,0.04),0px_36px_64px_0px_rgba(16,16,18,0.02),0px_48px_96px_0px_rgba(16,16,18,0.01)]
                   border border-Border-Neutral-Base/20
                   inline-flex flex-col justify-between items-start overflow-hidden"
          >
            <button
              type="button"
              class="p-2 absolute right-3 top-3 bg-[#787880]/10 rounded-full inline-flex justify-center items-center"
              @click="close"
              :aria-label="t('close')"
            >
              <img :src="iconClose" alt="close" class="size-6" />
            </button>
            
            <h2 id="gc-title" class="text-Labels-Neutral-Primary text-2xl font-medium leading-normal">
              {{ t('title') }}
            </h2>
           
            <div class="self-stretch flex flex-col items-center gap-4 mt-4">
              <div class="self-stretch px-12 rounded-[32px] inline-flex justify-center items-end gap-6 select-none">
                <img :src="imgSmallLeft" alt="small card" class="w-60 h-36 relative origin-top-left -rotate-5 rounded-3xl border border-Border-Neutral-Base/20" />
                <img :src="imgMain" alt="main card" class="w-80 h-48 relative rounded-[32px] shadow-[0px_4px_9px_0px_rgba(0,123,255,0.07),0px_17px_17px_0px_rgba(0,123,255,0.06),0px_37px_22px_0px_rgba(0,123,255,0.03),0px_66px_26px_0px_rgba(0,123,255,0.01),0px_103px_29px_0px_rgba(0,123,255,0.00)] border border-Border-Neutral-Base/20" />
                <img :src="imgSmallRight" alt="small card" class="w-60 h-36 relative origin-top-left rotate-5 rounded-3xl border border-Border-Neutral-Base/20" />
              </div>
              <div class="p-2 rounded-full inline-flex justify-center items-center gap-2">
                <img v-for="i in 4" :key="i" :src="i === 3 ? dotActive : dot" :alt="i === 3 ? 'active' : 'dot'" class="size-2" />
              </div>
            </div>
            
            <div class="self-stretch flex flex-col items-center gap-6 mt-4">
              <div class="self-stretch px-6 py-3 relative rounded-2xl border border-Border-Neutral-Base/20 inline-flex justify-start items-start gap-3">
               
                <div class="flex-1 py-3 flex justify-center items-center gap-2">
                  <div class="text-Labels-Neutral-Primary text-3xl font-medium leading-loose">{{ formattedPay }}</div>
                  <div class="text-Labels-Neutral-Primary text-3xl font-medium leading-loose">₽</div>
                </div>
               
                 <div class="br-1 w-0 self-stretch border border-Border-Neutral-Base/20"></div>
             
                <div class="flex-1 py-3 flex justify-center items-center gap-2">
                  <div class="text-Labels-Neutral-Primary text-3xl font-medium leading-loose">{{ formattedFace }}</div>
                  <div class="text-Labels-Neutral-Primary text-3xl font-medium leading-loose">₽</div>
                </div>
                
                <div class="absolute -top-2 left-14 bg-Backgrounds-Neutral-Grouped-Secondary px-1 py-0.5">
                  <div class="text-center text-Labels-Neutral-Primary text-sm font-medium leading-3">{{ t('youPay') }}</div>
                </div>
                <div class="absolute -top-2 left-[244px] bg-Backgrounds-Neutral-Grouped-Secondary px-1 py-0.5">
                  <div class="text-center text-Labels-Neutral-Primary text-sm font-medium leading-3">{{ t('certFor') }}</div>
                </div>
                <div class="absolute -top-2.5 left-[192px] bg-Backgrounds-Neutral-Grouped-Secondary px-1 py-0.5">
                  <img :src="iconArrowSwap" alt="swap" class="size-4" />
                </div>
              </div>
            
              <div class="self-stretch flex flex-col items-start">
                <div class="w-full inline-flex justify-between items-center">
                  <button type="button" class="p-3 rounded-xl border border-Border-Neutral-Base/20" @click="prev">
                    <img :src="iconChevronLeft" alt="prev" class="size-4" />
                  </button>
                  <button type="button" class="p-3 rounded-xl border border-Border-Neutral-Base/20" @click="next">
                    <img :src="iconChevronRight" alt="next" class="size-4" />
                  </button>
                </div>

                <div class="relative h-24 w-full mt-4">
                  <div class="size-[1440px] -left-[516px] top-0 absolute bg-Backgrounds-Neutral-Secondary rounded-full border border-Border-Neutral-Base/20" />
                  <div class="size-[1424px] -left-[508px] top-2 absolute rounded-full border-[12px] border-Border-Neutral-Base/20" />
                  
                  <img :src="tick" alt="tick" class="absolute left-[203px] -top-3 h-6" />
                  
                  <div class="absolute left-[178px] top-8 text-center text-Labels-Neutral-Primary text-xs font-medium leading-3">10 000 ₽</div>
                  <div class="absolute -left-16 top-[84px] -rotate-20 text-center text-Labels-Neutral-Tertiary/50 text-xs font-medium leading-3">3 000 ₽</div>
                  <div class="absolute left-[417px] top-[66px] rotate-20 text-center text-Labels-Neutral-Tertiary/50 text-xs font-medium leading-3">30 000 ₽</div>
                  <div class="absolute left-[296px] top-[36px] rotate-10 text-center text-Labels-Neutral-Tertiary/50 text-xs font-medium leading-3">20 000 ₽</div>
                  <div class="absolute left-[60px] top-[44px] -rotate-10 text-center text-Labels-Neutral-Tertiary/50 text-xs font-medium leading-3">5 000 ₽</div>
               
                  <div class="absolute left-[104px] top-[68px] bg-[#787880]/10 rounded-full px-2 py-1 inline-flex items-center">
                    <div class="text-center text-Labels-Neutral-Primary text-xs font-medium leading-3">{{ t('note') }}</div>
                  </div>
                </div>
              </div>
             
              <button
                type="button"
                class="w-full p-4 bg-blue-500 rounded-2xl shadow-[inset_0_-1px_1px_0_rgba(16,16,18,0.12)] inline-flex justify-center items-center"
                @click.stop="payNow"
              >
                <span class="px-2 text-white text-base font-medium leading-normal">{{ t('payCta') }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch, nextTick } from 'vue'

import imgSmallLeft   from '../src/assets/img/profile/gift/Frame 2136138871.png'
import imgMain        from '../src/assets/img/profile/gift/Frame 2136138869.png'
import imgSmallRight  from '../src/assets/img/profile/gift/Frame 2136138870.png'
import dot            from '../src/assets/icons/profile/gift/Dot.svg'
import dotActive      from '../src/assets/icons/profile/gift/DotActive.svg'
import iconChevronLeft  from '../src/assets/icons/profile/gift/chevron-back.svg'
import iconChevronRight from '../src/assets/icons/profile/gift/chevron-forward.svg'
import iconArrowSwap  from '../src/assets/icons/profile/gift/arrow-forward.svg'
import iconClose      from '../src/assets/icons/profile/settings/close.svg'
import tick           from '../src/assets/icons/profile/gift/Line 5 (Stroke).svg'

const props = withDefaults(defineProps<{
  modelValue?: boolean
  pay?: number
  face?: number
  strings?: Partial<Record<'title'|'youPay'|'certFor'|'note'|'payCta'|'close', string>>
}>(), {
  modelValue: undefined,
})

const emit = defineEmits<{
  (e: 'update:modelValue', v: boolean): void
  (e: 'pay', payload: { pay: number; face: number }): void
}>()

const panelRef = ref<HTMLElement | null>(null)

const isControlled = computed(() => props.modelValue !== undefined)
const localOpen = ref(false)
const visible = computed({
  get: () => (isControlled.value ? !!props.modelValue : localOpen.value),
  set: (v: boolean) => {
    if (isControlled.value) emit('update:modelValue', v)
    else localOpen.value = v
  },
})

const options = [3000, 5000, 10000, 20000, 30000]
const idx = ref(Math.max(0, options.indexOf(props.face ?? 10000)))

const payAmount  = computed(() => props.pay  ?? Math.round((options[idx.value] ?? 10000) * 1.1))
const faceAmount = computed(() => props.face ?? (options[idx.value] ?? 10000))

const formattedPay  = computed(() => new Intl.NumberFormat('ru-RU').format(payAmount.value))
const formattedFace = computed(() => new Intl.NumberFormat('ru-RU').format(faceAmount.value))

function next() { idx.value = (idx.value + 1) % options.length }
function prev() { idx.value = (idx.value - 1 + options.length) % options.length }

function open()  { visible.value = true }
function close() { visible.value = false }
function toggle(v?: boolean) { visible.value = v ?? !visible.value }

function payNow() {
  emit('pay', { pay: payAmount.value, face: faceAmount.value })
}

const scale = ref(1)

function fitToViewport() {
  const margin = 24 
  const vh = window.innerHeight
  const maxH = vh - margin * 2

  const el = panelRef.value
  if (!el) return

  const rect = el.getBoundingClientRect()
  const h = rect.height
  const s = Math.min(1, maxH / h)
  scale.value = Number.isFinite(s) ? Math.max(0.6, s) : 1
}

watch(visible, async (v) => {
  if (v) {
    await nextTick()
    fitToViewport()
    window.addEventListener('resize', fitToViewport)
  } else {
    window.removeEventListener('resize', fitToViewport)
    scale.value = 1
  }
})
onMounted(() => {
  if (visible.value) {
    nextTick().then(fitToViewport)
    window.addEventListener('resize', fitToViewport)
  }
})
onUnmounted(() => {
  window.removeEventListener('resize', fitToViewport)
})

const defaultStrings = {
  title: 'Покупка сертификата',
  youPay: 'Вы заплатите',
  certFor: 'Сертификат на',
  note: 'Хватит, чтобы повысить грейд',
  payCta: 'Перейти к оплате',
  close: 'Закрыть',
} as const
function t(key: keyof typeof defaultStrings) {
  return props.strings?.[key] ?? defaultStrings[key]
}

defineExpose({ open, close, toggle })
</script>

<style scoped>
button { -webkit-tap-highlight-color: transparent; }
</style>
