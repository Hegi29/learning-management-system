<template>
    <div class="flex min-h-screen">
        <Sidebar />
        <div class="flex-1 flex flex-col">
            <Header />
            <main class="flex-1 p-6 bg-gray-50">
                <router-view />
            </main>
            <Footer />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { useAuthStore } from '@/stores/auth';
import Sidebar from './Sidebar.vue';
import Header from './Header.vue';
import Footer from './Footer.vue';

export default defineComponent({
    components: {
        Sidebar,
        Header,
        Footer
    },
    setup() {
        const authStore = useAuthStore();
        return { user: authStore.user };
    },
});
</script>