import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import En from '@/public/locales/en.json'; 
import Zh from '@/public/locales/zh-CN.json'; 

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: En
      },
      zh: {
        translation: Zh
      },
    },
    react: {
      useSuspense: true
    },
    fallbackLng: 'en',
    preload: ['en'],
    keySeparator: false,
    // cleanCode: true,
    interpolation: { escapeValue: false }
  })
export default i18next
