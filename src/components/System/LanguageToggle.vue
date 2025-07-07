<script setup lang="ts">
import type { SupportedLanguagesType } from '@/i18n/typing'
import { Languages } from 'lucide-vue-next'
import { local } from '@/utils/storage.ts'

const { t } = useI18n()

const changeLanguage = (lang: SupportedLanguagesType) => {
  local.set('lang', lang)
  location.reload()
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger>
      <Button size="icon" variant="ghost" class="h-9 w-9 cursor-pointer">
        <Languages :size="24" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuLabel>{{ t('layout.languageSwitch') }}</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem @click="changeLanguage('zh')">中文</DropdownMenuItem>
      <DropdownMenuItem @click="changeLanguage('en')">English</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<style scoped></style>
