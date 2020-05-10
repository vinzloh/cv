import find from "lodash/find";

export const getArrayValue = (array: [], key: string) =>
  (find(array, { key }) || ({} as any)).value;

export const stripHTML = (d: string) => (d || "").replace(/(<([^>]+)>)/gi, "");

export const papaConfig = {
  download: true,
  header: true,
  skipEmptyLines: true,
  dynamicTyping: true,
};
