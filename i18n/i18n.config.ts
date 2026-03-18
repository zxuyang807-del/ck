export default defineI18nConfig(async () => ({
  legacy: false,
  locale: 'zh',
  locales: ['zh', 'en', 'ru', 'vi', 'ar', 'es'],
  messages: {
    zh: await import('./locales/zh').then((m) => m.default),
    en: await import('./locales/en').then((m) => m.default),
    ru: await import('./locales/ru').then((m) => m.default),
    vi: await import('./locales/vi').then((m) => m.default),
    ar: await import('./locales/ar').then((m) => m.default),
    es: await import('./locales/es').then((m) => m.default),
  },
}))
