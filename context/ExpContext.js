import React, { createContext, useContext, useState } from "react";

export const ExpContext = createContext({
  selectedExperimentInfo: {},
  setSelectedExperimentInfo: () => {},
  reportId: {},
  setReportId: () => {},
  promptTemplate: {},
  setPromptTemplate: () => {},
});

export function useExpContext() {
  const {
    selectedExperimentInfo,
    setSelectedExperimentInfo,
    reportId,
    setReportId,
    promptTemplate,
    setPromptTemplate,
  } = useContext(ExpContext);

  return {
    selectedExperimentInfo,
    setSelectedExperimentInfo,
    reportId,
    setReportId,
    promptTemplate,
    setPromptTemplate,
  };
}

export const ExpContextProvider = ({ children }) => {
  const [selectedExperimentInfo, setSelectedExperimentInfo] = useState({});
  const [reportId, setReportId] = useState(null);
  const [promptTemplate, setPromptTemplate] = useState({});

  return (
    <ExpContext.Provider
      value={{
        selectedExperimentInfo,
        setSelectedExperimentInfo,
        reportId,
        setReportId,
        promptTemplate,
        setPromptTemplate,
      }}
    >
      {children}
    </ExpContext.Provider>
  );
};
