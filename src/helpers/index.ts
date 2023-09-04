import find from 'lodash/find'
import type { ParseRemoteConfig } from 'papaparse'

export const findValue = (array: [], key: string) =>
  (find(array, { key }) || ({} as any)).value

export const stripHTML = (d: string) => (d || '').replace(/(<([^>]+)>)/gi, '')

export const papaConfig: Omit<ParseRemoteConfig, 'complete'> = {
  download: true,
  header: true,
  skipEmptyLines: true,
  dynamicTyping: true,
}

export const tryParseJSON = (v: any) => {
  try {
    return JSON.parse(v)
  } catch (error: any) {
    return v
  }
}

export const tryEval = (template = () => {}) => {
  try {
    return template()
  } catch (error: any) {
    return error.toString()
  }
}

export const hasKeys = (o: any) => Object.keys(o || {}).length > 0
