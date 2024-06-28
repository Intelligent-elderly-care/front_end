<template>
    <div class="flex justify-center items-center min-h-screen bg-gray-100">
      <div class="bg-white p-8 shadow-lg rounded-lg w-96">
        <transition name="slide-fade">
          <div v-if="isLoginForm" key="login" class="bg-white p-8 shadow-lg rounded-lg">
            <h2 class="text-2xl font-bold mb-6">欢迎</h2>
            <div class="flex">
              <div class="w-1/2 pr-4">
                <LoginForm />
                <p class="mt-4 text-sm text-gray-500">
                  还没有账号？<button @click="switchForm" class="text-blue-500">注册一个</button>
                </p>
              </div>
              <div class="w-1/2">
                <div class="text-center">
                  <h3 class="text-lg font-semibold mb-2">欢迎来到智慧养老平台</h3>
                </div>
              </div>
            </div>
          </div>
          <div v-else key="register" class="bg-white p-8 shadow-lg rounded-lg">
            <h2 class="text-2xl font-bold mb-6">欢迎</h2>
            <div class="flex">
              <div class="w-1/2 pr-4">
                <RegisterForm />
                <p class="mt-4 text-sm text-gray-500">
                  已经有账号？<button @click="switchForm" class="text-blue-500">返回登录</button>
                </p>
              </div>
              <div class="w-1/2">
                <div class="text-center">
                  <h3 class="text-lg font-semibold mb-2">欢迎来到智慧养老平台</h3>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
</template>
  
<script setup>
  import LoginForm from '../components/LoginForm.vue';
  import RegisterForm from '../components/RegisterForm.vue';
  
  let isLoginForm = ref(true);
  
  const switchForm = () => {
    isLoginForm.value = !isLoginForm.value;
  };
</script>