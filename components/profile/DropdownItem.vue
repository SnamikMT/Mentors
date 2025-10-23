<template>
  <div class="w-full flex flex-col">
    <component
      :is="to ? NuxtLink : 'div'"
      :to="to"
      class="w-full px-3 py-2 rounded-lg flex justify-between items-center gap-2 hover:bg-gray-100 transition no-underline"
      :role="!to ? 'button' : undefined"
      :tabindex="!to ? 0 : undefined"
      @click="handleClick"
      @keydown.enter.prevent="!to && handleClick()"
      @keydown.space.prevent="!to && handleClick()"
    >
      <div class="flex items-center gap-2">
        <div v-if="iconSrc" class="w-4 h-4">
          <img :src="iconSrc" alt="" />
        </div>
        <span
          :class="[
            'text-base leading-normal',
            danger ? 'text-[#FF3030]' :
            blue ? 'text-[#007AFF]' :
            'text-[#020203]',
            'font-normal',
          ]"
        >
          {{ label }}
        </span>
      </div>

      <div
        v-if="badge"
        :class="[
          'text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1',
          badgeColor === 'blue' ? 'bg-[#3E87FF]/10 text-[#3E87FF]' :
          badgeColor === 'indigo' ? 'bg-[#5856D6]/10 text-[#5856D6]' : '',
        ]"
      >
        <img v-if="badgeIconSrc" :src="badgeIconSrc" class="w-3.5 h-3.5" />
        {{ badge }}
      </div>
    </component>

    <div v-if="separator" class="w-full h-px bg-[#D0D0D0]/40 my-1"></div>
  </div>
</template>

<script setup>
const emit = defineEmits(['click'])
defineProps({
  iconSrc: String,
  label: String,
  badge: String,
  badgeColor: String,
  separator: Boolean,
  danger: Boolean,
  blue: Boolean,
  badgeIconSrc: String,
  to: String,
})
import { NuxtLink } from '#components'

function handleClick (e) {
  emit('click', e)
}
</script>
