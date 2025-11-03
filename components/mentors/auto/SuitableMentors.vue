<template>
  <div class="w-full">
    <div class="text-[16px] leading-[24px] font-medium"
         style="color:#3C3C43B8">
      Идеально подходящие менторы
    </div>

    <div class="relative mt-2">
      <!-- Лента с «карманом» справа под стрелку -->
      <div ref="track" class="flex items-center gap-0 overflow-x-auto no-scrollbar pr-10">
        <button
          v-for="(m, i) in list" :key="m.id"
          type="button"
          class="relative flex-none"
          :style="{ zIndex: 100 - i }"
          @click="$emit('update:modelValue', m.id)"
        >
          <!-- Жёсткий квадрат-обёртка исключает овальность -->
          <span class="block w-[52px] h-[52px] rounded-full overflow-hidden ring-2 ring-white"
                :class="i === 0 ? '' : '-ml-3 sm:-ml-3.5'">
            <img
              :src="m.src" :alt="m.alt || 'mentor'"
              class="block w-full h-full object-cover object-center aspect-square"
              draggable="false"
            />
          </span>

          <!-- Синяя обводка только у выбранной -->
          <span v-if="modelValue === m.id"
                class="pointer-events-none absolute inset-0"
                :class="i === 0 ? '' : '-ml-3 sm:-ml-3.5'">
            <span class="block w-[52px] h-[52px] rounded-full"
                  style="box-shadow:0 0 0 2px #007AFF;"></span>
          </span>
        </button>
      </div>

      <!-- Стрелка: прямо у края, слегка наезжает -->
      <button
        type="button"
        aria-label="Следующие"
        class="absolute right-0 top-1/2 -translate-y-1/2 z-10
               h-8 w-8 grid place-items-center rounded-full bg-white
               border hover:bg-black/[.03] transition"
        style="border-color:rgba(120,120,128,0.16); margin-right:-2px;"
        @click="scrollNext"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M9 18l6-6-6-6" stroke="currentColor" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

type Mentor = { id: number | string; src: string; alt?: string }

const props = withDefaults(defineProps<{
  modelValue?: number | string
  items?: Mentor[]
}>(), {
  modelValue: 1,
  items: () => []
})
defineEmits<{ (e:'update:modelValue', v:number|string): void }>()

/* Заглушки-фото */
const placeholders: Mentor[] = [
  { id: 1, src: 'https://i.pravatar.cc/96?img=11' },
  { id: 2, src: 'https://i.pravatar.cc/96?img=12' },
  { id: 3, src: 'https://i.pravatar.cc/96?img=13' },
  { id: 4, src: 'https://i.pravatar.cc/96?img=14' },
  { id: 5, src: 'https://i.pravatar.cc/96?img=15' },
  { id: 6, src: 'https://i.pravatar.cc/96?img=16' },
  { id: 7, src: 'https://i.pravatar.cc/96?img=17' },
  { id: 8, src: 'https://i.pravatar.cc/96?img=18' }
]
const list = computed(() => (props.items?.length ? props.items : placeholders))

const track = ref<HTMLElement | null>(null)
const scrollNext = () => {
  const el = track.value
  if (!el) return
  const step = 52 - 12 /* диаметр минус перекрытие */;
  el.scrollBy({ left: step, behavior: 'smooth' })
}
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
</style>
