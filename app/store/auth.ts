// import { defineStore } from 'pinia'

// export const useAuthStore = defineStore('auth', () => {
//   const hasEmployeeAccess = ref(false)

//   // 初始化时从 localStorage 读取状态
//   onMounted(() => {
//     const savedAccess = localStorage.getItem('employeeAccess')
//     if (savedAccess === 'true') {
//       hasEmployeeAccess.value = true
//     }
//   })

//   const setEmployeeAccess = (value: boolean) => {
//     hasEmployeeAccess.value = value
//     // 保存到 localStorage
//     localStorage.setItem('employeeAccess', String(value))
//   }

//   return {
//     hasEmployeeAccess,
//     setEmployeeAccess,
//   }
// })
