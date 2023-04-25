import React, { createContext, useContext, useState } from "react";

export const ExpContext = createContext({
  selectedExperimentInfo: {},
  setSelectedExperimentInfo: () => {},
  reportId: {},
  setReportId: () => {},
});

export function useExpContext() {
  const {
    selectedExperimentInfo,
    setSelectedExperimentInfo,
    reportId,
    setReportId,
  } = useContext(ExpContext);

  return {
    selectedExperimentInfo,
    setSelectedExperimentInfo,
    reportId,
    setReportId,
  };
}

export const ExpContextProvider = ({ children }) => {
  const [selectedExperimentInfo, setSelectedExperimentInfo] = useState({});
  const [reportId, setReportId] = useState(null);

  return (
    <ExpContext.Provider
      value={{
        selectedExperimentInfo,
        setSelectedExperimentInfo,
        reportId,
        setReportId,
      }}
    >
      {children}
    </ExpContext.Provider>
  );
};
