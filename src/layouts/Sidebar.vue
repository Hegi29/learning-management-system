<template>
    <aside class="w-64 bg-gray-800 text-white flex flex-col">
        <div class="p-6 text-xl font-bold border-b border-gray-700">LMS</div>
        <nav class="flex-1 p-4">
            <ul>
                <li class="mb-4" v-if="user?.role === 'admin'">
                    <router-link to="/dashboard" class="flex items-center p-2 rounded hover:bg-gray-700">
                        Dashboard
                    </router-link>
                </li>
                <li v-if="user?.role === 'student'" class="mb-4">
                    <router-link to="/courses" class="flex items-center p-2 rounded hover:bg-gray-700">
                        Courses
                    </router-link>
                </li>
                <li v-if="user?.role === 'student'" class="mb-4">
                    <router-link to="/my-courses" class="flex items-center p-2 rounded hover:bg-gray-700">
                        My Courses
                    </router-link>
                </li>
            </ul>
        </nav>
        <div class="p-4 border-t border-gray-700">
            <button @click="logout" class="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded">
                Logout
            </button>
        </div>
    </aside>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

export default defineComponent({
    setup() {
        const authStore = useAuthStore();
        const router = useRouter();

        const logout = () => {
            authStore.logout();
            router.push('/');
        };

        return { logout, user: authStore.user };
    },
});
</script>
