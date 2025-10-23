<template>
  <div>
    <Header v-if="headerType === 'mentor-inline'">
      <template #left>
        <Mentor :name="'Даниил Ерошов'" :subtitle="'Ваш ментор'" />
      </template>
    </Header>

    <div v-else>
      <Header :title="title" :icon="icon" />
      <Mentor v-if="headerType === 'title-then-mentor'" :name="'Даниил Ерошов'" :subtitle="'Ваш ментор'" class="mt-6" />
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import Header from '../profile/Header.vue'
import Mentor from './Mentor.vue'

const route = useRoute()

const headerType = route.meta.headerType ?? 'default'
</script>