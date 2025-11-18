<template>
  <!-- DESKTOP (≥lg): как было -->
  <div class="hidden lg:block">
    <Header v-if="headerType === 'mentor-inline'" class="mb-12">
      <template #left>
        <Mentor :name="mentorName" :subtitle="mentorSubtitle" />
      </template>
    </Header>

    <div v-else>
      <Header :section-title="title" :section-icon="icon" class="mb-8" />
      <Mentor
        v-if="headerType === 'title-then-mentor'"
        :name="mentorName"
        :subtitle="mentorSubtitle"
        class="mt-6"
      />
    </div>
  </div>

  <!-- MOBILE (<lg): док-карта внизу -->
  <div v-if="showMobile" class="lg:hidden">
    <div class="flex justify-center mb-2">
      <span class="inline-block w-2 h-2 rounded-full bg-[#2187FF]" />
    </div>

    <div
      class="fixed left-0 right-0 bottom-0 z-[55] pointer-events-auto"
      :style="safeInset"
    >
      <div
        class="mx-4 rounded-2xl bg-white shadow-[0_8px_40px_rgba(16,24,40,.18)]
               border border-black/10 p-3"
      >
        <!-- верх: аватар + имя -->
        <div class="flex items-center gap-3 px-1 py-1">
          <div class="relative h-10 w-10 rounded-full overflow-hidden shrink-0">
            <img :src="avatarUrl" alt="" class="absolute inset-0 w-full h-full object-cover" />
            <span class="absolute -right-0.5 -bottom-0.5 h-3 w-3 rounded-full bg-[#2BD576] ring-2 ring-white" />
          </div>

          <div class="flex-1 min-w-0">
            <div class="text-[15px] font-medium text-[#101012] truncate">{{ mentorName }}</div>
            <div class="text-[13px] text-[#3C3C43B3] leading-4">Ваш ментор</div>
          </div>
        </div>

        <!-- кнопки -->
        <div class="mt-2 flex flex-col gap-2">
          <button
            type="button"
            class="h-11 rounded-xl bg-[#EDEEF2] text-[#101012] font-medium flex items-center justify-center gap-2"
            @click="$emit('openProfile')"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Z" stroke="#101012" stroke-width="2" stroke-linecap="round"/>
              <path d="M4 20a8 8 0 0 1 16 0" stroke="#101012" stroke-width="2" stroke-linecap="round"/>
            </svg>
            Перейти в профиль
          </button>

          <button
            type="button"
            class="h-11 rounded-xl bg-white text-[#101012] border border-black/10 font-medium flex items-center justify-center gap-2"
            @click.stop="openFirstModal"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M4 7h9M4 7l3-3m-3 3 3 3M20 17h-9m9 0-3-3m3 3-3 3"
                    stroke="#101012" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Сменить ментора
          </button>
        </div>
      </div>

      <div class="h-[env(safe-area-inset-bottom)]" />
    </div>
  </div>

  <!-- ====== ДВЕ МОДАЛКИ ====== -->
  <teleport to="body">
    <!-- Шаг 1 -->
    <transition name="fade-scale">
      <div
        v-if="showStep1"
        class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/45 backdrop-blur-sm"
      >
        <div
          class="w-[320px] sm:w-[420px] max-w-[90vw]
                 bg-white rounded-[32px] shadow-[0_18px_60px_rgba(15,23,42,0.35)]
                 px-5 sm:px-7 pt-6 pb-5"
        >
          <h2 class="text-[20px] sm:text-[22px] leading-[24px] font-semibold text-[#101012]">
            Заменить ментора?
          </h2>
          <p class="mt-3 text-[14px] leading-[20px] text-[rgba(60,60,67,0.72)]">
            Мы не рекомендуем менять ментора — это может негативно сказаться на обучении.
            Придётся заново выстраивать контакт и часть прогресса потеряется.
          </p>

          <div class="mt-5 flex flex-col sm:flex-row gap-2">
            <button
              type="button"
              class="h-11 flex-1 rounded-[999px] bg-[#FF3B30] text-white font-semibold text-[15px]"
              @click="goToStep2"
            >
              Заменить ментора
            </button>
            <button
              type="button"
              class="h-11 flex-1 rounded-[999px] bg-[#F2F2F7] text-[#101012] font-semibold text-[15px]"
              @click="closeAll"
            >
              Отменить
            </button>
          </div>
        </div>
      </div>
    </transition>

    <!-- Шаг 2 -->
    <transition name="fade-scale">
      <div
        v-if="showStep2"
        class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/45 backdrop-blur-sm"
      >
        <div
          class="w-[340px] sm:w-[520px] max-w-[94vw]
                 bg-white rounded-[32px] shadow-[0_18px_60px_rgba(15,23,42,0.35)]
                 px-5 sm:px-7 pt-6 pb-5 relative"
        >
          <button
            type="button"
            class="absolute top-4 right-4 h-8 w-8 rounded-full bg-[#F2F2F7] grid place-items-center"
            @click="closeAll"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M18 6 6 18M6 6l12 12" stroke="#101012" stroke-width="2" stroke-linecap="round" />
            </svg>
          </button>

          <h2 class="text-[22px] sm:text-[24px] leading-[26px] font-semibold text-[#101012] pr-8">
            Расскажи, что именно случилось
          </h2>
          <p class="mt-3 text-[14px] leading-[20px] text-[rgba(60,60,67,0.72)]">
            Ментор может быть неидеален, это нормально. Если поделишься деталями, мы постараемся сделать обучение комфортнее.
          </p>

          <div class="mt-4 text-[13px] font-medium text-[#101012]">
            Выбери пункты, описывающие ситуацию
          </div>

          <div class="mt-3 flex flex-wrap gap-2">
            <button
              v-for="reason in reasons"
              :key="reason"
              type="button"
              class="px-4 py-2 rounded-[999px] border text-[14px] leading-[20px]"
              :class="selectedReasons.has(reason)
                ? 'bg-[#101012] text-white border-[#101012]'
                : 'bg-white text-[#101012] border-[#E5E5EA]'"
              @click="toggleReason(reason)"
            >
              {{ reason }}
            </button>
          </div>

          <div class="mt-6 flex flex-col sm:flex-row gap-2">
            <button
              type="button"
              class="h-11 flex-1 rounded-[999px] bg-[#101012] text-white font-semibold text-[15px]"
              @click="confirmChange"
            >
              К выбору ментора
            </button>
            <button
              type="button"
              class="h-11 flex-1 rounded-[999px] bg-[#F2F2F7] text-[#101012] font-semibold text-[15px]"
              @click="contactSupport"
            >
              Написать в поддержку
            </button>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import Header from '@/components/profile/Header.vue'
import Mentor from './Mentor.vue'

const route = useRoute()
const headerType = route.meta.headerType ?? 'default'

const props = defineProps({
  title: { type: String, default: '' },
  icon: { type: String, default: '' },
  mentorName: { type: String, default: 'Даниил Ерошов' },
  mentorSubtitle: { type: String, default: 'Ваш ментор' },
  avatarUrl: { type: String, default: '/_fallback-avatar.png' },
  forceMobile: { type: Boolean, default: false }
})

const emit = defineEmits(['openProfile', 'changeMentor', 'openSupport'])

const showMobile = computed(() => props.forceMobile || true)

const safeInset = computed(() => ({
  paddingBottom: 'calc(env(safe-area-inset-bottom) + 8px)'
}))

const showStep1 = ref(false)
const showStep2 = ref(false)

function openFirstModal() {
  showStep1.value = true
}

function goToStep2() {
  showStep1.value = false
  showStep2.value = true
}

function closeAll() {
  showStep1.value = false
  showStep2.value = false
}

/* причины */
const reasons = [
  'Все хорошо, но хочу другого ментора',
  'Просто не понравился',
  'Мало опыта',
  'Опаздывает',
  'Плохо объясняет',
  'Грубит',
  'Навязывает услуги',
  'Другое'
]

const selectedReasons = ref(new Set())

function toggleReason(r) {
  const next = new Set(selectedReasons.value)
  next.has(r) ? next.delete(r) : next.add(r)
  selectedReasons.value = next
}

function confirmChange() {
  emit('changeMentor', Array.from(selectedReasons.value))
  closeAll()
}

function contactSupport() {
  emit('openSupport', Array.from(selectedReasons.value))
  closeAll()
}
</script>

<style scoped>
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: opacity 0.18s ease, transform 0.18s ease;
}
.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: translateY(8px) scale(0.98);
}
</style>
