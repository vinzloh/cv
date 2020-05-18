import LoadingSpinner from 'components/LoadingSpinner'
import SheetRenderer from 'components/SheetRenderer'
import { findValue } from 'helpers'
import { getSheet } from 'hooks/useSheet'
import { Fragment, useEffect, useState } from 'react'
import { GoogleSheet } from 'definitions'

interface Task {
  url: string
  transforms: string | []
  layout: string
}

interface TransformSheet {
  [key: string]: []
}

export default function Troll(props: any) {
  const { id } = props
  const [sheets, setSheets] = useState<TransformSheet[]>([])
  const [pageClassName, setPageClassName] = useState('')

  useEffect(() => {
    if (!id) return

    const setPageStyle = (res: GoogleSheet) => {
      setPageClassName(findValue(res.data as [], 'className'))
      return res
    }

    const getTasksSheetName = (res: GoogleSheet) =>
      findValue(res.data as [], 'tasks')

    const getTasks = (taskSheetName: string) => getSheet(id, taskSheetName)
    const toTaskArray = (res: GoogleSheet) => res.data as Task[]

    const getTaskTransforms = (task: Task) =>
      getSheet(id, task.transforms as string)

    const fetchData = (task: Task) => (res: GoogleSheet) =>
      fetch(`/api/sauron`, {
        method: 'POST',
        body: JSON.stringify({ url: task.url, trolls: res.data }),
      }).then((r) => r.json())

    const updateSheets = (taskIndex: number) => (sheet: TransformSheet) =>
      setSheets((prev) => {
        const newSheets = [...prev]
        newSheets[taskIndex] = sheet
        return newSheets
      })

    getSheet(id, 'config')
      .then(setPageStyle)
      .then(getTasksSheetName)
      .then(getTasks)
      .then(toTaskArray)
      .then((tasks: Task[]) =>
        tasks.forEach((task, index) =>
          getTaskTransforms(task)
            .then(fetchData(task))
            .then(updateSheets(index))
        )
      )
  }, [id])

  return (
    <section data-page className={pageClassName}>
      {sheets.length === 0 ? (
        <LoadingSpinner />
      ) : (
        sheets.map((sheet, i) => (
          <Fragment key={i}>
            {sheet ? <SheetRenderer sheet={sheet} /> : <LoadingSpinner />}
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
