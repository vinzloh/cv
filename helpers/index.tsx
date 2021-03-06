import find from 'lodash/find'

export const findValue = (array: [], key: string) =>
  (find(array, { key }) || ({} as any)).value

export const stripHTML = (d: string) => (d || '').replace(/(<([^>]+)>)/gi, '')

export const papaConfig = {
  download: true,
  header: true,
  skipEmptyLines: true,
  dynamicTyping: true,
}

export const tryParseJSON = (v: any) => {
  try {
    return JSON.parse(v)
  } catch (error) {
    return v
  }
}

export const tryEval = (template = () => {}) => {
  try {
    return template()
  } catch (error) {
    return error.toString()
  }
}

export const hasKeys = (o: any) => Object.keys(o || {}).length > 0
