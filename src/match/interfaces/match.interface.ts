export interface MatchListInfo {
  id: number;
  objectId: number;
  status: string;
  state: string;
  stage: string;
  title: string;
  slug: string;
  startDate: string;
  endDate: string;
  startTime: string;
  isCancelled: boolean;
  result: string;
  teams: {team:{isCountry: boolean, country: {name: string}}}[];
  format: string;
  series?: {
    longName: string;
    objectId: number;
  },
  statusText?: string;
  badgeColor: string;
}

export interface MatchDetails {
  matchSquads: unknown;
}