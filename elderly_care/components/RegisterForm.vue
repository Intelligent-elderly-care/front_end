<template>
  <form @submit.prevent="register">
    <div class="mb-4">
      <label for="registerUsername" class="block text-sm font-medium text-gray-700">用户名</label>
      <input
        v-model="registerForm.username"
        type="text"
        id="registerUsername"
        name="registerUsername"
        required
        autocomplete="username"
        class="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-gray-200 focus:border-gray-200 sm:text-sm"
      />
    </div>
    <div class="mb-4">
      <label for="registerPassword" class="block text-sm font-medium text-gray-700">密码</label>
      <input
        v-model="registerForm.password"
        type="password"
        id="registerPassword"
        name="registerPassword"
        required
        autocomplete="new-password"
        class="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-gray-200 focus:border-gray-200 sm:text-sm"
      />
    </div>
    <div class="mb-4">
      <label for="confirmPassword" class="block text-sm font-medium text-gray-700">确认密码</label>
      <input
        v-model="registerForm.confirmPassword"
        type="password"
        id="confirmPassword"
        name="confirmPassword"
        required
        autocomplete="new-password"
        class="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-gray-200 focus:border-gray-200 sm:text-sm"
      />
    </div>
    <div class="mb-4">
      <label for="realName" class="block text-sm font-medium text-gray-700">真实姓名</label>
      <input
        v-model="registerForm.realName"
        type="text"
        id="realName"
        name="realName"
        class="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-gray-200 focus:border-gray-200 sm:text-sm"
      />
    </div>
    <div class="mb-4">
      <label for="sex" class="block text-sm font-medium text-gray-700">性别</label>
      <select
        v-model="registerForm.sex"
        id="sex"
        name="sex"
        class="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-gray-200 focus:border-gray-200 sm:text-sm"
      >
        <option value="male">男</option>
        <option value="female">女</option>
      </select>
    </div>
    <div class="mb-4">
      <label for="registerEmail" class="block text-sm font-medium text-gray-700">邮箱</label>
      <input
        v-model="registerForm.email"
        type="email"
        id="registerEmail"
        name="registerEmail"
        required
        class="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-gray-200 focus:border-gray-200 sm:text-sm"
      />
    </div>
    <div class="mb-4">
      <label for="registerPhone" class="block text-sm font-medium text-gray-700">手机号</label>
      <input
        v-model="registerForm.phone"
        type="tel"
        id="registerPhone"
        name="registerPhone"
        required
        class="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-gray-200 focus:border-gray-200 sm:text-sm"
      />
    </div>
    <div class="mb-4">
      <label for="description" class="block text-sm font-medium text-gray-700">描述</label>
      <textarea
        v-model="registerForm.description"
        id="description"
        name="description"
        rows="3"
        class="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-gray-200 focus:border-gray-200 sm:text-sm"
      ></textarea>
    </div>
    <div class="flex items-center justify-end">
      <button
        type="submit"
        class="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring"
      >
        注册
      </button>
    </div>
  </form>
</template>

<script setup>

const registerForm = ref({
  username: "",
  password: "",
  confirmPassword: "",
  realName: "",
  sex: "male",
  email: "",
  phone: "",
  description: ""
});

const register = () => {
  // 处理注册逻辑，可以通过提交 registerForm 中的数据进行处理
};
</script>