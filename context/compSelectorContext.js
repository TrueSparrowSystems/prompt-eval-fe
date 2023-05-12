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
  addDynamicVars: {},
  setAddDynamicVars: () => {},
  showEmptyState: {},
  setShowEmptyState: () => {},
  showLoadingState: {},
  setShowLoadingState: () => {}
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
    addDynamicVars,
    setAddDynamicVars,
    showEmptyState,
    setShowEmptyState,
    showLoadingState,
    setShowLoadingState
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
    addDynamicVars,
    setAddDynamicVars,
    showEmptyState,
    setShowEmptyState,
    showLoadingState,
    setShowLoadingState
  };
}

export const CompSelectorProvider = ({ children }) => {
  const [showReport, setShowReport] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [showClone, setShowClone] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [currTab, setCurrTab] = useState(TabNames.PROMPTTEMPLATE);
  const [addTestCase, setAddTestCase] = useState(false);
  const [addDynamicVars, setAddDynamicVars] = useState(false);
  const [showEmptyState, setShowEmptyState] = useState(false);
  const [showLoadingState, setShowLoadingState] = useState(false);

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
        addDynamicVars,
        setAddDynamicVars,
        showEmptyState,
        setShowEmptyState,
        showLoadingState,
        setShowLoadingState
      }}
    >
      {children}
    </CompSelectorContext.Provider>
  );
};
