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
                    placeholder="输入事件信息..."
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
                    添加事件信息
                    </button>
                </div>
            </div>

            <a-table :columns="columns" :data-source="data" row-key="id" :pagination="{ position: ['bottomCenter'],pageSize: 8 }" bordered>
                <template #bodyCell="{ column, record }">
                    <template v-if="column.key === 'action'">
                        <span>
                            <a @click="showEditModal(record)" class="text-blue-500 hover:text-blue-700">修改信息</a>
                            <a-divider type="vertical" />
                            <a @click="handleDelete(record)" class="text-red-500 hover:text-red-700">删除</a>
                        </span>
                    </template>
                </template>
            </a-table>
        </div>

        <a-modal v-model:visible="isModalVisible" title="义工信息" @ok="handleSubmit" @cancel="isModalVisible = false">
            <a-form :form="formRef" :rules="rules" layout="vertical">
                <a-form-item label="事件类型" name="type" :rules="rules.type">
                    <a-input v-model:value="currentForm.type" />
                </a-form-item>
                <a-form-item label="发生时间" name="event_date">
                    <a-date-picker v-model:value="currentForm.event_date" show-time format="YYYY-MM-DD HH:mm:ss" />
                </a-form-item>
                <a-form-item label="地点" name="position" :rules="rules.position">
                    <a-input v-model:value="currentForm.position" />
                </a-form-item>
                <a-form-item label="事件描述" name="description">
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

]);

const columns = [
    { title: '编号', dataIndex: 'id', key: 'id', scopedSlots: { customRender: 'id' } },
    { title: '事件类型', dataIndex: 'type', key: 'type', scopedSlots: { customRender: 'type' } },
    { title: '发生时间', dataIndex: 'event_date', key: 'event_date', scopedSlots: { customRender: 'event_date' } },
    { title: '地点', dataIndex: 'position', key: 'position', scopedSlots: { customRender: 'position' } },
    { title: '事件描述', dataIndex: 'description', key: 'description', scopedSlots: { customRender: 'description' } },
    { title: '操作', key: 'action', scopedSlots: { customRender: 'action' } },
];

const rules = reactive({
  type: [
    { required: true, message: '请输入事件类型' }
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