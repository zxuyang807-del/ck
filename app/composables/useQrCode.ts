import { useRoute, useRuntimeConfig } from 'nuxt/app'

/**
 * 二维码选项接口
 */
interface QrCodeOptions {
  isPreload?: boolean
  timeout?: number
}

/**
 * 二维码缓存数据接口
 */
interface QrCodeCacheData {
  url: string
  base64: string
}

/**
 * 二维码加载和管理的 composable
 */
export function useQrCode() {
  const route = useRoute()
  const config = useRuntimeConfig()

  // 核心状态
  const qrCodeUrl = ref<string>('')
  const isLoading = ref<boolean>(false)
  const isPreloading = ref<boolean>(false)

  // 当前 URL
  const currentUrl = computed<string>(() => {
    if (import.meta.client) {
      return window.location.href
    }
    return config.public.siteUrl
  })

  // 生成二维码 API URL
  const getQrCodeApiUrl = (url: string): string =>
    `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(url)}`

  // 日志函数
  const logInfo = (message: string, isPreload = false): void => {
    if (process.env.NODE_ENV !== 'production') {
      console.log(isPreload ? `预加载：${message}` : message)
    }
  }

  const logError = (error: string, isPreload = false): void => {
    console.error(isPreload ? `预加载错误：${error}` : `错误：${error}`)
  }

  // 从缓存获取二维码
  const getQrCodeFromCache = (): string | null => {
    if (!import.meta.client) return null

    try {
      const cachedData = localStorage.getItem('wechat_qrcode_base64')
      if (cachedData) {
        const data = JSON.parse(cachedData) as QrCodeCacheData
        if (data.url === currentUrl.value) {
          logInfo('使用缓存的二维码')
          return data.base64
        }
      }
    } catch (e) {
      logError(`读取缓存失败: ${e instanceof Error ? e.message : String(e)}`)
    }

    return null
  }

  // 保存二维码到缓存
  const saveQrCodeToCache = (base64Data: string): void => {
    if (!import.meta.client) return

    try {
      localStorage.setItem(
        'wechat_qrcode_base64',
        JSON.stringify({
          url: currentUrl.value,
          base64: base64Data,
        }),
      )
      logInfo('二维码已缓存')
    } catch (e) {
      logError(`缓存失败: ${e instanceof Error ? e.message : String(e)}`)
    }
  }

  // 加载二维码
  const loadQrCode = async (): Promise<void> => {
    // 如果已有二维码，直接显示
    if (qrCodeUrl.value) {
      isLoading.value = false
      logInfo('已有二维码，直接显示')
      return
    }

    // 如果正在预加载，等待预加载完成
    if (isPreloading.value) {
      logInfo('正在预加载中，显示加载状态')
      isLoading.value = true

      // 等待预加载完成或超时
      const checkInterval = setInterval(() => {
        if (!isPreloading.value && qrCodeUrl.value) {
          isLoading.value = false
          clearInterval(checkInterval)
          logInfo('预加载完成，显示二维码')
        }
      }, 100)

      // 设置超时
      setTimeout(() => {
        clearInterval(checkInterval)
        if (isLoading.value) {
          loadQrCodeWithOptions({ timeout: 5000 })
        }
      }, 3000)

      return
    }

    // 常规加载
    await loadQrCodeWithOptions({ timeout: 5000 })
  }

  // 预加载二维码
  const preloadQrCode = async (): Promise<void> => {
    await loadQrCodeWithOptions({ isPreload: true })
  }

  // 使用 useFetch 加载二维码
  const fetchQrCode = async (url: string): Promise<string | null> => {
    if (!import.meta.client) return null

    try {
      // 使用 $fetch 获取二维码图片
      const response = await $fetch(getQrCodeApiUrl(url), {
        method: 'GET',
        responseType: 'blob',
      })

      if (!response) {
        throw new Error('获取二维码失败: 没有数据')
      }

      // 将 Blob 转换为 base64
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => {
          const base64 = reader.result as string
          saveQrCodeToCache(base64)
          resolve(base64)
        }
        reader.onerror = () => reject(new Error('读取二维码数据失败'))
        reader.readAsDataURL(response as Blob)
      })
    } catch (e) {
      logError(`获取二维码失败: ${e instanceof Error ? e.message : String(e)}`)
      return null
    }
  }

  // 统一的二维码加载函数
  const loadQrCodeWithOptions = async (options: QrCodeOptions = {}): Promise<boolean> => {
    const { isPreload = false, timeout = 0 } = options

    if (!import.meta.client) return false
    if (isPreload && isPreloading.value) return false

    // 设置状态
    if (isPreload) {
      isPreloading.value = true
    } else if (!qrCodeUrl.value) {
      isLoading.value = true
    }

    try {
      // 先检查缓存
      const cachedBase64 = getQrCodeFromCache()
      if (cachedBase64) {
        qrCodeUrl.value = cachedBase64
        logInfo('使用缓存的二维码', isPreload)
        return true
      }

      // 加载新的二维码
      logInfo('开始加载新二维码', isPreload)

      // 处理超时
      let fetchPromise = fetchQrCode(currentUrl.value)
      if (timeout > 0) {
        fetchPromise = Promise.race([
          fetchPromise,
          new Promise<null>((_, reject) =>
            setTimeout(() => reject(new Error('加载超时')), timeout),
          ),
        ])
      }

      const base64Data = await fetchPromise
      if (base64Data) {
        qrCodeUrl.value = base64Data
        logInfo('二维码加载完成', isPreload)
        return true
      }

      return false
    } catch (error) {
      logError(`加载失败: ${error instanceof Error ? error.message : String(error)}`, isPreload)
      return false
    } finally {
      // 重置状态
      if (isPreload) {
        isPreloading.value = false
      } else {
        isLoading.value = false
      }
    }
  }

  // 监听路由变化
  if (import.meta.client) {
    watch(
      () => route.fullPath,
      (newPath, oldPath) => {
        if (newPath !== oldPath) {
          logInfo('路由路径变化，预加载新页面二维码')
          qrCodeUrl.value = ''
          preloadQrCode()
        }
      },
    )
  }

  // 初始化
  onMounted(() => {
    if (import.meta.client) {
      preloadQrCode()
    }
  })

  return {
    qrCodeUrl,
    isLoading,
    isPreloading,
    loadQrCode,
    preloadQrCode,
  }
}
