import React from "react";
import TestCaseCell from "./TestCaseCell";
import { Button } from "@mui/material";
import AddIcon from "../../../../assets/Svg/AddIcon";
import { useCompSelectorContext } from "../../../../context/compSelectorContext";
import styles from "./TestCaseTabs.module.scss";

function TestCasesList({ data, selectTestCase,setSelectTestCase }) {

  const { addTestCase, setAddTestCase } = useCompSelectorContext();

  return (
    <div className="flex item-center flex-col border-r pr-[12px] border-[F8FAFB] mr-[13px] h-[674px]">
      <Button
        sx={{
          borderRadius: "4px",
          color: "#2196F3",
          textTransform: "none",
          border: "1px solid rgba(33, 150, 243, 0.5)",
          padding: "8px 20px",
          whiteSpace: "nowrap",
          marginBottom: "10px",
        }}
        onClick={() => {
          setAddTestCase(true);
        }}
      >
        <AddIcon className="mr-[11px]" />
        Add test case
      </Button>
      <div className={`max-h-[580px] overflow-auto ${styles.scrollCont}`}>
      {data?.testCases.map((testCase, index) => (
        <TestCaseCell
          testCaseName={testCase.name}
          key={index}
          index={index}
          selectTestCase={selectTestCase}
          setSelectTestCase={setSelectTestCase}
        />
      ))}
      </div>
    </div>
  );
}

export default TestCasesList;
