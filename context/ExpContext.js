import React, { createContext, useContext, useState } from "react";

export const ExpContext = createContext({
  selectedExperimentInfo: {},
  setSelectedExperimentInfo: () => {},
  reportId: {},
  setReportId: () => {},
  promptTemplate: {},
  setPromptTemplate: () => {},
  testCase: {},
  setTestCase: () => {},
});

export function useExpContext() {
  const {
    selectedExperimentInfo,
    setSelectedExperimentInfo,
    reportId,
    setReportId,
    promptTemplate,
    setPromptTemplate,
    testCase,
    setTestCase,
  } = useContext(ExpContext);

  return {
    selectedExperimentInfo,
    setSelectedExperimentInfo,
    reportId,
    setReportId,
    promptTemplate,
    setPromptTemplate,
    testCase,
    setTestCase,
  };
}

export const ExpContextProvider = ({ children }) => {
  const [selectedExperimentInfo, setSelectedExperimentInfo] = useState({});
  const [reportId, setReportId] = useState(null);
  const [promptTemplate, setPromptTemplate] = useState({});
  const [testCase, setTestCase] = useState({});

  return (
    <ExpContext.Provider
      value={{
        selectedExperimentInfo,
        setSelectedExperimentInfo,
        reportId,
        setReportId,
        promptTemplate,
        setPromptTemplate,
        testCase,
        setTestCase,
      }}
    >
      {children}
    </ExpContext.Provider>
  );
};
