<template>
  <div class="w-72 flex flex-col gap-6">
    <div class="bg-white rounded-2xl outline outline-1 outline-offset-[-1px] outline-[#7878801a] flex flex-col">
      <div class="px-6 pt-6 pb-4">
        <h2 class="text-xl font-medium text-[#020203]">Активность</h2>
      </div>
     
      <div class="border-y border-[#E5E5EA] grid grid-cols-2">
        <div class="p-4 border-r border-[#E5E5EA] flex flex-col gap-1">
          <span class="text-xs text-[#3C3C43b3] font-medium">Курсов</span>
          <div class="flex items-center gap-1">
            <img src="../../src/assets/icons/profile/sidebar/school.svg" alt="courses" class="w-4 h-4" />
            <span class="text-base font-medium text-[#020203]">10</span>
          </div>
        </div>
        <div class="p-4 flex flex-col gap-1">
          <span class="text-xs text-[#3C3C43b3] font-medium">Часов</span>
          <div class="flex items-center gap-1">
            <img src="../../src/assets/icons/profile/activity/time.svg" alt="hours" class="w-4 h-4" />
            <span class="text-base font-medium text-[#020203]">15</span>
          </div>
        </div>
      </div>
      
      <div class="border-b border-[#E5E5EA] px-4 py-3 flex flex-col gap-1">
        <span class="text-xs text-[#3C3C43b3] font-medium">Сертификаций получено</span>
        <div class="flex items-center gap-1">
          <img src="../../src/assets/icons/profile/sidebar/trophy.svg" alt="certs" class="w-4 h-4" />
          <span class="text-base font-medium text-[#020203]">2</span>
        </div>
      </div>

      <div class="px-4 py-3 flex flex-col gap-1">
        <span class="text-xs text-[#3C3C43b3] font-medium">Звонков с ментором</span>
        <div class="flex items-center gap-1">
          <img src="../../src/assets/icons/profile/sidebar/group.svg" alt="calls" class="w-4 h-4" />
          <span class="text-base font-medium text-[#020203]">7</span>
        </div>
      </div>
    </div>
  
    <div class="bg-white rounded-2xl outline outline-1 outline-offset-[-1px] outline-[#7878801a] flex flex-col">
      <div class="px-6 pt-6 pb-4">
        <h2 class="text-xl font-medium text-[#020203]">Статистика</h2>
      </div>
      <div class="border-y border-[#E5E5EA] grid grid-cols-2">
        <div class="p-4 border-r border-[#E5E5EA] flex flex-col gap-1">
          <span class="text-xs text-[#3C3C43b3] font-medium">Звёзд</span>
          <div class="flex items-center gap-1">
            <img src="../../src/assets/icons/profile/activity/sparkles.svg" alt="stars" class="w-4 h-4" />
            <span class="text-base font-medium text-[#020203]">10</span>
          </div>
        </div>
        <div class="p-4 flex flex-col gap-1">
          <span class="text-xs text-[#3C3C43b3] font-medium">Твоя лига</span>
          <div class="flex items-center gap-1">
            <img src="../../src/assets/icons/profile/activity/bronze.svg" alt="league" class="w-4 h-4" />
            <span class="text-base font-medium text-[#020203]">Бронза</span>
          </div>
        </div>
      </div>
     
      <div class="grid grid-cols-2 border-[#E5E5EA]">
        <div class="p-4 border-r border-[#E5E5EA] flex flex-col gap-1">
          <span class="text-xs text-[#3C3C43b3] font-medium">Стрик</span>
          <div class="flex items-center gap-1">
            <img src="../../src/assets/icons/profile/activity/flash.svg" alt="streak" class="w-4 h-4" />
            <span class="text-base font-medium text-[#020203]">0</span>
          </div>
        </div>
        <div class="p-4 flex flex-col gap-1">
          <span class="text-xs text-[#3C3C43b3] font-medium">Топ-стрик</span>
          <div class="flex items-center gap-1">
            <img src="../../src/assets/icons/profile/activity/flash.svg" alt="top-streak" class="w-4 h-4" />
            <span class="text-base font-medium text-[#020203]">10</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
