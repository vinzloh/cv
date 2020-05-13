import { useRouter } from 'next/router'

const useBaseUrl = (id?: any) => {
  const router = useRouter()
  return ['1qg2g3E1F1o6cIpt5E6gDh0Ctv-8btBTEY2AYoXJ73eM']
    .map((fallbackId) => id || router.query.id || fallbackId)
    .map(
      (id) =>
        `https://docs.google.com/spreadsheets/d/${id}/gviz/tq?tqx=out:csv&sheet=`
    )[0]
}

export default useBaseUrl
