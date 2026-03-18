import type { LanguageConfig } from '~/types/locale-type'

export const LANGUAGES: Record<string, LanguageConfig> = {
  zh: {
    native: '中文',
    others: {
      en: '英语',
      ru: '俄语',
      vi: '越南语',
      ar: '阿拉伯语',
      es: '西班牙语',
    },
  },
  en: {
    native: 'English',
    others: {
      zh: 'Chinese',
      ru: 'Russian',
      vi: 'Vietnamese',
      ar: 'Arabic',
      es: 'Spanish',
    },
  },
  ru: {
    native: 'Русский',
    others: {
      en: 'Английский',
      zh: 'Китайский',
      vi: 'Вьетнамский',
      ar: 'Арабский',
      es: 'Испанский',
    },
  },
  vi: {
    native: 'Tiếng Việt',
    others: {
      en: 'Tiếng Anh',
      zh: 'Tiếng Trung',
      ru: 'Tiếng Nga',
      ar: 'Tiếng Ả Rập',
      es: 'Tiếng Tây Ban Nha',
    },
  },
  ar: {
    native: 'العربية',
    others: {
      en: 'الإنجليزية',
      zh: 'الصينية',
      ru: 'الروسية',
      vi: 'الفيتنامية',
      es: 'الإسبانية',
    },
  },
  es: {
    native: 'Español',
    others: {
      en: 'Inglés',
      zh: 'Chino',
      ru: 'Ruso',
      vi: 'Vietnamita',
      ar: 'Árabe',
    },
  },
}
