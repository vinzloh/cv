import { useRouter } from "next/router";

const useBaseUrl = (id?: any) =>
  ["1qg2g3E1F1o6cIpt5E6gDh0Ctv-8btBTEY2AYoXJ73eM"]
    .map((fallbackId) => id || useRouter().query.id || fallbackId)
    .map(
      (id) =>
        `//docs.google.com/spreadsheets/d/${id}/gviz/tq?tqx=out:csv&sheet=`
    )[0];

export default useBaseUrl;
