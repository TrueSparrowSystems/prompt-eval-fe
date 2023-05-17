import React from "react";
import styles from "./TestCaseTabs.module.scss";

export default function VariableCell({
  variableName,
  variableValues,
  setVariableValues,
  unsavedChanges,
  setUnsavedChanges,
}) {
  return (
    <div className="pr-[40px]">
      <div className={`${styles.inputStyle} opacity-40 cursor-auto`}>
        {variableName}
      </div>
      <textarea
        className={`${styles.textareaStyle}`}
        placeholder="Define value for your template variable here."
        value={variableValues[variableName] ? variableValues[variableName] : ""}
        onChange={(e) => {
          setVariableValues({
            ...variableValues,
            [variableName]: e.target.value,
          });
          if (!unsavedChanges) setUnsavedChanges(true);
        }}
      />
    </div>
  );
}
