import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import styles from "./ExperimentsDetails.module.scss";
import PromptTemplate from "./PromptTemplate/PromptTemplate";
import TestCases from "./TestCases/TestCases";
import AddIcon from "../../../assets/Svg/AddIcon";
import CreatePromptTemplate from "./PromptTemplate/CreatePromptTemplate";
import Report from "./Report/Report";
import { useCompSelectorContext } from "../../../context/compSelectorContext";
import EditePromptTemplate from "./PromptTemplate/EditPromptTemplate";
import { TabNames } from "../../../constants/TabNames";
import { useExpContext } from "../../../context/ExpContext";
import { useQuery } from "@apollo/client";
import Queries from "../../../queries/Queries";
import { useRouter } from "next/router";

function ExperimentsDetails() {
  const {
    showReport,
    setShowReport,
    showAdd,
    setShowAdd,
    showEdit,
    currTab,
    setCurrTab,
    setAddTestCase,
    showEmptyState,
  } = useCompSelectorContext();

  const { selectedExperimentInfo, testCase, setTestCase, setReportId } =
    useExpContext();

  const router = useRouter();

  const toggleTab = (type) => {
    if (type != currTab) {
      setCurrTab(type);
    }
  };

  useEffect(() => {
    if (!router.isReady) return;

    if (router.query?.reportId) {
      setReportId(router.query?.reportId);
      setShowReport(true);
    }
  }, [router.isReady]);

  const getExperimentUi = () => {
    if (showReport) {
      toggleTab(TabNames.TESTCASES);
      return <Report />;
    } else if (showAdd) {
      return <CreatePromptTemplate />;
    } else if (showEdit) {
      return <EditePromptTemplate />;
    } else if (currTab === TabNames.PROMPTTEMPLATE) {
      return <PromptTemplate />;
    } else if (currTab === TabNames.TESTCASES) {
      if (testCase == null) {
        const { data } = useQuery(Queries.getTestCaseById, {
          variables: { experimentId: selectedExperimentInfo?.id },
        });
        if (data?.testCases.length > 0) setTestCase(data?.testCases[0]);
      }
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
                currTab === TabNames.PROMPTTEMPLATE
                  ? `${styles.selectedTab} text-[#2196F3] z-[2]`
                  : `${styles.notSelectedtab} ${styles.notSelectedPromptTemplate}`
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
                  : `${styles.notSelectedtab} ml-[-15px] ${styles.notSelectedTestCase}`
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
          {!showEmptyState && (
            <Button
              size="large"
              style={{ textTransform: "none" }}
              onClick={() => {
                if (currTab === TabNames.PROMPTTEMPLATE) setShowAdd(true);
                else {
                  setAddTestCase(true);
                }
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
      <div className="w-full">{getExperimentUi()}</div>
    </div>
  );
}

export default ExperimentsDetails;
