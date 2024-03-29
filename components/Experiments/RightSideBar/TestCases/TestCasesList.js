import React, { useState, useEffect } from "react";
import TestCaseCell from "./TestCaseCell";
import { Button } from "@mui/material";
import AddIcon from "../../../../assets/Svg/AddIcon";
import { useCompSelectorContext } from "../../../../context/compSelectorContext";
import styles from "./TestCaseTabs.module.scss";
import { useExpContext } from "../../../../context/ExpContext";
import { decodeHTML, getUnsanitizedValue } from "../../../../utils/DecodeString";
import { concat } from "lodash";

function TestCasesList({ data, unsavedChanges, enable, testCaseName}) {
  const { addTestCase, setAddTestCase } = useCompSelectorContext();
  const { testCase, setTestCase } = useExpContext();
  const [selectedTestCase, setSelectedTestCase] = useState(0);

  useEffect(() => {
    if(addTestCase){
      if (
        unsavedChanges &&
        !confirm(
          "Your changes have not been saved. Are you sure you want to discard this changes?"
        )
      ) {
        setAddTestCase(false);
        return;
      }
      setSelectedTestCase(-1);
    }
  }, [addTestCase]);

  useEffect(() => {
    setSelectedTestCase(0);
    if(addTestCase)
      setSelectedTestCase(-1);
  }, [data]);

  const handleSelection = (index) => {
    
    if(index===selectedTestCase) return;

    if (
      unsavedChanges &&
      !confirm(
        "Your changes have not been saved. Are you sure you want to discard this changes?"
      )
    ) {
      return;
    }

    if(addTestCase) setAddTestCase(false);
    
    
    setSelectedTestCase(index);
    setTestCase(getUnsanitizedValue(data?.testCases[index]));
  };

  return (
    <div
      className={`flex item-center flex-col border-r pr-[12px] border-[F8FAFB] mr-[13px] ${styles.subBoxHeightForTestList}`}
    >
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
        {addTestCase && <TestCaseCell  
          testCaseName={decodeHTML(testCaseName)}
          key={-1}
          index={-1}
          selectedTestCase={selectedTestCase}
          handleSelection={handleSelection}
          active={enable}
        /> }

        {data?.testCases.map((testCase, index) => (
          <TestCaseCell
            testCaseName={selectedTestCase === index?decodeHTML(testCaseName):decodeHTML(testCase.name)}
            key={index}
            index={index}
            active={selectedTestCase === index?enable:testCase?.status==="ACTIVE"}
            selectedTestCase={selectedTestCase}
            handleSelection={handleSelection}
          />
        ))}
      </div>
    </div>
  );
}

export default TestCasesList;
