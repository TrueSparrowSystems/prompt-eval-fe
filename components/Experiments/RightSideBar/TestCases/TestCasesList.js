import React, { useEffect, useState } from "react";
import TestCaseCell from "./TestCaseCell";
import { useQuery } from "@apollo/client";
import Queries from "../../../../queries/Queries";
import { useExpContext } from "../../../../context/ExpContext";


function TestCasesList({data,setSelectTestCase}) {
  const TestCasesListData = [
    { name: "test case 1" },
    { name: "test case 2" },
    { name: "test case 3" },
    { name: "test case 4" },
    { name: "test case 5" },
    { name: "test case 6" },
  ];
  const [selectedTestCase, setSelectedTestCase] = useState(0);
  
  useEffect(() => {
    setSelectTestCase(data?.testCases[selectedTestCase]);
  }, [selectedTestCase]);

  return (
    <div>
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
