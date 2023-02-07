// useTranslation.js
import { useRouter } from 'next/router';
import En from '@/public/locales/en.json'; // 英文语言包，也就是上面的en.jsx
import Zh from '@/public/locales/zh.json'; // 中文语言包，也就是上面的zh.jsx
import { useCallback } from 'react';

const LanguageMap = {
  'en-US': En,
  'zh-CN': Zh,
};


export function useTranslation () {
  const router = useRouter();
  const jsonFun = useCallback((key, params = {}) => {
      // console.log(router)
      // console.log(key)
      if (!router) return key; 
      let value = LanguageMap[router.locale][key]; 
      // console.log(value)
      if (!key || !value) return key; 
      
      Object.keys(params).forEach(item => {
        value = value.replace(new RegExp(`{${item}}`, 'g'), params[item]);
      });
      return value;
    },
    [router.locale]
  );
  return {
    t: jsonFun,
  };
}
