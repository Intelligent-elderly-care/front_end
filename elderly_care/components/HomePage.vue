<template>
    <div>
        <Sidebar />
        <div class="main-content">
            <ElderlyManagement v-if="currentPage === 'elderly'" />
            <StaffManagement v-if="currentPage === 'staff'" />
            <VolunteerManagement v-if="currentPage === 'volunteer'" />
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import ElderlyManagement from '~/components/ElderlyManagement.vue';
import StaffManagement from '~/components/StaffManagement.vue';
import VolunteerManagement from '~/components/VolunteerManagement.vue';
import { usePageStore } from '~/stores/pageStore';

const store = usePageStore();
const currentPage = computed(() => store.currentPage);
</script>
