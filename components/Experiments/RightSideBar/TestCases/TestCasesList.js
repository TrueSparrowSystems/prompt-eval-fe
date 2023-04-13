import React, { useState } from "react";
import TestCaseCell from "./TestCaseCell";

function TestCasesList(props) {
  const TestCasesListData = [
    { name: "test case 1" },
    { name: "test case 2" },
    { name: "test case 3" },
    { name: "test case 4" },
    { name: "test case 5" },
    { name: "test case 6" },
  ];
  const [selectedTestCase, setSelectedTestCase] = useState(0);
  return (
    <div>
      {TestCasesListData.map((testCase, index) => (
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
