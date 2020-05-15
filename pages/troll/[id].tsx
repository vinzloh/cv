import LoadingSpinner from 'components/LoadingSpinner'
import SheetRenderer from 'components/SheetRenderer'
import { findValue } from 'helpers'
import { getSheet } from 'hooks/useSheet'
import { Fragment, useEffect, useState } from 'react'

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
    getSheet(id, 'config', (res) => {
      setPageClassName(findValue(res.data as [], 'className'))
      const taskSheetName = findValue(res.data as [], 'tasks')
      getSheet(id, taskSheetName, (res) =>
        (res.data as Task[]).forEach((task, taskIndex) =>
          getSheet(id, task.transforms as string, (res) =>
            fetch(`/api/sauron`, {
              method: 'POST',
              body: JSON.stringify({ url: task.url, trolls: res.data }),
            })
              .then((r) => r.json())
              .then((sheet: TransformSheet) =>
                setSheets((prev) => {
                  const newSheets = [...prev]
                  newSheets[taskIndex] = sheet
                  return newSheets
                })
              )
          )
        )
      )
    })
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
