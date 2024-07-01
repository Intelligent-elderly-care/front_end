<template>
    <div id="container">
        <div class="bg-white shadow rounded-lg p-6 mb-6" style="width: 100%;">
            <div class="mb-4">
                <div style="display: flex;justify-content: center;align-items: center;gap: 20px; ">
                    <a-button type="primary" id="btn" style="background-color: #3a475a;" @click="open">开始检测</a-button>
                    <a-button type="primary" id="btn" style="background-color: #3a475a;" @click="close">停止检测</a-button>
                </div>  
            </div>
        </div>
        <div class="bg-white shadow rounded-lg p-6 mb-6" style="width: 100%;">
            <div class="mb-4">
                <div v-if="cameraOn">
                    <iframe :src="src" frameborder="0" id="on" scrolling="no"></iframe>
                </div>
                <div v-else>
                    <div id="off">
                        <img src="../assets/img/camera.png" style="width: 20vh;height: 20vh">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'Login',
    data() {
        return {
            src: "/face.html",
            cameraOn: false, 
        }
    },
    methods:{
        open() {
            this.cameraOn = true;
        },
        close() {
            this.cameraOn = false;
        }
        
    },
    mounted() {
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

#on {
    width: 100%;
    height: 65vh;
    overflow: hidden;
    border: 2px solid #3a475a;
    border-radius: 10px;
    /* background-color: red; */
}

#off {
    border: 2px solid #3a475a;
    border-radius: 10px;
    width: 100%;
    height: 65vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

</style>