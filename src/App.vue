<script setup lang="ts">
import { elementLocale } from '@/locales'
</script>

<template>
  <el-config-provider :locale="elementLocale">
    <router-view />
  </el-config-provider>
</template>
