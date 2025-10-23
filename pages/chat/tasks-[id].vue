<template>
  <div class="w-full max-w-[1440px] pr-48 bg-Backgrounds-Neutral-Primary inline-flex justify-start items-start gap-12 overflow-hidden">
    <Sidebar />
   
    <div class="flex-1 pt-4 pl-[48px] flex flex-col gap-[16px]">
      <div class="flex items-center gap-3">
        <div
          @click="goBack"
          class="mt-[-40px] w-9 h-9 rounded-full outline outline-1 outline-offset-[-1px] outline-[#787880]/10 inline-flex justify-center items-center overflow-hidden cursor-pointer"
        >
          <div class="w-6 h-6 relative overflow-hidden">
            <img :src="iconBack" alt="Back" class="absolute left-[2.5px] top-[2.5px] w-5 h-5 opacity-70" />
          </div>
        </div>

        <Header sectionTitle="Чат" :sectionIcon="sectionIcon" />
      </div>
      
      <div
        class="size-lf-stretch px-6 pt-6 relative bg-Backgrounds-Neutral-Primary rounded-[32px] outline outline-1 outline-offset-[-1px] outline-[#787880]/10 inline-flex flex-col justify-end items-center gap-3 overflow-hidden"
      >
        <div
          class="w-full relative border-b border-[#787880]/10 flex flex-col gap-3 overflow-hidden"
        >
          <header class="w-full p-4 relative flex items-center justify-between">
            <div class="absolute inset-0 rounded-[32px] overflow-hidden pointer-events-none">
              <div class="absolute inset-0 bg-Backgrounds-Materials-Elevated-02 mix-blend-color-dodge"></div>
              <div class="absolute inset-0 bg-white/0 backdrop-blur-3xl"></div>
            </div>

            
            <div class="flex items-center gap-3 relative">
              <div class="w-12 h-12 relative rounded-full overflow-hidden">
                <div class="absolute inset-0 bg-blend-hue bg-Colors-Red-1000 rounded-full"></div>
                <img :src="avatar" alt="Mentor avatar" class="w-12 h-12 object-cover relative z-[1]" />
              </div>
              <div class="flex flex-col leading-tight">
                <div class="text-Labels-Neutral-Primary text-xl font-medium">{{ name }}</div>
                <div class="text-Labels-Neutral-Secondary/70 text-base">{{ subtitle }}</div>
              </div>
            </div>

           
            <div class="flex items-center gap-2 relative">
              <button
                type="button"
                class="p-3 bg-[#787880]/10 rounded-2xl flex items-center overflow-hidden"
                @click="$emit('open-profile')"
              >
                <img :src="profileIcon" alt="" class="w-6 h-6" />
                <span class="px-2 text-Labels-Neutral-Primary text-base font-medium">Профиль</span>
              </button>
              <button
                type="button"
                class="p-3 rounded-2xl outline outline-1 outline-offset-[-1px] outline-[#787880]/10 inline-flex items-center"
                @click="$emit('more')"
              >
                <img :src="syncIcon" alt="" class="w-6 h-6" />
              </button>
            </div>
          </header>
        </div>

        
        <main class="w-full px-6 flex flex-col gap-4">
          
          <div
            class="w-full max-w-[560px] px-4 py-3 bg-Backgrounds-Neutral-Primary rounded-2xl outline outline-1 outline-offset-[-1px] outline-[#787880]/10 flex flex-col gap-1"
          >
            <div class="w-full flex flex-col gap-1">
              <div class="text-Colors-Blue-1000 text-base font-medium">Daniil Eroshov</div>
            </div>

            <div class="w-full max-w-[528px] pb-2 flex flex-col">
              <div class="text-Labels-Neutral-Primary text-base">
                Этот компонент идеально адаптирован под все сценарии написания и вложенности компонентов, но последнюю
                строку пришлось вынести отдельной сущностью, об этом мы уже договорились
              </div>
              <div class="text-Labels-Neutral-Primary text-base">с командой разработчиков</div>
            </div>

            <div class="w-full max-w-[528px] p-3 bg-[#3E87FF]/10 rounded-lg border-l-2 border-Border-Info-Strong flex flex-col gap-3">
              <div class="flex flex-col gap-0.5">
                <div class="text-Labels-Info-Primary text-xs font-medium leading-3">Figma</div>
                <div class="text-Labels-Neutral-Primary text-base font-medium">Lab UI Design System</div>
                <div class="text-Labels-Neutral-Primary text-sm font-medium leading-3">Created with Figma</div>
              </div>
              <div class="h-72 relative rounded-xs overflow-hidden">
                <img :src="linkPreview" alt="" class="w-[504px] h-72 object-cover" />
              </div>
            </div>

            <div class="w-full max-w-[528px] min-w-16 inline-flex justify-end items-center">
              <div class="w-12 h-4 text-center text-Labels-Neutral-Secondary/70 text-xs font-medium leading-3">00:00</div>
            </div>
          </div>

         
          <div
            class="self-end w-[560px] max-w-[560px] px-4 py-3 bg-[#F7F8FA] rounded-2xl outline outline-1 outline-offset-[-1px] outline-[#787880]/10 inline-flex flex-col gap-1"
          >
            <div class="text-Labels-Neutral-Primary text-base">
              Этот компонент идеально адаптирован под все сценарии написания и вложенности компонентов, но последнюю
              строку пришлось вынести отдельной сущностью, об этом мы уже договорились
            </div>
            <div class="w-full inline-flex justify-between items-end flex-wrap">
              <div class="text-Labels-Neutral-Primary text-base">с командой разработчиков</div>
              <div class="flex-1 min-w-16 flex justify-end items-center gap-2">
                <div class="w-12 h-4 text-center text-Labels-Neutral-Secondary/70 text-xs font-medium leading-3">00:00</div>
                <img :src="readIcon" alt="" class="w-4 h-4" />
              </div>
            </div>
          </div>
        </main>

        
        <footer
  class="w-full pl-6 pr-4 py-4 relative border-t border-[#787880]/10 flex flex-col gap-3"
>
  
  <div class="flex items-center gap-3">
    
    <div class="w-6 h-6 flex-shrink-0 flex items-center justify-center">
      <img :src="iconLeft" alt="Иконка задания" class="w-5 h-4" />
    </div>
    
    <div class="flex-1 flex flex-col">
      <div class="text-[#3E87FF] text-base font-medium">
        Задание #{{ taskNumber }}
      </div>
      <div class="max-w-[458px] text-Labels-Neutral-Primary text-base">
        {{ taskTitle }}
      </div>
    </div>
    
    <button
      type="button"
      class="w-6 h-6 flex items-center"
      @click="$emit('close-task')"
    >
      <img :src="iconRight" alt="Закрыть" class="w-6 h-6" />
    </button>
  </div>

  
  <div class="flex items-center gap-3 border-t border-[#787880]/10 py-4">
    
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
        <div
          v-if="isAttachOpen"
          role="menu"
          aria-label="Вставить вложение"
          class="absolute bottom-12 left-0 z-50"
        >
          <div
            class="p-1 relative bg-[#FFFFFF] rounded-xl outline outline-1 outline-offset-[-1px] outline-[#787880]/10 overflow-hidden
                   shadow-[0px_0px_1px_rgba(2,2,3,0.10),0px_1px_1px_rgba(2,2,3,0.05),0px_2px_2px_rgba(2,2,3,0.03),0px_4px_2px_rgba(2,2,3,0.01)]"
          >
        
            <div class="w-52 relative py-1">
              <button
                type="button"
                role="menuitem"
                class="w-full px-3 py-2 rounded-lg inline-flex items-center gap-2 hover:bg-black/5 focus:bg-black/5 outline-none"
                @click="onPickMedia"
              >
                <img :src="photoIcon16" alt="" class="w-4 h-4" />
                <span class="text-Labels-Neutral-Primary text-base">
                  Фото или видео
                </span>
              </button>
              <button
                type="button"
                role="menuitem"
                class="w-full px-3 py-2 rounded-lg inline-flex items-center gap-2 hover:bg-black/5 focus:bg-black/5 outline-none"
                @click="onPickDocument"
              >
                <img :src="docIcon16" alt="" class="w-4 h-4" />
                <span class="text-Labels-Neutral-Primary text-base">
                  Документ
                </span>
              </button>
              <button
                type="button"
                role="menuitem"
                class="w-full px-3 py-2 rounded-lg inline-flex items-center gap-2 hover:bg-black/5 focus:bg-black/5 outline-none"
                @click="onPickTask"
              >
                <img :src="taskIcon16" alt="" class="w-4 h-4" />
                <span class="text-Labels-Neutral-Primary text-base">
                  Задание
                </span>
              </button>
              <button
                type="button"
                role="menuitem"
                class="w-full px-3 py-2 rounded-lg inline-flex items-center gap-2 hover:bg-black/5 focus:bg-black/5 outline-none"
                @click="onPickCall"
              >
                <img :src="callIcon16" alt="" class="w-4 h-4" />
                <span class="text-Labels-Neutral-Primary text-base">
                  Звонок с ментором
                </span>
              </button>
            </div>
          </div>
        </div>
      </transition>
    </div>

    
    <input
      v-model="draft"
      type="text"
      :placeholder="placeholder"
      class="flex-1 bg-transparent outline-none text-Labels-Neutral-Primary placeholder-[#3C3C43]/70 text-base"
      @keyup.enter="onSend"
    />

   
    <button
      type="button"
      class="p-3.9 inline-flex items-center"
      @click="onSend"
    >
      <img :src="micIcon" alt="micro" class="w-6 h-6 " />
    </button>
  </div>
</footer>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from '#app'

import Sidebar from '../../components/profile/sidebar/Sidebar.vue'
import Header from '../../components/profile/Header.vue'

import iconBack from '../../src/assets/icons/mentor/arrow-back.svg'
import sectionIcon from '../../src/assets/icons/profile/mentors/chat.svg'
import avatar from '../../src/assets/icons/mentor/Avatar.png'
import syncIcon from '../../src/assets/icons/mentor/sync.svg'
import profileIcon from '../../src/assets/icons/mentor/person.svg'
import attachIcon from '../../src/assets/icons/mentor/chat/attach.svg'
import micIcon from '../../src/assets/icons/mentor/chat/mic.svg'
import readIcon from '../../src/assets/icons/mentor/chat/Chat-bubble/checkmarks.svg'
import linkPreview from '../../src/assets/img/mentor/chat/Chat-bubble/Placeholder.png'
import iconLeft from '../../src/assets/icons/mentor/chat/arrow-undo.svg'
import iconRight from '../../src/assets/icons/mentor/chat/close.svg'
import photoIcon16 from '../../src/assets/icons/mentor/chat/image.svg'
import docIcon16 from '../../src/assets/icons/mentor/chat/file-clear.svg'
import taskIcon16 from '../../src/assets/icons/mentor/chat/golf.svg'
import callIcon16 from '../../src/assets/icons/mentor/chat/phone.svg'

const route = useRoute()


const taskNumber = computed(() => route.params.id)
const taskTitle = computed(() => 'Сделать дизайн-концепцию') // подставить реальное название из API/стора

const isAttachOpen = ref(false)
const attachWrap = ref(null)

const draft = ref('')
const placeholder = 'Сообщение...'

function toggleAttachMenu() {
  isAttachOpen.value = !isAttachOpen.value
}

function handleOutside(e) {
  const el = attachWrap.value
  if (!el) return
  if (isAttachOpen.value && !el.contains(e.target)) {
    isAttachOpen.value = false
  }
}

function handleEsc(e) {
  if (e.key === 'Escape') isAttachOpen.value = false
}

onMounted(() => {
  document.addEventListener('click', handleOutside)
  document.addEventListener('keydown', handleEsc)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleOutside)
  document.removeEventListener('keydown', handleEsc)
})

function onSend() {
  if (!draft.value.trim()) return
  draft.value = ''
}

// обработчики действий меню — сюда вставить реальную логику
function onPickMedia() {
  isAttachOpen.value = false
  // открыть селектор фото/видео
}
function onPickDocument() {
  isAttachOpen.value = false
  // открыть селектор файлов
}
function onPickTask() {
  isAttachOpen.value = false
  // создать/привязать задачу
}
function onPickCall() {
  isAttachOpen.value = false
  // открыть модал звонка
}

defineProps({
  name: {
    type: String,
    default: 'Даниил Ерошов'
  },
  subtitle: {
    type: String,
    default: 'Ваш ментор'
  }
})

function goBack() {
  history.back()
}
</script>
