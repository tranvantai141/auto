import { I18n } from 'i18n-js';
import { getDefaultLanguage } from 'src/common/utils/DefaultLanguage';
import en from './en';
import vt from './vt';

const i18n = new I18n({ en, vt });
i18n.defaultLocale = getDefaultLanguage();
i18n.locale = getDefaultLanguage();

export function translate(key: string, dynamicText?: object) {
  return i18n.t(key, dynamicText);
}
