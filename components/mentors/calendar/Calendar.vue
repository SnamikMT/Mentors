<template>
  <!-- ВНЕШНЯЯ ОБОЛОЧКА: фиксируем ширину, а высоту даём по контенту -->
  <div
    class="absolute left-[53px] top-[420px] z-[50] w-[908px]"
  >
    <!-- ВНУТРЕННИЙ БЛОК: скругление и glass-фон, overflow-hidden здесь -->
    <div class="relative w-full rounded-[32px] overflow-hidden">
      <!-- GLASS фон -->
      <div class="absolute inset-0 pointer-events-none">
        <!-- очень лёгкий серый градиент (≈5%) -->
        <div
          class="absolute inset-0 rounded-[32px]"
          style="
            background: linear-gradient(
              135deg,
              rgba(51,51,51,0.05) 0%,
              rgba(166,166,166,0.05) 40%,
              rgba(255,255,255,0.01) 100%
            );
          "
        ></div>
        <!-- белый слой + blur + лёгкий бордер -->
        <div
          class="absolute inset-0 rounded-[32px]
                 backdrop-blur-xl bg-white/20
                 border border-white/20
                 shadow-[0_18px_60px_rgba(15,23,42,0.18)]"
        ></div>
      </div>

      <!-- ВНУТРЕННИЙ LAYOUT: паддинги 12, две колонки 436 + 436 и gap 12 -->
      <div class="relative z-10 w-full p-3">
        <div class="grid w-full grid-cols-[436px_436px] gap-3">
          <!-- ЛЕВАЯ КОЛОНКА -->
          <div class="flex flex-col gap-3">
            <!-- БЛОК: осталось звонков -->
            <div
              class="w-full rounded-[20px] border border-[#E5E7EB]
                     bg-white px-6 py-6 flex flex-col gap-4"
            >
              <div class="text-[20px] leading-[20px] font-medium text-[#101012]">
                У тебя осталось 3 звонка
              </div>

              <!-- 0 / 4 осталось с камерами -->
              <div class="flex items-center justify-between text-[13px] leading-[16px]">
                <!-- слева: чёрная камера + 0 -->
                <div class="flex items-center gap-2 text-[#101012]">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M7.765 3.402C9.201 3.402 10.365 4.567 10.365 6.003V9.997C10.365 11.433 9.201 12.598 7.765 12.598H3.265C1.829 12.598 0.665 11.433 0.665 9.997V6.003C0.665 4.567 1.829 3.402 3.265 3.402H7.765Z"
                      fill="#101012"
                    />
                    <path
                      d="M14.172 4.626C14.752 4.473 15.342 4.908 15.343 5.529V10.458C15.343 11.077 14.755 11.513 14.176 11.362L14.06 11.324L11.809 10.417C11.33 10.224 11.016 9.759 11.016 9.242V6.756C11.016 6.241 11.328 5.777 11.805 5.583L14.057 4.665L14.172 4.626Z"
                      fill="#101012"
                    />
                  </svg>
                  <span>0</span>
                </div>

                <!-- справа: серая камера + «4 осталось» -->
                <div class="flex items-center gap-1 text-[rgba(60,60,67,0.72)]">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M7.765 3.402C9.201 3.402 10.365 4.567 10.365 6.003V9.997C10.365 11.433 9.201 12.598 7.765 12.598H3.265C1.829 12.598 0.665 11.433 0.665 9.997V6.003C0.665 4.567 1.829 3.402 3.265 3.402H7.765Z"
                      fill="#3C3C43" fill-opacity="0.7"
                    />
                    <path
                      d="M14.172 4.626C14.752 4.473 15.342 4.908 15.343 5.529V10.458C15.343 11.077 14.755 11.513 14.176 11.362L14.06 11.324L11.809 10.417C11.33 10.224 11.016 9.759 11.016 9.242V6.756C11.016 6.241 11.328 5.777 11.805 5.583L14.057 4.665L14.172 4.626Z"
                      fill="#3C3C43" fill-opacity="0.7"
                    />
                  </svg>
                  <span>4 осталось</span>
                </div>
              </div>

              <!-- чипы дат -->
              <div class="mt-1 flex flex-wrap gap-2">
                <button
                  type="button"
                  class="h-8 px-3 rounded-lg bg-[#007AFF] text-white text-[12px] font-medium
                         flex items-center justify-center"
                >
                  22 мая, 18:00
                </button>
                <button
                  type="button"
                  class="h-8 px-3 rounded-lg bg-[#F2F3F5]
                         text-[12px] font-medium text-[rgba(60,60,67,0.72)]
                         flex items-center justify-center"
                >
                  31 мая, 18:00
                </button>
                <button
                  type="button"
                  class="h-8 px-3 rounded-lg bg-[#F2F3F5]
                         text-[12px] font-medium text-[rgba(60,60,67,0.72)]
                         flex items-center justify-center"
                >
                  5 авг, 18:00
                </button>
                <button
                  type="button"
                  class="h-8 px-3 rounded-lg bg-[#007AFF]/10
                         text-[12px] font-medium text-[#007AFF]
                         flex items-center justify-center whitespace-nowrap"
                >
                  Назначить
                </button>
              </div>
            </div>

            <!-- БЛОК: запланированные звонки -->
            <div
              class="rounded-[20px] border border-[#E5E7EB]
                     bg-white px-6 py-6 flex flex-col"
            >
              <div class="text-[20px] leading-[20px] font-medium text-[#101012] mb-6">
                Запланированные звонки
              </div>

              <div class="space-y-7 text-[16px] leading-[24px] text-[#101012]">
                <!-- 1: активный -->
                <div class="flex gap-3">
                  <div class="flex flex-col items-center">
                    <span class="w-3 h-3 rounded-full bg-[#007AFF]"></span>
                    <div class="timeline-line timeline-line--active"></div>
                  </div>
                  <div class="pt-[2px] font-medium">
                    22 мая, 18:00
                  </div>
                </div>

                <!-- 2 -->
                <div class="flex gap-3">
                  <div class="flex flex-col items-center">
                    <span class="w-3 h-3 rounded-full bg-[#D4D4D8]"></span>
                    <div class="timeline-line"></div>
                  </div>
                  <div class="pt-[2px] text-[rgba(60,60,67,0.72)]">
                    31 мая, 19:00
                  </div>
                </div>

                <!-- 3 -->
                <div class="flex gap-3">
                  <div class="flex flex-col items-center">
                    <span class="w-3 h-3 rounded-full bg-[#D4D4D8]"></span>
                    <div class="timeline-line"></div>
                  </div>
                  <div class="pt-[2px] text-[rgba(60,60,67,0.72)]">
                    5 июня, 18:00
                  </div>
                </div>

                <!-- 4: последний, без линии вниз -->
                <div class="flex gap-3">
                  <div class="flex flex-col items-center">
                    <span class="w-3 h-3 rounded-full bg-[#D4D4D8]"></span>
                  </div>
                  <div class="pt-[2px] text-[rgba(60,60,67,0.72)]">
                    11 июня, 20:00
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- ПРАВАЯ КОЛОНКА: календарь -->
          <div
            class="rounded-[20px] border border-[#E5E7EB]
                   bg-white flex flex-col"
          >
            <div class="px-6 pt-2 pb-6 flex items-center justify-center">
              <div class="w-full">
                <!-- неделя + дни: сетка 55×55 -->
                <div class="grid grid-cols-7 auto-rows-[55px] justify-items-center">
                  <!-- заголовки дней недели -->
                  <div
                    v-for="w in weekdays"
                    :key="'w-' + w"
                    class="cal-weekday"
                  >
                    {{ w }}
                  </div>

                  <!-- дни -->
                  <button
                    v-for="(d, idx) in days"
                    :key="'d-' + idx"
                    type="button"
                    class="cal-day"
                    :class="[
                      d.muted ? 'cal-day--muted' : '',
                      d.selected ? 'cal-day--selected' : ''
                    ]"
                  >
                    <!-- иконка статуса над числом -->
                    <div class="cal-mark">
                      <img
                        v-if="d.done || d.deadline"
                        :src="d.done ? doneIcon : deadlineIcon"
                        class="w-4 h-4"
                        alt=""
                      />
                    </div>

                    <span>{{ d.label }}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- КНОПКА СВЕРНУТЬ: 40×40, наполовину наружу, один круг -->
    <button
      class="absolute left-1/2 -translate-x-1/2 -top-[20px]
             w-10 h-10 rounded-full border border-[#787880]/[0.16]
             bg-white/90 backdrop-blur
             flex items-center justify-center
             shadow-md cursor-pointer"
      @click="$emit('close')"
      aria-label="Скрыть"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path
          d="M6 9l6 6 6-6"
          stroke="#3C3C43"
          stroke-opacity="0.72"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import doneIcon from '@/src/assets/icons/calendar/done.svg'        // синяя галка/круг
import deadlineIcon from '@/src/assets/icons/calendar/deadline.svg' // оранжевые часы

type DayCell = {
  label: string
  muted?: boolean
  selected?: boolean
  done?: boolean
  deadline?: boolean
}

/** заголовки дней недели */
const weekdays = ['Сб','Пн','Вт','Ср','Чт','Пт','Вс']

/** статическая сетка как в макете */
const days: DayCell[] = [
  // ряд 1
  { label: '28', muted: true },
  { label: '29', muted: true },
  { label: '30' },
  { label: '1' },
  { label: '2', done: true },
  { label: '3' },
  { label: '4', done: true },
  // ряд 2
  { label: '5', done: true },
  { label: '6' },
  { label: '7' },
  { label: '8' },
  { label: '9', done: true },
  { label: '10' },
  { label: '11', done: true },
  // ряд 3
  { label: '12' },
  { label: '13' },
  { label: '14' },
  { label: '15', selected: true },
  { label: '16' },
  { label: '17' },
  { label: '18' },
  // ряд 4
  { label: '19' },
  { label: '20' },
  { label: '21' },
  { label: '22', deadline: true },
  { label: '23' },
  { label: '24' },
  { label: '25' },
  // ряд 5
  { label: '26' },
  { label: '27' },
  { label: '28' },
  { label: '29', deadline: true },
  { label: '30' },
  { label: '31', deadline: true },
  { label: '1', muted: true },
  // ряд 6
  { label: '2', muted: true },
  { label: '3', muted: true },
  { label: '4', muted: true },
  { label: '5', muted: true },
  { label: '6', muted: true },
  { label: '7', muted: true },
  { label: '8', muted: true },
]
</script>

<style scoped>
/* календарь */
.cal-weekday {
  width: 55px;
  height: 55px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  line-height: 12px;
  color: #a1a1aa;
}

.cal-day {
  width: 55px;
  height: 55px;
  border-radius: 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.cal-day span {
  font-size: 16px;
  line-height: 24px;
  font-weight: 500;
  color: #101012;
}

.cal-day--muted span {
  color: #d4d4d8;
}

.cal-day--selected {
  background: #101012;
}

.cal-day--selected span {
  color: #ffffff;
}

/* контейнер под иконку, строго над числом */
.cal-mark {
  width: 16px;
  height: 16px;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* вертикальная линия таймлайна слева — почти до следующего кружка, с отступом 8 */
.timeline-line {
  width: 2px;
  flex: 1;
  margin-top: 8px;
  margin-bottom: 8px;
  background: #e5e7eb;
  border-radius: 999px;
}
.timeline-line--active {
  width: 3px;
  background: #007aff;
}
</style>
