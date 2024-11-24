<template>
    <div class="flex flex-col items-center justify-center min-h-screen w-full bg-gray-100">
        <div class="flex flex-col items-center justify-center w-full max-w-xl bg-white shadow-lg rounded-2xl p-10">
            <h1 class="text-3xl font-bold mb-6 text-blue-600 text-center">LMS Login</h1>
            <form @submit.prevent="handleLogin" class="w-full">
                <div class="mb-6">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
                        Email
                    </label>
                    <input v-model="email" type="email" id="email" placeholder="Enter your email"
                        class="w-full border rounded-lg px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required />
                </div>

                <div class="mb-6">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                        Password
                    </label>
                    <input v-model="password" type="password" id="password" placeholder="Enter your password"
                        class="w-full border rounded-lg px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required />
                </div>

                <div class="flex items-center justify-center">
                    <button type="submit"
                        class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition duration-200">
                        Login
                    </button>
                </div>

                <p v-if="error" class="text-red-500 text-sm text-center mt-4">{{ error }}</p>
            </form>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

import { useAuthStore } from '@/stores/auth';

export default defineComponent({
    setup() {
        const email = ref('');
        const password = ref('');
        const error = ref('');
        const authStore = useAuthStore();
        const router = useRouter();

        const handleLogin = () => {
            const response = authStore.login(email.value, password.value);
            if (response.status) {
                error.value = '';
                if (response.user?.role === 'admin') {
                    router.push('/dashboard');
                } else {
                    router.push('/courses');
                }
            } else {
                error.value = 'Invalid email or password';
            }
        };

        return { email, password, error, handleLogin };
    },
});
</script>