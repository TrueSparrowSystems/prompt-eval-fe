import React, { createContext, useContext, useState } from "react";
import { TabNames } from "../constants/TabNames";

export const CompSelectorContext = createContext({
  showReport: {},
  setShowReport: () => {},
  showAdd: {},
  setShowAdd: () => {},
  showClone: {},
  setShowClone: () => {},
  showEdit: {},
  setShowEdit: () => {},
  currTab: {},
  setCurrTab: () => {},
  addTestCase: {},
  setAddTestCase: () => {},
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
    currTab,
    setCurrTab,
    addTestCase,
    setAddTestCase,
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
    currTab,
    setCurrTab,
    addTestCase,
    setAddTestCase,
  };
}

export const CompSelectorProvider = ({ children }) => {
  const [showReport, setShowReport] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [showClone, setShowClone] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [currTab, setCurrTab] = useState(TabNames.PROMPTTEMPLATE);
  const [addTestCase, setAddTestCase] = useState(false);

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
        currTab,
        setCurrTab,
        addTestCase,
        setAddTestCase,
      }}
    >
      {children}
    </CompSelectorContext.Provider>
  );
};
