<script setup lang="ts">
import { useRoute } from 'vue-router'
import Sidebar      from '@/components/profile/sidebar/Sidebar.vue'
import MobileHeader from '@/components/profile/header/MobileHeader.vue'
import MobileBottom from '@/components/profile/footer/MobileBottom.vue'
import FlowStepperBar from '@/components/flow/FlowStepperBar.vue'
const route = useRoute()
</script>

<template>
  <!-- Весь фон страницы -->
  <div class="min-h-dvh bg-Backgrounds-Neutral-Primary">

    <!-- ===== FIXED SIDEBAR (только ≥lg) — вне любых скроллов ===== -->
    <aside
      class="hidden lg:block fixed inset-y-0 left-0 z-40
             w-[theme(spacing.sidebar)] border-r border-black/5 bg-[#F9F9FA]
             transform-none" 
      aria-label="Sidebar"
    >
      <!-- внутри сам компонент уже делает h-dvh и внутренний скролл средней зоны -->
      <Sidebar />
    </aside>

    <!-- ===== MAIN (скроллится только это) ===== -->
    <main class="min-h-dvh flex flex-col">

      <!-- Мобильный верх -->
      <div class="lg:hidden">
        <MobileHeader />
      </div>

      <!-- глобальная полоса шагов только на маршрутах с meta.flow -->
    <FlowStepperBar v-if="$route.meta?.flow?.enabled"/>

      <div
        class="w-full flex-1
               px-4 sm:px-6
               pt-[16px]
               pb-20 lg:pb-28
               lg:pl-[calc(theme(spacing.sidebar)+theme(spacing.gutterL))]
               lg:pr-gutterR"
      >
        <slot />
      </div>

      <!-- Мобильный низ -->
      <div class="lg:hidden sticky bottom-0 z-50">
        <MobileBottom />
      </div>
    </main>
  </div>
</template>
