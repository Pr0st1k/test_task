export default defineEventHandler((event) => {
    // Удаляем refreshToken из куки
    deleteCookie(event, 'refreshToken', {
      path: '/',
    })
  
    return { success: true }
})