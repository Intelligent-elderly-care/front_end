<template>
    <div>
        <h2 class="text-2xl mb-4">老人信息管理主页面</h2>
        <!-- 搜索框 -->
        <div class="mb-4">
            <input v-model="searchQuery" type="text" placeholder="搜索老人信息..." class="p-2 border rounded" />
            <button @click="search" class="ml-2 p-2 bg-blue-500 text-white rounded">搜索</button>
        </div>

        <!-- 添加老人信息 -->
        <div class="mb-4">
            <button @click="showAddForm = !showAddForm" class="p-2 bg-green-500 text-white rounded">添加老人信息</button>
            <form v-if="showAddForm" @submit.prevent="addElderly" class="mt-4">
                <!-- 输入表单内容，示例字段 -->
                <input v-model="newElderly.name" type="text" placeholder="名字" class="p-2 border rounded mb-2 block w-full" />
                <input v-model="newElderly.gender" type="text" placeholder="性别" class="p-2 border rounded mb-2 block w-full" />
                <input v-model="newElderly.phone" type="text" placeholder="手机号" class="p-2 border rounded mb-2 block w-full" />
                <!-- 其他字段 -->
                <button type="submit" class="p-2 bg-blue-500 text-white rounded">提交</button>
            </form>
        </div>

        <!-- 老人信息列表 -->
        <div>
            <ul>
                <li v-for="elderly in filteredElderlies" :key="elderly.id" class="mb-2 p-2 border rounded flex justify-between">
                    <span>{{ elderly.name }} - {{ elderly.gender }} - {{ elderly.phone }}</span>
                    <div>
                        <button @click="editElderly(elderly)" class="mr-2 p-1 bg-yellow-500 text-white rounded">编辑</button>
                        <button @click="deleteElderly(elderly.id)" class="p-1 bg-red-500 text-white rounded">删除</button>
                    </div>
                </li>
            </ul>
        </div>

        <!-- 编辑老人信息 -->
        <div v-if="editingElderly">
            <h3 class="text-xl mb-4">编辑老人信息</h3>
            <form @submit.prevent="updateElderly" class="mt-4">
                <!-- 输入表单内容，示例字段 -->
                <input v-model="editingElderly.name" type="text" placeholder="名字" class="p-2 border rounded mb-2 block w-full" />
                <input v-model="editingElderly.gender" type="text" placeholder="性别" class="p-2 border rounded mb-2 block w-full" />
                <input v-model="editingElderly.phone" type="text" placeholder="手机号" class="p-2 border rounded mb-2 block w-full" />
                <!-- 其他字段 -->
                <button type="submit" class="p-2 bg-blue-500 text-white rounded">提交</button>
                <button @click="cancelEdit" class="p-2 bg-gray-500 text-white rounded">取消</button>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// 状态管理
const searchQuery = ref('');
const showAddForm = ref(false);
const newElderly = ref({
    name: '',
    gender: '',
    phone: '',
    // 其他字段
});
const elderlies = ref([
    // 示例数据
    { id: 1, name: '张三', gender: '男', phone: '12345678901' },
    { id: 2, name: '李四', gender: '女', phone: '09876543210' }
]);
const editingElderly = ref(null);

// 过滤后的老人信息
const filteredElderlies = computed(() => {
    return elderlies.value.filter(elderly => 
        elderly.name.includes(searchQuery.value) || 
        elderly.phone.includes(searchQuery.value)
    );
});

// 方法
const search = () => {
    // 搜索逻辑
};

const addElderly = () => {
    // 添加逻辑
    elderlies.value.push({ ...newElderly.value, id: Date.now() });
    showAddForm.value = false;
    newElderly.value = { name: '', gender: '', phone: '' }; // 重置表单
};

const editElderly = (elderly) => {
    editingElderly.value = { ...elderly };
};

const updateElderly = () => {
    const index = elderlies.value.findIndex(elderly => elderly.id === editingElderly.value.id);
    if (index !== -1) {
        elderlies.value[index] = { ...editingElderly.value };
    }
    editingElderly.value = null;
};

const deleteElderly = (id) => {
    elderlies.value = elderlies.value.filter(elderly => elderly.id !== id);
};

const cancelEdit = () => {
    editingElderly.value = null;
};
</script>