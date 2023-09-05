import * as React from 'react';

import { LoadingSpinner } from '@/components/loading-spinner';
import { SheetRenderer } from '@/components/sheet-renderer';
import { findValue } from '@/helpers';
import { getSheet } from '@/hooks/use-sheet';
import type { FieldValues, GoogleSheet } from '@/types';

interface Task extends FieldValues {
  url: string;
  transforms: string;
  layout: string;
}

interface TransformSheet {
  [key: string]: [];
}

export type TrollProps = {
  id?: string;
};

export function Troll({ id }: TrollProps) {
  const [sheets, setSheets] = React.useState<TransformSheet[]>([]);
  const [pageClassName, setPageClassName] = React.useState('');

  React.useEffect(() => {
    if (!id) return;

    const setPageStyle = (res: GoogleSheet) => {
      setPageClassName(findValue(res.data, 'className') ?? '');
      return res;
    };

    const getTasksSheetName = (res: GoogleSheet) =>
      findValue(res.data as [], 'tasks') ?? '';

    const getTasks = (taskSheetName: string) => getSheet(id, taskSheetName);
    const toTaskArray = (res: GoogleSheet) => res.data as Task[];

    const getTaskTransforms = (task: Task) => getSheet(id, task.transforms);

    const fetchData = (task: Task) => (res: GoogleSheet) =>
      fetch(`/api/sauron`, {
        method: 'POST',
        body: JSON.stringify({ url: task.url, trolls: res.data }),
      }).then((r) => r.json());

    const updateSheets = (taskIndex: number) => (sheet: TransformSheet) =>
      setSheets((prev) => {
        const newSheets = [...prev];
        newSheets[taskIndex] = sheet;
        return newSheets;
      });

    getSheet(id, 'config')
      .then(setPageStyle)
      .then(getTasksSheetName)
      .then(getTasks)
      .then(toTaskArray)
      .then((tasks: Task[]) =>
        tasks.forEach((task, index) =>
          getTaskTransforms(task)
            .then(fetchData(task))
            .then(updateSheets(index)),
        ),
      );
  }, [id]);

  return (
    <section data-page className={pageClassName}>
      {sheets.length === 0 ? (
        <LoadingSpinner />
      ) : (
        sheets.map((sheet, i) => (
          <React.Fragment key={i}>
            {sheet ? (
              <SheetRenderer id={id} sheet={sheet} />
            ) : (
              <LoadingSpinner />
            )}
          </React.Fragment>
        ))
      )}
    </section>
  );
}
