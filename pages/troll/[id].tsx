import SheetRenderer from 'components/SheetRenderer'
import { Hash } from 'definitions'
import { getArrayValue } from 'helpers'
import useSheet from 'hooks/useSheet'
import fetch from 'isomorphic-unfetch'
import { useEffect, useState } from 'react'

export default function Troll() {
  const config = useSheet('config').data as []
  const [tasksUrl, setTasksSheet] = useState('')
  const tasks = useSheet(tasksUrl).data as []
  const [transformUrl, setTransformUrl] = useState('')
  const transforms = useSheet(transformUrl).data as []

  useEffect(() => {
    if (!config) return
    console.table(config)
  }, [config])

  useEffect(() => {
    if (!config) return
    setTasksSheet(getArrayValue(config, 'tasks'))
  }, [config])

  useEffect(() => {
    if (!tasks) return
    // TODO: transforms of each row
    const [firstTask] = tasks as any
    setTransformUrl((firstTask || ({} as any)).transforms)
  }, [tasks])

  const [results, setResults] = useState([])

  useEffect(() => {
    if (!tasks && !transforms) return

    console.group(`tasks ${tasksUrl}`)
    console.table(tasks)
    console.groupEnd()

    tasks.forEach((task: Hash) => {
      fetch(`/api/sauron`, {
        method: 'POST',
        body: JSON.stringify({
          url: task.url,
          trolls: transforms,
        }),
      })
        .then((r) => r.json())
        .then((res: any) => {
          if (res.status === false) return
          setResults((prev) => prev.concat(res))
        })
    })
  }, [tasks, tasksUrl, config, transforms])

  return (
    <>
      {results.map((result, i) => (
        <SheetRenderer key={i} layout={result} />
      ))}
    </>
  )
}

export async function getStaticProps({ params }: any) {
  return { props: { id: params.id } }
}

export async function getStaticPaths() {
  return { paths: [], fallback: true }
}
