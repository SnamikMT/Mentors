<template>
    <NuxtLayout name="app">
  <!-- Мобилка: столбец; Десктоп: две колонки -->
  <div class="w-full max-w-[1440px] bg-Backgrounds-Neutral-Primary flex flex-col lg:flex-row gap-0 lg:gap-12 overflow-hidden">

    <!-- Контент -->
    <div class="w-full flex flex-col">
      <!-- Десктопный заголовок -->
      <Header
        class="hidden lg:block mb-4"
        sectionTitle="Чат"
        :sectionIcon="sectionIcon"
      />

      <!-- Карточка чата -->
      <div class="flex-1 min-h-[70vh] rounded-[32px] border border-[#787880]/10 bg-Backgrounds-Neutral-Primary flex flex-col overflow-hidden">
        <!-- Шапка чата -->
        <header class="relative border-b border-[#787880]/10 px-4 sm:px-6 py-4 flex items-center justify-between gap-3">
          <div class="absolute inset-0 rounded-[32px] pointer-events-none overflow-hidden">
            <div class="absolute inset-0 bg-Backgrounds-Materials-Elevated-02 mix-blend-color-dodge"></div>
            <div class="absolute inset-0 bg-white/0 backdrop-blur-3xl"></div>
          </div>

          <div class="relative z-10 flex items-center gap-3">
            <div class="w-12 h-12 rounded-full overflow-hidden relative">
              <div class="absolute inset-0 bg-Colors-Red-1000 mix-blend-hue"></div>
              <img :src="avatar" alt="Mentor avatar" class="relative z-[1] w-full h-full object-cover" />
            </div>
            <div class="leading-tight">
              <div class="text-xl font-medium text-Labels-Neutral-Primary">{{ name }}</div>
              <div class="text-base text-Labels-Neutral-Secondary/70">{{ subtitle }}</div>
            </div>
          </div>

          <div class="relative z-10 flex items-center gap-2">
            <button
              type="button"
              class="px-3 py-2 rounded-2xl bg-[#787880]/10 flex items-center gap-2"
              @click="$emit('open-profile')"
            >
              <img :src="profileIcon" class="w-6 h-6" alt="" />
              <span class="hidden sm:inline text-base font-medium text-Labels-Neutral-Primary">Профиль</span>
            </button>
            <button
              type="button"
              class="p-3 rounded-2xl border border-[#787880]/10"
              @click="$emit('more')"
            >
              <img :src="syncIcon" class="w-6 h-6" alt="" />
            </button>
          </div>
        </header>

        <!-- Лента сообщений -->
        <main class="flex-1 overflow-y-auto px-4 sm:px-6 py-4 flex flex-col gap-4">
          <!-- Входящее -->
          <div class="msg-in max-w-[85%] sm:max-w-[560px] bg-Backgrounds-Neutral-Primary rounded-2xl border border-[#787880]/10 p-3 sm:p-4 flex flex-col gap-2">
            <div class="text-Colors-Blue-1000 text-base font-medium">Daniil Eroshov</div>

            <div class="text-base text-Labels-Neutral-Primary">
              Этот компонент идеально адаптирован под все сценарии написания и вложенности компонентов, но последнюю
              строку пришлось вынести отдельной сущностью, об этом мы уже договорились
            </div>
            <div class="text-base text-Labels-Neutral-Primary">с командой разработчиков</div>

            <div class="mt-1 border-l-2 border-Border-Info-Strong bg-[#3E87FF]/10 rounded-lg p-3 flex flex-col gap-3">
              <div class="flex flex-col">
                <div class="text-xs font-medium leading-3 text-Labels-Info-Primary">Figma</div>
                <div class="text-base font-medium text-Labels-Neutral-Primary">Lab UI Design System</div>
                <div class="text-sm font-medium leading-3 text-Labels-Neutral-Primary">Created with Figma</div>
              </div>
              <div class="h-48 sm:h-72 rounded-xs overflow-hidden">
                <img :src="linkPreview" alt="" class="w-full h-full object-cover" />
              </div>
            </div>

            <div class="ml-auto w-12 text-center text-xs text-Labels-Neutral-Secondary/70">00:00</div>
          </div>

          <!-- Исходящее -->
          <div class="self-end msg-out max-w-[85%] sm:max-w-[560px] bg-[#F7F8FA] rounded-2xl border border-[#787880]/10 p-3 sm:p-4 flex flex-col gap-2">
            <div class="text-base text-Labels-Neutral-Primary">
              Этот компонент идеально адаптирован под все сценарии написания и вложенности компонентов, но последнюю
              строку пришлось вынести отдельной сущностью, об этом мы уже договорились
            </div>

            <div class="flex items-end gap-2 flex-wrap">
              <div class="text-base text-Labels-Neutral-Primary">с командой разработчиков</div>
              <div class="ml-auto flex items-center gap-2">
                <div class="w-12 text-center text-xs text-Labels-Neutral-Secondary/70">00:00</div>
                <img :src="readIcon" class="w-4 h-4" alt="" />
              </div>
            </div>
          </div>
        </main>

        <!-- Инпут (липкий внутри карточки) -->
        <footer class="sticky bottom-0 left-0 right-0 border-t border-[#787880]/10 bg-Backgrounds-Neutral-Primary/95 backdrop-blur supports-[backdrop-filter]:bg-Backgrounds-Neutral-Primary/80 px-4 sm:px-6 py-3 flex items-center gap-3 z-20">
          <!-- Прикрепить -->
          <div class="relative" ref="attachWrap">
            <button
              type="button"
              class="p-1 rounded-xl hover:bg-black/5 transition"
              @click="toggleAttachMenu"
              aria-haspopup="menu"
              :aria-expanded="isAttachOpen ? 'true' : 'false'"
            >
              <img :src="attachIcon" alt="Прикрепить" class="w-6 h-6" />
            </button>

            <transition
              enter-active-class="transition ease-out duration-150"
              enter-from-class="opacity-0 scale-95"
              enter-to-class="opacity-100 scale-100"
              leave-active-class="transition ease-in duration-100"
              leave-from-class="opacity-100 scale-100"
              leave-to-class="opacity-0 scale-95"
            >
              <div v-if="isAttachOpen" role="menu" aria-label="Вставить вложение" class="absolute bottom-12 left-0 z-50">
                <div class="p-1 bg-white rounded-xl border border-[#787880]/10 shadow-[0_0_1px_rgba(2,2,3,0.10),0_1px_1px_rgba(2,2,3,0.05),0_2px_2px_rgba(2,2,3,0.03),0_4px_2px_rgba(2,2,3,0.01)]">
                  <div class="w-52 py-1">
                    <button type="button" role="menuitem" class="w-full px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-black/5" @click="onPickMedia">
                      <img :src="photoIcon16" class="w-4 h-4" alt="" />
                      <span class="text-base text-Labels-Neutral-Primary">Фото или видео</span>
                    </button>
                    <button type="button" role="menuitem" class="w-full px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-black/5" @click="onPickDocument">
                      <img :src="docIcon16" class="w-4 h-4" alt="" />
                      <span class="text-base text-Labels-Neutral-Primary">Документ</span>
                    </button>
                    <button type="button" role="menuitem" class="w-full px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-black/5" @click="onPickTask">
                      <img :src="taskIcon16" class="w-4 h-4" alt="" />
                      <span class="text-base text-Labels-Neutral-Primary">Задание</span>
                    </button>
                    <button type="button" role="menuitem" class="w-full px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-black/5" @click="onPickCall">
                      <img :src="callIcon16" class="w-4 h-4" alt="" />
                      <span class="text-base text-Labels-Neutral-Primary">Звонок с ментором</span>
                    </button>
                  </div>
                </div>
              </div>
            </transition>
          </div>

          <!-- Поле -->
          <input
            v-model="draft"
            type="text"
            :placeholder="placeholder"
            class="flex-1 bg-transparent outline-none text-base text-Labels-Neutral-Primary placeholder-[#3C3C43]/70"
            @keyup.enter="onSend"
          />

          <!-- Отправить -->
          <button
            type="button"
            class="p-3 rounded-2xl bg-[#3E87FF] shadow-[inset_0_-1px_1px_rgba(2,2,3,0.10)]"
            @click="onSend"
          >
            <img :src="sendIcon" class="w-6 h-6" alt="" />
          </button>
        </footer>
      </div>
    </div>
  </div>
  </NuxtLayout>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

import Sidebar from '@/components/profile/sidebar/Sidebar.vue'
import MobileHeader from '@/components/profile/header/MobileHeader.vue'
import Header from '@/components/profile/Header.vue'

import sectionIcon from '@/src/assets/icons/profile/mentors/chat.svg'
import avatar      from '@/src/assets/icons/mentor/Avatar.png'
import syncIcon    from '@/src/assets/icons/mentor/sync.svg'
import profileIcon from '@/src/assets/icons/mentor/person.svg'
import attachIcon  from '@/src/assets/icons/mentor/chat/attach.svg'
import sendIcon    from '@/src/assets/icons/mentor/chat/Chat-bubble/send.svg'
import readIcon    from '@/src/assets/icons/mentor/chat/Chat-bubble/checkmarks.svg'
import linkPreview from '@/src/assets/img/mentor/chat/Chat-bubble/Placeholder.png'
import photoIcon16 from '@/src/assets/icons/mentor/chat/image.svg'
import docIcon16   from '@/src/assets/icons/mentor/chat/file-clear.svg'
import taskIcon16  from '@/src/assets/icons/mentor/chat/golf.svg'
import callIcon16  from '@/src/assets/icons/mentor/chat/phone.svg'

const isAttachOpen = ref(false)
const attachWrap = ref(null)

const draft = ref('')
const placeholder = 'Сообщение...'

function toggleAttachMenu () { isAttachOpen.value = !isAttachOpen.value }

function handleOutside (e) {
  const el = attachWrap.value
  if (!el) return
  if (isAttachOpen.value && !el.contains(e.target)) isAttachOpen.value = false
}
function handleEsc (e) { if (e.key === 'Escape') isAttachOpen.value = false }

onMounted(() => {
  document.addEventListener('click', handleOutside)
  document.addEventListener('keydown', handleEsc)
})
onBeforeUnmount(() => {
  document.removeEventListener('click', handleOutside)
  document.removeEventListener('keydown', handleEsc)
})

function onSend () {
  if (!draft.value.trim()) return
  // TODO: реальная отправка
  draft.value = ''
}

function onPickMedia ()   { isAttachOpen.value = false }
function onPickDocument (){ isAttachOpen.value = false }
function onPickTask ()    { isAttachOpen.value = false }
function onPickCall ()    { isAttachOpen.value = false }

defineProps({
  name:     { type: String, default: 'Даниил Ерошов' },
  subtitle: { type: String, default: 'Ваш ментор' }
})
</script>
