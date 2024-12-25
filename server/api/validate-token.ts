import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { accessToken } = body

  try {
    // Проверяем токен
    const decoded = jwt.verify(accessToken, 'Steblin-Aleksandr-key-00$$(]') as { userId: number }
    return { isValid: true, userId: decoded.userId }
  } catch (error) {
    throw createError({ statusCode: 401, statusMessage: 'Недействительный токен' })
  }
})