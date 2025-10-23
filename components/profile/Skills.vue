<template>
  <div class="w-full p-6 bg-white rounded-2xl outline outline-1 outline-offset-[-1px] outline-[#7878801a] flex flex-col gap-2.5 overflow-hidden">
    <div class="relative h-[496px] w-full flex items-center justify-center">
      <svg width="440" height="440" viewBox="0 0 440 440" class="absolute" style="margin-top: 20px">
        <g transform="translate(220,240)">
          <polygon v-for="r in [180, 130, 90, 45]" :key="r" :points="hexPoints(r)" fill="none" stroke="#787880" stroke-opacity="0.1" stroke-width="1" />
          <polygon
            :points="hexPointsByLevels(skillCustomRadii)"
            fill="rgba(0, 122, 255, 0.1)"
            stroke="#007AFF"
            stroke-width="2"
          />
         
          <circle v-for="(r, i) in skillCustomRadii" :key="'dot-' + i"
            :cx="getCoord(r, i).x"
            :cy="getCoord(r, i).y"
            r="8"
            fill="white"
            stroke="#007AFF"
            stroke-width="3"
          />
        </g>
      </svg>
    
      <div class="absolute left-[231px] top-[153px] px-3 py-2 rounded-xl bg-black text-white text-base font-normal leading-normal shadow-xl">
        4 из 6 баллов
      </div>
      
      <div class="absolute left-[270px] top-[484px] text-xs font-medium text-[#787880b3]">Продукт</div>
      <div class="absolute left-[476px] top-[371px] text-xs font-medium text-[#787880b3]">Команда</div>
      <div class="absolute left-[476px] top-[167px] text-xs font-medium text-[#787880b3]">Инструменты</div>
      <div class="absolute left-[49px] top-[167px] text-right text-xs font-medium text-[#787880b3]">Работа с UI</div>
      <div class="absolute left-[44px] top-[371px] text-right text-xs font-medium text-[#787880b3]">Работа с UX</div>
      <div class="absolute left-[245px] top-[54px] text-xs font-medium text-[#787880b3]">Насмотренность</div>
     
      <div class="absolute top-0 left-0 flex items-center gap-2 text-xl font-medium leading-tight">
        <span class="text-black">Твои скиллы</span>
        <span class="text-[#787880b3]">36 из 90 баллов</span>
      </div>
    </div>
  </div>
</template>

<script setup>
const skillCustomRadii = [45, 90, 130, 180, 130, 130];

const hexPoints = (radius) => {
  return Array.from({ length: 6 }, (_, i) => {
    const angle = (Math.PI / 3) * i - Math.PI / 2;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    return `${x},${y}`;
  }).join(' ');
};

const getCoord = (r, i) => {
  const angle = (Math.PI / 3) * i - Math.PI / 2;
  return {
    x: Math.cos(angle) * r,
    y: Math.sin(angle) * r,
  };
};

const hexPointsByLevels = (radii) => {
  return radii
    .map((r, i) => {
      const { x, y } = getCoord(r, i);
      return `${x},${y}`;
    })
    .join(' ');
};
</script>

<style scoped>
</style>