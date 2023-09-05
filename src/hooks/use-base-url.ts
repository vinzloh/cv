export const getBaseUrl = (
  id: string = '1qg2g3E1F1o6cIpt5E6gDh0Ctv-8btBTEY2AYoXJ73eM',
) => `https://docs.google.com/spreadsheets/d/${id}/gviz/tq?tqx=out:csv&sheet=`;

export const useBaseUrl = (id?: string) => getBaseUrl(id);
