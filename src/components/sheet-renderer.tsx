import find from 'lodash/find';
import Papa from 'papaparse';
import * as React from 'react';
import 'twind/shim';

import { LoadingSpinner } from '@/components/loading-spinner';
import { findValue, papaConfig, stripHTML } from '@/helpers';
import { useBaseUrl } from '@/hooks/use-base-url';
import { useSheet } from '@/hooks/use-sheet';
import type { GoogleSheet, Hash } from '@/types';

export type SheetRendererProps = {
  id?: string;
  layout?: any; // TODO:
  sheet?: Record<string, []>;
};

export function SheetRenderer(props: SheetRendererProps) {
  const { id, layout, sheet } = props;
  const [stylesheets, setStylesheets] = React.useState<Hash>({});
  const [componentsHash, setComponentsHash] = React.useState<Hash>({});
  const [componentsLayout, setComponentsLayout] = React.useState([]);
  const baseUrl = useBaseUrl(id);

  const getStyles = (key: string, field: string) =>
    find(stylesheets[key] as [], { key: field });

  const getStylesClassName = (key: string, field: string) =>
    (getStyles(key, field) || ({} as any)).className;

  const config = useSheet(id, '_config').data as [];
  const page = findValue(config, 'page');

  React.useEffect(() => {
    if (!config) return;
    if (sheet && !layout) {
      const [defaultComponent] = Object.keys(sheet);
      setComponentsLayout([{ component: defaultComponent }] as any);
    } else {
      const page = layout || findValue(config, 'page');
      Papa.parse(baseUrl + `${page}.layout`, {
        ...papaConfig,
        complete: (results: any) => setComponentsLayout(results.data),
      });
      Papa.parse(baseUrl + `${page}.css`, {
        ...papaConfig,
        complete: (results: any) =>
          setStylesheets((prev) => ({ ...prev, [page]: results.data })),
      });
    }
  }, [baseUrl, config, layout, sheet]);

  React.useEffect(() => {
    componentsLayout.forEach((row: any) => {
      const sheetName = row.component;
      const data = sheet?.[sheetName] as any[];
      if (data?.length > 0) {
        setComponentsHash((prev) => ({
          ...prev,
          [sheetName]: {
            meta: { fields: Object.keys(data[0]) },
            data,
          } as GoogleSheet,
        }));
      } else {
        Papa.parse(baseUrl + sheetName, {
          ...papaConfig,
          complete: (results) =>
            setComponentsHash((prev) => ({ ...prev, [sheetName]: results })),
        });
      }

      Papa.parse(baseUrl + `${sheetName}.css`, {
        ...papaConfig,
        complete: (results: any) =>
          setStylesheets((prev) => ({ ...prev, [sheetName]: results.data })),
      });
    });
  }, [baseUrl, componentsLayout, sheet]);

  return (
    <>
      <span
        className={getStylesClassName(page, '_container')}
        style={getStyles(page, '_container') as React.CSSProperties}
      >
        {componentsLayout.map(({ component: key }: any) => {
          const component = componentsHash[key] as GoogleSheet;
          return (
            <React.Fragment key={key}>
              {component ? (
                <section
                  className={getStylesClassName(key, '_container')}
                  style={getStyles(key, '_container') as React.CSSProperties}
                >
                  {component.data.map((row, index) => (
                    <div
                      key={index}
                      className={getStylesClassName(key, '_row')}
                      style={getStyles(key, '_row') as React.CSSProperties}
                    >
                      {component.meta.fields
                        .filter((field) => !field.includes('!') && !!row[field])
                        .map((field, i) => {
                          const item = `${row[field]}`;
                          const allowHTML = ['img', 'a'];
                          const fieldMatch: any = field.match(/<([a-z]+)>/);
                          const hasHTML =
                            fieldMatch && allowHTML.includes(fieldMatch[1]);
                          const isImage =
                            fieldMatch?.[1] === 'img' &&
                            (item.includes('://') || item.includes('base64'));
                          const isLink =
                            fieldMatch?.[1] === 'a' && item.includes('://');
                          const isMultiLine = item.includes('\n\n');
                          return React.createElement(
                            hasHTML ? fieldMatch[1] : 'div',
                            {
                              key: i,
                              style: getStyles(key, field),
                              className: getStylesClassName(key, field),
                              ...(isImage
                                ? ({
                                    src: item,
                                    alt: stripHTML(field),
                                  } as React.ComponentProps<'img'>)
                                : {}),
                              ...(isLink
                                ? ({
                                    href: item,
                                    target: '_blank',
                                    rel: 'noopener noreferrer',
                                  } as React.ComponentProps<'a'>)
                                : {}),
                            },
                            isImage
                              ? undefined
                              : (isLink && stripHTML(field)) ||
                                  (isMultiLine &&
                                    item.split('\n\n').map((p: any, i: any) => (
                                      <div
                                        key={i}
                                        className={getStylesClassName(
                                          key,
                                          field,
                                        )}
                                      >
                                        {p}
                                      </div>
                                    ))) ||
                                  item,
                          );
                        })}
                    </div>
                  ))}
                </section>
              ) : (
                <LoadingSpinner />
              )}
            </React.Fragment>
          );
        })}
      </span>
    </>
  );
}
