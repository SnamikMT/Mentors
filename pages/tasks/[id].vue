<template>
  <div class="w-full max-w-[1440px] pr-48 bg-Backgrounds-Neutral-Primary inline-flex justify-start items-start gap-[12px] overflow-hidden">
    <Sidebar />

    <div class="flex-1 pt-4 pl-[48px] flex flex-col gap-[16px]">
      <div class="flex items-center gap-3">
        <div @click="goBack" class="mt-[-40px] w-full max-w-9 h-9 rounded-full outline outline-1 outline-offset-[-1px] outline-[#787880]/10 inline-flex justify-center items-center overflow-hidden cursor-pointer">
          <div class="w-full max-w-6 h-6 relative overflow-hidden">
            <img :src="iconBack" alt="Back" class="absolute left-[2.5px] top-[2.5px] w-5 h-5 opacity-70"/>
          </div>
        </div>

        <Header sectionTitle="Задания от ментора" :sectionIcon="sectionIcon" />
      </div>

      <div class="flex gap-[24px] items-start">
        <!-- ЛЕВАЯ КОЛОНКА: max-w -> 748 -->
        <div class="flex flex-col gap-12 w-full max-w-[748px]">
          <div class="flex flex-col gap-6">
            <div class="pl-2 pr-3 py-2 bg-[#FF9500] rounded-full inline-flex justify-center items-center gap-2 w-fit">
                <div class="relative w-full max-w-4 h-4">
                    <img :src="iconActive" alt="Active Icon" class="w-4 h-4" />
                </div>
                <div class="text-white text-sm font-medium leading-3">
                    Активное задание
                </div>
            </div>
            <!-- Заголовок ограничен 748px -->
            <h1 class="text-5xl font-medium text-[#020203] leading-[48px] max-w-[748px]">
              Оптимизация handoff<br />в разработке продукта
            </h1>

            <!-- Блок "Задание #3912 от …" — одна строка, без обрезания -->
            <div class="flex flex-nowrap gap-2 items-center text-base text-[#020203] min-w-0">
              <span class="shrink-0">Задание #3912 от</span>
              <div class="flex gap-1 items-center min-w-0">
                <img :src="avatar" alt="Avatar" class="w-6 h-6 rounded-full shrink-0" />
                <span class="whitespace-nowrap">Саши · 22 марта 2025</span>
              </div>
            </div>
            <!-- /исправление -->
          </div>
         
          <div class="flex flex-col gap-6">
            <div class="relative w-full h-[233px] rounded-2xl overflow-hidden">
              <img :src="imgGood" alt="Call preview" class="w-full h-full object-cover" />
              <div class="absolute bottom-0 w-full p-4 bg-gradient-to-t from-black/50 to-transparent">
                <div class="w-full h-1 bg-white/10 rounded-full">
                  <div class="w-full max-w-20 h-1 bg-white rounded-full"></div>
                </div>
                <div class="flex justify-between items-center mt-3">
                  <div class="flex gap-3 items-center">
                    <img :src="iconPlay" class="w-5 h-5" />
                    <img :src="iconVolume" class="w-5 h-5" />
                  </div>
                  <img :src="iconScreen" class="w-5 h-5" />
                </div>
              </div>
            </div>

            <div class="self-stretch inline-flex justify-start items-start gap-4 overflow-hidden mt-2">
                 <div class="w-full max-w-16 h-16 rounded-2xl overflow-hidden">
                    <img :src="imgPreview" alt="Preview" class="w-full h-full object-cover" />
                </div>
                <div class="w-full max-w-16 h-16 rounded-2xl overflow-hidden">
                    <img :src="imgPreview1" alt="Preview1" class="w-full h-full object-cover" />
                </div>
                <div class="w-full max-w-16 h-16 rounded-2xl overflow-hidden">
                    <img :src="imgPreview2" alt="Preview2" class="w-full h-full object-cover" />
                </div>
                 <div class="w-full max-w-16 h-16 p-3 bg-[#007AFF] rounded-2xl shadow-[inset_0px_-1px_1px_0px_rgba(2,2,3,0.10)] inline-flex flex-col justify-center items-center gap-2">
                    <div class="w-full max-w-6 h-6 relative">
                        <img :src="iconDocx" alt=".docx icon" class="w-6 h-6" />
                    </div>
                    <div class="text-white text-sm font-medium leading-3">.docx</div>
                </div>
            </div>
            
             <div class="self-stretch mt-[180px] w-full max-w-[389px] p-3 bg-[#007AFF] rounded-2xl shadow-[inset_0px_-1px_1px_0px_rgba(2,2,3,0.10)] inline-flex justify-center items-center">
                <div class="w-6 h-6 relative overflow-hidden">
                    <img :src="iconChat" alt="Chat Icon" class="absolute w-5 h-5 left-[1.94px] top-[1px]" />
                </div>
                <div class="px-2 flex justify-start items-center gap-2">
                    <button @click="openTaskChat(task.id)" class="text-white text-base font-medium leading-normal">
                        Отправить задание в чат
                    </button>
                </div>
            </div>
          </div>
        </div>
        
        <div class="mt-[343px]">
         <div class="w-full h-[583px] p-6 relative bg-Backgrounds-Neutral-Primary rounded-2xl outline outline-1 outline-offset-[-1px] outline-[#7878801A] inline-flex flex-col justify-start items-start gap-8 overflow-hidden">
             <div class="flex flex-col gap-4 flex-1 overflow-y-auto scrollbar-clean pr-2 max-h-[500px]">
                <div class="text-Labels-Neutral-Primary text-base leading-normal space-y-4">
                    <p>Цель проекта: Разработать современный и привлекательный лендинг для продвижения онлайн-курсов, который будет стимулировать пользователей к регистрации и покупке.</p>
                    <p>Целевая аудитория:</p>
                    <ul class="list-disc pl-6">
                        <li>Студенты и молодые специалисты (18-35 лет)</li>
                        <li>Люди, стремящиеся к профессиональному развитию</li>
                        <li>Те, кто ищет качественное онлайн-образование</li>
                    </ul>
                    <p>Требования к дизайну:</p>
                    <p>1. Главный экран:</p>
                    <ul class="list-disc pl-6">
                        <li>Яркий и запоминающийся заголовок</li>
                        <li>Краткое описание преимуществ</li>
                        <li>Кнопка "Записаться сейчас"</li>
                    </ul>
                    <p>2. Блок "О курсах":</p>
                    <ul class="list-disc pl-6">
                        <li>Иконки или изображения тем курсов</li>
                        <li>Краткое описание</li>
                        <li>Кнопка "Узнать больше"</li>
                    </ul>
                    <p>3. Блок "Преимущества":</p>
                    <ul class="list-disc pl-6">
                        <li>3–4 ключевых преимущества</li>
                        <li>Иконки или иллюстрации</li>
                    </ul>
                    <p>4. Блок "Отзывы":</p>
                    <ul class="list-disc pl-6">
                        <li>2–3 отзыва с фото</li>
                        <li>Звездная система или цитаты</li>
                    </ul>
                    <p>5. Призыв к действию:</p>
                    <ul class="list-disc pl-6">
                        <li>Кнопка "Записаться сейчас"</li>
                        <li>Форма регистрации</li>
                    </ul>
                    <p>6. Футер:</p>
                    <ul class="list-disc pl-6">
                        <li>Контакты</li>
                        <li>Соцсети</li>
                        <li>Логотипы партнёров</li>
                    </ul>
                    <p>7. Технические требования:</p>
                    <ul class="list-disc pl-6">
                        <li>Адаптивный дизайн</li>
                        <li>Чистый стиль</li>
                        <li>Фирменные цвета и шрифты</li>
                    </ul>
                    <p>8. Сроки:</p>
                    <ul class="list-disc pl-6">
                        <li>Макеты — 3 дня</li>
                        <li>Финал — 5 дней</li>
                    </ul>
                    <p>Ожидаемый результат: Лендинг, который привлекает внимание, легко воспринимается и мотивирует пользователей записаться на курсы.</p>
                </div>
            </div>
        </div>
        </div>
   </div>
</div>
</div>
</template>


<script setup>
const route = useRoute()
const router = useRouter()
const { id } = route.params

const openTaskChat = () => {
  router.push(`/chat/tasks-${task.id}`)
}

import { useRouter, useRoute} from '#app'
import Header from '../../components/profile/Header.vue'
import Sidebar from '../../components/profile/sidebar/Sidebar.vue'
import sectionIcon from '../../src/assets/icons/mentor/tasks/golf.svg'
import callImage from '../../src/assets/img/mentor/calls/calls.png'
import avatar from '../../src/assets/img/mentor/calls/Avatars.png'
import imgGood from '../../src/assets/img/mentor/calls/calls.png'
import iconPlay from '../../src/assets/icons/mentor/calls/play.svg'
import iconVolume from '../../src/assets/icons/mentor/calls/volume-high.svg'
import iconScreen from '../../src/assets/icons/mentor/calls/scan.svg'
import iconBack from '../../src/assets/icons/mentor/arrow-back.svg'
import iconActive from '../../src/assets/icons/mentor/tasks/alert-circle2.svg'
import imgPreview from '../../src/assets/img/mentor/tasks/image 232.png'
import imgPreview1 from '../../src/assets/img/mentor/tasks/image 231.png'
import imgPreview2 from '../../src/assets/img/mentor/tasks/image 233.png'
import iconDocx from '../../src/assets/icons/mentor/tasks/Voice/file.svg'
import iconChat from '../../src/assets/icons/mentor/tasks/chatbubbles.svg'

const call = ref({
  id: 1,
  title: 'Оптимизация handoff в разработке продукта',
  author: 'Даниил Ерошов',
  date: '22.03.2025',
  duration: '53:02',
  img: callImage
})

useHead({
  title: `Звонок: ${call.value.title}`
})

function goBack() {
  router.back()
}
</script>
