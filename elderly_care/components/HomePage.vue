<template>
    <div>
        <div class="main-content">
            <ElderlyManagement v-if="currentPage === 'elderly'" />
            <StaffManagement v-if="currentPage === 'staff'" />
            <VolunteerManagement v-if="currentPage === 'volunteer'" />
            <Event v-if="currentPage === 'event'" />
            <Emotion v-if="currentPage === 'emotion'" />
            <Face v-if="currentPage === 'face'" />
            <FallOver v-if="currentPage === 'fallOver'" />
            <Settings v-if="currentPage === 'settings'" />
            <ChatBot v-if="currentPage === 'chatBot'" />
            <DataStatistics v-if="currentPage === 'dataStatistics'" />
            <KnowledgeGraph v-if="currentPage === 'knowledgeGraph'" />
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { usePageStore } from '~/stores/page';

const store = usePageStore();
const currentPage = computed(() => store.currentPage);

</script>
