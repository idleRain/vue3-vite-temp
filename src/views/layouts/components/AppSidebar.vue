<script setup lang="ts">
import { Calendar, Home, Inbox, Search, Settings } from 'lucide-vue-next'

const { t } = useI18n()
// Menu items.
const items = [
  {
    title: t('layout.home'),
    url: '#',
    icon: Home
  },
  {
    title: t('layout.inbox'),
    url: '#',
    icon: Inbox
  },
  {
    title: t('layout.calendar'),
    url: '#',
    icon: Calendar
  },
  {
    title: t('layout.search'),
    url: '#',
    icon: Search
  },
  {
    title: t('layout.settings'),
    url: '#',
    icon: Settings
  }
]
</script>

<template>
  <sidebar>
    <sidebar-content>
      <sidebar-group>
        <sidebar-group-label>Application</sidebar-group-label>
        <sidebar-group-content>
          <sidebar-menu>
            <sidebar-menu-item v-for="item in items" :key="item.title">
              <sidebar-menu-button as-child>
                <router-link :to="item.url">
                  <component :is="item.icon" />
                  <span>{{ item.title }}</span>
                </router-link>
              </sidebar-menu-button>
            </sidebar-menu-item>
          </sidebar-menu>
        </sidebar-group-content>
      </sidebar-group>
    </sidebar-content>
  </sidebar>
</template>

<style scoped></style>
