// LanguageOptions.ts
import en from "./en";

export type TLanguageKeys = keyof typeof en;

const LanguageOptions: Record<TLanguageKeys, TLanguageKeys> = Object.keys(en).reduce((object, key) => {
  object[key as TLanguageKeys] = key as TLanguageKeys;
  return object;
}, {} as Record<TLanguageKeys, TLanguageKeys>);

export default LanguageOptions;
