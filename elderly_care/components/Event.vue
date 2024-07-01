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
                    placeholder="输入事件信息..."
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
                    添加事件信息
                    </button>
                </div>
            </div>

            <a-table :columns="columns" :data-source="data" row-key="id" :pagination="{ position: ['bottomCenter'], pageSize: 8,}" bordered>
                <template #bodyCell="{ column, record }">
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

        <a-modal v-model:visible="isModalVisible" title="义工信息" @ok="handleSubmit" @cancel="isModalVisible = false">
            <a-form :form="formRef" :rules="rules" layout="vertical">
                <a-form-item label="事件类型" name="event_type" :rules="rules.event_type">
                    <a-input v-model:value="currentForm.event_type" />
                </a-form-item>
                <a-form-item label="发生时间" name="event_date">
                    <a-date-picker v-model:value="currentForm.event_date" show-time format="YYYY-MM-DD HH:mm:ss" />
                </a-form-item>
                <a-form-item label="地点" name="event_location">
                    <a-input v-model:value="currentForm.event_location" />
                </a-form-item>
                <a-form-item label="事件描述" name="event_desc">
                    <a-input v-model:value="currentForm.event_desc" />
                </a-form-item>
                <a-form-item label="老人ID" name="oldperson_id">
                    <a-input v-model:value="currentForm.oldperson_id" />
                </a-form-item>
            </a-form>
        </a-modal>
    </div>
</template>

<script setup>
import { ref, reactive} from 'vue';
import { message } from 'ant-design-vue';

import { useEventStore } from '~/stores/event';

const router = useRouter()
const store = useEventStore();

const searchText = ref('');
const isModalVisible = ref(false);

const data = ref([]);
// 用于区分是新增信息还是修改信息
const isUpdating = ref(false);
const updateId = ref(0)

const columns = [
    { title: '编号', dataIndex: 'id', key: 'id', scopedSlots: { customRender: 'id' } },
    { title: '事件类型', dataIndex: 'event_type', key: 'event_type', scopedSlots: { customRender: 'event_type' } },
    { title: '发生时间', dataIndex: 'event_date', key: 'event_date', scopedSlots: { customRender: 'event_date' } },
    { title: '地点', dataIndex: 'event_location', key: 'event_location', scopedSlots: { customRender: 'event_location' } },
    { title: '事件描述', dataIndex: 'event_desc', key: 'event_desc', scopedSlots: { customRender: 'event_desc' } },
    { title: '老人ID', dataIndex: 'oldperson_id', key: 'oldperson_id', scopedSlots: { customRender: 'oldperson_id' } },
    { title: '操作', key: 'action', scopedSlots: { customRender: 'action' } },
];

const rules = reactive({
  event_type: [
    { required: true, message: '请输入事件类型' }
  ]
});

const currentForm = reactive({
    id: '',
    event_type: '',
    event_date: null,
    event_location: '',
    event_desc: '',
    oldperson_id: ''
});

const loadData = async () => {
    await store.fetchAllData();
    data.value = store.event;
};

onMounted(loadData);

const showAddModal = () => { 
    isModalVisible.value = true; 
    Object.assign(currentForm, {
        id: '',
        event_type: '',
        event_date: null,
        event_location: '',
        event_desc: '',
        oldperson_id: ''
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
        const updatedEvent = { ...currentForm, id: updateId.value };
        await store.updateData(updatedEvent);
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

const resetForm = () => {
  Object.keys(currentForm).forEach((key) => {
    currentForm[key] = '';
  });
};

</script>