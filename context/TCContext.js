import React, { createContext, useEffect } from "react";


export const TCContext = createContext(
  {
    selectTestCase: {},
    setSelectTestCase: () => {},
  }
);

export function useTCContext() {
  const {selectTestCase,setSelectTestCase} = React.useContext(TCContext);

  return {selectTestCase,setSelectTestCase} ;
}

export const TCContextProvider = ({children}) => {
  const {selectTestCase,setSelectTestCase} = React.useState({});

  return <TCContext.Provider value={{selectTestCase,setSelectTestCase}} >
    {children}
    </TCContext.Provider>
}