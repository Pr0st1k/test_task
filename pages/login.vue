<script setup lang="ts">
    import { ref, onMounted } from 'vue';
    import { useRouter } from 'vue-router';
    import { useAuthStore } from '~/store/auth';

    const email = ref('')
    const password = ref('')
    const router = useRouter()
    const authStore = useAuthStore()

    onMounted(() => {
        if (authStore.accessToken) {
            router.push('/') // Если токен уже есть, перенаправляем на главную страницу
        }
    })

    const login = async () => {
        try {
            const response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email.value, password: password.value }),
            })

            if (response.ok) {
            const data = await response.json()
            authStore.setAccessToken(data.accessToken, email.value) // Сохраняем токен и email
            router.push('/')
            } else {
            console.error('Ошибка авторизации')
            }
        } catch (error) {
            console.error('Ошибка:', error)
        }
    }
</script>

<template>
    <div class="flex flex-col items-center justify-center min-h-screen bg-gray-200/80">
        <form @submit.prevent="login" class="bg-white p-6 rounded shadow-md ">
            <h1 class="text-2xl font-bold mb-5 flex justify-center">Авторизация</h1>
            <input
                v-model="email"
                type="email"
                placeholder="Email"
                required
                class="w-full p-2 mb-4 border border-gray-300 rounded"
            />
            <input
                v-model="password"
                type="password"
                placeholder="Пароль"
                required
                class="w-full p-2 mb-4 border border-gray-300 rounded"
            />
            <button
                type="submit"
                class="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Войти
            </button>
        </form>
    </div>
</template>