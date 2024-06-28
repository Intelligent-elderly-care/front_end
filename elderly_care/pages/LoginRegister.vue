<template>
    <div class="flex justify-center items-center min-h-screen bg-gray-100">
      <div class="bg-white p-8 shadow-lg rounded-lg w-96">
        <h2 class="text-2xl font-bold mb-6">欢迎</h2>
  
        <div v-if="isLoginForm">
          <!-- 登录表单 -->
          <LoginForm />
          <p class="mt-4 text-sm text-gray-500">
            还没有账号？<button @click="switchForm" class="text-blue-500">注册一个</button>
          </p>
        </div>
  
        <div v-else>
          <!-- 注册表单 -->
          <RegisterForm />
          <p class="mt-4 text-sm text-gray-500">
            已经有账号？<button @click="switchForm" class="text-blue-500">返回登录</button>
          </p>
        </div>
      </div>
    </div>
</template>
  
<script setup>
  import { ref } from 'vue';
  import LoginForm from '../components/LoginForm.vue';
  import RegisterForm from '../components/RegisterForm.vue';
  
  const isLoginForm = ref(true);
  
  const switchForm = () => {
    isLoginForm.value = !isLoginForm.value;
  };
</script>