<template>
    <div id="container">
        <div class="bg-white shadow rounded-lg p-6 mb-6" style="width: 100%;">
            <div class="mb-4">
                <a-button type="primary" id="btn" style="background-color: #3a475a;" @click="start">开始检测</a-button>
                <a-button type="primary" id="btn" style="background-color: #3a475a;" @click="stop">停止检测</a-button>
                <a-button type="primary" id="btn" style="background-color: #3a475a;" @click="test">发送请求</a-button>
            </div>
        </div>
        
        <video ref="videoElement" autoplay playsinline id="camera"></video>
        <canvas ref="canvasElement" style="display:none;"></canvas>
    </div>
</template>

<script>
import axios from 'axios';
import { message } from 'ant-design-vue';
export default {
    name: 'Login',
    data() {
        return {
           
        }
    },
    methods:{
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
            this.initCamera();
        },
        stop() {
            this.stopCamera();
        },
        test() {
            const videoElement = this.$refs.videoElement;
            const canvasElement = this.$refs.canvasElement;
            const context = canvasElement.getContext('2d');

            canvasElement.width = videoElement.videoWidth;
            canvasElement.height = videoElement.videoHeight;
    
            context.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);

            canvasElement.toBlob(function(blob) {
                const formData = new FormData();
                formData.append('image', blob, 'snapshot.png');

                const url = 'http://localhost:8088/upload'
                axios.post(url, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then((response)=>{
                    console.log(response)
                })
                .catch(err => {
                    message.error('报错啦'+err, 2);
                })
            });
        },
    },
    mounted() {
        // this.initCamera();
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
    height: 70vh;
}
</style>