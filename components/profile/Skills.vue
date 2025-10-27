<template>
  <div class="w-full p-4 sm:p-6 bg-white rounded-2xl border border-[#7878801a] flex flex-col gap-3">
    <!-- Заголовок -->
    <div class="flex items-center gap-2 text-lg sm:text-xl font-medium">
      <span class="text-black">Твои скиллы</span>
      <span class="text-[#787880b3] text-base sm:text-lg">{{ score.current }} из {{ score.max }} баллов</span>
    </div>

    <!-- Радар: квадратный бокс, внутри responsive SVG -->
    <div class="relative w-full aspect-square">
      <svg viewBox="-220 -220 440 440" class="absolute inset-0 w-full h-full">
        <g>
          <!-- сетка -->
          <polygon v-for="r in radiiGrid" :key="r" :points="hexPoints(r)" fill="none" stroke="#787880" stroke-opacity="0.1" stroke-width="1" />
          <!-- заполнение -->
          <polygon :points="hexPointsByLevels(skillCustomRadii)" fill="rgba(0,122,255,0.1)" stroke="#007AFF" stroke-width="2" />
          <!-- точки -->
          <circle
            v-for="(r, i) in skillCustomRadii"
            :key="'dot-'+i"
            :cx="getCoord(r, i).x"
            :cy="getCoord(r, i).y"
            :r="dotR"
            fill="white"
            stroke="#007AFF"
            stroke-width="3"
          />
        </g>
      </svg>

      <!-- тултип-пример (фикс. позиция), скрываем на xs чтобы не наслаивался -->
      <div class="hidden sm:block absolute left-1/2 top-1/2 -translate-x-6 -translate-y-10 px-3 py-2 rounded-xl bg-black text-white text-sm">
        4 из 6 баллов
      </div>

      <!-- подписи вокруг (только ≥lg) -->
      <div class="hidden lg:block">
        <div class="absolute left-1/2 -translate-x-1/2 -top-2 text-xs font-medium text-[#787880b3]">Насмотренность</div>
        <div class="absolute right-2 top-[18%] text-xs font-medium text-[#787880b3]">Инструменты</div>
        <div class="absolute right-2 bottom-[36%] text-xs font-medium text-[#787880b3]">Команда</div>
        <div class="absolute left-2 bottom-[36%] text-right text-xs font-medium text-[#787880b3]">Работа с UX</div>
        <div class="absolute left-2 top-[18%] text-right text-xs font-medium text-[#787880b3]">Работа с UI</div>
        <div class="absolute left-1/2 -translate-x-1/2 bottom-0 text-xs font-medium text-[#787880b3]">Продукт</div>
      </div>
    </div>

    <!-- Легенда для мобилки (подписи под графиком) -->
    <div class="grid grid-cols-2 sm:grid-cols-3 gap-2 lg:hidden text-xs text-[#787880b3]">
      <div v-for="(s, i) in skills" :key="i" class="flex items-center justify-between gap-2 bg-[#F8F8F9] rounded-lg px-3 py-2">
        <span class="truncate">{{ s.name }}</span>
        <span class="text-[#020203] font-medium">{{ s.value }}/6</span>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  skills: { type: Array, default: () => [] },
  score:  { type: Object, default: () => ({ current: 0, max: 0 }) }
})

/** радиусы сетки (в тех же координатах, что и viewBox) */
const radiiGrid = [180, 130, 90, 45]

/** нормализуем skill -> радиус (шкала 0..6 → 0..180) */
const maxLevel = 6
const toRadius = (val) => Math.max(0, Math.min(maxLevel, val)) * (180 / maxLevel)

/** если приходит ровно 6 скиллов — раскладываем по вершинам */
const skillCustomRadii = (props.skills?.length === 6
  ? props.skills.map(s => toRadius(s.value))
  : [45, 90, 130, 180, 130, 130]
)

/** размер точки — небольшая адаптация под экран */
const dotR = 6

const hexPoints = (radius) =>
  Array.from({ length: 6 }, (_, i) => {
    const angle = (Math.PI / 3) * i - Math.PI / 2
    const x = Math.cos(angle) * radius
    const y = Math.sin(angle) * radius
    return `${x},${y}`
  }).join(' ')

const getCoord = (r, i) => {
  const angle = (Math.PI / 3) * i - Math.PI / 2
  return { x: Math.cos(angle) * r, y: Math.sin(angle) * r }
}

const hexPointsByLevels = (radii) =>
  radii.map((r, i) => {
    const { x, y } = getCoord(r, i)
    return `${x},${y}`
  }).join(' ')
</script>
