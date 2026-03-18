// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from 'path'

export default defineNuxtConfig({
  app: {
    head: {
      meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/images/favicon.svg' },
        {
          rel: 'stylesheet',
          href: 'https://font.sec.miui.com/font/css?family=MiSans:400,500,700:MiSans',
        },
        {
          rel: 'stylesheet',
          href: 'https://cdn-font.hyperos.mi.com/font/css?family=MiSans_VF:VF:Chinese_Simplify,Latin&display=swap',
          as: 'style',
        },
      ],
    },
  },
  devtools: { enabled: true },
  modules: [
    '@nuxt/ui',
    '@nuxt/eslint',
    '@nuxtjs/i18n',
    '@nuxt/icon',
    '@nuxt/image',
    '@stefanobartoletti/nuxt-social-share',
    '@nuxtjs/seo',
    'nuxt-gtag',
  ],
  image: {
    provider: 'aliyun',
    aliyun: { baseURL: 'https://img.goodwindpower.com' },
  },
  // image: {
  //   provider: 'imagekit',
  //   imagekit: { baseURL: 'https://ik.imagekit.io/xdsm5bbjz' },
  // },
  // image: {
  //   provider: 'static',
  //   dir: 'images',
  // },
  css: ['@/assets/css/main.css'],
  ui: {
    fonts: false,
  },
  i18n: {
    baseUrl: 'https://goodwindpower.com',
    vueI18n: './i18n.config.ts',
    defaultLocale: 'zh',
    strategy: 'prefix',
    skipSettingLocaleOnNavigate: false,
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
      fallbackLocale: 'zh',
    },
    bundle: {
      optimizeTranslationDirective: false,
    },
    locales: [
      { code: 'zh', iso: 'zh-CN', name: '简体中文', dir: 'ltr' },
      { code: 'en', iso: 'en-US', name: 'English', dir: 'ltr' },
      { code: 'ru', iso: 'ru-RU', name: 'Русский', dir: 'ltr' },
      { code: 'vi', iso: 'vi-VN', name: 'Tiếng Việt', dir: 'ltr' },
      { code: 'ar', iso: 'ar-SA', name: 'العربية', dir: 'rtl' },
      { code: 'es', iso: 'es-ES', name: 'Español', dir: 'ltr' },
    ],
  },
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: '2025-04-24',
  icon: {
    customCollections: [
      {
        prefix: 'custom',
        dir: './app/assets/icons',
      },
    ],
    mode: 'local',
    clientBundle: {
      includeCustomCollections: true,
    },
  },
  components: [
    {
      path: '@/components',
      pathPrefix: false,
    },
  ],
  build: {
    transpile: ['zod'],
  },
  alias: {
    '@': resolve(__dirname, './app'),
    '~': resolve(__dirname, './'),
  },
  socialShare: {
    baseUrl: 'https://test.goodwindpower.com/', // required!
    // other optional module options
  },
  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000',
      isDev: true,
    },
  },
  vite: {
    build: {
      sourcemap: process.env.NODE_ENV === 'development',
      emptyOutDir: true,
      cssCodeSplit: false,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor'
            }
          },
        },
      },
    },
    css: {
      devSourcemap: process.env.NODE_ENV === 'development',
    },
    optimizeDeps: {
      force: true,
      include: ['vue', 'vue-router', '@vue/runtime-core', '@vue/reactivity', '@vueuse/core', 'zod', '@vue/devtools-core', '@vue/devtools-kit', '@vercel/analytics/nuxt', '@vercel/speed-insights/nuxt'],
      exclude: ['@nuxt/ui', '@stefanobartoletti/nuxt-social-share'],
    },
  },
  site: {
    url: 'https://goodwindpower.com',
    name: 'Good Wind Power',
  },
  gtag: {
    id: 'G-QX6RXED7GF',
  },
})
