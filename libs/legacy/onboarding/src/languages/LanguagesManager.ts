import I18n from "i18n-js";
import en from "@src/languages/en.json";
import vi from "@src/languages/vi.json";

export enum EAvailableLanguages {
  "vi" = "vi",
  "en" = "en",
}

export default class LanguagesManager {
  public configuredI18 = I18n;

  constructor() {
    this.configuredI18.fallbacks = true;
    this.configuredI18.defaultLocale = EAvailableLanguages.en;
    this.configuredI18.translations = { en, vi };
  }
}
