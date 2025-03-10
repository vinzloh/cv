import find from 'lodash/find';
import type { ParseRemoteConfig } from 'papaparse';

import type { FieldValues } from '@/types';

export const findValue = (array: FieldValues[], key: string) =>
  find(array, { key })?.value;

export const stripHTML = (d: string) => (d || '').replace(/(<([^>]+)>)/gi, '');

export const papaConfig: Omit<ParseRemoteConfig, 'complete'> = {
  download: true,
  header: true,
  skipEmptyLines: true,
  dynamicTyping: true,
};

export const tryParseJSON = (v: string) => {
  try {
    return JSON.parse(v);
  } catch {
    return v;
  }
};

export const tryEval = (template: () => string) => {
  try {
    return template();
  } catch (error) {
    return (error as Error).toString();
  }
};

export const hasKeys = (o: object) => Object.keys(o || {}).length > 0;
