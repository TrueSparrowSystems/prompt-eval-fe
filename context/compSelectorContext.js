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
  showEmpty: {},
  setShowEmpty: () => {},
  currTab: {},
  setCurrTab: () => {},
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
    showEmpty,
    setShowEmpty,
    currTab,
    setCurrTab,
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
    showEmpty,
    setShowEmpty,
    currTab,
    setCurrTab,
  };
}

export const CompSelectorProvider = ({ children }) => {
  const [showReport, setShowReport] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [showClone, setShowClone] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showEmpty, setShowEmpty] = useState(false);
  const [currTab, setCurrTab] = useState(TabNames.PROMPTTEMPLATE);

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
        showEmpty,
        setShowEmpty,
        currTab,
        setCurrTab,
      }}
    >
      {children}
    </CompSelectorContext.Provider>
  );
};
