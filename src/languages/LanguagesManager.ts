import { I18n } from "i18n-js";
import en from "./en";
import vi from "./vi";
import { TLanguageKeys } from "./LanguageOptions";

export enum EAvailableLanguages {
  "vi" = "vi",
  "en" = "en",
}

class LanguagesManager {
  private configuredI18: I18n;

  constructor() {
    this.configuredI18 = new I18n();
    this.configuredI18.translations = { en, vi };
    this.configuredI18.defaultLocale = EAvailableLanguages.en;
    this.configuredI18.locale = EAvailableLanguages.en;
  }

  public changeLanguage(language: EAvailableLanguages) {
    this.configuredI18.locale = language;
  }

  public translate(key: TLanguageKeys) {
    return this.configuredI18.t(key);
  }
}

export default new LanguagesManager();
