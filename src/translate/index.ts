import { Translation } from "../types";
import ko from "./ko";

export const langs: Translation = {
  ko,
};

const translate = (() => {
  let lang = 'ko';

  function t(key: string, defaultValue?: string): string {
    const keys = key.split('.');

    const translation = langs[lang];
    if (keys.length > 0) {
      let translate = translation;
      for (const key of keys) {
        translate = translate[key];
      }
      return translate || defaultValue || 'TRANSLATION_ERROR';
    }
    return defaultValue || 'TRANSLATION_ERROR';
  }

  t.format = function (key: string, map: Object) {
    const translated = this(key, '');
    Object.entries(map).forEach(([prop, value]) => {
      const regex = new RegExp(`\\$${prop}\\$`, 'g');
      translated.replace(regex, value);
    });
    return translated;
  };

  return t;
})();

export default translate; 