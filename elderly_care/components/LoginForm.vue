<template>
    <form @submit.prevent="login">
      <div class="mb-4">
        <label for="loginUsername" class="block text-sm font-medium text-gray-700">用户名</label>
        <input
          v-model="loginForm.username"
          type="text"
          id="loginUsername"
          name="loginUsername"
          required
          autocomplete="username"
          class="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-gray-200 focus:border-gray-200 sm:text-sm"
        />
      </div>
      <div class="mb-4">
        <label for="loginPassword" class="block text-sm font-medium text-gray-700">密码</label>
        <input
          v-model="loginForm.password"
          type="password"
          id="loginPassword"
          name="loginPassword"
          required
          autocomplete="current-password"
          class="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-gray-200 focus:border-gray-200 sm:text-sm"
        />
      </div>
      <div class="flex items-center justify-end">
        <button
          type="submit"
          class="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring"
        >
          登录
        </button>
      </div>
    </form>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  
  const router = useRouter();
  
  const loginForm = ref({
    username: "",
    password: ""
  });
  
  const login = () => {
    if (loginForm.value.username === "1726634055@qq.com" && loginForm.value.password === "GJyg6841!") {
      router.push("/homepage");
    } else {
      alert("登录失败，请检查用户名和密码。");
    }
  };
  </script>
  