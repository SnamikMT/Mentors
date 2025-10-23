<template>
  <teleport to="body">
    <div v-if="visible" class="fixed inset-0 z-[999]" @keydown.esc.prevent="close">
      <div class="absolute inset-0" @click="close" />
      
      <div
        class="absolute inset-0 p-3 md:p-4 lg:p-6
               bg-Backgrounds-Overlay-Soft/20 backdrop-blur-md
               inline-flex justify-center items-center"
        role="dialog"
        aria-modal="true"
        aria-labelledby="gc2-title"
      >
        <div class="origin-center will-change-transform" :style="{ transform: `scale(${scale})` }">
          <div
            ref="panelRef"
            class="w-[480px] max-w-[95vw] p-9 relative
                   bg-white rounded-[32px]
                   shadow-[0px_16px_36px_0px_rgba(16,16,18,0.12),0px_24px_48px_0px_rgba(16,16,18,0.04),0px_36px_64px_0px_rgba(16,16,18,0.02),0px_48px_96px_0px_rgba(16,16,18,0.01)]
                   border border-Border-Neutral-Base/20
                   inline-flex flex-col gap-16 overflow-hidden"
          >
            <button
              type="button"
              class="p-2 absolute right-3 top-3 bg-[#787880]/10 rounded-full inline-flex justify-center items-center"
              @click="close"
              :aria-label="t('close')"
            >
              <img :src="iconClose" alt="close" class="size-6" />
            </button>
           
            <h2 id="gc2-title" class="text-Labels-Neutral-Primary text-2xl font-medium leading-normal">
              {{ t('title') }}
            </h2>
            
            <div class="self-stretch px-12 rounded-[32px] inline-flex justify-center items-end">
              <div
                class="w-80 h-48 relative rounded-[32px]
                       shadow-[0px_4px_9px_0px_rgba(0,123,255,0.07),0px_17px_17px_0px_rgba(0,123,255,0.06),0px_37px_22px_0px_rgba(0,123,255,0.03),0px_66px_26px_0px_rgba(0,123,255,0.01),0px_103px_29px_0px_rgba(0,123,255,0)]
                       border border-Border-Neutral-Base/20 overflow-hidden"
              >
                <img :src="imgMain" alt="certificate" class="absolute top-4 inset-0 w-full h-full object-cover" />
                <div class="absolute left-6 top-2 text-Labels-Static-Dark-Primary text-3xl font-medium leading-loose">
                  {{ formattedFace }}
                  ₽
                </div>
                
                <div
                  class="relative left-6 top-36 h-8 p-2 rounded-full
                         border border-Border-Neutral-Base/20
                         inline-flex items-center gap-3 overflow-hidden inset-0 bg-white/60 backdrop-blur-xl w-40"
                >
                  <div class="text-Labels-Static-Dark-Primary text-sm font-medium leading-3 tracking-[0.2px]">
                    {{ code }}
                  </div>
                  <img :src="iconChip" alt="chip" class="size-4" />
                </div>
              </div>
            </div>
            
            <div class="self-stretch flex flex-col gap-6">
              <!-- LINK (legend внутри рамки) -->
              <div
                class="relative flex items-center rounded-xl pl-3 pr-1 pt-5 pb-3 border"
                :class="linkHighlight ? 'border-blue-500' : 'border-Border-Neutral-Base/20'"
              >
                <div
                  class="absolute left-3 top-0 -translate-y-1/2 px-1 bg-white text-sm font-medium leading-3"
                  :class="linkHighlight ? 'text-blue-500' : 'text-[#3C3C43]/70'"
                >
                  {{ t('linkLabel') }}
                </div>
                <input
                  type="text"
                  :value="link"
                  readonly
                  class="flex-1 bg-transparent outline-none text-Labels-Neutral-Primary text-base leading-normal"
                  @focus="isLinkFocused = true"
                  @blur="isLinkFocused = false"
                />
                <button
                  type="button"
                  class="px-2 inline-flex justify-center items-center"
                  @click="copyLink"
                  :aria-label="t('copy')"
                >
                  <img :src="iconCopy" alt="copy" class="size-5" />
                </button>
              </div>
              
              <!-- EMAIL (legend внутри рамки) -->
              <div
                class="relative flex items-center rounded-xl pl-3 pr-1 pt-5 pb-3 border"
                :class="emailHighlight ? 'border-blue-500' : 'border-Border-Neutral-Base/20'"
              >
                <div
                  class="absolute left-3 top-0 -translate-y-1/2 px-1 bg-white text-sm font-medium leading-3"
                  :class="emailHighlight ? 'text-blue-500' : 'text-[#3C3C43]/70'"
                >
                  {{ t('emailLabel') }}
                </div>
                <input
                  v-model="emailLocal"
                  type="email"
                  class="flex-1 bg-transparent outline-none text-Labels-Neutral-Primary text-base leading-normal placeholder:text-Labels-Neutral-Tertiary"
                  :placeholder="t('emailPh')"
                  @focus="isEmailFocused = true"
                  @blur="isEmailFocused = false"
                />
                <button
                  type="button"
                  class="px-2 inline-flex justify-center items-center"
                  @click="pickFromContacts"
                  :aria-label="t('pick')"
                >
                  <img :src="iconContacts" alt="contacts" class="size-5" />
                </button>
              </div>
           
              <!-- CTA -->
              <button
                type="button"
                class="w-full p-4 bg-blue-500 rounded-2xl border border-Border-Neutral-Base/20 inline-flex justify-center items-center"
                @click="sendNow"
              >
                <span class="px-2 text-white text-base font-medium leading-normal">
                  {{ t('sendCta') }}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'

import imgMain      from '../src/assets/img/profile/gift/Frame 2136138869.png'
import iconClose    from '../src/assets/icons/profile/settings/close.svg'
import iconCopy     from '../src/assets/icons/profile/gift/copy.svg'
import iconContacts from '../src/assets/icons/profile/gift/qr.svg'
import iconChip     from '../src/assets/icons/profile/gift/copy.svg'

const props = withDefaults(defineProps<{
  modelValue?: boolean
  face?: number                 
  code?: string                 
  link?: string                
  email?: string                
  strings?: Partial<Record<
    'title'|'linkLabel'|'emailLabel'|'emailPh'|'copy'|'pick'|'sendCta'|'close',
    string
  >>
}>(), {
  modelValue: undefined,
  face: 10000,
  code: '1234 5678 9123',
  link: 'mnt.rs/c/123456789',
  email: '',
})

const emit = defineEmits<{
  (e: 'update:modelValue', v: boolean): void
  (e: 'send', payload: { link: string; email: string; face: number; code: string }): void
}>()

function close() { visible.value = false }

const panelRef = ref<HTMLElement|null>(null)

const isControlled = computed(() => props.modelValue !== undefined)
const localOpen = ref(false)
const visible = computed({
  get: () => (isControlled.value ? !!props.modelValue : localOpen.value),
  set: (v: boolean) => { isControlled.value ? emit('update:modelValue', v) : (localOpen.value = v) },
})

const formattedFace = computed(() => new Intl.NumberFormat('ru-RU').format(props.face || 0))

const emailLocal = ref(props.email)
watch(() => props.email, v => (emailLocal.value = v))

// === highlight states ===
const isLinkFocused = ref(false)
const isEmailFocused = ref(false)
const emailHighlight = computed(() => isEmailFocused.value || (emailLocal.value.trim().length > 0))
const linkHighlight  = computed(() => isLinkFocused.value)

function copyLink() {
  navigator.clipboard?.writeText(props.link || '')
}
function pickFromContacts() {
  requestAnimationFrame(() => (panelRef.value?.querySelector('input[type="email"]') as HTMLInputElement)?.focus())
}
function sendNow() {
  emit('send', { link: props.link || '', email: emailLocal.value.trim(), face: props.face || 0, code: props.code || '' })
}

const scale = ref(1)
function fitToViewport() {
  const margin = 24
  const vh = window.innerHeight
  const maxH = vh - margin * 2
  const el = panelRef.value
  if (!el) return
  const h = el.getBoundingClientRect().height
  const s = Math.min(1, maxH / h)
  scale.value = Number.isFinite(s) ? Math.max(0.6, s) : 1
}

watch(visible, async v => {
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
onUnmounted(() => window.removeEventListener('resize', fitToViewport))


const dict = {
  title: 'Поздравляем с покупкой',
  linkLabel: 'Ссылка',
  emailLabel: 'Почта, куда отправить сертификат',
  emailPh: 'email@example.com',
  copy: 'Скопировать ссылку',
  pick: 'Выбрать из контактов',
  sendCta: 'Отправить сертификат',
  close: 'Закрыть',
} as const
function t(k: keyof typeof dict) { return props.strings?.[k] ?? dict[k] }

defineExpose({ open: () => (visible.value = true), close: () => (visible.value = false) })
</script>
