<template>
    <div id="container">
        <div class="bg-white shadow rounded-lg p-6 mb-6" style="width: 100%;"> 
            <div style="display: flex;justify-content: center;align-items: center">
                <p style="font-weight: 400;font-size: 18px;">基本信息</p>
            </div>
        </div>
        <div class="bg-white shadow rounded-lg p-6 mb-6" style="width: 100%;">
            <div class="mb-4">
                <div style="display: flex;flex-direction: row;justify-content: center;align-items: center;gap: 20px;">
                    <img src="../assets/img/avatar.jpg" style="width: 100px;height: 100px;border-radius: 50%;">
                    <div>
                        <a-button type="primary" id="btn" style="background-color: #3a475a;margin-bottom: 10px;" @click="open">修改信息</a-button>
                        <div style="background-color: aliceblue; border-radius: 10px;padding: 10px;box-shadow: 10px 10px 5px rgba(0, 0, 0, 0.5); ">
                            <p style="font-weight: 600">管理员信息</p>
                            <a-descriptions style="margin-top: 10px">
                                <a-descriptions-item label="用户名">{{ username }}</a-descriptions-item>
                                <a-descriptions-item label="真实姓名">{{ realName }}</a-descriptions-item>
                                <a-descriptions-item label="性别">{{ sex }}</a-descriptions-item>
                                <a-descriptions-item label="邮箱">{{ email }}</a-descriptions-item>
                                <a-descriptions-item label="电话">{{ phone }}</a-descriptions-item>
                                <a-descriptions-item label="描述">{{ description }}</a-descriptions-item>
                            </a-descriptions>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <a-modal v-model:open="showUpdate" title="修改个人信息" @ok="update" ok-text="提交" cancel-text="取消">
            <div style="display: flex;flex-direction: column;gap: 15px">
                <p style="margin-top: 20px">用户名 : {{ this.username }}</p>
                <p><a-input v-model:value="v1" placeholder="请输入真实姓名" /></p>
                <a-radio-group v-model:value="v2">
                    <a-radio-button value="man">男</a-radio-button>
                    <a-radio-button value="woman">女</a-radio-button>
                </a-radio-group>
                <p><a-input v-model:value="v3" placeholder="* 请输入邮箱(重要!!!)" /></p>
                <p><a-input v-model:value="v4" placeholder="请输入联系电话" /></p>
                <p><a-input v-model:value="v5" placeholder="请输入个人描述" /></p>
            </div>
        </a-modal>
    </div>
</template>

<script>
import axios from 'axios';
import { message } from 'ant-design-vue';
import { useGeneralStore } from '~/stores/general';

export default {
    name: 'Setting',
    data() {
        return {  
            username: this.store.name,
            realName: '',
            sex: '',
            email: '',
            phone: '',
            description: '',
            showUpdate: false,
            v1: '',
            v2: 'man',
            v3: '',
            v4: '',
            v5: '',
        }
    },
    methods:{
        async fetchData() {
            var url = 'http://localhost:9000/user/' + this.store.name;
            try{
                const token = localStorage.getItem('token');
                const response = await axios.get(url, {
                    headers: {
                        'Authorization': token
                    }
                });
                if(response.data.code == 0){
                    // 请求数据正确
                    const data = response.data.data;

                    if(data.real_name == null){
                        this.realName = '暂无';
                    }
                    else{
                        this.realName = data.real_name;
                    }
                    if(data.sex == null){
                        this.sex = '暂无';
                    }
                    else if(data.sex == 'man'){
                        this.sex = '男';
                    }
                    else if(data.sex == 'woman'){
                        this.sex = '女';
                    }
                    if(data.email == null){
                        this.email = '暂无';
                    }
                    else{
                        this.email = data.email;
                    }
                    if(data.phone == null){
                        this.phone = '暂无';
                    }
                    else{
                        this.phone = data.phone;
                    }
                    if(data.description == null){
                        this.description = '暂无';
                    }
                    else{
                        this.description = data.description;
                    }
                }
                else{
                    console.log("数据加载错误");
                }
            } catch(error) {
                console.error('Error fetching data:', error);
            }
        },

        open() {
            this.showUpdate = true;
        },

        async update() {
            if(this.v1 == '' || this.v2 == '' || this.v3 == '' || this.v4 == '' || this.v5 == ''){
                message.error('填写信息不能为空', 2);
                return;
            }

            var url = 'http://localhost:9000/user/' + this.store.name;
            try{
                const token = localStorage.getItem('token');
                const json_data = {
                    "real_name": this.v1,
                    "sex": this.v2,
                    "email": this.v3,
                    "phone": this.v4,
                    "description": this.v5,
                }
                console.log(json_data);
                const response = await axios.put(url, json_data, {
                    headers: {
                        'Authorization': token
                    }
                });
                if(response.data.code == 0){
                    // 请求数据正确
                    console.log(response.data);
                    message.success('修改个人信息成功', 2);
                }
                else{
                    console.log("数据加载错误");
                    message.error('修改个人信息失败', 2);
                }
            } catch(error) {
                console.error('Error fetching data:', error);
            }

            this.fetchData();
            this.showUpdate = false;
            return;
        }
    },
    mounted() {
        this.fetchData();
    },
    setup() {
        const store = useGeneralStore();
        return {
            store,
        }
    }
}
</script>

<style scoped>
#container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

#background {
    width: 90%;
    height: 5vh;
    border: 1px solid #3a475a;
    border-radius: 20px;
}

#camera {
    width: 100%;
    height: 70vh;
}

</style>