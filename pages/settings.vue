<template>
  <div class="w-full max-w-[1440px] pr-48 bg-Backgrounds-Neutral-Primary inline-flex justify-start items-start gap-12 overflow-hidden">
    <Sidebar /> 
    <div class="flex-1 pt-4 pb-12 inline-flex flex-col justify-start items-start gap-9">
      <Header
      sectionTitle="Настройки"
      :sectionIcon="sectionIcon"/> 
      <div class="w-full flex gap-6">
        <ProfileSettings /> 
        <InterfaceSettings /> 
      </div>
    </div>
  </div>
</template>

<script setup>
import Sidebar from '../components/profile/sidebar/Sidebar.vue'
import Header from '../components/profile/Header.vue'
import sectionIcon from '../src/assets/icons/profile/header/drop-down/settings.svg'
import ProfileSettings from '../components/profile/settings/ProfileSettings.vue'
import InterfaceSettings from '../components/profile/settings/InterfaceSettings.vue'
</script>
