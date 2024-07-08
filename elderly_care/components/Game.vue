<template>
    <div id="container">
        <div class="bg-white shadow rounded-lg p-6 mb-6" style="width: 100%;">
            <div class="mb-4">
                <div style="display: flex;justify-content: center;align-items: center;gap: 20px; ">
                    <!-- <a-button type="primary" id="btn" style="background-color: #3a475a;" @click="open">开始检测</a-button> -->
                    <p style="font-weight: 600;font-size: 24px">海底大战</p>
                </div>  
            </div>
        </div>
        <div class="bg-white shadow rounded-lg p-6 mb-6" style="width: 100%;">
            <div class="mb-4">
                <iframe :src="src" frameborder="0" id="on" scrolling="no"></iframe>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'Game',
    data() {
        return {
            src: "/game.html",
        }
    },
    methods:{

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
    height: 74vh;
    overflow: hidden;
    border: 2px solid #3a475a;
    border-radius: 10px;
    /* background-color: red; */
}


</style>