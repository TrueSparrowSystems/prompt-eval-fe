import React, { useState } from "react";
import styles from "../ExperimentsDetails.module.scss";
import NewChat from "./NewChat";

function CreatePromptTemplate() {
  const [templateName, setTemplateName] = useState("Untitled Template");
  return (
    <div className={`${styles.experimentBox}`}>
      <div className="flex items-center gap-[20px]">
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.7787 5.5575L10.7212 4.5L6.22119 9L10.7212 13.5L11.7787 12.4425L8.34369 9L11.7787 5.5575Z"
            fill="black"
            fillOpacity="0.6"
          />
        </svg>
        <div className="text-[14px] opacity-60 py-[25px]">Cellular exp 1</div>
      </div>
      <input
        className="text-[20px] font-bold opacity-60 outline-none pb-[25px]"
        type="text"
        value={templateName}
        onChange={(e) => {
          setTemplateName(e.target.value);
        }}
      />
      <NewChat />
    </div>
  );
}

export default CreatePromptTemplate;
