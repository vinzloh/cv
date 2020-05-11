import { Hash } from 'definitions'
import { papaConfig } from 'helpers'
import useBaseUrl from 'hooks/useBaseUrl'
import Papa from 'papaparse'
import { useEffect, useState } from 'react'

export default function useSheet(name: string = ''): Hash {
  const [sheet, setSheet] = useState({})
  const baseUrl = useBaseUrl()
  useEffect(() => {
    if (name.length === 0) return
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
