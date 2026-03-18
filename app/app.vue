<script setup lang="ts">
  import type { Locale, Messages } from '@nuxt/ui'
  import * as locales from '@nuxt/ui/locale'

  import { Analytics } from '@vercel/analytics/nuxt'
  import { SpeedInsights } from '@vercel/speed-insights/nuxt'

  // 类型定义
  type LocaleMessages = Record<string, Locale<Messages>>

  const { locale } = useI18n()
  const appConfig = useAppConfig()

  // 计算属性优化
  const currentLocale = computed(() => (locales as unknown as LocaleMessages)[locale.value])

  // SEO相关配置
  useHead(() => ({
    titleTemplate: '%s | Good Wind Power',
    templateParams: {
      siteName: 'Good Wind Power',
      separator: '|',
    },
  }))

  useLocaleHead({ addSeoAttributes: true, addDirAttribute: true })

  // 提供全局配置
  provide('appConfig', appConfig)

  const route = useRoute()
  // 判断当前是否在联系页面
  const isContactPage = computed(() => route.path.endsWith('/contact'))
</script>

<template>
  <UApp
    :locale="currentLocale"
    :toaster="appConfig.toaster"
  >
    <div class="min-h-screen flex flex-col">
      <NuxtLoadingIndicator />
      <TheHeader />
      <TheBanner />
      <main class="flex-1 px-[var(--main-padding-x)] py-[var(--main-padding-y)]">
        <NuxtPage />
        <div v-if="!isContactPage">
          <USeparator class="mt-8 mb-8" />
          <ContactForm layout="horizontal" />
        </div>
        <!-- 底部链接组 -->
        <USeparator class="mt-8 mb-8" />
        <FooterLinks />
      </main>
      <TheFooter />
      <TheSocialBar />
    </div>
  </UApp>
  <Analytics />
  <SpeedInsights />
</template>
