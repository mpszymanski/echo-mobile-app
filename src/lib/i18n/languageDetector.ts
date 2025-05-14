import * as Localization from 'expo-localization';
import type { LanguageDetectorModule } from 'i18next';

export const languageDetector: LanguageDetectorModule = {
  type: 'languageDetector',
  init: () => {},
  detect: (): string => {
    const locale = Localization.getLocales().at(0);

    return locale?.languageCode ?? 'en';
  },
  cacheUserLanguage: () => {},
};
