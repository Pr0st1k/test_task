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

  // Проверяем, существует ли пользователь с таким email
  const existingUser = users.find((u) => u.email === email)
  if (existingUser) {
    throw createError({ statusCode: 400, statusMessage: 'Пользователь с таким Email уже существует' })
  }

  // Создаем нового пользователя
  const newUser = await $fetch<User>('http://localhost:3001/users', {
    method: 'POST',
    body: { email, password },
  })

  // Генерируем access и refresh токены
    const accessToken = jwt.sign({ userId: newUser.id }, 'Steblin-Aleksandr-key-00$$(]', { expiresIn: '1h' })
    const refreshToken = jwt.sign({ userId: newUser.id }, 'Steblin-Aleksandr-refresh-key-00$$(]', { expiresIn: '30d' })

    setCookie(event, 'refreshToken', refreshToken, {
      httpOnly: true,
      secure: true, // Только для HTTPS
      maxAge: 30 * 24 * 60 * 60, // 30 дней
      sameSite: 'strict', // Защита от CSRF
      path: '/', // Доступен для всех путей
    })

  // Возвращаем токен
  return { accessToken, email: newUser.email }
})