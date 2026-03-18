import type { PowerGenerator } from '~/types/power-generator'

export const useGeneratorData = (
  props: { brand: string; fuelType: string; operationType?: string },
  frequency: Ref<'50' | '60'>,
) => {
  // 使用 toRef 从 props 对象中创建响应式引用
  const brandRef = toRef(props, 'brand')
  const fuelTypeRef = toRef(props, 'fuelType')
  const operationTypeRef = toRef(props, 'operationType')

  return useAsyncData(
    `generators-${brandRef.value}-${frequency.value}Hz`,
    () => {
      // 验证参数
      if (!brandRef.value || !fuelTypeRef.value || !frequency.value) {
        return Promise.resolve([])
      }

      // 去除参数中的首尾空格
      const brand = brandRef.value.trim()
      const fuelType = fuelTypeRef.value.trim()
      const operationType = operationTypeRef.value?.trim()

      // 构建 API 路径
      let apiPath = ''
      if (operationType === 'ship') {
        // 如果是船用发电机组，使用 ship-{brand}-{frequency} 格式
        apiPath = `/api/ship-${brand}-${frequency.value}`
      } else {
        // 否则使用原来的 {fuelType}-{brand}-{frequency} 格式
        apiPath = `/api/${fuelType}-${brand}-${frequency.value}`
      }

      return $fetch<PowerGenerator[]>(apiPath)
    },
    {
      watch: [brandRef, frequency, fuelTypeRef, operationTypeRef], // 同时监听品牌、频率、发电方式、运行方式变化
      transform: (data) => data ?? [], // 确保返回空数组而不是 undefined
    },
  )
}
