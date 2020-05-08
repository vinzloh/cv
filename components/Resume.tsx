import { Fragment, useEffect, useState } from "react";
import Papa from "papaparse";
import kebabCase from "lodash/kebabCase";

import LoadingSpinner from "components/LoadingSpinner";
import styles from "./Resume.module.scss";

interface Resume {
  meta: { fields: string[] };
  data: any[];
}

enum Styles {
  Role = "font-semibold text-lg",
  Company = "text-black text-sm",
  Description = "text-xs",
  "Start Date" = "text-gray-500 text-sm",
  "End Date" = "text-gray-500 text-sm",
}

type StylesStrings = keyof typeof Styles;

export default function Resume({ onLoad = () => {} }) {
  const [resume, SetResume] = useState<Resume>();

  useEffect(() => {
    const url =
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vTuXEjEqjqhbMUvSWC8oxzd1ADln0FHMoFyKnGWPjQxaSLEwZSkObztPNb8IqVV-EgswYRVKP5WR1wX/pub?output=csv";

    Papa.parse(url, {
      download: true,
      header: true,
      complete: function (results: Resume) {
        var data = results.data;
        console.log("results:", results);
        onLoad();
        SetResume(results);
      },
    });
  }, []);

  const dataField = (field: string) => ({ [`data-${kebabCase(field)}`]: true });
  const isUrl = (d: string) => d.includes("://");

  const Row = (props: any) => (
    <div className={`pb-4 mb-4 border-b ${styles.row}`} {...props} />
  );
  const CompanyLogo = (props: any) => (
    <img
      {...dataField(props.field)}
      className={styles.companyLogo}
      src={props.src}
      alt={props.field}
    />
  );
  const Descriptions = (props: any) =>
    props.items.map((p: any, i: any) => <Description key={i}>{p}</Description>);

  const Description = ({ children }: any) => (
    <p className={`${Styles.Description} mb-3 last:mb-0`}>{children}</p>
  );

  return (
    <section className='shadow-lg flex flex-col items-center max-w-2xl mx-auto py-10 px-12'>
      {!!resume
        ? resume.data.map((row, index) => (
            <Row key={index}>
              {resume.meta.fields.map((field, i) => {
                const item = row[field];
                return (
                  <Fragment key={i}>
                    {(isUrl(item) && (
                      <CompanyLogo field={field} src={item} />
                    )) || (
                      <div
                        {...dataField(field)}
                        className={Styles[field as StylesStrings]}
                      >
                        {item.includes("\n\n") ? (
                          <Descriptions items={item.split("\n\n")} />
                        ) : (
                          item
                        )}
                      </div>
                    )}
                    <div data-date-divider className='text-gray-500'>
                      -
                    </div>
                  </Fragment>
                );
              })}
            </Row>
          ))
        : <LoadingSpinner /> || resume}
    </section>
  );
}
