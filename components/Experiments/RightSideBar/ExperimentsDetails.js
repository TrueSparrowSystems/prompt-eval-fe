import React, { useState } from "react";
import Button from "@mui/material/Button";
import styles from "./ExperimentsDetails.module.scss";
import PromptTemplate from "./PromptTemplate/PromptTemplate";
import TestCases from "./TestCases/TestCases";

function ExperimentsDetails() {
  const experimentTypes = {
    promptTemplate: "promptTemplate",
    testCases: "testCases",
  };
  const [toggleState, setToggleState] = useState(
    experimentTypes.promptTemplate
  );
  const toggleTab = (type) => {
    if (type != toggleState) {
      setToggleState(type);
    }
  };
  return (
    <div className="relative">
      <div>
        <div className="pt-[25px] flex items-center justify-between ">
          <div className="flex items-center uppercase border-b relative">
            <div
              className={`${
                toggleState === experimentTypes.promptTemplate
                  ? `${styles.selectedTab} text-[#2196F3]`
                  : `${styles.notSelectedtab}`
              }
              px-[80px] pt-[20px] pb-[25px] cursor-pointer`}
              onClick={() => {
                toggleTab(experimentTypes.promptTemplate);
              }}
            >
              Prompt Template
            </div>
            <div
              className={`${
                toggleState === experimentTypes.testCases
                  ? `${styles.selectedTab} text-[#2196F3]`
                  : `${styles.notSelectedtab}`
              }
              px-[80px] pt-[20px] pb-[25px] cursor-pointer`}
              onClick={() => {
                toggleTab(experimentTypes.testCases);
              }}
            >
              Text Cases
            </div>
          </div>
          <div>
            <Button size="large" style={{ textTransform: "none" }}>
              + Add new template
            </Button>
          </div>
        </div>
      </div>
      <div className="w-full">
       {toggleState === experimentTypes.promptTemplate ? <PromptTemplate /> : <TestCases /> }
      </div>
    </div>
  );
}

export default ExperimentsDetails;
