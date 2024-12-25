import jwt from "jsonwebtoken";

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const { refreshToken } = body

    try {
        const decoded = jwt.verify(refreshToken, 'Steblin-Aleksandr-refresh-key-00$$(]') as { userId: number }

        const accessToken = jwt.sign({ userId: decoded.userId}, 'Steblin-Aleksandr-key-00$$(]', {expiresIn: '1h'})
        return { accessToken }
    } catch (error) {
        throw createError({ statusCode: 401, statusMessage: 'Недействительный refresh токен' })
    }
})