<script setup lang="ts">
    import { ref, onMounted } from 'vue';
    import { useRouter } from 'vue-router';
    import { errorMessages } from 'vue/compiler-sfc';
    import { useAuthStore } from '~/store/auth';

    const email = ref('')
    const password = ref('')
    const router = useRouter()
    const authStore = useAuthStore()

    onMounted(() => {
        if (authStore.accessToken) {
            router.push('/')
        }
    })

    const register = async () => {
        try {
            const response = await fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }, // Исправлено на 'Content-Type'
            body: JSON.stringify({ email: email.value, password: password.value }),
            })

            if (response.ok) {
            const data = await response.json()
            authStore.setAccessToken(data.accessToken, email.value)
            router.push('/')
            } else {
            console.error('Ошибка регистрации')
            }
        } catch (error) {
            console.error('Ошибка:', error)
        }
    }
</script>

<template>
    <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 class="text-2xl font-bold mb-4">Регистрация</h1>
        <form @submit.prevent="register" class="bg-white p-6 rounded shadow-md">
            <input 
                v-model="email"
                type="email"
                placeholder="Email"
                required
                class="w-full p-2 mb-4 border border-gray-300 rounded"
            >
            <input 
                v-model="password"
                type="password"
                placeholder="Пароль"
                required
                class="w-full p-2 mb-4 border border-gray-300 rounded"
            >
            <button
                type="submit"
                class="w-full p-2 bg-green-600 text-white rounded hover:bg-green-800"
            >
            Зарегистророваться
            </button>
        </form>
    </div>
</template>