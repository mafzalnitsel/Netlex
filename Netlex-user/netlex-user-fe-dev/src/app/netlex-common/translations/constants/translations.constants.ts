import { SelectItem } from '../../../models/common';
import { LANGUAGE_CODE } from '../constants/translation.constants';

export const LANGUAGES: SelectItem<string>[] = [
  {
    label: 'English',
    value: LANGUAGE_CODE.EN,
    orientation: 'ltr'
  },
  {
    label: 'svenska (Swedish)',
    value: LANGUAGE_CODE.SV,
    orientation: 'ltr'
  }
];
