import Papa from 'papaparse';
import * as React from 'react';

import { papaConfig } from '@/helpers';
import { getBaseUrl, useBaseUrl } from '@/hooks/use-base-url';
import type { GoogleSheet, SheetStyles } from '@/types';

export const getSheet = (id: string, name: string) =>
  new Promise<GoogleSheet>((resolve) =>
    Papa.parse<GoogleSheet>(getBaseUrl(id) + name, {
      ...papaConfig,
      complete: (res) => resolve(res as unknown as GoogleSheet),
    }),
  );

export function useSheet(
  id: string | undefined = undefined,
  name: string = '',
): SheetStyles {
  const [sheet, setSheet] = React.useState({});
  const baseUrl = useBaseUrl(id);

  React.useEffect(() => {
    if (name.length === 0) return setSheet({});
    let isMounted = true;
    Papa.parse(baseUrl + name, {
      ...papaConfig,
      complete: (results) => isMounted && setSheet(results),
    });
    return () => {
      isMounted = false;
    };
  }, [baseUrl, name]);
  return name.length === 0 ? {} : sheet;
}
