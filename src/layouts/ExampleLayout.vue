<script setup lang="ts">
import AppSidebar from './components/AppSidebar.vue'
import AppHeader from '@/layouts/components/AppHeader.vue'

defineOptions({ name: 'ExampleLayout' })
</script>

<template>
  <SidebarProvider>
    <AppSidebar />
    <SidebarInset>
      <AppHeader />
      <RouterView />
    </SidebarInset>
  </SidebarProvider>
</template>
