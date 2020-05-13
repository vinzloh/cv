import useSheet from 'hooks/useSheet'
import * as _ from 'lodash'
import { useEffect, useState } from 'react'
import { tryParseJSON, tryEval } from 'helpers'

export default function Parse() {
  const div = useSheet('div').data
  const transforms = useSheet('transforms').data
  const [data, setData] = useState([])

  useEffect(() => {
    if (!(transforms && div)) return
    console.table(div)
    console.table(transforms)

    const evalMatch = (o, match) => {
      console.group(match)
      console.log(`o:`, o)
      let r = tryParseJSON(tryEval(() => _.template(`<%= ${match} %>`)(o)))
      console.log(`eval:`, r)
      console.groupEnd()
      return r
    }

    const transformBy = {
      reduce: ({ type, match, array }) =>
        _[type](array, (acc, val) => evalMatch({ acc, val }, match)),
      default: ({ type, match, array }) =>
        _[type](array, (o) => evalMatch(o, match)),
    }

    setData(
      transforms
        .filter((t) => !t.type.includes('!'))
        .reduce(
          (array, { type, match }) =>
            (transformBy[type] || transformBy.default)({ type, match, array }),
          div
        )
    )
  }, [transforms, div])

  /**
   * TODO:
   * output to csv url
   */

  return <pre>{JSON.stringify(data, null, 2)} </pre>
}

export async function getStaticProps({ params }) {
  return { props: { id: params.id } }
}

export async function getStaticPaths() {
  return { paths: [], fallback: true }
}
