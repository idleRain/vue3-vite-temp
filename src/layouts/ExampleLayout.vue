<script setup lang="ts">
import AppHeader from '@/layouts/components/AppHeader.vue'
import AppSidebar from './components/AppSidebar.vue'

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
