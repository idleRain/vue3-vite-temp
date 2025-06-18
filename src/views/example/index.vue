<script setup lang="ts">
import type { Example } from '@/types'
import { local } from '@/utils/storage'
import { ElMessage } from 'element-plus'
import { SupportedLanguagesType } from '@/locales/typing'
import API from '@/api'

defineOptions({ name: 'Example' })

const { t } = useI18n()
const example = reactive<Example>({
  name: 'Vite + Vue',
  age: 18,
  description: '示例',
  code: '404 not found'
})

console.log('App.vue', example)

const lang = ref(local.get('lang') ?? import.meta.env.VITE_APP_LOCALE)

const changeLanguage = (lang: SupportedLanguagesType) => {
  local.set('lang', lang)
  location.reload()
}

const send = async () => {
  try {
    const { data } = await API.example.getHello()
    ElMessage.success(data)
  } catch {
    ElMessage.error('请求失败')
  }
}
</script>

<template>
  <el-card>
    <div class="text-red-500">
      {{ example.name }}
    </div>
    <div class="text-blue-300">{{ t('test.name') }}</div>

    <div class="mt-[20px]">
      <span>{{ t('layout.languageSwitch') }}：</span>
      <el-select v-model="lang" placeholder="切换语言" @change="changeLanguage">
        <el-option label="中文" value="zh" />
        <el-option label="English" value="en" />
      </el-select>
    </div>

    <div class="mt-[20px]">
      <el-button @click="send">点击发起请求</el-button>
    </div>
  </el-card>
</template>

<style scoped></style>
