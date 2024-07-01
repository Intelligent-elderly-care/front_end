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
                    placeholder="输入老人信息..."
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
                    添加老人信息
                    </button>
                </div>
            </div>

            <a-table :columns="columns" :data-source="data" row-key="id" :pagination="{ position: ['bottomCenter'], pageSize: 8 }" bordered>
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
                </template>
            </a-table>
        </div>

        <a-modal v-model:visible="isModalVisible" title="老人信息" @ok="handleSubmit" @cancel="isModalVisible = false">
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
                <a-form-item label="入院日期" name="checkin_date">
                    <a-date-picker v-model:value="currentForm.checkin_date" show-time format="YYYY-MM-DD HH:mm:ss" />
                </a-form-item>
                <a-form-item label="出院日期" name="checkout_date">
                    <a-date-picker v-model:value="currentForm.checkout_date" show-time format="YYYY-MM-DD HH:mm:ss" />
                </a-form-item>
                <a-form-item label="生日" name="birthday">
                    <a-date-picker v-model:value="currentForm.birthday" show-time format="YYYY-MM-DD HH:mm:ss" />
                </a-form-item>
                <a-form-item label="头像" name="imgset_dir">
                    <a-input v-model:value="currentForm.imgset_dir" />
                </a-form-item>
                <a-form-item label="房间号" name="room_number">
                    <a-input v-model:value="currentForm.room_number" />
                </a-form-item>
                <a-form-item label="第一监护人名字" name="firstguardian_name">
                    <a-input v-model:value="currentForm.firstguardian_name" />
                </a-form-item>
                <a-form-item label="与第一监护人关系" name="firstguardian_relationship">
                    <a-input v-model:value="currentForm.firstguardian_relationship" />
                </a-form-item>
                <a-form-item label="第一监护人电话" name="firstguardian_phone">
                    <a-input v-model:value="currentForm.firstguardian_phone" />
                </a-form-item>
                <a-form-item label="第一监护人微信" name="firstguardian_wechat">
                    <a-input v-model:value="currentForm.firstguardian_wechat" />
                </a-form-item>
                <a-form-item label="第二监护人名字" name="secondguardian_name">
                    <a-input v-model:value="currentForm.secondguardian_name" />
                </a-form-item>
                <a-form-item label="与第二监护人关系" name="secondguardian_relationship">
                    <a-input v-model:value="currentForm.secondguardian_relationship" />
                </a-form-item>
                <a-form-item label="第二监护人电话" name="secondguardian_phone">
                    <a-input v-model:value="currentForm.secondguardian_phone" />
                </a-form-item>
                <a-form-item label="第二监护人微信" name="secondguardian_wechat">
                    <a-input v-model:value="currentForm.secondguardian_wechat" />
                </a-form-item>
                <a-form-item label="健康状况" name="health_state">
                    <a-input v-model:value="currentForm.health_state" />
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

import { useElderlyStore } from '~/stores/elderly';

const router = useRouter()
const store = useElderlyStore();

const searchText = ref('');
const isModalVisible = ref(false);
const data = ref([]);
// 用于区分是新增信息还是修改信息
const isUpdating = ref(false);
const updateId = ref(0)

const currentForm = reactive({
    name: '',
    gender: '',
    phone: '',
    id_card: '',
    checkin_date: null,
    checkout_date: null,
    birthday: null,
    imgset_dir: '',
    room_number: '',
    firstguardian_name: '',
    firstguardian_relationship: '',
    firstguardian_phone: '',
    firstguardian_wechat: '',
    secondguardian_name: '',
    secondguardian_relationship: '',
    secondguardian_phone: '',
    secondguardian_wechat: '',
    health_state: '',
    description: ''
});

const columns = [
    { title: '编号', dataIndex: 'id', key: 'id', scopedSlots: { customRender: 'id' } },
    { title: '名字', dataIndex: 'name', key: 'name', scopedSlots: { customRender: 'name' } },
    { title: '性别', dataIndex: 'gender', key: 'gender', scopedSlots: { customRender: 'gender' } },
    { title: '手机号', dataIndex: 'phone', key: 'phone', scopedSlots: { customRender: 'phone' } },
    { title: '入院日期', dataIndex: 'checkin_date', key: 'checkin_date', scopedSlots: { customRender: 'checkin_date' } },
    { title: '出院日期', dataIndex: 'checkout_date', key: 'checkout_date', scopedSlots: { customRender: 'checkout_date' } },
    { title: '健康状况', dataIndex: 'health_state', key: 'health_state', scopedSlots: { customRender: 'healthState' } },
    { title: '头像', dataIndex: 'imgSetDir', key: 'imgSetDir', scopedSlots: { customRender: 'imgSetDir' } },
    { title: '描述', dataIndex: 'description', key: 'description', scopedSlots: { customRender: 'description' } },
    { title: '操作', key: 'action', scopedSlots: { customRender: 'action' }, width: '16%' },
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

const loadData = async () => {
    await store.fetchAllData();
    data.value = store.elderly;
};

onMounted(loadData);

const filteredData = computed(() => {
    if (!searchText.value) return data.value;
    return data.value.filter(item => item.name.includes(searchText.value) || item.phone.includes(searchText.value));
});

const showAddModal = () => { 
    isUpdating.value = false;
    isModalVisible.value = true;
    Object.assign(currentForm, {
        name: '',
        gender: '',
        phone: '',
        id_card: '',
        checkin_date: null,
        checkout_date: null,
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
    loadData()
    message.success('删除成功'); 
};

const handleSubmit = async () => {
    if (isUpdating.value) {
        const updatedElderly = { ...currentForm, id: updateId.value };
        await store.updateData(updatedElderly);
        message.success('修改成功!');
    }
    else {
        await store.addData(currentForm);
        message.success('添加成功!');
    }
    loadData();  // 刷新数据
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

const resetForm = () => {
  Object.keys(currentForm).forEach((key) => {
    currentForm[key] = '';
  });
};

</script>