import React, { useEffect, useState } from "react";
import styles from "./TestCaseTabs.module.scss";

export default function AcceptableResultCell({
    acceptedResult
}) {

    const [result,setResult] = useState(acceptedResult);

  return (
    <div>
      <textarea
        className={`${styles.textareaStyle}`}
        placeholder="Define template variables in {‘variable_name’} format within the prompt."
        value={result}
        onChange={(e) => {
          setResult(e.target.value);
        }}
      />
    </div>
  );
}
