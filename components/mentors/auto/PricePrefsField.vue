<template>
  <div class="form-row">
    <!-- ЛЕВАЯ КОЛОНКА -->
    <aside class="flex flex-col">
      <h2 class="text-[#101012] text-[22px] leading-[28px] sm:text-[28px] sm:leading-[32px] font-medium">
        Предпочтения<br/>по стоимости
      </h2>
    </aside>

    <!-- ПРАВАЯ КОЛОНКА -->
    <section class="space-y-3">
      <label
        v-for="opt in options" :key="opt.value"
        class="block rounded-2xl border p-4 sm:p-5 cursor-pointer transition bg-white"
        :class="modelValue===opt.value
          ? 'border-[#007AFF] ring-1 ring-[#007AFF]/20'
          : 'border-[#787880]/20 hover:bg-black/[.03]'"
      >
        <div class="flex items-start gap-3">
          <!-- чек 20×20 -->
          <span
            class="check "
            :data-checked="modelValue===opt.value"
            aria-hidden="true"
          >
            <!-- галочка (показывается только при выборе) -->
            <svg v-if="modelValue===opt.value" width="12" height="9" viewBox="0 0 12 9" fill="none">
              <path d="M1 4.5L4.33333 8L11 1" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>

          <div class="min-w-0">
            <!-- подзаголовок: 20/20, -0.33 -->
            <div class="text-[#101012] text-[20px] leading-[20px] tracking-[-0.33px] font-medium">
              от {{ opt.price }} ₽
            </div>
            <!-- описание: отступ сверху 8, 16/24, -0.25, 72% -->
            <div class="mt-2 text-[16px] leading-[24px] tracking-[-0.25px] text-[#3C3C43]/70">
              {{ opt.desc }}
            </div>
          </div>
        </div>

        <!-- настоящий input -->
        <input
          class="sr-only" type="radio" :name="name" :value="opt.value"
          :checked="modelValue===opt.value"
          @change="$emit('update:modelValue', opt.value)"
        />
      </label>
    </section>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: 'low'|'mid'|'top'
  name?: string
}>()
defineEmits<{ (e:'update:modelValue', v:'low'|'mid'|'top'):void }>()
const options = [
  { value:'low', price:'3 000', desc:'Опыт от 3 лет. Прошли личное собеседование, подтвердили компетенции, предоставили рекомендацию' },
  { value:'mid', price:'6 000', desc:'Опыт от 5 лет. Менторят больше года и добились значительных результатов в профессии' },
  { value:'top', price:'9 000', desc:'Опыт от 7 лет. Только лучшие специалисты: сильные сеньоры, дизайн-лиды и арт-директора с огромным опытом и списком наград' }
]
</script>

<style scoped>
.form-row{ display:grid; grid-template-columns:1fr; gap:24px; }
@media (min-width:1024px){ .form-row{ grid-template-columns:320px 1fr; gap:36px; } }

.check{
  width:20px; height:20px;
  flex:0 0 20px;             /* фиксируем размер во флексе */
  aspect-ratio:1 / 1;        /* страховка от сплющивания */
  display:inline-flex; align-items:center; justify-content:center;
  box-sizing:content-box;
  border-radius:6px;          /* сделай 50% если нужен круг */
  border:1px solid #D0D0D0;
  background:#fff;
  line-height:0;              /* убираем влияние текстовой строки */
  transition: background .15s ease, border-color .15s ease;
}

.check[data-checked="true"]{
  background:#007AFF;
  border-color:#007AFF;       /* без тени/тусклой обводки */
  box-shadow:none;            /* на всякий случай жёстко сбрасываем */
}

</style>
