<script setup lang="ts">
import { Languages } from 'lucide-vue-next'
import { local } from '@/utils/storage'
import type { SupportedLanguagesType } from '@/i18n'

defineOptions({ name: 'AppHeader' })

const { t } = useI18n()

const changeLanguage = (lang: SupportedLanguagesType) => {
  local.set('lang', lang)
  location.reload()
}
</script>

<template>
  <header
    class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12"
  >
    <div class="flex w-full items-center justify-between px-4">
      <div class="flex items-center gap-2">
        <SidebarTrigger class="-ml-1 cursor-pointer" />
        <Separator orientation="vertical" class="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem class="hidden md:block">
              <BreadcrumbLink href="#"> Building Your Application </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator class="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>Data Fetching</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div class="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button size="icon" variant="ghost" class="h-7 w-7 cursor-pointer">
              <Languages size="24" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>{{ t('layout.languageSwitch') }}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem @click="changeLanguage('zh')">中文</DropdownMenuItem>
            <DropdownMenuItem @click="changeLanguage('en')">English</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  </header>
</template>
