<template>
  <NuxtPage />
</template>

<script setup>
import { storeToRefs } from 'pinia';
import axios from '../plugins/axios'

const $axios = axios().provide.axios

onMounted(async () => {
  // 从localStorage中恢复token并设置axios的Authorization头
  const token = localStorage.getItem('token')
  if (token) {
      // $userStore.token = token
      $axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }
})
</script>