<template>
  <!-- Десктоп: степпер по центру -->
  <div class="hidden lg:block">
    <Header :stepperBg="'#fff'">
      <template #left>
        <button @click="$router.back()" aria-label="Назад"
          class="h-10 w-10 grid place-items-center rounded-full outline outline-1 outline-[#787880]/10 hover:bg-black/5 transition">
          <img :src="iconBack" class="w-5 h-5 opacity-70" alt="">
        </button>
      </template>
      <template #center>
        <Stepper :steps="stepsToUse" :current="current"/>
      </template>
    </Header>
  </div>

  <!-- Мобилка: только назад + компактный степпер блоком (без sticky) -->
  <div class="lg:hidden px-4 pt-3 space-y-3">
    <button @click="$router.back()" aria-label="Назад"
      class="h-10 w-10 grid place-items-center rounded-full outline outline-1 outline-[#787880]/10 hover:bg-black/5 transition">
      <img :src="iconBack" class="w-5 h-5 opacity-70" alt="">
    </button>
    <Stepper :steps="stepsToUse" :current="current" compact/>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Header  from '@/components/profile/Header.vue'
import Stepper from '@/components/common/Stepper.vue'
import iconBack from '@/src/assets/icons/mentor/arrow-back.svg'

// дефолтные подписи
const DEFAULT_STEPS = ['Парочку вопросов','Выбор ментора','Выбор тарифа','Оплата']
const route = useRoute()

// meta.flow может переопределить steps и current
const stepsToUse = computed<string[]>(() =>
  (route.meta?.flow as any)?.steps ?? DEFAULT_STEPS
)
const current = computed<number>(() =>
  (route.meta?.flow as any)?.step ?? 0
)
</script>
