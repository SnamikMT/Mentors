<template>
  <div class="w-full flex flex-col gap-2">
    <div class="flex w-full rounded-xl overflow-hidden border border-Border-Neutral-Base/10">
      <div class="flex items-center justify-center pl-3 pr-1 py-3 border-Border-Neutral-Base/10">
        <img :src="IconSearch" class="w-5 h-5 text-Labels-Neutral-Secondary/70" />
      </div>
      <input
        type="text"
        placeholder="Найти звонок по теме или дате"
        class="flex-1 pl-1 pr-3 py-3 text-base font-normal text-Labels-Neutral-Tertiary/40 placeholder:text-Labels-Neutral-Tertiary/40 focus:outline-none"
      />
    </div>
  </div>
</template>

<script setup>
import IconSearch from '../../../src/assets/icons/mentor/calls/search.svg'
</script>
