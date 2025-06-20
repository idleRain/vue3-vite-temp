<script setup lang="ts">
import { elementLocale } from '@/i18n'
</script>

<template>
  <ElConfigProvider :locale="elementLocale">
    <RouterView />
  </ElConfigProvider>
</template>
