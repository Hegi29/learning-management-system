<template>
    <header class="bg-gray-100 p-4 shadow">
        <div class="flex justify-between items-center">
            <h1 class="text-xl font-bold">Welcome, {{ user?.name }}</h1>
            <p class="text-gray-600">Role: {{ user?.role }}</p>
        </div>
    </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { useAuthStore } from '@/stores/auth';

export default defineComponent({
    setup() {
        const authStore = useAuthStore();
        return { user: authStore.user };
    },
});
</script>