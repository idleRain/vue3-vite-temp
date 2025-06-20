<script lang="ts" setup>
defineOptions({ name: 'Example' })

const { t } = useI18n()
</script>

<template>
  <div class="flex flex-1 flex-col gap-4 p-4 pt-0">
    <div class="grid auto-rows-min gap-4 md:grid-cols-3">
      <div class="aspect-video rounded-xl bg-muted/50">{{ t('example.send') }}</div>
      <div class="aspect-video rounded-xl bg-muted/50">{{ t('layout.playground') }}</div>
      <div class="aspect-video rounded-xl bg-muted/50" />
    </div>
    <div class="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
  </div>
</template>
