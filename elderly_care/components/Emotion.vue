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