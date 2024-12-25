import { useAuthStore } from "~/store/auth"

export default defineNuxtRouteMiddleware((to, from) => {
    const authStore = useAuthStore()

    if (!authStore.accessToken && to.path !== '/login' && to.path !== '/register') {
        return navigateTo('/login')
    } // Если пользователь не авторизован и пытается зайти на любую страницу сайта, то он пренаправляется на страницу входа

    if (authStore.accessToken && (to.path === '/login' || to.path === '/register')) {
        return navigateTo('/')
    }
})