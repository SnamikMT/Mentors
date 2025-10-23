<template>
  <div class="self-stretch inline-flex flex-col justify-start items-start gap-2">
    <div class="self-stretch rounded-xl inline-flex justify-start items-stretch">
      <div
        class="w-full max-w-4 self-stretch pl-3 py-4 rounded-tl-xl rounded-bl-xl
               border-l border-t border-b border-Border-Neutral-Base/20"/>
      <div class="flex-1 inline-flex flex-col justify-start items-start">
        <div class="self-stretch h-4 inline-flex justify-start items-end">
          <div class="h-6 px-1 flex justify-start items-start">
            <div class="justify-start text-[#3C3C43]/70 text-sm font-medium font-geist leading-3">
              {{ label }}
            </div>
          </div>
          <div class="flex-1 h-4 border-t border-Border-Neutral-Base/20"></div>
        </div>
        <div class="self-stretch pl-1 pb-4 border-b border-Border-Neutral-Base/20 inline-flex justify-start items-start">
          <div class="flex-1 justify-start text-Labels-Neutral-Primary text-base font-normal font-geist leading-normal">
            {{ value }}
          </div>
        </div>
      </div>
      <div class="self-stretch pl-1 pr-3 py-4 rounded-tr-xl rounded-br-xl
         border-r border-t border-b border-Border-Neutral-Base/20
         flex justify-center items-center">
         <button
         v-if="editable"
         type="button"
         class="-mt-8 self-end mr-1 rounded-full grid place-items-center hover:bg-black/5"
         @click="onEditClick"
         :aria-label="editAriaLabel || `Изменить: ${label}`"
         >
         <img :src="pencilIcon" class="w-5 h-5" alt="" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import pencilIcon from '../../src/assets/icons/profile/header/pencil.svg'

const props = defineProps({
  label: { type: String, required: true },
  value: { type: String, required: true },
  editable: { type: Boolean, default: false },     
  editField: { type: String, default: '' },        
  editAriaLabel: { type: String, default: '' },  
})

const emit = defineEmits(['edit']) 

function onEditClick() {
  emit('edit', props.editField || null)
}
</script>
