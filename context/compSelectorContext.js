import React, { createContext, useContext, useState } from "react";

export const CompSelectorContext = createContext({
  showReport: {},
  setShowReport: () => {},
  showAdd: {},
  setShowAdd: () => {},
  showClone: {},
  setShowClone: () => {},
  showEdit: {},
  setShowEdit: () => {},
});

export function useCompSelectorContext() {
  const {
    showReport,
    setShowReport,
    showAdd,
    setShowAdd,
    showClone,
    setShowClone,
    showEdit,
    setShowEdit,
  } = useContext(CompSelectorContext);

  return {
    showReport,
    setShowReport,
    showAdd,
    setShowAdd,
    showClone,
    setShowClone,
    showEdit,
    setShowEdit,
  };
}

export const CompSelectorProvider = ({ children }) => {
  const [showReport, setShowReport] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [showClone, setShowClone] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  
  return (
    <CompSelectorContext.Provider
      value={{
        showReport,
        setShowReport,
        showAdd,
        setShowAdd,
        showClone,
        setShowClone,
        showEdit,
        setShowEdit,
      }}
    >
      {children}
    </CompSelectorContext.Provider>
  );
};
