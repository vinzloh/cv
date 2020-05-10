export interface Hash<T = {}> {
  [key: string]: T;
}

export interface GoogleSheet {
  meta: { fields: string[] };
  data: any[];
}
