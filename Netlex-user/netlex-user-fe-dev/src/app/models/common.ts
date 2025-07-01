import { SearchUrgency } from '../services/search.dto';

export interface SelectItem<T> {
  value: T;
  label: string;
  orientation?: string;
}

export function getUrgencyItems(): SelectItem<SearchUrgency>[] {
  return [
    {label: 'SECOND_ITERATION.URGENT_UNDER_WEEK', value: 'URGUNDR1WEEK'},
    {label: 'SECOND_ITERATION.UNDER_MONTH', value: 'UNDR1MONTH'},
    {label: 'SECOND_ITERATION.UNDER_6_MONTHS', value: 'UNDR6MONTH'},
    {label: 'SECOND_ITERATION.UNDER_YEAR', value: 'UNDR12MONTH'},
    {label: 'SECOND_ITERATION.MOREDHAN_YEAR', value: 'OVER1YEAR'}
  ];
}
