<template>
    <div id="container">
        <div class="bg-white shadow rounded-lg p-6 mb-6" style="width: 100%;">
            <div class="mb-4" style="display: flex;justify-content: center;align-items: center;gap: 60px; ">
                <a-button type="primary" id="btn" style="background-color: #3a475a;" @click="start">开启</a-button>
                <a-button type="primary" id="btn" style="background-color: #3a475a;" @click="stop">关闭</a-button>
                <a-button type="primary" id="btn" style="background-color: #3a475a;" @click="check">检测</a-button>
            </div>
        </div>
        <div class="bg-white shadow rounded-lg p-6 mb-6" style="width: 100%;">
            <a-space style="display: flex;justify-content: center;align-items: center;margin-bottom: 2vh;">
                <p style="font-size: 16px;">地点 :</p>
                <a-select
                v-model:value="city"
                style="width: 120px"
                :options="cityData.map(city => ({ value: city }))"
                ></a-select>
                <a-select
                v-model:value="room"
                style="width: 120px"
                :options="rooms.map(room => ({ value: room }))"
                ></a-select>
            </a-space>

            <div class="mb-4" id="con" style="position: relative;">
                <div v-if="!cameraOn">
                    <div id="off">
                        <img src="../assets/img/camera.png" style="width: 20vh;height: 20vh;">
                    </div>
                </div>
                <video ref="videoElement" autoplay playsinline id="camera"></video> 
                <p id="num" style="position: absolute;left: 8.2vw;top: 3vh;">人数 : 0</p>
                <div id="frame_container" style="width: 14vw;border-radius: 5px;padding: 10px;border: 3px solid #6486b8;height: 55vh;position: absolute;left: 2.8vw;top: 8vh;display: flex;flex-direction: column;gap: 1vh;overflow-x: hidden;">
                    <!-- <div class="frame">姓名 : hx</div>
                    <div class="frame">姓名 : hx</div>
                    <div class="frame">姓名 : hx</div> -->
                </div>
                <div style="position: absolute;right: 2.8vw;top: 20vh;display: flex;align-items: center;justify-content: center;flex-direction: column;gap: 3vh;">
                    <p style="font-weight: 500;font-size: 20px;">状态</p>
                    <div v-if="warn" id="warning" style="font-weight: 500;font-size: 20px;text-align: center;line-height: 8vh;border-color: red;">检测到陌生人!!!</div>
                    <div v-else id="warning" style="font-weight: 500;font-size: 20px;text-align: center;line-height: 8vh;border-color: green;">正常</div>
                </div>
                
                <!-- <div class="draw"></div> -->
                <canvas ref="canvasElement" style="display:none;"></canvas>
            </div>
        </div>
        <!-- <video ref="videoElement" autoplay playsinline id="camera"></video>
        <canvas ref="canvasElement" style="display:none;"></canvas> -->
    </div>
</template>

<script>
import axios from 'axios';
import { message } from 'ant-design-vue';
import { computed, ref, watch } from 'vue';
export default {
    name: 'Login',
    data() {
        return {
            isRunning: false,
            oldperson: ['hx',],
            volunteer: ['htq',],
            intervalId: null,
            delId: null,
            cameraOn: false,
            warn: false,
            json_data: {
                "event_type": 2,
                "event_date": "",
                "event_location": "起居室",
                "event_desc": "检测到了陌生人",
                "oldperson_id": 1001
            },
            url: 'http://localhost:9000/events/add',
        }
    },
    methods:{
        formatDate(date) {
            const year = date.getFullYear();
            const month = this.padZero(date.getMonth() + 1);  // 月份从0开始，需要加1
            const day = this.padZero(date.getDate());
            const hours = this.padZero(date.getHours());
            const minutes = this.padZero(date.getMinutes());
            const seconds = this.padZero(date.getSeconds());

            return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
        },

        padZero(num) {
            return num < 10 ? `0${num}` : num;
        },

        putEvent() {
            this.json_data.event_date = String(this.formatDate(new Date()));
            const token = localStorage.getItem('token')
            axios.put(this.url, this.json_data, {
                headers: {
                    'Authorization': token
                }
            });
        },
        async initCamera() {
            try {
                const videoElement = this.$refs.videoElement;

                // 检查浏览器是否支持 getUserMedia
                if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                    // 请求用户许可访问摄像头
                    const stream = await navigator.mediaDevices.getUserMedia({ video: true });

                    // 将视频流绑定到video元素上
                    videoElement.srcObject = stream;

                } else {
                    console.error('浏览器不支持getUserMedia');
                }
            } catch (error) {
                console.error('获取摄像头失败：', error);
            }
        },
        stopCamera() {
            const videoElement = this.$refs.videoElement;
            const stream = videoElement.srcObject;

            // 停止视频流
            if (stream) {
                const tracks = stream.getTracks();
                tracks.forEach(track => track.stop());
                videoElement.srcObject = null;
            }
        },
        start() {
            this.cameraOn = true;
            this.initCamera();
        },
        stop() {
            this.warn = false;
            this.cameraOn = false;
            this.stopCamera();
            clearInterval(this.intervalId);
            this.intervalId = null;
        },
        face() {

            const videoElement = this.$refs.videoElement;
            const canvasElement = this.$refs.canvasElement;
            const context = canvasElement.getContext('2d');

            // const draw = document.getElementById('draw');
            const con = document.getElementById('con');

            canvasElement.width = videoElement.videoWidth;
            canvasElement.height = videoElement.videoHeight;
    
            context.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);

            let vm = this;
            canvasElement.toBlob(function(blob) {
                
                const formData = new FormData();
                formData.append('image', blob, 'snapshot.png');

                const url = 'http://localhost:8088/upload';
                axios.post(url, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then((response)=>{
                    if(response.data.code == 0){
                        let v = 0;
                        let o = 0;
                        console.log("结果: ", response.data)
                        let draw = [];
                        const count = response.data.name.length;
                        document.getElementById('num').innerText = '人数 : ' + count;
                        for(let i = 0; i < count; i++){
                            if(response.data.name[i] == 'unknown'){
                                vm.warn = true;
                                vm.putEvent();
                                break;
                            }
                            else if(vm.volunteer.indexOf(response.data.name[i]) != -1){
                                v = v + 1;
                                vm.warn = false;
                            }
                            else{
                                o = o + 1;
                                vm.warn = false;
                            }
                        }

                        if(!vm.warn && v > 0 && o > 0){
                            document.getElementById('warning').innerText = '检测到义工互动';
                        }
                        else if(!vm.warn){
                            document.getElementById('warning').innerText = '正常';
                        }

                        
                        let r_d = document.getElementsByClassName('draw');
                        for(let i = 0; i < r_d.length; i++){
                            r_d[i].remove();
                        }
                        for(let i = 0; i < count; i++){
                            let d = document.createElement('div');
                            d.className = 'draw';
                            draw.push(d);
                            con.append(d);
                        }

                        let c = document.getElementById('frame_container');
                        let f = document.getElementsByClassName('frame');
                        for(let i = 0 ; i < f.length; i++){
                            f[i].remove();
                        }
                        for(let i = 0; i < count; i++){
                            let frame = document.createElement('div');
                            frame.className = 'frame';
                            frame.style.width = '12vw';
                            frame.style.height = '5vh';
                            frame.style.borderRadius = '10px';
                            frame.style.border = '2px solid #7289ac';
                            frame.style.display = 'flex';
                            frame.style.alignItems = 'center';
                            frame.style.justifyContent = 'center';
                            frame.style.background = '#6486b8';
                            frame.style.transition = '1s';
                            frame.onmouseover = function() {
                                frame.style.transform = 'translateX(20px)';
                            }                     
                            frame.onmouseout = function() {
                                frame.style.transform = 'translateX(0px)';
                            } 

                            const name = response.data.name[i];
                            if(vm.oldperson.indexOf(name) != -1){
                                frame.innerText = '老人 : ' + response.data.name[i];
                            }
                            else if(vm.volunteer.indexOf(name) != -1){
                                frame.innerText = '义工 : ' + response.data.name[i];
                            }
                            else{
                                frame.innerText = '陌生人!';
                            }
                            c.append(frame);
                        }

                        const position = response.data.position

                        for(let i = 0; i < position.length; i++){
                            // draw.style.top = -(videoElement.videoHeight - position[0][1]) + 'px'
                            draw[i].style.top = position[i][1] + 'px';
                            // console.log('top: ', position[i]);
                            
                            // draw.style.left = ((videoElement.offsetWidth - videoElement.videoWidth)/2 + position[0][0]) + 'px'
                            draw[i].style.left = ((videoElement.offsetWidth - videoElement.videoWidth)/2 + position[i][0]) + 'px'
                             
                            // draw.style.width = (position[1][0] - position[0][0]) + 'px';
                            draw[i].style.width = (position[i][2] - position[i][0]) + 'px';

                            // draw.style.height = (position[1][1] - position[0][1]) + 'px';
                            draw[i].style.height = (position[i][3] - position[i][1]) + 'px';

                            draw[i].style.border = '1px solid red';
                            draw[i].style.borderRadius = '5px';
                            draw[i].style.position = 'absolute';
                            draw[i].style.zIndex = '10';
                            draw[i].style.transition = '0.5s';
                            draw[i].style.textAlign = 'center';
                            draw[i].style.color = 'red';

                            draw[i].innerText = 'name: ' + response.data.name[i];
                        }

                        let fr = document.getElementsByClassName('frame');
                        if(fr.length > count){
                            for(let i = count; i < fr.length; i++){
                                fr[i].remove();
                            }
                        }
                        
                        return;   
                    }
                    else{
                        console.log("捕获失败 :", response.data.message)
                        return;
                    }
                })
                .catch(err => {
                    console.log('报错啦', err);
                    return;
                })
            });
        },
        check() {
            this.intervalId = setInterval(() => {
                // this.face();

                if (!this.isRunning) {
                    this.isRunning = true;
                    this.face();
                    this.isRunning = false;
                }
            }, 1000);
        },
    },
    mounted: function(){
        this.delId = setInterval(() => {
            this.warn = false;
            if(!this.cameraOn){
                let draw = document.getElementsByClassName('draw');
                for(let i = 0; i < draw.length; i++){
                    draw[i].remove();
                }
                let f = document.getElementsByClassName('frame');
                for(let i = 0 ; i < f.length; i++){
                    f[i].remove();
                }
            }
        }, 500);
    },
    beforeRouteLeave(to,from,next){
        clearInterval(this.intervalId);
        clearInterval(this.delId);
        next();
    },
    setup() {
        const cityData = ['北京', '武汉', '海南'];
        const roomData = {
            北京: ['养老院1', '养老院2', '养老院3'],
            武汉: ['养老院4', '养老院5', '养老院6'],
            海南: ['养老院7', '养老院8', '养老院9'],
        };
        const city = ref(cityData[0]);
        const room = ref(roomData[city.value][0]);
        const rooms = computed(() => {
            return roomData[city.value];
        });
        watch(city, val => {
            room.value = roomData[val][0];
        });
        return {
            cityData,
            rooms,
            city,
            room,
        };
    },
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
    height: 65vh;
    border: 2px solid #3a475a;
    border-radius: 10px;
}

.frame {
    border-radius: 10px;
    width: 12vw;
    height: 5vh;
    border: 2px solid #7289ac;
    display: flex;
    align-items: center;
    justify-content: center;
    /* background: #a0b6d8; */
    background: #6486b8;
    transition: 1s;
}

.frame:hover {
    transform: translateX(20px);
}

#off {
    position: absolute;
    width: 100%;
    height: 65vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.draw {
    width: 20px;
    height: 20px;
    border: 1px solid red;
    border-radius: 5px;
    position: absolute;
    left: 0px;
    top: 0px;
    z-index: 10;
    transition: 0.5s;
    text-align: center;
    color: red;
}

#warning {
    width: 14vw;
    height: 10vh;
    border: 4px solid;
    border-radius: 20px;
    transition: 1s;
}
</style>