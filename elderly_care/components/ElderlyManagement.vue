<template>
    <div>
        <!-- Search Section -->
        <div class="bg-white shadow rounded-lg p-6 mb-6">
            <div class="mb-4">
                <label class="block text-black text-lg font-bold mb-2">输入搜索:</label>
                <div class="flex items-center space-x-4">
                    <input
                    v-model="searchText"
                    @keypress.enter="handleSearch"
                    class="shadow appearance-none border rounded w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="输入老人信息..."
                    />
                    <button
                    @click="handleSearch"
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-sm"
                    >
                    查询搜索
                    </button>
                    <button
                    @click="handleReset"
                    class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-sm"
                    >
                    重置
                    </button>
                </div>
            </div>
        </div>

        <!-- Add Info Button and Table Section -->
        <div class="bg-white shadow rounded-lg p-6 mb-6">
            <div class="mb-4">
                <div class="flex justify-between items-center mb-4">
                    <div class="flex items-center space-x-2">
                        <Icon name="material-symbols:data-info-alert-rounded" size="30" />
                        <h2 class="text-xl font-bold">信息列表</h2>
                    </div>
                    <button
                    @click="showAddModal"
                    class="bg-white hover:bg-gray-200 text-black font-bold py-2 px-4 rounded focus:outline-none border-2 border-gray-300 focus:shadow-outline"
                    >
                    添加老人信息
                    </button>
                </div>
            </div>

            <!-- Ant Design Table -->
            <a-table :columns="columns" :data-source="filteredData" row-key="id">
                <template #name="{ text }">
                    <a>{{ text }}</a>
                </template>
                <template #gender="{ text }">
                    <span>{{ text }}</span>
                </template>
                <template #phone="{ text }">
                    <span>{{ text }}</span>
                </template>
                <template #checkin_date="{ text }">
                    <span>{{ text }}</span>
                </template>
                <template #checkout_date="{ text }">
                    <span>{{ text }}</span>
                </template>
                <template #healthState="{ text }">
                    <span>{{ text }}</span>
                </template>
                <template #imgsetDir="{ text }">
                    <img :src="text" alt="头像" class="w-10 h-10 rounded-full">
                </template>
                <template #description="{ text }">
                    <span>{{ text }}</span>
                </template>
                <template #action="{ record }">
                    <a @click="showEditModal(record)">修改信息</a>
                    <a @click="handleDelete(record)" class="ml-4 text-red-500">删除</a>
                </template>
            </a-table>
        </div>

        <!-- Pagination Section -->
        <div class="pagination flex justify-center items-center mt-4 space-x-4">
            <button 
                @click="previousPage" 
                :disabled="currentPage === 1"
                class="px-4 py-2 bg-blue-400 text-white rounded disabled:bg-gray-300 disabled:text-gray-500"
            >
                上一页
            </button>
            <span class="text-gray-700">
                第 {{ currentPage }} 页
            </span>
            <button 
                @click="nextPage" 
                :disabled="currentPage === totalPages"
                class="px-4 py-2 bg-blue-400 text-white rounded disabled:bg-gray-300 disabled:text-gray-500"
            >
                下一页
            </button>
        </div>

        <!-- Modal Section -->
        <a-modal v-model:visible="isModalVisible" title="添加/编辑信息" @ok="handleSubmit" @cancel="isModalVisible = false">
            <a-form :form="formRef" :rules="rules" layout="vertical">
                <a-form-item label="名字" name="name">
                    <a-input v-model:value="currentForm.name" />
                </a-form-item>
                <a-form-item label="性别" name="gender">
                    <a-input v-model:value="currentForm.gender" />
                </a-form-item>
                <a-form-item label="手机号" name="phone">
                    <a-input v-model:value="currentForm.phone" />
                </a-form-item>
                <a-form-item label="身份证" name="id_card">
                    <a-input v-model:value="currentForm.id_card" />
                </a-form-item>
                <a-form-item label="入院日期" name="checkin_date">
                    <a-date-picker v-model:value="currentForm.checkin_date" show-time format="YYYY-MM-DD HH:mm:ss" />
                </a-form-item>
                <a-form-item label="出院日期" name="checkout_date">
                    <a-date-picker v-model:value="currentForm.checkout_date" show-time format="YYYY-MM-DD HH:mm:ss" />
                </a-form-item>
                <a-form-item label="生日" name="birthday">
                    <a-date-picker v-model:value="currentForm.birthday" show-time format="YYYY-MM-DD HH:mm:ss" />
                </a-form-item>
                <a-form-item label="头像URL" name="imgsetDir">
                    <a-input v-model:value="currentForm.imgsetDir" />
                </a-form-item>
                <a-form-item label="房间号" name="roomNumber">
                    <a-input v-model:value="currentForm.roomNumber" />
                </a-form-item>
                <a-form-item label="第一监护人名字" name="firstGuardianName">
                    <a-input v-model:value="currentForm.firstGuardianName" />
                </a-form-item>
                <a-form-item label="与第一监护人关系" name="firstGuardianRelationship">
                    <a-input v-model:value="currentForm.firstGuardianRelationship" />
                </a-form-item>
                <a-form-item label="第一监护人电话" name="firstGuardianPhone">
                    <a-input v-model:value="currentForm.firstGuardianPhone" />
                </a-form-item>
                <a-form-item label="第一监护人微信" name="firstGuardianWechat">
                    <a-input v-model:value="currentForm.firstGuardianWechat" />
                </a-form-item>
                <a-form-item label="第二监护人名字" name="secondGuardianName">
                    <a-input v-model:value="currentForm.secondGuardianName" />
                </a-form-item>
                <a-form-item label="与第二监护人关系" name="secondGuardianRelationship">
                    <a-input v-model:value="currentForm.secondGuardianRelationship" />
                </a-form-item>
                <a-form-item label="第二监护人电话" name="secondGuardianPhone">
                    <a-input v-model:value="currentForm.secondGuardianPhone" />
                </a-form-item>
                <a-form-item label="第二监护人微信" name="secondGuardianWechat">
                    <a-input v-model:value="currentForm.secondGuardianWechat" />
                </a-form-item>
                <a-form-item label="健康状况" name="healthState">
                    <a-input v-model:value="currentForm.healthState" />
                </a-form-item>
                <a-form-item label="描述" name="description">
                    <a-input v-model:value="currentForm.description" />
                </a-form-item>
            </a-form>
        </a-modal>
    </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import { message, Modal, Form, Input, DatePicker, Button, Table } from 'ant-design-vue';

const data = ref([
    { id: 1, gender: '男', phone: '12345678901', checkin_date: '2023-01-01', checkout_date: '2023-06-01', healthState: '健康', imgsetDir: 'https://picsum.photos/id/83/300/320', description: '无' },
    { id: 2, gender: '女', phone: '12345678902', checkin_date: '2023-02-01', checkout_date: '2023-06-02', healthState: '健康', imgsetDir: 'https://picsum.photos/id/83/300/320', description: '无' },
]);

const searchText = ref('');
const filteredData = computed(() => {
    if (!searchText.value) return data.value;
    return data.value.filter(item => item.name.includes(searchText.value) || item.phone.includes(searchText.value));
});

const currentPage = ref(1);
const totalPages = computed(() => Math.ceil(filteredData.value.length / 10));
const showAddModal = () => { isModalVisible.value = true; currentForm = {} };
const showEditModal = (record) => { isModalVisible.value = true; currentForm = { ...record }; };
const handleDelete = (record) => { data.value = data.value.filter(item => item.id !== record.id); message.success('删除成功'); };
const handleSubmit = () => {
    const index = data.value.findIndex(item => item.id === currentForm.id);
    if (index === -1) {
        data.value.push({ ...currentForm, id: Date.now() });
        message.success('添加成功');
    } else {
        data.value[index] = currentForm;
        message.success('更新成功');
    }
    isModalVisible.value = false;
};

const isModalVisible = ref(false);
let currentForm = reactive({});

const columns = [
    { title: '名字', dataIndex: 'name', key: 'name', scopedSlots: { customRender: 'name' } },
    { title: '性别', dataIndex: 'gender', key: 'gender', scopedSlots: { customRender: 'gender' } },
    { title: '手机号', dataIndex: 'phone', key: 'phone', scopedSlots: { customRender: 'phone' } },
    { title: '身份证', dataIndex: 'id_card', key: 'id_card', scopedSlots: { customRender: 'id_card' } },
    { title: '入院日期', dataIndex: 'checkin_date', key: 'checkin_date', scopedSlots: { customRender: 'checkin_date' } },
    { title: '出院日期', dataIndex: 'checkout_date', key: 'checkout_date', scopedSlots: { customRender: 'checkout_date' } },
    { title: '健康状况', dataIndex: 'healthState', key: 'healthState', scopedSlots: { customRender: 'healthState' } },
    { title: '头像', dataIndex: 'imgsetDir', key: 'imgsetDir', scopedSlots: { customRender: 'imgsetDir' } },
    { title: '描述', dataIndex: 'description', key: 'description', scopedSlots: { customRender: 'description' } },
    { title: '操作', key: 'action', scopedSlots: { customRender: 'action' } },
];
</script>