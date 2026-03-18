export default defineNuxtRouteMiddleware((to) => {
  // 只在客户端执行权限检查
  if (import.meta.client) {
    const { initAccess, checkAccess } = useAuth()

    // 先初始化权限状态
    initAccess()

    // 然后再检查权限
    if (to.path.includes('/support/employee') && !checkAccess()) {
      // 重定向到首页
      return navigateTo('/')
    }
  }
})
