<template>
  <NuxtLayout name="app">
    <!-- ВЕРХНЕЕ МЕНЮ: back 40×40 + заголовок на одной линии, снизу 24px -->
    <div class="px-4 sm:px-6 lg:pl-0 lg:pr-gutter">
      <div class="flex items-center gap-3">
        <button
          @click="goBack"
          aria-label="Назад"
          class="h-10 w-10 grid place-items-center rounded-full
                 outline outline-1 outline-[#787880]/10
                 hover:bg-black/[.03] transition"
        >
          <img :src="iconBack" class="w-5 h-5 opacity-70" alt="" />
        </button>

        <Header
          class="hidden lg:flex"
          sectionTitle="Задания от ментора"
          :sectionIcon="sectionIcon"
        />
      </div>
    </div>

    <!-- Статус + H1 + мета -->
    <div class="px-4 sm:px-6 lg:pl-0 lg:pr-gutter">
      <!-- Бейдж без иконки -->
      <div
        class="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-[#FF9500] text-white w-max"
      >
        <span class="text-sm font-medium leading-3">Активное задание</span>
      </div>

      <!-- Подзаголовок: 48/48, letter-spacing -2px на десктопе -->
      <h1
        class="mt-3 lg:mt-4 text-[28px] leading-[32px]
               sm:text-[32px] sm:leading-[36px]
               lg:text-[48px] lg:leading-[48px] lg:tracking-[-2px]
               font-medium text-[#020203]"
      >
        Оптимизация handoff<br class="hidden sm:block" />
        в разработке продукта
      </h1>

      <div class="mt-2 flex flex-nowrap items-center gap-2 text-base text-[#020203]">
        <span class="shrink-0">Задание #3912 от</span>
        <span class="inline-flex items-center gap-1">
          <img :src="avatar" class="w-6 h-6 rounded-full" alt="автор" />
          Саши · 22 марта 2025
        </span>
      </div>
    </div>

    <!-- Две колонки: слева видео+вложения (+кнопка снизу), справа — текстовый контейнер -->
    <div class="px-4 sm:px-6 lg:pl-0 lg:pr-gutter">
      <div class="grid grid-cols-1 lg:grid-cols-[1fr_595px] lg:gap-6">
        <!-- Левая колонка -->
        <div class="flex flex-col min-h-[533px]">
          <!-- Видео -->
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

          <!-- Вложения -->
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

          <!-- Кнопка у самого низа левой колонки (высота 48px) -->
          <div class="mt-auto pt-4">
            <AppButton
              class="w-full sm:w-[389px] !h-12 !rounded-[16px]"
              :leftIcon="iconChat"
              :iconSize="20"
              @click="openTaskChat"
            >
              Отправить задание в чат
            </AppButton>
          </div>
        </div>

        <!-- Правая колонка: текстовый контейнер 595×533, бордер 1px, внутренний скролл -->
        <section
          class="mt-4 lg:mt-6 bg-white border border-[#7878801A] rounded-2xl
                 w-full lg:w-[595px] h-auto lg:h-[533px] overflow-hidden flex flex-col"
        >
          <div class="flex-1 min-h-0 overflow-y-auto p-4 sm:p-5 text-Labels-Neutral-Primary text-base leading-normal space-y-4">
            <p><strong>Цель проекта:</strong> Разработать современный и привлекательный лендинг для продвижения онлайн-курсов, который будет стимулировать пользователей к регистрации и покупке.</p>

            <p class="font-medium">Целевая аудитория:</p>
            <ul class="list-disc pl-5 space-y-1">
              <li>Студенты и молодые специалисты (18–35 лет).</li>
              <li>Люди, стремящиеся к профессиональному развитию.</li>
              <li>Те, кто ищет качественное онлайн-образование.</li>
            </ul>

            <p class="font-medium">Требования к дизайну:</p>
            <p class="font-medium">Главный экран:</p>
            <ul class="list-disc pl-5 space-y-1">
              <li>Яркий и запоминающийся заголовок (например, «Открой свои возможности с нашими курсами!»).</li>
              <li>Краткое описание преимуществ курсов (3–4 строки).</li>
              <li>Кнопка «Записаться сейчас» или «Начать обучение».</li>
            </ul>

            <p class="font-medium">Блок «О курсах»:</p>
            <ul class="list-disc pl-5 space-y-1">
              <li>Иконки или изображения, представляющие основные темы курсов.</li>
              <li>Краткое описание каждого курса (1–2 предложения).</li>
              <li>Кнопка «Узнать больше» для перехода на страницу курса.</li>
            </ul>

            <p class="font-medium">Блок «Преимущества»:</p>
            <ul class="list-disc pl-5 space-y-1">
              <li>3–4 ключевых преимущества (например, гибкий график, опытные преподаватели, сертификаты).</li>
              <li>Иконки или иллюстрации для визуального представления.</li>
            </ul>

            <p class="font-medium">Блок «Отзывы»:</p>
            <ul class="list-disc pl-5 space-y-1">
              <li>2–3 отзыва от довольных студентов с фотографиями и именами.</li>
              <li>Звёздная система оценки или цитаты.</li>
            </ul>

            <p class="font-medium">Блок «Призыв к действию»:</p>
            <ul class="list-disc pl-5 space-y-1">
              <li>Ещё одна кнопка «Записаться сейчас» с акцентом на срочность (например, «Осталось 5 мест!»).</li>
              <li>Форма быстрой регистрации (имя, email, телефон).</li>
            </ul>

            <p class="font-medium">Футер:</p>
            <ul class="list-disc pl-5 space-y-1">
              <li>Контактная информация (email, телефон, адрес).</li>
              <li>Ссылки на социальные сети.</li>
              <li>Логотипы партнёров или сертификатов.</li>
            </ul>

            <p class="font-medium">Технические требования:</p>
            <ul class="list-disc pl-5 space-y-1">
              <li>Адаптивный дизайн для мобильных устройств и ПК.</li>
              <li>Чистый и минималистичный стиль с акцентом на удобство использования.</li>
              <li>Использование фирменных цветов и шрифтов.</li>
            </ul>

            <p class="font-medium">Сроки:</p>
            <ul class="list-disc pl-5 space-y-1">
              <li>Первый этап (макеты): 3 дня.</li>
              <li>Второй этап (финальная версия): 5 дней.</li>
            </ul>

            <p><strong>Ожидаемый результат:</strong> Лендинг, который привлекает внимание, легко воспринимается и мотивирует пользователей записаться на курсы.</p>
          </div>
        </section>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
import { useRouter } from '#app'
import Header from '@/components/profile/Header.vue'
import AppButton from '@/components/ui/AppButton.vue'

/* ассеты */
import sectionIcon from '@/src/assets/icons/mentor/tasks/golf.svg'
import avatar from '@/src/assets/img/mentor/calls/Avatars.png'
import imgGood from '@/src/assets/img/mentor/calls/calls.png'
import iconPlay from '@/src/assets/icons/mentor/calls/play.svg'
import iconVolume from '@/src/assets/icons/mentor/calls/volume-high.svg'
import iconScreen from '@/src/assets/icons/mentor/calls/scan.svg'
import iconBack from '@/src/assets/icons/mentor/arrow-back.svg'
import imgPreview from '@/src/assets/img/mentor/tasks/image 232.png'
import imgPreview1 from '@/src/assets/img/mentor/tasks/image 231.png'
import imgPreview2 from '@/src/assets/img/mentor/tasks/image 233.png'
import iconDocx from '@/src/assets/icons/mentor/tasks/Voice/file.svg'
import iconChat from '@/src/assets/icons/mentor/tasks/chatbubbles.svg'

const router = useRouter()
const goBack = () => router.back()

const openTaskChat = () => {
  router.push('/chat') // при необходимости — конкретный id чата
}
</script>

<style scoped>
/* гладкий горизонтальный скролл для вложений */
.scrollbar-clean { scrollbar-width: none; }
.scrollbar-clean::-webkit-scrollbar { display: none; }
</style>
