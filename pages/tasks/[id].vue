<template>
  <div
    class="w-full max-w-[1440px] bg-Backgrounds-Neutral-Primary flex flex-col lg:flex-row gap-3 lg:gap-3 overflow-hidden"
  >
    <!-- Sidebar только ≥lg -->
    <Sidebar class="hidden lg:flex shrink-0 pr-6" />

    <!-- Мобильный Header -->
    <MobileHeader class="lg:hidden" />

    <!-- Контент -->
    <div class="flex-1 px-4 sm:px-6 lg:pl-12 lg:pr-8 pt-2 lg:pt-4">
      <!-- верхняя строка: назад + десктопный header -->
      <div class="flex items-center gap-3 mb-3 lg:mb-4">
        <button
          @click="goBack"
          aria-label="Назад"
          class="h-9 w-9 grid place-items-center rounded-full outline outline-1 outline-[#787880]/10 hover:bg-black/[.03] transition"
        >
          <img :src="iconBack" class="w-5 h-5 opacity-70" alt="" />
        </button>

        <!-- десктопный заголовок раздела -->
        <Header class="hidden lg:flex" sectionTitle="Задания от ментора" :sectionIcon="sectionIcon" />
      </div>

      <!-- статус -->
      <div class="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-[#FF9500] text-white text-sm font-medium leading-3 w-max">
        <img :src="iconActive" class="w-4 h-4" alt="" />
        Активное задание
      </div>

      <!-- Заголовок -->
      <h1
        class="mt-3 lg:mt-4 text-[28px] leading-[32px] sm:text-[32px] sm:leading-[36px] lg:text-[40px] lg:leading-[44px] font-medium text-[#020203]"
      >
        Оптимизация handoff<br class="hidden sm:block" />
        в разработке продукта
      </h1>

      <!-- Мета -->
      <div class="mt-2 flex flex-nowrap items-center gap-2 text-base text-[#020203]">
        <span class="shrink-0">Задание #3912 от</span>
        <span class="inline-flex items-center gap-1">
          <img :src="avatar" class="w-6 h-6 rounded-full" alt="автор" />
          Саши · 22 марта 2025
        </span>
      </div>

      <!-- Превью-видео -->
      <div class="mt-4 lg:mt-6 relative w-full rounded-2xl overflow-hidden">
        <div class="aspect-[16/9] w-full bg-black/10">
          <img :src="imgGood" alt="video" class="w-full h-full object-cover" />
        </div>

        <!-- нижняя панель -->
        <div class="absolute left-0 right-0 bottom-0 p-3 sm:p-4 bg-gradient-to-t from-black/55 to-transparent">
          <div class="h-1 rounded-full bg-white/15 overflow-hidden">
            <div class="h-1 w-[20%] bg-white"></div>
          </div>
          <div class="mt-3 flex items-center justify-between">
            <div class="flex items-center gap-3">
              <img :src="iconPlay" class="w-5 h-5" alt="play" />
              <img :src="iconVolume" class="w-5 h-5" alt="vol" />
            </div>
            <img :src="iconScreen" class="w-5 h-5" alt="fs" />
          </div>
        </div>
      </div>

      <!-- Вложения (горизонтальная лента на мобилке) -->
      <div class="mt-3 flex gap-3 overflow-x-auto scrollbar-clean py-1">
        <div class="min-w-[64px] h-16 w-16 rounded-2xl overflow-hidden">
          <img :src="imgPreview" class="w-full h-full object-cover" alt="" />
        </div>
        <div class="min-w-[64px] h-16 w-16 rounded-2xl overflow-hidden">
          <img :src="imgPreview1" class="w-full h-full object-cover" alt="" />
        </div>
        <div class="min-w-[64px] h-16 w-16 rounded-2xl overflow-hidden">
          <img :src="imgPreview2" class="w-full h-full object-cover" alt="" />
        </div>
        <div
          class="min-w-[64px] h-16 w-16 p-3 bg-[#007AFF] rounded-2xl shadow-[inset_0_-1px_1px_rgba(2,2,3,.10)] grid place-items-center text-white text-sm font-medium"
        >
          <img :src="iconDocx" class="w-6 h-6" alt="" />
          .docx
        </div>
      </div>

      <!-- CTA -->
      <button
        class="mt-4 w-full sm:w-[389px] h-12 rounded-2xl bg-[#007AFF] text-white font-medium grid place-items-center"
        @click="openTaskChat"
      >
        <span class="inline-flex items-center gap-2">
          <img :src="iconChat" class="w-5 h-5" alt="" />
          Отправить задание в чат
        </span>
      </button>

      <!-- Описание (карточка) -->
      <section
        class="mt-4 sm:mt-5 mb-6 rounded-2xl bg-white outline outline-1 outline-[#7878801A] p-4 sm:p-5"
      >
        <div class="text-Labels-Neutral-Primary text-base leading-normal space-y-4">
          <p>
            Цель проекта: Разработать современный и привлекательный лендинг для продвижения онлайн-курсов, который будет
            стимулировать пользователей к регистрации и покупке.
          </p>

          <p class="font-medium">Целевая аудитория:</p>
          <ul class="list-disc pl-5 space-y-1">
            <li>Студенты и молодые специалисты (18–35 лет)</li>
            <li>Люди, стремящиеся к профессиональному развитию</li>
            <li>Те, кто ищет качественное онлайн-образование</li>
          </ul>

          <p class="font-medium">Требования к дизайну:</p>
          <p class="font-medium">1. Главный экран:</p>
          <ul class="list-disc pl-5 space-y-1">
            <li>Яркий и запоминающийся заголовок</li>
            <li>Краткое описание преимуществ</li>
            <li>Кнопка «Записаться сейчас»</li>
          </ul>

          <p class="font-medium">2. Блок «О курсах»:</p>
          <ul class="list-disc pl-5 space-y-1">
            <li>Иконки или изображения тем курсов</li>
            <li>Краткое описание</li>
            <li>Кнопка «Узнать больше»</li>
          </ul>

          <p class="font-medium">3. Блок «Преимущества»:</p>
          <ul class="list-disc pl-5 space-y-1">
            <li>3–4 ключевых преимущества</li>
            <li>Иконки или иллюстрации</li>
          </ul>

          <p class="font-medium">4. Блок «Отзывы»:</p>
          <ul class="list-disc pl-5 space-y-1">
            <li>2–3 отзыва с фото</li>
            <li>Звёздная система или цитаты</li>
          </ul>

          <p class="font-medium">5. Призыв к действию:</p>
          <ul class="list-disc pl-5 space-y-1">
            <li>Кнопка «Записаться сейчас»</li>
            <li>Форма регистрации</li>
          </ul>

          <p class="font-medium">6. Футер:</p>
          <ul class="list-disc pl-5 space-y-1">
            <li>Контакты</li>
            <li>Соцсети</li>
            <li>Логотипы партнёров</li>
          </ul>

          <p class="font-medium">7. Технические требования:</p>
          <ul class="list-disc pl-5 space-y-1">
            <li>Адаптивный дизайн</li>
            <li>Чистый стиль</li>
            <li>Фирменные цвета и шрифты</li>
          </ul>

          <p class="font-medium">8. Сроки:</p>
          <ul class="list-disc pl-5 space-y-1">
            <li>Макеты — 3 дня</li>
            <li>Финал — 5 дней</li>
          </ul>

          <p>
            Ожидаемый результат: Лендинг, который привлекает внимание, легко воспринимается и мотивирует пользователей
            записаться на курсы.
          </p>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from '#app'
import Sidebar from '@/components/profile/sidebar/Sidebar.vue'
import MobileHeader from '@/components/profile/header/MobileHeader.vue'
import Header from '@/components/profile/Header.vue'

/* ассеты */
import sectionIcon from '@/src/assets/icons/mentor/tasks/golf.svg'
import avatar from '@/src/assets/img/mentor/calls/Avatars.png'
import imgGood from '@/src/assets/img/mentor/calls/calls.png'
import iconPlay from '@/src/assets/icons/mentor/calls/play.svg'
import iconVolume from '@/src/assets/icons/mentor/calls/volume-high.svg'
import iconScreen from '@/src/assets/icons/mentor/calls/scan.svg'
import iconBack from '@/src/assets/icons/mentor/arrow-back.svg'
import iconActive from '@/src/assets/icons/mentor/tasks/alert-circle2.svg'
import imgPreview from '@/src/assets/img/mentor/tasks/image 232.png'
import imgPreview1 from '@/src/assets/img/mentor/tasks/image 231.png'
import imgPreview2 from '@/src/assets/img/mentor/tasks/image 233.png'
import iconDocx from '@/src/assets/icons/mentor/tasks/Voice/file.svg'
import iconChat from '@/src/assets/icons/mentor/tasks/chatbubbles.svg'

const router = useRouter()
const goBack = () => router.back()

const openTaskChat = () => {
  router.push('/chat') // при необходимости подставь конкретный id чата
}
</script>

<style scoped>
/* гладкий горизонтальный скролл для вложений */
.scrollbar-clean {
  scrollbar-width: none;
}
.scrollbar-clean::-webkit-scrollbar {
  display: none;
}
</style>
