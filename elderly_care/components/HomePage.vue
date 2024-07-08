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
            <Game v-if="currentPage === 'happy'" />
            <Danger v-if="currentPage === 'danger'" />
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { usePageStore } from '~/stores/page';

const store = usePageStore();
const currentPage = computed(() => store.currentPage);

</script>
