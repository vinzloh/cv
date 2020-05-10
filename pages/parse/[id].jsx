import useSheet from "hooks/useSheet";
import * as _ from "lodash";
import { useEffect, useState } from "react";

export default function Parse() {
  const div = useSheet("div").data;
  const transforms = useSheet("transforms").data;
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!(transforms && div)) return;
    console.table(div);
    console.table(transforms);

    const tryParseJSON = (v) => {
      try {
        return JSON.parse(v);
      } catch (error) {
        return v;
      }
    };

    const tryEval = (o, match) => {
      try {
        return _.template(`<%= ${match} %>`)(o);
      } catch (error) {
        return error.toString();
      }
    };

    const evalMatch = (o, match) => {
      console.group(match);
      console.log(`o:`, o);
      let r = tryParseJSON(tryEval(o, match));
      console.log(`eval:`, r);
      console.groupEnd();
      return r;
    };

    const transformBy = {
      reduce: ({ type, match, array }) =>
        _[type](array, (acc, val) => evalMatch({ acc, val }, match)),
      default: ({ type, match, array }) =>
        _[type](array, (o) => evalMatch(o, match)),
    };

    setData(
      transforms
        .filter((t) => !t.type.includes("!"))
        .reduce(
          (array, { type, match }) =>
            (transformBy[type] || transformBy.default)({ type, match, array }),
          div
        )
    );
  }, [transforms, div]);

  return <pre>{JSON.stringify(data, null, 2)} </pre>;
}
