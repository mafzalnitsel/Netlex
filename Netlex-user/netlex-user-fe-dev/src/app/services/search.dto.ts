export enum SearchType {
  REQUEST = 'request',
  CATALYST = 'catalyst',
  INTEREST = 'interest',
  STORY = 'story'
}

// TODO: [BGren] Rename values of timespan/urgency, or it's even better to provide urgency as number of days for which search should be
//       performed. In this case we'll be able to change something urgency options easily without any change on API side.
export type SearchUrgency =
  'URGUNDR1WEEK' |
  'UNDR1MONTH' |
  'UNDR6MONTH' |
  'UNDR12MONTH' |
  'OVER1YEAR';
