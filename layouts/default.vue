<template>
  <div class="relative">
    <div :class="activeModal ? 'blur-sm lg:blur-[6px] pointer-events-none' : ''">
      <NuxtPage />
    </div>

    <!-- Покупка -->
    <ClientOnly>
      <ModalGift
        :model-value="activeModal === 'gift'"
        @update:modelValue="v => { if (!v) setModal(null) }"
        @pay="onPay"
      />
    </ClientOnly>

    <!-- Отправка -->
    <ClientOnly>
      <ModalGiftSend
        :model-value="activeModal === 'gift-send'"
        @update:modelValue="v => { if (!v) setModal(null) }"
        :face="sendFace ?? 10000"
        @send="onSend"
      />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ModalGift from '../components/profile/gift/ModalGift.vue'
import ModalGiftSend from '../components/profile/gift/ModalGiftSend.vue'

const route = useRoute()
const router = useRouter()

// единое состояние активной модалки
const activeModal = ref<null | 'gift' | 'gift-send'>(null)

// синхронизация: route -> state
const modalFromQuery = computed(() => {
  const m = route.query.modal
  return (Array.isArray(m) ? m[m.length - 1] : m) as any
})
watch(
  modalFromQuery,
  (m) => { activeModal.value = (m === 'gift' || m === 'gift-send') ? m : null },
  { immediate: true }
)

// помощник: state -> route
function setModal(m: null | 'gift' | 'gift-send') {
  const q: Record<string, any> = { ...route.query }
  if (m) q.modal = m
  else delete q.modal
  router.replace({ query: q })
}

// данные для второй модалки
const sendFace = ref<number | undefined>(undefined)

// события
function onPay(p: { pay: number; face: number }) {
  sendFace.value = p.face
  setModal('gift-send')           // просто переключаем активную модалку
}
function onSend(/* payload */) {
  setModal(null)                  // закрываем все
}
</script>
