import { Hash, GoogleSheet } from 'definitions'
import { papaConfig } from 'helpers'
import useBaseUrl, { getBaseUrl } from 'hooks/useBaseUrl'
import Papa from 'papaparse'
import { useEffect, useState } from 'react'

export const getSheet = (id: string, name: string) =>
  new Promise<GoogleSheet>((resolve) =>
    Papa.parse<GoogleSheet>(getBaseUrl(id) + name, {
      ...papaConfig,
      complete: (res: any) => resolve(res),
    })
  )

export default function useSheet(name: string = ''): Hash {
  const [sheet, setSheet] = useState({})
  const baseUrl = useBaseUrl()
  useEffect(() => {
    if (name.length === 0) return setSheet({})
    let isMounted = true
    Papa.parse(baseUrl + name, {
      ...papaConfig,
      complete: (results) => isMounted && setSheet(results),
    })
    return () => {
      isMounted = false
    }
  }, [baseUrl, name])
  return name.length === 0 ? {} : sheet
}
