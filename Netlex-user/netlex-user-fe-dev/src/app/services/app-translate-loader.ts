import { TranslateLoader, TranslateService } from '@ngx-translate/core';
import { from, Observable } from 'rxjs';
import { LANGUAGE_CODE, LANGUAGE_STORAGE_KEY } from '../netlex-common/translations/constants/translation.constants';
import { LANGUAGES } from '../netlex-common/translations/constants/translations.constants';
import {StorageService} from './storage-service';

export function initTranslation(translate: TranslateService, storage: StorageService): () => void {
  return (): void => {
    const language = storage.get<string>(LANGUAGE_STORAGE_KEY) || LANGUAGE_CODE.SV;
    const languages = LANGUAGES;
    translate.addLangs(Object.values(LANGUAGE_CODE));
    translate.setDefaultLang(LANGUAGE_CODE.SV);
    translate.use(language);

    const selected = languages.find(lng => lng.value === language);
    document.dir = selected?.orientation;
  };
}


export class AppTranslateLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<Dictionary<string>> {
    return from(import(`../../assets/i18n/${lang}.json`));
  }
}
