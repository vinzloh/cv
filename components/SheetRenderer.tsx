import LoadingSpinner from "components/LoadingSpinner";
import find from "lodash/find";
import Head from "next/head";
import { useRouter } from "next/router";
import Papa from "papaparse";
import React, { CSSProperties, useEffect, useState } from "react";

interface GoogleSheet {
  meta: { fields: string[] };
  data: any[];
}

interface Hash<T = {}> {
  [key: string]: T;
}

export default function SheetRenderer() {
  const [config, setConfig] = useState([]);
  const [stylesheets, setStylesheets] = useState<Hash>({});
  const [componentsHash, setComponentsHash] = useState<Hash>({});
  const [componentsLayout, setComponentsLayout] = useState([]);

  const { query } = useRouter();
  const id = query.id || "1qg2g3E1F1o6cIpt5E6gDh0Ctv-8btBTEY2AYoXJ73eM";

  // https://stackoverflow.com/a/33727897
  const baseUrl = `//docs.google.com/spreadsheets/d/${id}/gviz/tq?tqx=out:csv&sheet=`;
  const papaConfig = { download: true, header: true, skipEmptyLines: true };

  const getConfig = (key: string) =>
    (find(config, { key }) || ({} as any)).value;

  const stripHTML = (d: string) => d.replace(/(<([^>]+)>)/gi, "");

  const getStyles = (key: string, field: string) =>
    find(stylesheets[key] as [], { key: field });

  const getStylesClassName = (key: string, field: string) =>
    (getStyles(key, field) || ({} as any)).className;

  useEffect(() => {
    Papa.parse(baseUrl + "_config", {
      ...papaConfig,
      complete: (results: any) => setConfig(results.data),
    });
  }, [baseUrl]);

  useEffect(() => {
    Papa.parse(baseUrl + "_layout", {
      ...papaConfig,
      complete: (results: any) => setComponentsLayout(results.data),
    });
  }, [baseUrl]);

  useEffect(() => {
    componentsLayout.forEach((row: any) => {
      const component = row.component;
      Papa.parse(baseUrl + component, {
        ...papaConfig,
        complete: (results: GoogleSheet) =>
          setComponentsHash((prev) => ({ ...prev, [component]: results })),
      });

      Papa.parse(baseUrl + `${component}.css`, {
        ...papaConfig,
        complete: (results: any) =>
          setStylesheets((prev) => ({ ...prev, [component]: results.data })),
      });
    });
  }, [baseUrl, componentsLayout]);

  return (
    <>
      <Head>
        <title>{getConfig("title") || "O_o"}</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      {componentsLayout.map(({ component: key }: any) => {
        const component = componentsHash[key] as GoogleSheet;
        return (
          <React.Fragment key={key}>
            {component ? (
              <section className={getStylesClassName(key, "_container")}>
                {component.data.map((row, index) => (
                  <div
                    key={index}
                    className={getStylesClassName(key, "_row")}
                    style={getStyles(key, "_row") as CSSProperties}
                  >
                    {component.meta.fields
                      .filter((field) => !field.includes("!") && !!row[field])
                      .map((field, i) => {
                        const item = row[field];
                        const allowHTML = ["img", "a"];
                        const fieldMatch: any = field.match(/<([a-z]+)>/);
                        const hasHTML =
                          fieldMatch && allowHTML.includes(fieldMatch[1]);
                        const isImage =
                          fieldMatch?.[1] === "img" && item.includes("://");
                        const isLink =
                          fieldMatch?.[1] === "a" && item.includes("://");
                        const isMultiLine = item.includes("\n\n");
                        return React.createElement(
                          hasHTML ? fieldMatch[1] : "div",
                          {
                            key: i,
                            style: getStyles(key, field),
                            className: getStylesClassName(key, field),
                            ...(isImage
                              ? { src: item, alt: stripHTML(field) }
                              : {}),
                            ...(isLink ? { href: item } : {}),
                          },
                          isImage
                            ? undefined
                            : (isLink && stripHTML(field)) ||
                                (isMultiLine &&
                                  item.split("\n\n").map((p: any, i: any) => (
                                    <div
                                      key={i}
                                      className={getStylesClassName(key, field)}
                                    >
                                      {p}
                                    </div>
                                  ))) ||
                                item
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
    </>
  );
}
