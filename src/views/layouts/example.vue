<script setup lang="ts">
import AppSidebar from './components/AppSidebar.vue'

defineOptions({ name: 'ExampleLayout' })
</script>

<template>
  <sidebar-provider>
    <app-sidebar />
    <main>
      <sidebar-trigger />
      <router-view />
    </main>
  </sidebar-provider>
</template>

<style scoped></style>
