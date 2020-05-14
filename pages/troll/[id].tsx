import SheetRenderer from 'components/SheetRenderer'
import { Hash } from 'definitions'
import { getArrayValue, hasKeys } from 'helpers'
import useSheet from 'hooks/useSheet'
import fetch from 'isomorphic-unfetch'
import { Fragment, useEffect, useState } from 'react'
import LoadingSpinner from 'components/LoadingSpinner'

interface Task {
  url: string
  transforms: string
  layout: string
}

export default function Troll() {
  const config = useSheet('config').data as []
  const [tasks, setTasks] = useState<Task[]>([])
  const [transformsHash, setTransformsHash] = useState<Hash>({})

  const [tasksUrl, setTasksUrl] = useState('')
  useEffect(() => {
    if (config) setTasksUrl(getArrayValue(config, 'tasks'))
  }, [config])

  const tasksResponseData = useSheet(tasksUrl).data as []
  useEffect(() => {
    if (tasksResponseData) setTasksToPrep(tasksResponseData)
  }, [tasksResponseData])

  const [transformUrl, setTransformUrl] = useState('')
  const [tasksToPrep, setTasksToPrep] = useState<Task[]>([])
  useEffect(() => {
    if (tasksToPrep.length === 0) {
      if (hasKeys(transformsHash)) setTasks(tasksResponseData)
      return
    }
    setTransformUrl(tasksToPrep[0].transforms)
  }, [tasksToPrep, transformsHash, tasksResponseData])

  const transforms = useSheet(transformUrl).data as []
  useEffect(() => {
    if (!transforms || transformUrl.length === 0) return
    setTransformsHash((prev) => ({ ...prev, [transformUrl]: transforms }))
    setTransformUrl('')
    setTasksToPrep((prev) =>
      prev.filter((task) => task.transforms !== transformUrl)
    )
  }, [transforms, transformUrl, setTransformUrl, transformsHash])

  const [sheets, setSheets] = useState<any[]>([])

  useEffect(() => {
    if (tasks.length === 0 || sheets.length > 0) return
    if (tasks.some((task) => !transformsHash[task.transforms])) return

    console.group(`tasks`)
    console.table(tasks)
    console.groupEnd()

    tasks.forEach((task: Task, index) =>
      fetch(`/api/sauron`, {
        method: 'POST',
        body: JSON.stringify({
          url: task.url,
          trolls: transformsHash[task.transforms as any],
        }),
      })
        .then((r) => r.json())
        .then((sheet) =>
          setSheets((prev) => {
            const newSheets = [...prev]
            newSheets[index] = sheet
            return newSheets
          })
        )
    )
  }, [tasks, sheets, tasksUrl, config, transformsHash])

  return (
    <section data-page className={getArrayValue(config, 'className')}>
      {sheets.length === 0 ? (
        <LoadingSpinner />
      ) : (
        sheets.map((sheet, i) => (
          <Fragment key={i}>
            {sheet ? (
              <SheetRenderer sheet={sheet} layout={tasks[i].layout} />
            ) : (
              <LoadingSpinner />
            )}
          </Fragment>
        ))
      )}
    </section>
  )
}

export async function getStaticProps({ params }: any) {
  return { props: { id: params.id } }
}

export async function getStaticPaths() {
  return { paths: [], fallback: true }
}
