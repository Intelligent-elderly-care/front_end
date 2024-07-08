<template>
  <header class="bg-gray-700 text-white p-4 flex items-center">
    <h1 class="text-xl flex-grow text-center pl-40">智能养老系统</h1>
    <div class="flex items-center space-x-8">
      <div class="flex flex-col items-center">
        <span>日期：{{ date }}</span>
        <span>时间：{{ time }}</span>
      </div>
    </div>

    <!-- 空白元素 -->
    <div style="width: 20px;"></div>

    <div class="flex items-center space-x-2">
        <img src="https://picsum.photos/id/83/300/320" alt="User Avatar" class="w-8 h-8 rounded-full cursor-pointer" @click="toggleDropdown">
        <span>{{ username }}</span>
    </div>
    <div v-if="dropdownVisible" class="absolute right-4 top-16 bg-white text-black rounded-lg shadow-lg p-4">
      <a href="#" @click="logout">注销</a>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useGeneralStore } from '~/stores/general';

const store = useGeneralStore();

const date = ref('');
const time = ref('');
const dropdownVisible = ref(false);
const username = computed(() => store.name);
const router = useRouter();

const toggleDropdown = () => {
  dropdownVisible.value = !dropdownVisible.value;
};

const fetchDateTime = () => {
  const now = new Date();
  date.value = now.toLocaleDateString();
  time.value = now.toLocaleTimeString();
};

onMounted(() => {
  fetchDateTime();
  setInterval(fetchDateTime, 600); // 每秒钟更新一次时间
});

const logout = () => {
  // 处理注销逻辑
  store.logout();
  router.push('/');
  console.log('用户已注销');
};
</script>