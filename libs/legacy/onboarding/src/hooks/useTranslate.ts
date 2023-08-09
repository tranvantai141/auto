import LanguagesManager, { EAvailableLanguages } from "@src/languages/LanguagesManager";
import { ELanguageOptions } from "@src/models/LanguageOptionsModel";

const useTranslate = () => {
  const languageInstance = new LanguagesManager();
  languageInstance.configuredI18.locale = EAvailableLanguages.en;
  const translate = (
    scope: ELanguageOptions,
    options: I18n.TranslateOptions = {
      defaultValue: "ERROR TRANSLATION",
    },
  ) => languageInstance.configuredI18.t(scope, options);

  return translate;
};

export default useTranslate;
