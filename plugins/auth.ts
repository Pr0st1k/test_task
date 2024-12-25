import { useAuthStore } from "~/store/auth"

export default defineNuxtPlugin((nuxtApp) => {
    const authStore = useAuthStore()
    authStore.initialize() // Восстанавливаем токен из localStorage при загрузке приложения
})