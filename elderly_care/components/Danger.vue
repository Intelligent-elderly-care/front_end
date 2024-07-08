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
                <div v-if="warn" style="position: absolute;left: 5.4vw;top: 23vh;">
                    <img src="../assets/img/danger.png" style="width: 120px;height: 120px;">
                </div>
                <video ref="videoElement" autoplay playsinline id="camera"></video>
                
                <div style="position: absolute;right: 2.8vw;top: 20vh;display: flex;align-items: center;justify-content: center;flex-direction: column;gap: 3vh;">
                    <p style="font-weight: 500;font-size: 20px;">状态</p>
                    <div v-if="warn" id="warning" style="font-weight: 500;font-size: 20px;text-align: center;line-height: 9vh;border-color: red;">检测到危险物品!!!</div>
                    <div v-else id="warning" style="font-weight: 500;font-size: 20px;text-align: center;line-height: 9vh;border-color: green;">正常</div>
                </div>
                <div id="draw"></div>
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
export default {
    name: 'Danger',
    data() {
        return {
            intervalId: null,
            delId: null,
            cameraOn: false,
            warn: false,
            json_data: {
                "event_type": 3,
                "event_date": "",
                "event_location": "起居室",
                "event_desc": "检测到危险物品",
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
            clearInterval(this.intervalId);
            this.warn = false;
            this.cameraOn = false;
            this.stopCamera();
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

                const url = 'http://localhost:8100/upload';
                axios.post(url, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then((response)=>{
                    if(response.data.code == 0){
                        let draw = document.getElementById('draw');
                        if(response.data.boxes.length != 0) {
                            console.log("检测到了危险物品"); 
                            vm.putEvent();
                            vm.warn = true;
                            console.log('boxes: ', response.data.boxes);

                            const list = response.data.boxes[0];

                            draw.style.left = (videoElement.offsetWidth - videoElement.videoWidth)/2 + list[0] + 'px';
                            draw.style.top = list[1] + 'px';
                            draw.style.width = list[2] + 'px';
                            draw.style.height = list[3] + 'px';
                            draw.style.display = 'block';
                        }
                        else{
                            draw.style.display = 'none';
                            console.log("正常行为"); 
                            vm.warn = false;
                        }
                        
                        

                    }
                    else{
                        console.log("捕获失败 :", response.data)
                        return;
                    }
                })
                .catch(err => {
                    message.error('报错啦'+err, 2);
                    console.log('报错啦', err);
                    return;
                })
            });
        },
        check() {
            this.intervalId = setInterval(() => {
                this.face();
            }, 1000); 
            // this.face();
        },
    },
    mounted: function(){
        this.delId = setInterval(() => {
            if(!this.cameraOn){
                let draw = document.getElementById('draw');
                draw.style.display = 'none';
                this.warn = false;
            }
        }, 1000); 
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

#draw {
    width: 20px;
    height: 20px;
    border: 1px solid red;
    border-radius: 5px;
    position: absolute;
    left: 280px;
    top: 53px;
    z-index: 10;
    transition: 0.5s;
    text-align: center;
    color: red;
    display: none;
}

#off {
    position: absolute;
    width: 100%;
    height: 65vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

#warning {
    width: 14vw;
    height: 10vh;
    border: 4px solid;
    border-radius: 20px;
    transition: 1s;
}
</style>