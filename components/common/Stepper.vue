<template>
  <nav class="stepper">
    <ul class="track no-scrollbar">
      <li
        v-for="(s, i) in steps" :key="s"
        :class="[
          'step',
          i===0 && 'is-first',
          i===steps.length-1 && 'is-last',
          i===current && 'is-active',
          compact && 'is-compact'
        ]"
      >
        <span class="label">{{ s }}</span>
        <!-- белая «стрелка-вырез» между шагами -->
        <span v-if="i!==steps.length-1" class="divider" />
        <!-- черная стрелка активного последнего -->
        <span v-if="i===current && i===steps.length-1" class="active-tail" />
      </li>
    </ul>
  </nav>
</template>

<script setup>
defineProps({
  steps:   { type: Array,  required: true },
  current: { type: Number, default: 0 },
  compact: { type: Boolean, default: false } // мобильный компактный режим
})
</script>

<style scoped>
.stepper{
  display:flex;
  justify-content:center;          /* центр на десктопе */
}
.track{
  display:inline-flex;
  align-items:center;
  gap:0;
  overflow-x:auto;                  /* если не влазит — можно проскроллить */
  padding:0; margin:0; list-style:none;
}

/* базовая «таблетка» */
.step{
  position:relative;
  height:44px;
  padding:0 24px;
  display:inline-flex; align-items:center;
  background:#F6F7FA; color:#101012;
  border-radius:22px;
  white-space:nowrap;
  font-size:16px; line-height:24px; font-weight:500;
}
.step + .step{ margin-left:-18px; }

/* белый спейсер-вырез между шагами */
.divider{
  position:absolute; top:0; right:-18px;
  width:36px; height:100%;
  background:#fff;
  clip-path: polygon(0 0,100% 0,72% 50%,100% 100%,0 100%,28% 50%);
  pointer-events:none;
}

/* активный */
.is-active{ background:#101012; color:#fff; }

/* активный последний — рисуем хвост */
.active-tail{
  position:absolute; top:0; right:-22px;
  width:44px; height:100%;
  background:#101012;
  clip-path: polygon(0 0,100% 0,78% 50%,100% 100%,0 100%,22% 50%);
}

/* края */
.is-first{ border-top-left-radius:22px; border-bottom-left-radius:22px; }
.is-last { border-top-right-radius:22px; border-bottom-right-radius:22px; }

/* мобильный компакт */
.is-compact{
  height:36px;
  padding:0 14px;
  font-size:14px;
}
.is-compact + .is-compact{ margin-left:-12px; }
.is-compact .divider{ right:-12px; width:24px; }
.is-compact.is-active .active-tail{ right:-16px; width:32px; }

/* отключаем полосу прокрутки */
.no-scrollbar::-webkit-scrollbar{ display:none; }
.no-scrollbar{ -ms-overflow-style:none; scrollbar-width:none; }

/* на мобилке степпер просто сверху; выравнивание слева удобнее для большого текста */
@media (max-width: 640px){
  .stepper{ justify-content:flex-start; }
}
</style>
