import React, { useEffect, useState } from "react";
import TestCaseCell from "./TestCaseCell";



function TestCasesList({data,setSelectTestCase}) { 
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
