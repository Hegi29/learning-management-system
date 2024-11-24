<template>
    <form @submit.prevent="handleRegister">
        <input v-model="email" type="email" placeholder="Email" required />
        <input v-model="password" type="password" placeholder="Password" required />
        <button type="submit">Register</button>
    </form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import { useAuthStore } from '@/stores/auth';

export default defineComponent({
    setup() {
        const email = ref('');
        const password = ref('');
        const authStore = useAuthStore();

        const handleRegister = async () => {
            try {
                await authStore.login(email.value, password.value);
                alert('Register successful!');
            } catch {
                alert('Invalid credentials');
            }
        };

        return { email, password, handleRegister };
    },
});
</script>