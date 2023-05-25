import React, { useEffect, useState, useRef } from "react";
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
import { useRouter } from "next/router";
import { getUnsanitizedValue } from "../../../utils/DecodeString";
import { useQuery } from "@apollo/client";
import Queries from "../../../queries/Queries";

function ExperimentsDetails() {
  const {
    showReport,
    setShowReport,
    showAdd,
    setShowAdd,
    showEdit,
    setShowEdit,
    setShowClone,
    currTab,
    setCurrTab,
    setAddTestCase,
    showEmptyState,
    showLoadingState,
  } = useCompSelectorContext();

  const { setReportId, selectedExperimentInfo, setSelectedExperimentInfo,setSelectedExperiment } = useExpContext();

  const [recordPerPage, setRecordPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  const totalCount = useRef(0);

  const router = useRouter();

  const { data, loading, error } = useQuery(Queries.experimentList);

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

      let id = data?.experimentList.findIndex(
        (experiment) => experiment.id === router.query["experiment-id"]
      );

      if (id != -1) {
        setSelectedExperimentInfo(getUnsanitizedValue(data?.experimentList[id]));
      }
    }
  }, [router.isReady, data]);

  const getExperimentUi = () => {
    if (showReport) {
      return <Report />;
    } else if (showAdd) {
      return <CreatePromptTemplate setCurrentPage={setCurrentPage} />;
    } else if (showEdit) {
      return <EditePromptTemplate />;
    } else if (currTab === TabNames.PROMPTTEMPLATE) {
      return (
        <PromptTemplate
          recordPerPage={recordPerPage}
          currentPage={currentPage}
          setRecordPerPage={setRecordPerPage}
          setCurrentPage={setCurrentPage}
          totalCount={totalCount}
        />
      );
    } else if (currTab === TabNames.TESTCASES) {
      return <TestCases />;
    }
  };

  return (
    <div>
      <div className="pt-[25px] flex items-center justify-between sticky top-0 z-[10] bg-[#F3F4F6]">
        <div className="flex items-center uppercase border-b relative">
          <div
            className={`${
              currTab === TabNames.PROMPTTEMPLATE
                ? `${styles.selectedTab} text-[#2196F3] z-[2]`
                : `${styles.notSelectedtab} ${styles.notSelectedPromptTemplate}`
            }
              px-[80px] pt-[20px] pb-[25px] cursor-pointer relative whitespace-nowrap`}
            onClick={() => {
              if (showReport) {
                router.push(`/experiments/${selectedExperimentInfo.id}`);
                setShowReport(false);
              }
              setShowAdd(false);
              setAddTestCase(false);
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
              if (showReport) {
                router.push(`/experiments/${selectedExperimentInfo.id}`);
                setShowReport(false);
              }
              setShowAdd(false);
              setShowEdit(false);
              setShowClone(false);
              toggleTab(TabNames.TESTCASES);
            }}
          >
            Test Cases
          </div>
        </div>
        {!showEmptyState && !showLoadingState && (
          <Button
            size="large"
            style={{ textTransform: "none" }}
            onClick={() => {
              if (currTab === TabNames.PROMPTTEMPLATE) {
                setShowEdit(false);
                setShowAdd(true);
              } else {
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
      <div className="w-full">{getExperimentUi()}</div>
    </div>
  );
}

export default ExperimentsDetails;
