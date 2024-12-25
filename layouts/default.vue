<script setup lang="ts">
    import { useAuthStore } from '~/store/auth';

    const authStore = useAuthStore();
    onMounted(() => {
        authStore.initialize(); // Вызываем initialize только на клиенте
    });
</script>

<template>
    <div>
        <header>
            <ul class="nav-panel flex flex-row p-4">
                <li><NuxtLink to="/" class="p-4">Главная</NuxtLink></li>
                <li><NuxtLink to="/login" class="p-4">Войти</NuxtLink></li>
                <li><NuxtLink to="/register" class="p-4">Регистрация</NuxtLink></li>
            </ul>
        </header>
        <slot />
    </div>
</template>
  
<style lang="css">


.router-link-active {
    font-weight: 700;
}

</style>