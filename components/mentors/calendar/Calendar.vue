<template>
  <div
    class="w-full max-w-[908px] h-[444px] absolute left-[53px] top-[420px] z-[50] p-3 rounded-[32px] outline outline-1 outline-offset-[-1px] outline-[#7878801a] flex gap-3"
  >
    
    <div class="absolute inset-0 rounded-[32px] overflow-hidden z-0">
      <div class="absolute inset-0 bg-blend-color-dodge bg-Backgrounds-Materials-Soft-02"></div>
      <div class="absolute inset-0 backdrop-blur-md bg-white/0"></div>
    </div>
    
    <div class="flex-1 flex flex-col justify-start items-start gap-3 relative z-10">
      <div class="w-full px-3 pt-6 pb-3 bg-[#FFFFFF00] rounded-[20px] flex flex-col gap-4 relative overflow-hidden">
        <div class="absolute inset-0 overflow-hidden">
          <div class="absolute inset-0 bg-blend-color-dodge bg-white"></div>
          <div class="absolute inset-0 bg-white/0 backdrop-blur-3xl"></div>
        </div>

        <div class="text-xl font-medium text-Labels-Neutral-Primary leading-tight z-10">
          У тебя осталось 3 звонка
        </div>

        <div class="w-full flex justify-between z-10">
          <div class="flex items-center gap-1">
            <div class="w-full max-w-4 h-4 relative">
              <div class="w-full max-w-3.5 h-2.5 absolute left-[0.66px] top-[3.4px] bg-Labels-Neutral-Primary"></div>
            </div>
            <span class="text-base text-Labels-Neutral-Primary">0</span>
          </div>
          <div class="flex items-center gap-1">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M7.765 3.402C9.201 3.402 10.365 4.567 10.365 6.003V9.997C10.365 11.433 9.201 12.598 7.765 12.598H3.265C1.829 12.598 0.665 11.433 0.665 9.997V6.003C0.665 4.567 1.829 3.402 3.265 3.402H7.765Z" fill="#3C3C43" fill-opacity="0.7"/>
              <path d="M14.172 4.626C14.752 4.473 15.342 4.908 15.343 5.529V10.458C15.343 11.077 14.755 11.513 14.176 11.362L14.06 11.324L11.809 10.417C11.33 10.224 11.016 9.759 11.016 9.242V6.756C11.016 6.241 11.328 5.777 11.805 5.583L14.057 4.665L14.172 4.626Z" fill="#3C3C43" fill-opacity="0.7"/>
            </svg>
            <span class="text-base text-Labels-Neutral-Secondary/70">4 осталось</span>
          </div>
        </div>
      
        <div class="flex gap-1 w-full z-10">
          <div class="flex-1 h-8 p-2 bg-blue-500 text-Labels-Static-Light-Primary text-xs font-medium rounded-lg flex justify-center items-center">
            22 мая, 18:00
          </div>
          <div class="flex-1 h-8 px-3 py-1 bg-[#787880]/10 text-Labels-Neutral-Secondary/70 text-xs font-medium rounded-lg flex justify-center items-center">
            31 мая, 18:00
          </div>
        <div class="flex-1 h-8 px-3 py-1 bg-[#787880]/10 text-Labels-Neutral-Secondary/70 text-xs font-medium rounded-lg flex justify-center items-center">
            5 авг, 18:00
          </div>
          <div class="flex-1 h-8 px-3 py-1 bg-[#007AFF]/10 text-Labels-Brand-Primary text-xs font-medium rounded-lg flex justify-center items-center">
            Назначить
          </div>
        </div>
      </div>
      
      <div class="w-full h-64 px-6 pt-6 bg-Backgrounds-Neutral-Tertiary rounded-[20px] flex flex-col justify-end gap-4 relative overflow-hidden">
        <div class="absolute inset-0 bg-blend-color-dodge bg-white"></div>
        <div class="absolute inset-0 backdrop-blur-3xl bg-white/0"></div>

        <div class="absolute top-0 left-0 w-full px-6 pt-6 pb-9 bg-gradient-to-b from-Backgrounds-Overlay-Soft/20 to-Backgrounds-Overlay-Ghost/0 backdrop-blur-[2px] flex items-center">
          <div class="text-xl font-medium text-Labels-Neutral-Primary">Запланированные звонки</div>
        </div>
       
        <div class="relative z-10 mt-auto space-y-3">
          <div class="flex gap-3">
            <div class="flex flex-col items-center pt-1 gap-2">
              <div class="size-3 bg-Labels-Brand-Primary rounded-full"></div>
              <div class="w-full max-w-0 flex-1 outline outline-[3px] outline-offset-[-1.5px] outline-Labels-Brand-Primary"></div>
            </div>
            <div class="flex-1 pb-6">
              <div class="text-base font-medium text-Labels-Neutral-Primary">22 мая, 18:00</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  
    <div class="w-full max-w-96 h-full bg-gray-50 rounded-[20px] flex justify-center items-center text-sm text-gray-400 z-10">
      Здесь будет календарь
    </div>
   
    <div
      class="absolute left-1/2 -translate-x-1/2 -top-[28px] size-10 bg-white/50 backdrop-blur rounded-full flex items-center justify-center cursor-pointer z-[60]"
      @click="$emit('close')"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M5.24 9.123a.75.75 0 0 1 1.274 0l5.03 4.97a.75.75 0 0 0 1.064 0l4.97-4.97a.75.75 0 0 1 1.061 1.06l-4.97 4.97a2.25 2.25 0 0 1-3.182 0l-5.03-4.97a.75.75 0 0 1 0-1.06Z" fill="#3C3C43" fill-opacity="0.7"/>
      </svg>
    </div>
  </div>
</template>