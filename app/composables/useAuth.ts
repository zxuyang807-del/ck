export const useAuth = () => {
  const auth = useState('auth', () => ({
    hasEmployeeAccess: false,
  }))

  // 检查权限
  const checkAccess = () => {
    if (import.meta.client) {
      const savedAccess = localStorage.getItem('employeeAccess')
      if (savedAccess === 'true') {
        // 确保状态同步
        auth.value.hasEmployeeAccess = true
        return true
      }
    }
    return auth.value.hasEmployeeAccess
  }

  // 设置权限
  const setAccess = (value: boolean) => {
    auth.value.hasEmployeeAccess = value
    if (import.meta.client) {
      localStorage.setItem('employeeAccess', String(value))
    }
  }

  const clearAuth = () => {
    auth.value.hasEmployeeAccess = false
    if (import.meta.client) {
      localStorage.removeItem('employeeAccess')
    }
  }

  // 初始化权限
  const initAccess = () => {
    // 添加调试日志
    if (import.meta.client) {
      const savedAccess = localStorage.getItem('employeeAccess')
      if (savedAccess === 'true') {
        auth.value.hasEmployeeAccess = true
      }
    }
  }

  return {
    auth,
    setAccess,
    clearAuth,
    initAccess,
    checkAccess,
  }
}
