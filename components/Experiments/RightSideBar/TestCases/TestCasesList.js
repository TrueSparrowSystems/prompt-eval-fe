import React, { useEffect, useState } from "react";
import TestCaseCell from "./TestCaseCell";
import { useQuery } from "@apollo/client";
import Queries from "../../../../queries/Queries";
import { useExpContext } from "../../../../context/ExpContext";
import { Button } from "@mui/material";
import AddIcon from "../../../../assets/Svg/AddIcon";
import { useCompSelectorContext } from "../../../../context/compSelectorContext";

function TestCasesList({ data, setSelectTestCase }) {
  const [selectedTestCase, setSelectedTestCase] = useState(0);

  const { addTestCase, setAddTestCase } = useCompSelectorContext();

  useEffect(() => {
    setSelectTestCase(data?.testCases[selectedTestCase]);
  }, [selectedTestCase]);

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
      {data?.testCases.map((testCase, index) => (
        <TestCaseCell
          testCaseName={testCase.name}
          key={index}
          index={index}
          selectedTestCase={selectedTestCase}
          setSelectedTestCase={setSelectedTestCase}
        />
      ))}
    </div>
  );
}

export default TestCasesList;
