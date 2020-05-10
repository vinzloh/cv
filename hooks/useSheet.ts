import { Hash } from "definitions";
import { papaConfig } from "helpers";
import useBaseUrl from "hooks/useBaseUrl";
import Papa from "papaparse";
import { useEffect, useState } from "react";

export default function useSheet(name: string) {
  const [sheet, setSheet] = useState<Hash>({});
  const baseUrl = useBaseUrl();
  useEffect(() => {
    let isMounted = true;
    Papa.parse(baseUrl + name, {
      ...papaConfig,
      complete: (results: any) => isMounted && setSheet(results),
    });
    return () => {
      isMounted = false;
    };
  }, [baseUrl]);
  return sheet;
}
