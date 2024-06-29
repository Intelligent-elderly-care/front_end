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

    <div>
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
        </div>

        <table class="min-w-full bg-white">
            <thead>
                <tr>
                <th class="py-3 px-4 border-b border-gray-200 text-left">编号</th>
                <th class="py-3 px-4 border-b border-gray-200 text-left">性别</th>
                <th class="py-3 px-4 border-b border-gray-200 text-left">手机号</th>
                <th class="py-3 px-4 border-b border-gray-200 text-left">入院日期</th>
                <th class="py-3 px-4 border-b border-gray-200 text-left">出院日期</th>
                <th class="py-3 px-4 border-b border-gray-200 text-left">健康状况</th>
                <th class="py-3 px-4 border-b border-gray-200 text-left">头像</th>
                <th class="py-3 px-4 border-b border-gray-200 text-left">描述</th>
                <th class="py-3 px-4 border-b border-gray-200 text-left">操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="record in filteredData" :key="record.id">
                <td class="py-3 px-4 border-b border-gray-200">{{ record.id }}</td>
                <td class="py-3 px-4 border-b border-gray-200">{{ record.gender }}</td>
                <td class="py-3 px-4 border-b border-gray-200">{{ record.phone }}</td>
                <td class="py-3 px-4 border-b border-gray-200">{{ record.checkin_date }}</td>
                <td class="py-3 px-4 border-b border-gray-200">{{ record.checkout_date }}</td>
                <td class="py-3 px-4 border-b border-gray-200">{{ record.healthState }}</td>
                <td class="py-3 px-4 border-b border-gray-200">
                    <img :src="record.imgsetDir" alt="头像" class="w-10 h-10 rounded-full">
                </td>
                <td class="py-3 px-4 border-b border-gray-200">{{ record.description }}</td>
                <td class="py-3 px-4 border-b border-gray-200">
                    <button @click="showEditModal(record)" class="text-blue-500 hover:text-blue-700">修改信息</button>
                    <button @click="handleDelete(record)" class="text-red-500 hover:text-red-700 ml-4">删除</button>
                </td>
                </tr>
            </tbody>
        </table>

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
    </div>
  
      <!-- Modal -->
      <el-dialog :visible.sync="isModalVisible" title="添加/编辑信息">
        <el-form :model="currentForm" :rules="rules" ref="formRef">
          <!-- Form fields -->
          <el-form-item label="名字" prop="name">
            <el-input v-model="currentForm.name"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="gender">
            <el-input v-model="currentForm.gender"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="currentForm.phone"></el-input>
          </el-form-item>
          <el-form-item label="身份证" prop="id_card">
            <el-input v-model="currentForm.id_card"></el-input>
          </el-form-item>
          <el-form-item label="入院日期" prop="checkin_date">
            <el-date-picker v-model="currentForm.checkin_date" type="datetime" placeholder="选择日期时间"></el-date-picker>
          </el-form-item>
          <el-form-item label="出院日期" prop="checkout_date">
            <el-date-picker v-model="currentForm.checkout_date" type="datetime" placeholder="选择日期时间"></el-date-picker>
          </el-form-item>
          <el-form-item label="生日" prop="birthday">
            <el-date-picker v-model="currentForm.birthday" type="datetime" placeholder="选择日期时间"></el-date-picker>
          </el-form-item>
          <el-form-item label="头像URL" prop="imgsetDir">
            <el-input v-model="currentForm.imgsetDir"></el-input>
          </el-form-item>
          <el-form-item label="房间号" prop="roomNumber">
            <el-input v-model="currentForm.roomNumber"></el-input>
          </el-form-item>
          <el-form-item label="第一监护人名字" prop="firstGuardianName">
            <el-input v-model="currentForm.firstGuardianName"></el-input>
          </el-form-item>
          <el-form-item label="与第一监护人关系" prop="firstGuardianRelationship">
            <el-input v-model="currentForm.firstGuardianRelationship"></el-input>
          </el-form-item>
          <el-form-item label="第一监护人电话" prop="firstGuardianPhone">
            <el-input v-model="currentForm.firstGuardianPhone"></el-input>
          </el-form-item>
          <el-form-item label="第一监护人微信" prop="firstGuardianWechat">
            <el-input v-model="currentForm.firstGuardianWechat"></el-input>
          </el-form-item>
          <el-form-item label="第二监护人名字" prop="secondGuardianName">
            <el-input v-model="currentForm.secondGuardianName"></el-input>
          </el-form-item>
          <el-form-item label="与第二监护人关系" prop="secondGuardianRelationship">
            <el-input v-model="currentForm.secondGuardianRelationship"></el-input>
          </el-form-item>
          <el-form-item label="第二监护人电话" prop="secondGuardianPhone">
            <el-input v-model="currentForm.secondGuardianPhone"></el-input>
          </el-form-item>
          <el-form-item label="第二监护人微信" prop="secondGuardianWechat">
            <el-input v-model="currentForm.secondGuardianWechat"></el-input>
          </el-form-item>
          <el-form-item label="健康状况" prop="healthState">
            <el-input v-model="currentForm.healthState"></el-input>
          </el-form-item>
          <el-form-item label="描述" prop="description">
            <el-input v-model="currentForm.description"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="isModalVisible = false">取消</el-button>
          <el-button type="primary" @click="handleSubmit">确定</el-button>
        </span>
      </el-dialog>
    </div>
</template>
  
<script setup>
  import { ref, reactive, computed, onMounted } from 'vue';
  import { ElMessage, ElDialog, ElForm, ElFormItem, ElInput, ElDatePicker, ElButton } from 'element-plus';
  
  const data = ref([
    { id: 1, gender: '男', phone: '12345678901', checkin_date: '2023-01-01', checkout_date: '2023-06-01', healthState: '健康', imgsetDir: 'https://picsum.photos/id/83/300/320', description: '无' },
    { id: 2, gender: '女', phone: '12345678902', checkin_date: '2022-01-01', checkout_date: '2022-06-01', healthState: '亚健康', imgsetDir: 'https://picsum.photos/id/83/300/320', description: '无' },
    { id: 3, gender: '女', phone: '12345678902', checkin_date: '2022-01-01', checkout_date: '2022-06-01', healthState: '亚健康', imgsetDir: 'https://picsum.photos/id/83/300/320', description: '无' },
    { id: 4, gender: '女', phone: '12345678902', checkin_date: '2022-01-01', checkout_date: '2022-06-01', healthState: '亚健康', imgsetDir: 'https://picsum.photos/id/83/300/320', description: '无' },
    { id: 5, gender: '女', phone: '12345678902', checkin_date: '2022-01-01', checkout_date: '2022-06-01', healthState: '亚健康', imgsetDir: 'https://picsum.photos/id/83/300/320', description: '无' },
    { id: 6, gender: '女', phone: '12345678902', checkin_date: '2022-01-01', checkout_date: '2022-06-01', healthState: '亚健康', imgsetDir: 'https://picsum.photos/id/83/300/320', description: '无' },
    { id: 7, gender: '女', phone: '12345678902', checkin_date: '2022-01-01', checkout_date: '2022-06-01', healthState: '亚健康', imgsetDir: 'https://picsum.photos/id/83/300/320', description: '无' },
    { id: 8, gender: '女', phone: '12345678902', checkin_date: '2022-01-01', checkout_date: '2022-06-01', healthState: '亚健康', imgsetDir: 'https://picsum.photos/id/83/300/320', description: '无' },
    { id: 9, gender: '女', phone: '12345678902', checkin_date: '2022-01-01', checkout_date: '2022-06-01', healthState: '亚健康', imgsetDir: 'https://picsum.photos/id/83/300/320', description: '无' },
    { id: 10, gender: '女', phone: '12345678902', checkin_date: '2022-01-01', checkout_date: '2022-06-01', healthState: '亚健康', imgsetDir: 'https://picsum.photos/id/83/300/320', description: '无' },
    { id: 11, gender: '女', phone: '12345678902', checkin_date: '2022-01-01', checkout_date: '2022-06-01', healthState: '亚健康', imgsetDir: 'https://picsum.photos/id/83/300/320', description: '无' },
  ]);
  
  const searchText = ref('');
  const isModalVisible = ref(false);
  const isEdit = ref(false);
  const currentForm = reactive({});
  const formRef = ref(null);
  
  const rules = {
    name: [{ required: true, message: '请输入名字', trigger: 'blur' }],
    gender: [{ required: true, message: '请输入性别', trigger: 'blur' }],
    phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
    id_card: [{ required: true, message: '请输入身份证号', trigger: 'blur' }],
    checkin_date: [{ required: true, message: '请选择入院日期', trigger: 'blur' }],
    checkout_date: [{ required: true, message: '请选择出院日期', trigger: 'blur' }],
    birthday: [{ required: true, message: '请选择生日', trigger: 'blur' }],
    imgsetDir: [{ required: true, message: '请输入头像URL', trigger: 'blur' }],
    roomNumber: [{ required: true, message: '请输入房间号', trigger: 'blur' }],
    firstGuardianName: [{ required: true, message: '请输入第一监护人名字', trigger: 'blur' }],
    firstGuardianRelationship: [{ required: true, message: '请输入与第一监护人关系', trigger: 'blur' }],
    firstGuardianPhone: [{ required: true, message: '请输入第一监护人电话', trigger: 'blur' }],
    firstGuardianWechat: [{ required: true, message: '请输入第一监护人微信', trigger: 'blur' }],
    secondGuardianName: [{ required: true, message: '请输入第二监护人名字', trigger: 'blur' }],
    secondGuardianRelationship: [{ required: true, message: '请输入与第二监护人关系', trigger: 'blur' }],
    secondGuardianPhone: [{ required: true, message: '请输入第二监护人电话', trigger: 'blur' }],
    secondGuardianWechat: [{ required: true, message: '请输入第二监护人微信', trigger: 'blur' }],
    healthState: [{ required: true, message: '请输入健康状况', trigger: 'blur' }],
    description: [{ required: true, message: '请输入描述', trigger: 'blur' }]
  };
  
  const handleSearch = () => {
    // TODO:搜索逻辑
  };
  
  const handleReset = () => {
    searchText.value = '';
  };
  
  const showAddModal = () => {
    console.log("add success!")
    isEdit.value = false;
    isModalVisible.value = true;
    Object.assign(currentForm, {
      name: '',
      gender: '',
      phone: '',
      id_card: '',
      checkin_date: '',
      checkout_date: '',
      birthday: '',
      imgsetDir: '',
      roomNumber: '',
      firstGuardianName: '',
      firstGuardianRelationship: '',
      firstGuardianPhone: '',
      firstGuardianWechat: '',
      secondGuardianName: '',
      secondGuardianRelationship: '',
      secondGuardianPhone: '',
      secondGuardianWechat: '',
      healthState: '',
      description: ''
    });
  };

  const currentPage = ref(1);
  const pageSize = ref(10);
  
const previousPage = () => {
    if (currentPage.value > 1) {
    currentPage.value--;
    }
};

const nextPage = () => {
    if (currentPage.value < 20) {
        currentPage.value++;
    }
};

  const showEditModal = (record) => {
    isEdit.value = true;
    isModalVisible.value = true;
    Object.assign(currentForm, record);
  };
  
  const handleSubmit = () => {
    formRef.value.validate((valid) => {
      if (valid) {
        if (isEdit.value) {
          // 编辑逻辑
        } else {
          // 添加逻辑
          currentForm.id = data.value.length + 1;
          data.value.push({ ...currentForm });
        }
        isModalVisible.value = false;
        ElMessage.success('操作成功');
      }
    });
  };
  
  const handleDelete = (record) => {
    data.value = data.value.filter(item => item.id !== record.id);
    ElMessage.success('删除成功');
  };
  
  const filteredData = computed(() => {
    if (!searchText.value) return data.value;
    return data.value.filter(item => {
      return Object.values(item).some(value => value.toString().includes(searchText.value));
    });
  });
</script>