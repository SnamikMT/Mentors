<!-- pages/profile/roadmap.vue -->
<template>
  <div class="w-full max-w-[1440px] bg-Backgrounds-Neutral-Primary flex flex-col lg:flex-row gap-0 lg:gap-12 overflow-hidden">
    <!-- Sidebar только на ≥lg -->
    <Sidebar class="hidden lg:flex" />
    
    <!-- Мобильный хедер -->
    <MobileHeader class="lg:hidden mb-4" />

    <!-- Контент: на мобилке даём внутренние отступы, на десктопе фикс-контейнер 1008 и левый паддинг 48 -->
    <div class="w-full lg:max-w-[1008px] px-4 sm:px-6 lg:px-0 lg:pl-[48px] pt-4 lg:pt-6 flex flex-col">

      <!-- Десктопный Header с отступом 32px снизу -->
      <Header class="hidden lg:block lg:!mb-8" sectionTitle="Карьерный путь" :sectionIcon="sectionIcon" />

      <!-- Сетка: мобилка 1 колонка; ≥lg — фикс 600 / 360 с гэпом 48 -->
      <div class="grid grid-cols-1 lg:grid-cols-[600px,360px] gap-5 sm:gap-6 lg:gap-12 items-start">
        <!-- LEFT -->
        <section>
          <!-- Бейдж -->
          <div class="mb-6">
            <span
              class="inline-block rounded-full text-white font-medium"
              style="font-size:12px; line-height:12px; letter-spacing:0; background:#3E87FF; padding:4px 8px"
            >
              Сделано ИИ, но ментор слово дополнит
            </span>
          </div>

          <!-- Раздел 1 -->
          <div class="mb-6">
            <h2 class="text-[#020203] font-medium mb-6" style="font-size:24px; line-height:24px; letter-spacing:-0.5px">
              1. Понимание основ
            </h2>

            <div class="mb-6">
              <div class="text-[#020203] font-medium mb-2" style="font-size:20px; line-height:20px; letter-spacing:-0.33px">
                Что такое лендинг
              </div>
              <ul class="space-y-1 text-[#020203]">
                <li style="font-size:16px; line-height:24px; letter-spacing:-0.25px">— Цель, структура, отличие от сайта</li>
                <li style="font-size:16px; line-height:24px; letter-spacing:-0.25px">— Воронка внимания, фреймворки AIDA/4U</li>
              </ul>
            </div>

            <div class="mb-6">
              <div class="text-[#020203] font-medium mb-2" style="font-size:20px; line-height:20px; letter-spacing:-0.33px">
                Насмотренность
              </div>
              <ul class="space-y-1 text-[#020203]">
                <li style="font-size:16px; line-height:24px; letter-spacing:-0.25px">— Разбор лучших лендингов</li>
                <li style="font-size:16px; line-height:24px; letter-spacing:-0.25px">— Понимание трендов и подходов</li>
                <li style="font-size:16px; line-height:24px; letter-spacing:-0.25px">— Повтор дизайнов (копирование в фигме)</li>
              </ul>
            </div>

            <div>
              <div class="text-[#020203] font-medium mb-2" style="font-size:20px; line-height:20px; letter-spacing:-0.33px">
                Базовый визуал
              </div>
              <ul class="space-y-1 text-[#020203]">
                <li style="font-size:16px; line-height:24px; letter-spacing:-0.25px">— Композиция, отступы, ритм</li>
                <li style="font-size:16px; line-height:24px; letter-spacing:-0.25px">— Цвет и типографика</li>
                <li style="font-size:16px; line-height:24px; letter-spacing:-0.25px">— Примитивы UI: кнопки, карточки, формы</li>
              </ul>
            </div>
          </div>

          <hr class="border-[#E5E5EA]" />

          <!-- Раздел 2 -->
          <div class="mt-6">
            <h2 class="text-[#020203] font-medium mb-6" style="font-size:24px; line-height:24px; letter-spacing:-0.5px">
              2. Инструменты и практика
            </h2>

            <div class="mb-6">
              <div class="text-[#020203] font-medium mb-2" style="font-size:20px; line-height:20px; letter-spacing:-0.33px">
                Figma
              </div>
              <ul class="space-y-1 text-[#020203]">
                <li style="font-size:16px; line-height:24px; letter-spacing:-0.25px">— Сетки, компоненты, авто-лейаут</li>
                <li style="font-size:16px; line-height:24px; letter-spacing:-0.25px">— Визуальные приёмы и эффекты</li>
                <li style="font-size:16px; line-height:24px; letter-spacing:-0.25px">— Прототипирование и преза</li>
              </ul>
            </div>

            <div>
              <div class="text-[#020203] font-medium mb-2" style="font-size:20px; line-height:20px; letter-spacing:-0.33px">
                Tilda / Framer / Webflow
              </div>
              <ul class="space-y-1 text-[#020203]">
                <li style="font-size:16px; line-height:24px; letter-spacing:-0.25px">— Но-код сборка</li>
                <li style="font-size:16px; line-height:24px; letter-spacing:-0.25px">— Анимации и переходы</li>
                <li style="font-size:16px; line-height:24px; letter-spacing:-0.25px">— Публикация и хостинг</li>
              </ul>
            </div>
          </div>
        </section>

        <!-- RIGHT unified panel (radius 32) -->
        <aside class="bg-white rounded-[32px] border border-black/10 overflow-hidden w-full">
          <!-- Цель -->
          <section class="p-5 sm:p-6">
            <div class="text-[#020203] font-medium mb-2" style="font-size:20px; line-height:20px; letter-spacing:-0.33px">
              Цель
            </div>
            <p class="text-[#3C3C43]/80 mb-4" style="font-size:16px; line-height:24px; letter-spacing:-0.25px">
              Научиться делать красивые лендинги
            </p>
            <button
              type="button"
              class="h-10 px-4 rounded-full border border-black/10 bg-white text-[#020203] text-base font-medium hover:bg-black/[0.03] transition"
            >
              Изменить цель
            </button>
          </section>

          <hr class="border-[#E5E5EA]/80" />

          <!-- Баллы -->
          <section class="p-5 sm:p-6">
            <div class="mb-3">
              <svg viewBox="-28 -28 56 56" class="w-16 h-16 sm:w-[90px] sm:h-[90px]">
                <g>
                  <polygon v-for="r in [24,18,12,6]" :key="r" :points="hex(r)" fill="none" stroke="#9AA0A6" stroke-opacity="0.2" />
                  <polygon :points="hexBy([14,20,18,12,10,16])" fill="rgba(0,122,255,0.08)" stroke="#007AFF" />
                </g>
              </svg>
            </div>
            <div class="text-[#020203] font-medium" style="font-size:20px; line-height:20px; letter-spacing:-0.33px">
              36 баллов <span class="text-[#3C3C43]/60 font-normal">из 100</span>
            </div>
            <div class="text-[#3C3C43]/70 mt-1" style="font-size:14px; line-height:20px">
              Ты лучше 95% дизайнеров
            </div>

            <button
              class="mt-4 h-10 px-4 rounded-full text-[#007AFF] font-medium hover:bg-[#dcebff] transition"
              style="background:rgba(0,122,255,.12)"
              type="button"
            >
              Открыть полный отчёт
            </button>
          </section>

          <hr class="border-[#E5E5EA]/80" />

          <!-- Активность как на скрине -->
          <section class="p-5 sm:p-6">
            <div class="text-[#020203] font-medium mb-4" style="font-size:20px; line-height:20px; letter-spacing:-0.33px">
              Активность
            </div>

            <div class="py-4 first:pt-0 border-t first:border-t-0 border-[#E5E5EA]/80">
              <div class="text-[#3C3C43]/70 mb-1" style="font-size:16px; line-height:24px; letter-spacing:0">
                Звонков с ментором
              </div>
              <div class="flex items-center gap-2">
                <img :src="iconCalls" alt="" class="w-5 h-5" />
                <div class="text-[#020203] font-semibold" style="font-size:20px; line-height:24px; letter-spacing:-0.33px">
                  7 звонков
                </div>
              </div>
            </div>

            <div class="py-4 border-t border-[#E5E5EA]/80">
              <div class="text-[#3C3C43]/70 mb-1" style="font-size:16px; line-height:24px; letter-spacing:0">
                Часов с ментором
              </div>
              <div class="flex items-center gap-2">
                <img :src="iconHours" alt="" class="w-5 h-5" />
                <div class="text-[#020203] font-semibold" style="font-size:20px; line-height:24px; letter-spacing:-0.33px">
                  15 часов
                </div>
              </div>
            </div>

            <div class="py-4 border-t border-[#E5E5EA]/80">
              <div class="text-[#3C3C43]/70 mb-1" style="font-size:16px; line-height:24px; letter-spacing:0">
                Заданий выполнено
              </div>
              <div class="flex items-center gap-2">
                <img :src="iconTasksCustom" alt="" class="w-5 h-5" />
                <div class="text-[#020203] font-semibold" style="font-size:20px; line-height:24px; letter-spacing:-0.33px">
                  15 заданий
                </div>
              </div>
            </div>
          </section>
        </aside>
      </div>
    </div>
  </div>
</template>

<script setup>
import Sidebar from '@/components/profile/sidebar/Sidebar.vue'
import Header from '@/components/profile/Header.vue'
import MobileHeader from '@/components/profile/header/MobileHeader.vue'

import sectionIcon from '@/src/assets/icons/profile/header/roadmap.svg'
import iconCalls from '@/src/assets/icons/profile/roadmap/custom-calls.svg'
import iconHours from '@/src/assets/icons/profile/roadmap/custom-hours.svg'
import iconTasksCustom from '@/src/assets/icons/profile/roadmap/custom-tasks.svg'

const hex = (r) =>
  Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i - Math.PI / 2
    return `${Math.cos(a) * r},${Math.sin(a) * r}`
  }).join(' ')

const hexBy = (radii) =>
  radii.map((r, i) => {
    const a = (Math.PI / 3) * i - Math.PI / 2
    return `${Math.cos(a) * r},${Math.sin(a) * r}`
  }).join(' ')
</script>
