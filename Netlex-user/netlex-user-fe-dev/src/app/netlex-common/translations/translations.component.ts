import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LANGUAGE_STORAGE_KEY } from './constants/translation.constants';
import { LANGUAGES } from './constants/translations.constants';
import { takeUntil } from 'rxjs/operators';
import { autoUnsubscribeMixin } from '../../helpers/auto-unsubscribe.mixin';
import {AuthService} from '../../services/auth.service';
import {StorageService} from '../../services/storage-service';

@Component({
  selector: 'app-translations',
  templateUrl: './translations.component.html',
  styleUrls: ['./translations.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TranslationsComponent extends autoUnsubscribeMixin() implements OnInit {
  languages = LANGUAGES;
  currentLang: string;

  constructor(private translate: TranslateService, private storage: StorageService,
              private authService: AuthService) {
    super();
  }

  ngOnInit(): void {
    this.currentLang = this.translate.currentLang;
  }

  setTranslation(language: string): void {
    this.storage.set<string>(LANGUAGE_STORAGE_KEY, language);
    this.translate.use(language);

    const selected = this.languages.find(lng => lng.value === language);
    document.dir = selected.orientation;
    const email = this.storage.get('user');
    if (email) {
    }
  }

  trackBy(index: number): number {
    return index;
  }
}
