<template>
    <div>
        <div class="main-content">
            <ElderlyManagement v-if="currentPage === 'elderly'" />
            <StaffManagement v-if="currentPage === 'staff'" />
            <VolunteerManagement v-if="currentPage === 'volunteer'" />
            <Event v-if="currentPage === 'event'" />
            <Camera v-if="currentPage === 'camera'" />
            <Settings v-if="currentPage === 'settings'" />
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import ElderlyManagement from '~/components/ElderlyManagement.vue';
import StaffManagement from '~/components/StaffManagement.vue';
import VolunteerManagement from '~/components/VolunteerManagement.vue';
import { usePageStore } from '~/stores/page';

const store = usePageStore();
const currentPage = computed(() => store.currentPage);
</script>
