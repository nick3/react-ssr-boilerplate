/*
 *
 * LanguageProvider constants
 *
 */

// let _window;
// if (typeof window !== 'undefined') {
//   _window = window;
// }

export const CHANGE_LOCALE = 'app/LanguageToggle/CHANGE_LOCALE';

export const DEFAULT_LOCALE = 'zh';
// (() => {
//   if (_window) {
//     let lang = navigator.language || navigator.userLanguage; // 常规浏览器语言和IE浏览器
//     lang = lang && lang.substr(0, 2); // 截取lang前2位字符
//     if (!lang) {
//       return 'zh';
//     } else if (lang === 'zh') {
//       return 'zh';
//     }
//     return 'en';
//   }
//   return 'en';
// })();
