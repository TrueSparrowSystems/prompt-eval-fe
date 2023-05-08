import React, {useState, useEffect} from "react";
import TestCaseCell from "./TestCaseCell";
import { Button } from "@mui/material";
import AddIcon from "../../../../assets/Svg/AddIcon";
import { useCompSelectorContext } from "../../../../context/compSelectorContext";
import styles from "./TestCaseTabs.module.scss";
import { useExpContext } from "../../../../context/ExpContext";

function TestCasesList({ data , unsavedChanges}) {

  const { addTestCase, setAddTestCase } = useCompSelectorContext();
  const {testCase,setTestCase} = useExpContext();

  const [selectedTestCase,setSelectedTestCase] = useState(0);

  const handleSelection = (index) => {
    if(unsavedChanges && !confirm('Your changes have not been saved. Are you sure you want to leave this page?')) {
      return;
    }
    setSelectedTestCase(index);
    setTestCase(data?.testCases[index]);
  };

  return (
    <div className={`flex item-center flex-col border-r pr-[12px] border-[F8FAFB] mr-[13px] ${styles.subBoxHeightForTestList}`}>
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
      <div className={`overflow-auto ${styles.scrollCont}`}>
      {data?.testCases.map((testCase, index) => (
        <TestCaseCell
          testCaseName={testCase.name}
          key={index}
          index={index}
          selectedTestCase={selectedTestCase}
          handleSelection={handleSelection}
        />
      ))}
      </div>
    </div>
  );
}

export default TestCasesList;
