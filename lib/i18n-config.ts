// Internationalization configuration for BMAsia website
// Supports 8 languages with English as default

export const locales = ['en', 'th', 'vi', 'ms', 'id', 'ko', 'ja', 'zh'] as const;
export const defaultLocale = 'en' as const;

export type Locale = (typeof locales)[number];

// Native language names for the language switcher
export const localeNames: Record<Locale, string> = {
  en: 'English',
  th: 'ไทย',
  vi: 'Tiếng Việt',
  ms: 'Bahasa Melayu',
  id: 'Bahasa Indonesia',
  ko: '한국어',
  ja: '日本語',
  zh: '简体中文',
};

// Country/region mapping for language detection
// Maps Accept-Language codes to our supported locales
export const languageMapping: Record<string, Locale> = {
  // Thai
  th: 'th',
  'th-TH': 'th',
  // Vietnamese
  vi: 'vi',
  'vi-VN': 'vi',
  // Malay
  ms: 'ms',
  'ms-MY': 'ms',
  'ms-SG': 'ms',
  // Indonesian
  id: 'id',
  'id-ID': 'id',
  // Korean
  ko: 'ko',
  'ko-KR': 'ko',
  // Japanese
  ja: 'ja',
  'ja-JP': 'ja',
  // Chinese (Simplified)
  zh: 'zh',
  'zh-CN': 'zh',
  'zh-SG': 'zh',
  'zh-Hans': 'zh',
  // English variants (explicit mapping to ensure they use English)
  en: 'en',
  'en-US': 'en',
  'en-GB': 'en',
  'en-AU': 'en',
  'en-CA': 'en',
  'en-NZ': 'en',
  'en-SG': 'en',
  'en-HK': 'en',
  'en-PH': 'en',
  'en-IN': 'en',
};

// Helper function to get locale from Accept-Language
export function getLocaleFromAcceptLanguage(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) return defaultLocale;

  // Parse Accept-Language header and find first matching locale
  const languages = acceptLanguage
    .split(',')
    .map((lang) => {
      const [code, quality] = lang.trim().split(';q=');
      return {
        code: code.trim(),
        quality: quality ? parseFloat(quality) : 1,
      };
    })
    .sort((a, b) => b.quality - a.quality);

  for (const { code } of languages) {
    // Try exact match first
    if (languageMapping[code]) {
      return languageMapping[code];
    }
    // Try base language code (e.g., 'th' from 'th-TH')
    const baseCode = code.split('-')[0];
    if (languageMapping[baseCode]) {
      return languageMapping[baseCode];
    }
  }

  // Default to English for all other languages
  return defaultLocale;
}
