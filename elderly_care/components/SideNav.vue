<template>
    <div class="flex min-h-screen">
        <div :class="isOpen ? 'w-50' : 'w-50'" class="flex flex-col min-h-screen p-3 duration-300 bg-gray-800 shadow">
            <div class="space-y-3">
                <div class="flex items-center justify-between">
                    <h2 class="text-xl font-bold text-white">智慧养老平台</h2>
                    <button @click="isOpen = !isOpen">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-white">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </button>
                </div>
                <div class="flex-1">
                    <ul class="pt-2 pb-4 space-y-1 text-sm">
                        <li class="rounded-sm">
                            <button @click="toggleManageMenu = !toggleManageMenu" class="flex items-center justify-between w-full p-2 space-x-3 rounded-md hover:bg-gray-600 cursor-pointer">
                                <div class="flex items-center space-x-3">
                                    <Icon name="mage:user-square" class="text-gray-100" size="30"/>
                                    <span class="text-gray-100">信息管理</span>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-gray-100 transform transition-transform" :class="{ 'rotate-180': toggleManageMenu }">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
                                </svg>
                            </button>
                            <ul v-show="toggleManageMenu" class="pl-4 pt-2 pb-1 text-sm">
                                <li>
                                    <button @click="setPage('elderly'); closeAllMenus()" class="text-gray-100 hover:text-white hover:bg-gray-600 cursor-pointer py-2 px-3 block w-full text-left rounded-md">
                                        <Icon name="material-symbols:elderly" class="text-gray-100 mr-2" size="35"/>
                                        老人信息管理
                                    </button>
                                </li>
                                <li>
                                    <button @click="setPage('staff'); closeAllMenus()" class="text-gray-100 hover:text-white hover:bg-gray-600 cursor-pointer py-2 px-4 block w-full text-left rounded-md">
                                        <Icon name="guidance:care-staff-area" class="text-gray-100 mr-2" size="30"/>
                                        工作人员信息管理
                                    </button>
                                </li>
                                <li>
                                    <button @click="setPage('volunteer'); closeAllMenus()" class="text-gray-100 hover:text-white hover:bg-gray-600 cursor-pointer py-2 px-4 block w-full text-left rounded-md">
                                        <Icon name="material-symbols:volunteer-activism" class="text-gray-100 mr-2" size="30"/>
                                        义工信息管理
                                    </button>
                                </li>
                                <li>
                                    <button @click="setPage('event'); closeAllMenus()" class="text-gray-100 hover:text-white hover:bg-gray-600 cursor-pointer py-2 px-4 block w-full text-left rounded-md">
                                        <Icon name="material-symbols:volunteer-activism" class="text-gray-100 mr-2" size="30"/>
                                        事件管理
                                    </button>
                                </li>
                            </ul>
                        </li>
                        <li class="rounded-sm">
                            <button @click="toggleCameraMenu = !toggleCameraMenu" class="flex items-center justify-between w-full p-2 space-x-3 rounded-md hover:bg-gray-600 cursor-pointer">
                                <div class="flex items-center space-x-3">
                                    <Icon name="mage:camera" class="text-gray-100" size="30"/>
                                    <span class="text-gray-100">实时视频检测</span>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-gray-100 transform transition-transform" :class="{ 'rotate-180': toggleCameraMenu }">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
                                </svg>
                            </button>
                            <ul v-show="toggleCameraMenu" class="pl-4 pt-2 pb-1 text-sm">
                                <li>
                                    <button @click="setPage('face'); closeAllMenus()" class="text-gray-100 hover:text-white hover:bg-gray-600 cursor-pointer py-2 px-3 block w-full text-left rounded-md">
                                        <Icon name="icon-park-outline:ios-face-recognition" class="text-gray-100 mr-2" size="35"/>
                                        人脸识别
                                    </button>
                                </li>
                                <li>
                                    <button @click="setPage('emotion'); closeAllMenus()" class="text-gray-100 hover:text-white hover:bg-gray-600 cursor-pointer py-2 px-4 block w-full text-left rounded-md">
                                        <Icon name="ic:round-emoji-emotions" class="text-gray-100 mr-2" size="30"/>
                                        情绪识别
                                    </button>
                                </li>
                                <li>
                                    <button @click="setPage('fallOver'); closeAllMenus()" class="text-gray-100 hover:text-white hover:bg-gray-600 cursor-pointer py-2 px-4 block w-full text-left rounded-md">
                                        <Icon name="fa6-solid:user-injured" class="text-gray-100 mr-2" size="30"/>
                                        摔倒检测
                                    </button>
                                </li>
                            </ul>
                        </li>
                        <li class="rounded-sm">
                            <button @click="setPage('chatBot'); closeAllMenus()" class="flex items-center p-2 space-x-3 rounded-md hover:bg-gray-600 cursor-pointer w-full">
                                <Icon name="tabler:message-chatbot" class="text-gray-100" size="30"/>
                                <span class="text-gray-100">聊天机器人</span>
                            </button>
                        </li>
                        <li class="rounded-sm">
                            <button @click="setPage('dataStatistics'); closeAllMenus()" class="flex items-center p-2 space-x-3 rounded-md hover:bg-gray-600 cursor-pointer w-full">
                                <Icon name="material-symbols-light:data-thresholding-outline-sharp" class="text-gray-100" size="30"/>
                                <span class="text-gray-100">数据统计</span>
                            </button>
                        </li>
                        <li class="rounded-sm">
                            <button @click="setPage('knowledgeGraph'); closeAllMenus()" class="flex items-center p-2 space-x-3 rounded-md hover:bg-gray-600 cursor-pointer w-full">
                                <Icon name="mage:settings" class="text-gray-100" size="30"/>
                                <span class="text-gray-100">知识图谱</span>
                            </button>
                        </li>
                        <li class="rounded-sm">
                            <button @click="setPage('settings'); closeAllMenus()" class="flex items-center p-2 space-x-3 rounded-md hover:bg-gray-600 cursor-pointer w-full">
                                <Icon name="mage:settings" class="text-gray-100" size="30"/>
                                <span class="text-gray-100">系统设置</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { usePageStore } from '~/stores/page';

const isOpen = ref(false);
const toggleManageMenu = ref(false);
const toggleCameraMenu = ref(false);
const store = usePageStore();

const setPage = (page) => {
    store.setPage(page);
};

const closeAllMenus = () => {
    toggleManageMenu.value = false;
    toggleCameraMenu.value = false;
};
</script>
