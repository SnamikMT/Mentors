<template>
  <div class="form-row">
    <!-- ЛЕВО: кружок-видео 96 + заголовок под ним (24px) -->
    <aside class="flex flex-col items-start">
      <div class="w-24 h-24 rounded-full overflow-hidden ring-1 ring-black/5 bg-[#F5F6F8] shrink-0">
        <video v-if="videoSrc" :src="videoSrc" class="w-full h-full object-cover" autoplay muted loop playsinline preload="metadata" />
      </div>
      <h2 class="mt-6 text-[#101012] text-[22px] leading-[28px] sm:text-[28px] sm:leading-[32px] font-medium">
        Что тебе ближе?
      </h2>
    </aside>

    <!-- ПРАВО: карточки-радио; выделяется ТОЛЬКО радиокнопка -->
    <section class="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <button
        v-for="opt in options" :key="opt.value"
        type="button"
        class="text-left rounded-2xl border p-4 transition
               border-[#787880]/20 bg-white hover:bg-black/[.03]"
        @click="$emit('update:modelValue', opt.value)"
      >
        <div class="flex items-start gap-3">
          <!-- Радио 20x20 по центру -->
          <span
            class="inline-grid place-items-center rounded-full mt-[2px]"
            :class="['radio-outer', modelValue===opt.value ? 'radio-outer--on' : 'radio-outer--off']"
          >
            <span v-if="modelValue===opt.value" class="radio-inner"></span>
          </span>

          <div>
            <div class="text-[16px] font-medium text-[#101012]">{{ opt.title }}</div>
            <div class="mt-1 text-[13px] leading-[16px] text-[#3C3C43]/70">{{ opt.sub }}</div>
          </div>
        </div>
      </button>
    </section>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: 'freelance'|'biz'|'studio'|'product'|'idk'
  videoSrc?: string
}>()
defineEmits<{ (e:'update:modelValue', v:'freelance'|'biz'|'studio'|'product'|'idk'):void }>()

const options = [
  { value:'freelance', title:'Фриланс',   sub:'Сам по себе' },
  { value:'biz',       title:'Свой бизнес', sub:'Управлять другими' },
  { value:'studio',    title:'Студия',    sub:'Когда разные проекты' },
  { value:'product',   title:'Продукт',   sub:'Когда один проект' },
  { value:'idk',       title:'Я не знаю', sub:'' },
]
</script>

<style scoped>
.form-row{ display:grid; grid-template-columns:1fr; gap:24px; }
@media (min-width:1024px){ .form-row{ grid-template-columns:320px 1fr; gap:36px; } }

/* Радио: 20×20 внешний, 10×10 внутренний (белый) */
.radio-outer{
  width:20px; height:20px; border-radius:9999px;
  border:1px solid #D0D0D0; background:#fff;
  transition: border-color .15s, background .15s, box-shadow .15s;
  display:inline-grid; place-items:center;
}
.radio-outer--on{
  border-color:#007AFF; background:#007AFF;
  box-shadow: 0 0 0 3px rgba(0,122,255,.12);
}
.radio-inner{
  width:10px; height:10px; border-radius:9999px; background:#fff;
}
</style>
