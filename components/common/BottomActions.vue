<template>
  <!-- Разделительная линия сверху + отступ 36px -->
  <div class="mt-9">
    <div class="h-px w-full bg-[#E5E5EA]"></div>

    <!-- Кнопки: между ними 12px -->
    <div class="mt-9 flex flex-col sm:flex-row gap-3">
      <!-- Левая (primary) -->
      <AppButton
        :leftIcon="primaryIcon || null"
        :iconSize="20"
        size="md"
        radius="lg"                
        :full="false"
        variant="primary"
        @click="$emit('primary')"
      >
        {{ primaryLabel }}
      </AppButton>

      <!-- Правая (ghost) -->
      <AppButton
        size="md"
        radius="lg"             
        :full="false"
        variant="ghost"
        @click="$emit('secondary')"
      >
        {{ secondaryLabel }}
      </AppButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppButton from '@/components/ui/AppButton.vue'

defineProps<{
  primaryLabel: string
  secondaryLabel: string
  primaryIcon?: string
}>()

defineEmits<{
  (e:'primary'): void
  (e:'secondary'): void
}>()
</script>
