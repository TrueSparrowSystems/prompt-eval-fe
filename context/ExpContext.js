import React, { createContext, useEffect } from "react";


export const ExpContext = createContext(
  {
    selectedExperimentInfo: {},
    setSelectedExperimentInfo: () => {},
  }
);

export function useExpContext() {
  const {selectedExperimentInfo,setSelectedExperimentInfo} = React.useContext(ExpContext);

  return {selectedExperimentInfo,setSelectedExperimentInfo} ;
}

export const ExpContextProvider = ({children}) => {
  const [selectedExperimentInfo, setSelectedExperimentInfo] = React.useState({});

  return <ExpContext.Provider value={{selectedExperimentInfo,setSelectedExperimentInfo}} >
    {children}
    </ExpContext.Provider>
}