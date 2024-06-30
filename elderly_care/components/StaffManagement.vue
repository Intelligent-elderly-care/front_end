<template>
    <div>
        <div class="bg-white shadow rounded-lg p-6 mb-6">
            <div class="mb-4">
                <label class="block text-black text-lg font-bold mb-2">输入搜索:</label>
                <div class="flex items-center space-x-4">
                    <input
                    v-model="searchText"
                    @keypress.enter="handleSearch"
                    class="shadow appearance-none border rounded w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="输入工作人员信息..."
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
                    添加工作人员信息
                    </button>
                </div>
            </div>

            <a-table :columns="columns" :data-source="data" row-key="id" :pagination="{ position: ['bottomCenter'],pageSize: 8 }" bordered>
                <template #bodyCell="{ column, record }">
                    <template v-if="column.key === 'imgsetDir'">
                        <Icon :name="record.imgsetDir" size="30" />
                    </template>
                    <template v-if="column.key === 'action'">
                        <span>
                            <a @click="showEditModal(record.id)" class="text-blue-500 hover:text-blue-700">修改信息</a>
                            <a-divider type="vertical" />
                            <a @click="handleDelete(record)" class="text-red-500 hover:text-red-700">删除</a>
                        </span>
                    </template>
                </template>
            </a-table>
        </div>

        <a-modal v-model:visible="isModalVisible" title="工作人员信息" @ok="handleSubmit" @cancel="isModalVisible = false">
            <a-form :form="formRef" :rules="rules" layout="vertical">
                <a-form-item label="名字" name="name" :rules="rules.name">
                    <a-input v-model:value="currentForm.name" />
                </a-form-item>
                <a-form-item label="性别" name="gender">
                    <a-input v-model:value="currentForm.gender" :rules="rules.gender"/>
                </a-form-item>
                <a-form-item label="手机号" name="phone" :rules="rules.phone">
                    <a-input v-model:value="currentForm.phone" />
                </a-form-item>
                <a-form-item label="身份证" name="id_card" :rules="rules.id_card">
                    <a-input v-model:value="currentForm.id_card" />
                </a-form-item>
                <a-form-item label="入职日期" name="checkin_date">
                    <a-date-picker v-model:value="currentForm.checkin_date" show-time format="YYYY-MM-DD HH:mm:ss" />
                </a-form-item>
                <a-form-item label="离职日期" name="checkout_date">
                    <a-date-picker v-model:value="currentForm.checkout_date" show-time format="YYYY-MM-DD HH:mm:ss" />
                </a-form-item>
                <a-form-item label="生日" name="birthday">
                    <a-date-picker v-model:value="currentForm.birthday" show-time format="YYYY-MM-DD HH:mm:ss" />
                </a-form-item>
                <a-form-item label="头像" name="imgsetDir">
                    <a-input v-model:value="currentForm.imgsetDir" />
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
import { message } from 'ant-design-vue';

const searchText = ref('');
const isModalVisible = ref(false);
let currentForm = reactive({});

const data = ref([
    { id: 1, name:'骐哥', gender: '男', phone: '12345678901', checkin_date: '2023-01-01', checkout_date: '2023-06-01', imgsetDir: 'https://picsum.photos/id/83/300/320', description: '无' },
    { id: 2, name:'骐哥', gender: '男', phone: '12345678901', checkin_date: '2023-01-01', checkout_date: '2023-06-01', imgsetDir: 'https://picsum.photos/id/83/300/320', description: '无' },
    { id: 3, name:'骐哥', gender: '男', phone: '12345678901', checkin_date: '2023-01-01', checkout_date: '2023-06-01', imgsetDir: 'https://picsum.photos/id/83/300/320', description: '无' },
    { id: 4, name:'骐哥', gender: '男', phone: '12345678901', checkin_date: '2023-01-01', checkout_date: '2023-06-01', imgsetDir: 'https://picsum.photos/id/83/300/320', description: '无' },
    { id: 5, name:'骐哥', gender: '男', phone: '12345678901', checkin_date: '2023-01-01', checkout_date: '2023-06-01', imgsetDir: 'https://picsum.photos/id/83/300/320', description: '无' },
    { id: 6, name:'骐哥', gender: '男', phone: '12345678901', checkin_date: '2023-01-01', checkout_date: '2023-06-01', imgsetDir: 'https://picsum.photos/id/83/300/320', description: '无' },
    { id: 7, name:'骐哥', gender: '男', phone: '12345678901', checkin_date: '2023-01-01', checkout_date: '2023-06-01', imgsetDir: 'https://picsum.photos/id/83/300/320', description: '无' },
    { id: 8, name:'骐哥', gender: '男', phone: '12345678901', checkin_date: '2023-01-01', checkout_date: '2023-06-01', imgsetDir: 'https://picsum.photos/id/83/300/320', description: '无' },
    { id: 9, name:'骐哥', gender: '男', phone: '12345678901', checkin_date: '2023-01-01', checkout_date: '2023-06-01', imgsetDir: 'https://picsum.photos/id/83/300/320', description: '无' },
    { id: 10, name:'骐哥', gender: '男', phone: '12345678901', checkin_date: '2023-01-01', checkout_date: '2023-06-01', imgsetDir: 'https://picsum.photos/id/83/300/320', description: '无' },
    { id: 11, name:'骐哥', gender: '男', phone: '12345678901', checkin_date: '2023-01-01', checkout_date: '2023-06-01', imgsetDir: 'https://picsum.photos/id/83/300/320', description: '无' },
    { id: 12, name:'骐哥', gender: '男', phone: '12345678901', checkin_date: '2023-01-01', checkout_date: '2023-06-01', imgsetDir: 'https://picsum.photos/id/83/300/320', description: '无' },
    { id: 13, name:'骐哥', gender: '男', phone: '12345678901', checkin_date: '2023-01-01', checkout_date: '2023-06-01', imgsetDir: 'https://picsum.photos/id/83/300/320', description: '无' },
    { id: 14, name:'骐哥', gender: '男', phone: '12345678901', checkin_date: '2023-01-01', checkout_date: '2023-06-01', imgsetDir: 'https://picsum.photos/id/83/300/320', description: '无' },
    { id: 15, name:'骐哥', gender: '男', phone: '12345678901', checkin_date: '2023-01-01', checkout_date: '2023-06-01', imgsetDir: 'https://picsum.photos/id/83/300/320', description: '无' },
]);

const columns = [
    { title: '编号', dataIndex: 'id', key: 'id', scopedSlots: { customRender: 'id' } },
    { title: '名字', dataIndex: 'name', key: 'name', scopedSlots: { customRender: 'name' } },
    { title: '性别', dataIndex: 'gender', key: 'gender', scopedSlots: { customRender: 'gender' } },
    { title: '手机号', dataIndex: 'phone', key: 'phone', scopedSlots: { customRender: 'phone' } },
    { title: '入职日期', dataIndex: 'checkin_date', key: 'checkin_date', scopedSlots: { customRender: 'checkin_date' } },
    { title: '离职日期', dataIndex: 'checkout_date', key: 'checkout_date', scopedSlots: { customRender: 'checkout_date' } },
    { title: '头像', dataIndex: 'imgsetDir', key: 'imgsetDir', scopedSlots: { customRender: 'imgsetDir' } },
    { title: '描述', dataIndex: 'description', key: 'description', scopedSlots: { customRender: 'description' } },
    { title: '操作', key: 'action', scopedSlots: { customRender: 'action' } },
];

const rules = reactive({
  name: [
    { required: true, message: '请输入名字' }
  ],
  gender: [
    { required: true, message: '请输入性别' }
  ],
  phone: [
    { required: true, message: '请输入手机号码' },
    { min: 11, max: 11, message: '手机号码长度应为11位' }
  ],
  id_card: [
    { required: true, message: '请输入身份证号码' },
    { min: 18, max: 18, message: '身份证号码长度应为18位' }
  ]
});

const filteredData = computed(() => {
    if (!searchText.value) return data.value;
    return data.value.filter(item => item.name.includes(searchText.value) || item.phone.includes(searchText.value));
});

const showAddModal = () => { 
    isModalVisible.value = true; 
    currentForm = {} 
};

const showEditModal = (id) => { 
    isModalVisible.value = true; 
};

const handleDelete = (record) => { 
    data.value = data.value.filter(item => item.id !== record.id); 
    message.success('删除成功'); 
};

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

const handleSearch = () => {
  console.log('Searching for:', searchText.value);
};

const handleReset = () => {
  searchText.value = '';
};

const resetForm = () => {
  Object.keys(currentForm).forEach((key) => {
    currentForm[key] = '';
  });
};

</script>