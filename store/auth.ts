import { defineStore } from 'pinia'

interface AuthState {
  accessToken: string | null
  email: string | null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    accessToken: null,
    email: null,
  }),
  actions: {
    // Устанавливаем accessToken и email
    setAccessToken(accessToken: string, email: string) {
      this.accessToken = accessToken
      this.email = email

      // Сохраняем accessToken и email в localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('accessToken', accessToken)
        localStorage.setItem('email', email)
      }
    },

    // Выход из системы
    logout() {
      this.accessToken = null
      this.email = null

      // Удаляем accessToken и email из localStorage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('email')
      }

      // Удаляем refreshToken из куки (через API)
      this.clearRefreshToken()
    },

    // Инициализация состояния из localStorage
    initialize() {
      if (typeof window !== 'undefined') {
        const accessToken = localStorage.getItem('accessToken')
        const email = localStorage.getItem('email')

        if (accessToken && email) {
          this.setAccessToken(accessToken, email)
          this.validateToken(accessToken) // Проверяем токен на сервере
        }
      }
    },

    // Валидация токена на сервере
    async validateToken(accessToken: string) {
      try {
        const response = await fetch('/api/validate-token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ accessToken }),
        })

        if (!response.ok) {
          throw new Error('Токен недействителен')
        }

        const data = await response.json()
        this.setAccessToken(data.accessToken, this.email!) // Обновляем accessToken
      } catch (error) {
        this.logout() // Если токен недействителен, выходим из системы
        console.error('Ошибка валидации токена:', error)
      }
    },

    // Удаление refreshToken из куки
    async clearRefreshToken() {
      await fetch('/api/logout', {
        method: 'POST',
      })
    },
  },
})