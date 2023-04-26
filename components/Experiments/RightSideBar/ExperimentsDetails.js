import React, { useState } from "react";
import Button from "@mui/material/Button";
import styles from "./ExperimentsDetails.module.scss";
import PromptTemplate from "./PromptTemplate/PromptTemplate";
import TestCases from "./TestCases/TestCases";
import AddIcon from "../../../assets/Svg/AddIcon";
import CreatePromptTemplate from "./PromptTemplate/CreatePromptTemplate";
import Report from "./Report/Report";
import { useMutation } from "@apollo/client";
import Queries from "../../../queries/Queries";
import { useExpContext } from "../../../context/ExpContext";
import ClonePromptTemplate from "./PromptTemplate/ClonePromptTemplate";
import { useCompSelectorContext } from "../../../context/compSelectorContext";
import EditePromptTemplate from "./PromptTemplate/EditPromptTemplate";

function ExperimentsDetails() {
  const {
    showReport,
    setShowReport,
    showAdd,
    setShowAdd,
    showClone,
    showEdit,
  } = useCompSelectorContext();
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

  const [createPromptTemplate, { data, loading, error }] = useMutation(
    Queries.createPromptTemplate
  );
  const [createTestCases, { dataTestCase, loadingTestCase, errorTestCase }] =
    useMutation(Queries.createTestCases);

  const { selectedExperimentInfo } = useExpContext();

  const handleCreate = () => {
    if (toggleState === "promptTemplate") {
      createPromptTemplate({
        variables: {
          name: "Untitled Prompt Template",
          description: "Initial Prompt Template Description",
          conversation: { role: "system", content: "newone" },
          experimentId: selectedExperimentInfo?.id,
        },
      });
    } else {
      createTestCases({
        variables: {
          name: "Untitled Test Case",
          description: "Initial Test Case Description",
          dynamicVarValues: { key: "hey", value: "value" },
          expectedResult: ["hey", "hey10"],
          experimentId: selectedExperimentInfo?.id,
        },
      });
    }
  };

  const getExperimentUi = () => {
    if (showReport) {
      toggleTab(experimentTypes.testCases);
      return <Report />;
    } else if (showAdd) {
      return <CreatePromptTemplate />;
    } else if (showClone) {
      return <ClonePromptTemplate />;
    } else if (showEdit) {
      return <EditePromptTemplate />;
    } else if (toggleState === experimentTypes.promptTemplate) {
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
              px-[80px] pt-[20px] pb-[25px] cursor-pointer relative whitespace-nowrap`}
              onClick={() => {
                setShowReport(false);
                setShowAdd(false);
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
              px-[80px] pt-[20px] pb-[25px] cursor-pointer relative whitespace-nowrap`}
              onClick={() => {
                setShowAdd(false);
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
                setShowAdd(true);
                handleCreate();
              }}
              sx={{ color: "#2196F3" }}
            >
              <AddIcon className="mr-[11px]" />
              {toggleState === experimentTypes.promptTemplate
                ? "Add new template"
                : "Add new test case"}
            </Button>
          </div>
        </div>
      </div>
      <div className="w-full">{getExperimentUi()}</div>
    </div>
  );
}

export default ExperimentsDetails;
