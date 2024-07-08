<template>
    <div>
        <div class="bg-white shadow rounded-lg p-6 mb-6">
            <div class="mb-4">
                <label class="block text-black text-lg font-bold mb-2">输入搜索:</label>
                <div class="flex items-center space-x-4">
                    <input
                    v-model="searchText"
                    @keypress.enter="handleSearch(searchText)"
                    class="shadow appearance-none border rounded w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="输入工作人员信息..."
                    />
                    <button
                    @click="handleSearch(searchText)"
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

            <a-spin :spinning="loading" tip="Loading...">
                <a-table :columns="columns" :data-source="data" row-key="id" :pagination="{ position: ['bottomCenter'],pageSize: 8 }" bordered>
                    <template #bodyCell="{ column, record }">
                        <template v-if="column.key === 'imgSetDir'">
                            <img :src="record.imgSetDir" :alt="record.name" width="30" height="30" style="border-radius: 15px" />
                        </template>
                        <template v-if="column.key === 'action'">
                            <span>
                                <a @click="showUpdateModal(record.id)" class="text-blue-500 hover:text-blue-700">修改信息</a>
                                <a-divider type="vertical" />
                                <a @click="handleDelete(record.id)" class="text-red-500 hover:text-red-700">删除</a>
                            </span>
                        </template>
                        <template v-if="column.key === 'description'">
                            <template v-if="record.description == null">
                                <span>
                                    <ExceptionOutlined />
                                    暂无数据
                                </span>
                            </template>
                        </template>
                    </template>
                </a-table>
            </a-spin>
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
                <a-form-item label="入职日期" name="hire_date">
                    <a-date-picker v-model:value="currentForm.hire_date" show-time format="YYYY-MM-DD HH:mm:ss" />
                </a-form-item>
                <a-form-item label="离职日期" name="resign_date">
                    <a-date-picker v-model:value="currentForm.resign_date" show-time format="YYYY-MM-DD HH:mm:ss" />
                </a-form-item>
                <a-form-item label="生日" name="birthday">
                    <a-date-picker v-model:value="currentForm.birthday" show-time format="YYYY-MM-DD HH:mm:ss" />
                </a-form-item>
                <a-form-item label="头像" name="imgSetDir">
                    <a-input v-model:value="currentForm.imgset_dir" />
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
import { useStaffStore } from '~/stores/staff';

const router = useRouter()
const store = useStaffStore();

const searchText = ref('');
const isModalVisible = ref(false);

const data = ref([]);
// 用于区分是新增信息还是修改信息
const isUpdating = ref(false);
const updateId = ref(0);

const loading = ref(true);

const columns = [
    { title: '编号', dataIndex: 'id', key: 'id', scopedSlots: { customRender: 'id' } },
    { title: '名字', dataIndex: 'name', key: 'name', scopedSlots: { customRender: 'name' } },
    { title: '性别', dataIndex: 'gender', key: 'gender', scopedSlots: { customRender: 'gender' } },
    { title: '手机号', dataIndex: 'phone', key: 'phone', scopedSlots: { customRender: 'phone' } },
    { title: '入职日期', dataIndex: 'hire_date', key: 'hire_date', scopedSlots: { customRender: 'hire_date' } },
    { title: '离职日期', dataIndex: 'resign_date', key: 'resign_date', scopedSlots: { customRender: 'resign_date' } },
    { title: '头像', dataIndex: 'imgSetDir', key: 'imgSetDir', scopedSlots: { customRender: 'imgSetDir' } },
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

const currentForm = reactive({
    name: '',
    gender: '',
    phone: '',
    id_card: '',
    hire_date: null,
    resign_date: null,
    birthday: null,
    imgset_dir: '',
    description: ''
});

const loadData = async () => {
    loading.value = true;
    await store.fetchAllData();
    data.value = store.staff;
    loading.value = false;
};

onMounted(loadData);

const showAddModal = () => { 
    isModalVisible.value = true; 
    Object.assign(currentForm, {
        name: '',
        gender: '',
        phone: '',
        id_card: '',
        hire_date: null,
        resign_date: null,
        birthday: null,
        imgsetDir: '',
        description: ''
    }); 
};

const showUpdateModal = (id) => { 
    isUpdating.value = true;
    isModalVisible.value = true;
    updateId.value = id
};

const handleDelete = async (id) => { 
    data.value = data.value.filter(item => item.id !== id);
    await store.deleteData(id);
    message.success('删除成功');
    loadData();
};

const handleSubmit = async () => {
    if (isUpdating.value) {
        const updatedStaff = { ...currentForm, id: updateId.value };
        await store.updateData(updatedStaff);
        message.success('修改成功!');
    }
    else {
        await store.addData(currentForm);
        message.success('添加成功!');
    }
    loadData()
    isModalVisible.value = false;
};

const handleSearch = async (name) => {
  await store.searchData(name);
  data.value = store.searchResults
};

const handleReset = () => {
  searchText.value = '';
  loadData();
};
</script>