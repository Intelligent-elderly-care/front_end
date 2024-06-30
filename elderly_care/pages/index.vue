<template style="overflow: hidden;">
  <div id="container">
    <div id="content">
      <h2 style="position: relative;font-weight: bold;font-size: 22px;left: 20vh;top: 8vh;width: 10vh;" id="title">登录</h2>
      <div id="username" style="position: relative;left: 5vw;top: 12vh;width: 30vh;">
        <a-input v-model:value="username" placeholder="请输入用户名" style="width: 30vh;">
          <template #prefix>
            <user-outlined />
          </template>
          <template #suffix>
            <a-tooltip title="Extra information">
              <info-circle-outlined style="color: rgba(0, 0, 0, 0.45)" />
            </a-tooltip>
          </template>
        </a-input>
      </div>
      
      <div style="position: relative;left: 5vw;top: 16vh;width: 30vh;" id="password">
        <a-input-password v-model:value="password" placeholder="请输入密码" style="width: 30vh;"/>
      </div>
      <a id="text" href="#" style="position: relative;left: 5vw;top: 20vh;font-size: 12px;color: rgb(24, 205, 255);">忘记密码?</a>
      <a-button type="primary" id="btn" style="position: relative;width: 12vh;left: 5vw;top: 27vh;background-color: rgb(0, 200, 255);" @click="submit">登录</a-button>
    </div>
    
    <div id="mask">
      <p id="p1" style="position: relative;font-weight: 600;font-size: 20px;color: aliceblue;left: 8vw;top: 30%;" >你好, 新朋友!</p>
      <p id="p2" style="position: relative;font-weight: 200;font-size: 12px;color: aliceblue;left: 3vw;top: 35%;" >注册您的个人信息, 以获取网站的所有功能</p>
      <a-button ghost id="btn_2" @click="move" style="position: relative;color: aliceblue;left: 36%;top: 40%;">开始注册</a-button>
    </div>
  </div>
</template>
  
<script>
import axios from 'axios';
import { message } from 'ant-design-vue';
export default {
    name: 'Login',
    data() {
        return {
            formMode: 0,
            username: '',
            password: '',
            intervalId: null,
        }
    },
    methods:{
        submit(){
          if(this.password == '' || this.username == ''){
            message.error('用户名或密码不能为空', 2);
            return;
          }
          console.log(this.username, this.password);
          if(this.formMode == 0){
            // 登录
            const url = 'http://localhost:9000/login';
            const json_data = {
              "username": this.username,
              "password": this.password,
            };
            axios.post(url, json_data).then((response)=>{
              if(response.data.code == 0){
                message.success('登录成功', 2);
                const token = response.data.data;
                localStorage.setItem("token",token);
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
                this.$router.push("/homepage");
              }
              else{
                message.error('用户名或密码不正确', 2);
                return;
              }
            })
            .catch(err => {
              message.error('用户名或密码不正确', 2);
            })
          }
          else if(this.formMode == 1){
            // 注册
            const url = 'http://localhost:9000/register';
            const json_data = {
              "username": this.username,
              "password": this.password,
            };
            axios.post(url, json_data).then((response)=>{
              if(response.data.code == 0){
                message.success('注册成功', 2);
              }
              else{
                message.error(response.data.message, 2);
                return;
              }
            })
            .catch(err => {
              message.error('注册失败', 2);
            })
          }
        },

        move() {
          const mask = document.getElementById('mask');
          const title = document.getElementById('title');
          const username = document.getElementById('username');
          const password = document.getElementById('password');
          const text = document.getElementById('text');
          const btn = document.getElementById('btn');
          const p1 = document.getElementById('p1');
          const p2 = document.getElementById('p2');
          const btn_2 = document.getElementById('btn_2');

          if(this.formMode == 0) {
            setTimeout(() => {
              this.formMode = 1;
              mask.style.right = '50vw';
              mask.style.borderTopLeftRadius = '20px';
              mask.style.borderBottomLeftRadius = '20px';
              mask.style.borderTopRightRadius = '25%';
              mask.style.borderBottomRightRadius = '25%';
              
              title.style.transition = '1s';
              title.style.left = '70vh';
              title.innerText = "注册";

              username.style.transition = '1s';
              username.style.left = '30vw';

              password.style.transition = '1s';
              password.style.left = '30vw';

              text.style.transition = '1s';
              text.style.left = '30vw';
              text.innerText = "已有账号?"

              btn.style.transition = '1s';
              btn.style.left = '30vw';
              btn.innerText = "注册";

              p1.innerText = '欢迎回来!';
              p2.innerText = '注册您的个人信息, 以获取网站的所有功能';

              btn_2.innerText = '开始登录';
            }, 0);
          }
          else if(this.formMode == 1) {
            setTimeout(() => {
              this.formMode = 0;
              mask.style.right = '25vw';
              mask.style.borderTopLeftRadius = '25%';
              mask.style.borderBottomLeftRadius = '25%';
              mask.style.borderTopRightRadius = '20px';
              mask.style.borderBottomRightRadius = '20px';
              
              title.style.transition = '1s';
              title.style.left = '20vh';
              title.innerText = "登录";

              username.style.transition = '1s';
              username.style.left = '5vw';

              password.style.transition = '1s';
              password.style.left = '5vw';

              text.style.transition = '1s';
              text.style.left = '5vw';
              text.innerText = "忘记密码?"

              btn.style.transition = '1s';
              btn.style.left = '5vw';
              btn.innerText = "登录";

              p1.innerText = '你好, 新朋友!';
              p2.innerText = '请输入详细信息以使用网站的所有功能';

              btn_2.innerText = '开始注册';
            }, 0);
          }
          
        },

        // 泡泡生成器
        genBuble() {
            let all = document.getElementById('container');
            const buble = document.createElement('span');
            var style = document.styleSheets[0];
            style.insertRule('@keyframes myMove { 0% { transform: translateY(0%); opacity: 1;} 50% { transform: translate(10%, -1000%);} 75% {transform: translate(-20%, -1200%);} 99% {opacity: .9;} 100% {transform: translateY(-1800%) scale(1.5); opacity: 0;} }', style.cssRules.length);
            buble.className = 'buble';
            let r = Math.random() * 35 + 15; // 25-30,泡泡半径
            buble.style.position = 'absolute';
            buble.style.width = r + 'px';
            buble.style.height = r + 'px';
            buble.style.background = 'radial-gradient(circle at 72% 28%, #a2d2e4 5px, skyblue 8%,#b3ffd4, #aad7f9 100%)';
            buble.style.boxShadow = 'inset 0 0 6px #fff, inset 3px 0 6px #eaf5fc, inset 2px -2px 10px #efcde6, inset 0 0 60px #f9f6de, 0 0 20px #fff'; 
            buble.style.borderRadius = '50%';
            buble.style.left = Math.random()*innerWidth - 35 + 'px';
            buble.style.bottom = 0;
            buble.style.animation = 'myMove 4s linear infinite';
            buble.style.zIndex = '1';
            all.append(buble);
            setTimeout(()=>{
                buble.remove();
            }, 3000);
        }
    },
    mounted: function(){
        this.intervalId = setInterval(() => {
            this.genBuble();
        }, 800);
    },
    beforeRouteLeave(to,from,next){
        clearInterval(this.intervalId);
        next();
    }
}
</script>

<style scoped>
  #container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    padding: 10px;
    background: linear-gradient(to right, rgb(225, 248, 255), rgb(169, 236, 255)); /* 从左到右渐变 */
  }

  #content {
    /* width: 500px;
    height: 300px; */
    width: 100vh;
    height: 55vh;
    border-radius: 20px;
    background-color: rgb(229, 247, 255);
    box-shadow: 10px 10px 5px rgba(0, 0, 0, 0.5); 
    z-index: 10;
  }

  #mask {
    position: absolute;
    height: 55vh;
    width: 50vh;
    background: linear-gradient(to right, rgb(144, 113, 255), rgb(100, 57, 255));
    border-top-left-radius: 25%;
    border-bottom-left-radius: 25%;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
    box-shadow: 10px 10px 5px rgba(0, 0, 0, 0.3); 
    right: 25vw;
    z-index: 15;
    transition: 1s;
    text-align: left;
  }

  .test {
    background-color: rgb(0, 200, 255);
  }
</style>