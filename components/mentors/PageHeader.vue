<template>
  <!-- DESKTOP (≥lg): всё как раньше -->
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
  <div
    v-if="showMobile"
    class="lg:hidden pointer-events-none"
  >
    <!-- маленькая синяя точка-пейджер над карточкой (как в макете) -->
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
            <!-- зелёная точка статуса -->
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
            class="h-11 rounded-xl bg-white text-[#101012] border border-black/10 font-medium flex items-center justify-center gap-2"
            @click="$emit('changeMentor')"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M4 7h9M4 7l3-3m-3 3 3 3M20 17h-9m9 0-3-3m3 3-3 3" stroke="#101012" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Сменить ментора
          </button>
        </div>
      </div>

      <!-- безопасная зона под «вырез» -->
      <div class="h-[env(safe-area-inset-bottom)]" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
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
  avatarUrl: { type: String, default: '/_fallback-avatar.png' }, // подставь свой ассет
  /** Принудительно показать мобильную карточку (напр. в тестах) */
  forceMobile: { type: Boolean, default: false }
})
defineEmits(['openProfile','changeMentor'])

/* Показываем мобильный блок, если экран < lg или принудительно */
const showMobile = computed(() => props.forceMobile || true) // сам компонент скрывается классом lg:hidden

/* CSS-переменные для безопасных отступов */
const safeInset = computed(() => ({
  paddingBottom: 'calc(env(safe-area-inset-bottom) + 8px)'
}))
</script>
