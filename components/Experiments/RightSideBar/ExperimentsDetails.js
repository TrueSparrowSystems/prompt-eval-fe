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
import { useCompSelectorContext } from "../../../context/compSelectorContext";
import EditePromptTemplate from "./PromptTemplate/EditPromptTemplate";
import { TabNames } from "../../../constants/TabNames";

function ExperimentsDetails() {
  const {
    showReport,
    setShowReport,
    showAdd,
    setShowAdd,
    showClone,
    showEdit,
    showEmpty,
    setShowEmpty,
    currTab,
    setCurrTab,
  } = useCompSelectorContext();

  const toggleTab = (type) => {
    if (type != currTab) {
      setCurrTab(type);
    }
  };

  const [createTc, setCreateTc] = useState(false);

  const [createTestCases, { dataTestCase, loadingTestCase, errorTestCase }] =
    useMutation(Queries.createTestCases);

  const { selectedExperimentInfo } = useExpContext();

  const handleCreate = () => {
    if (showEmpty || currTab === TabNames.PROMPTTEMPLATE) {
      setShowAdd(true);
    } else {
      createTestCases({
        variables: {
          name: "Untitled Test Case",
          description: "Initial Test Case Description",
          dynamicVarValues: JSON.stringify({ key: "hey", value: "value" }),
          expectedResult: ["hey", "hey10"],
          experimentId: selectedExperimentInfo?.id,
        },
      });
      toggleTab(TabNames.TESTCASES);
    }
  };

  if (dataTestCase) {
    setCreateTc(true);
  }

  const getExperimentUi = () => {
    setShowEmpty(false);

    if (showReport) {
      toggleTab(TabNames.TESTCASES);
      return <Report />;
    } else if (showAdd) {
      return <CreatePromptTemplate />;
    } else if (showEdit) {
      return <EditePromptTemplate />;
    } else if (currTab === TabNames.PROMPTTEMPLATE) {
      return <PromptTemplate handleCreate={handleCreate} />;
    } else if (currTab === TabNames.TESTCASES) {
      return <TestCases handleCreate={handleCreate} createTc={createTc} />;
    }
  };

  return (
    <div className="relative">
      <div>
        <div className="pt-[25px] flex items-center justify-between ">
          <div className="flex items-center uppercase border-b relative">
            <div
              className={`${
                currTab === TabNames.PROMPTTEMPLATE
                  ? `${styles.selectedTab} text-[#2196F3] z-[2]`
                  : `${styles.notSelectedtab}`
              }
              px-[80px] pt-[20px] pb-[25px] cursor-pointer relative whitespace-nowrap`}
              onClick={() => {
                setShowReport(false);
                setShowAdd(false);
                toggleTab(TabNames.PROMPTTEMPLATE);
              }}
            >
              Prompt Template
            </div>
            <div
              className={`${
                currTab === TabNames.TESTCASES
                  ? `${styles.selectedTab} text-[#2196F3] ml-[-20px]`
                  : `${styles.notSelectedtab} ml-[-15px]`
              }
              px-[80px] pt-[20px] pb-[25px] cursor-pointer relative whitespace-nowrap`}
              onClick={() => {
                setShowAdd(false);
                toggleTab(TabNames.TESTCASES);
              }}
            >
              Test Cases
            </div>
          </div>
          <div>
            {!showEmpty && (
              <Button
                size="large"
                style={{ textTransform: "none" }}
                onClick={() => {
                  handleCreate();
                }}
                sx={{ color: "#2196F3" }}
              >
                <AddIcon className="mr-[11px]" />
                {currTab === TabNames.PROMPTTEMPLATE
                  ? "Add new template"
                  : "Add new test case"}
              </Button>
            )}
          </div>
        </div>
      </div>
      <div className="w-full">{getExperimentUi()}</div>
    </div>
  );
}

export default ExperimentsDetails;
