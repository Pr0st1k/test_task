import jwt from 'jsonwebtoken'

interface User {
  id: number
  email: string
  password: string
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email, password } = body

  // Получаем список пользователей
  const users = await $fetch<User[]>('http://localhost:3001/users', {
    method: 'GET',
  })

  // Находим пользователя по email
  const user = users.find((u) => u.email === email)

  // Если пользователь не найден или пароль не совпадает
  if (!user || user.password !== password) {
    throw createError({ statusCode: 401, statusMessage: 'Неверный email или пароль' })
  }

  // Генерируем access и refresh токены
  const accessToken = jwt.sign({ userId: user.id }, 'Steblin-Aleksandr-key-00$$(]', { expiresIn: '1h' })
  const refreshToken = jwt.sign({ userId: user.id }, 'Steblin-Aleksandr-refresh-key-00$$(]', { expiresIn: '30d' })

  setCookie(event, 'refreshToken', refreshToken, {
    httpOnly: true,
    secure: true, // Только для HTTPS
    maxAge: 30 * 24 * 60 * 60, // 30 дней
    sameSite: 'strict', // Защита от CSRF
    path: '/', // Доступен для всех путей
  })
  
  // Возвращаем токен
  return { accessToken, email: user.email }
})