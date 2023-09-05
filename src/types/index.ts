export interface Hash<T = object> {
  [key: string]: T;
}

export interface GoogleSheet {
  meta: { fields: string[] };
  data: any[];
}
