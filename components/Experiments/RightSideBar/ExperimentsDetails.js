import React, { useState } from "react";
import Button from "@mui/material/Button";
import styles from "./ExperimentsDetails.module.scss";
import PromptTemplate from "./PromptTemplate/PromptTemplate";
import TestCases from "./TestCases/TestCases";
import AddIcon from "../../../assets/Svg/AddIcon";
import CreatePromptTemplate from "./PromptTemplate/CreatePromptTemplate";

function ExperimentsDetails() {
  const experimentTypes = {
    promptTemplate: "promptTemplate",
    testCases: "testCases",
  };
  const [addNewTemplate, setAddnewTemplate] = useState(false);
  const [toggleState, setToggleState] = useState(
    experimentTypes.promptTemplate
  );
  const toggleTab = (type) => {
    if (type != toggleState) {
      setToggleState(type);
    }
  };

  const getExperimentUi = () => {
    if(addNewTemplate){
      return  <CreatePromptTemplate />
    }else if (toggleState === experimentTypes.promptTemplate) {
      return <PromptTemplate />;
    } else {
      return <TestCases />;
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
                  ? `${styles.selectedTab} text-[#2196F3] z-10`
                  : `${styles.notSelectedtab}`
              }
              px-[80px] pt-[20px] pb-[25px] cursor-pointer relative`}
              onClick={() => {
                setAddnewTemplate(false);
                toggleTab(experimentTypes.promptTemplate);
              }}
            >
              Prompt Template
            </div>
            <div
              className={`${
                toggleState === experimentTypes.testCases
                  ? `${styles.selectedTab} text-[#2196F3] ml-[-20px]`
                  : `${styles.notSelectedtab} ml-[-15px]`
              }
              px-[80px] pt-[20px] pb-[25px] cursor-pointer relative`}
              onClick={() => {
                setAddnewTemplate(false);
                toggleTab(experimentTypes.testCases);
              }}
            >
              Test Cases
            </div>
          </div>
          <div>
            <Button
              size="large"
              style={{ textTransform: "none" }}
              onClick={() => {
                setAddnewTemplate(true);
              }}
              sx={{color:'#2196F3'}}
            >
              <AddIcon className="mr-[11px]" />
              Add new template
            </Button>
          </div>
        </div>
      </div>
      <div className="w-full">{getExperimentUi()}</div>
    </div>
  );
}

export default ExperimentsDetails;
