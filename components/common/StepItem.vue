<template>
  <div
    class="step-item"
    :class="{
      'step-item--active': active,
      'step-item--done': done
    }"
  >
    <!-- твой svg -->
    <component :is="icon" class="step-svg" />

    <!-- подпись поверх -->
    <span class="step-label">
      {{ label }}
    </span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string
  icon: any         // сюда ты прокинешь свой svg-компонент
  active?: boolean
  done?: boolean
}>()
</script>

<style scoped>
.step-item {
  position: relative;
  width: 164px;     /* под твой svg из макета */
  height: 40px;
  flex: 0 0 auto;
}

.step-svg {
  width: 100%;
  height: 100%;
  display: block;
}

/* подпись по центру svg */
.step-label {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 18px;
  font-size: 14px;
  font-weight: 500;
  pointer-events: none;
  color: #101012;
}

/* когда активный или done — делаем белый текст */
.step-item--active .step-label,
.step-item--done .step-label {
  color: #fff;
}

/* тут самое важное: перекрашиваем твой svg */
.step-item--active :deep(path),
.step-item--done :deep(path) {
  fill: #101012 !important;
}

/* если твой svg состоит из <g> и там fill на нём — можно так: */
.step-item--active :deep(svg),
.step-item--done :deep(svg) {
  fill: #101012;
}

/* мобилка — сжать */
@media (max-width: 640px) {
  .step-item {
    width: 148px;
    height: 32px;
  }
  .step-label {
    font-size: 13px;
  }
}
</style>
