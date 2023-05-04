import React from "react";
import styles from "./TestCaseTabs.module.scss";

export default function VariableCell({
  variableName,
  variableValues,
  setVariableValues,
}) {
  return (
    <div>
      <div className={`${styles.inputStyle} opacity-40 cursor-auto`}>
        {variableName}
      </div>
      <textarea
        className={`${styles.textareaStyle}`}
        placeholder="Define your template variable value here."
        value={variableValues[variableName] ? variableValues[variableName] : ""}
        onChange={(e) => {
          setVariableValues({
            ...variableValues,
            [variableName]: e.target.value,
          });
        }}
      />
    </div>
  );
}
