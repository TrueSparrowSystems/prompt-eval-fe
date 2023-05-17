import { React, useEffect } from "react";
import styles from "./ExperimentsDetails.module.scss";
import { Button } from "@mui/material";
import AddIcon from "../../../assets/Svg/AddIcon";
import { useCompSelectorContext } from "../../../context/compSelectorContext";
import { TabNames } from "../../../constants/TabNames";

function EmptyState() {
  const {
    setShowAdd,
    currTab,
    setAddTestCase,
    showEmptyState,
    setShowEmptyState,
    showLoadingState,
    setShowLoadingState
  } = useCompSelectorContext();

  useEffect(() => {
    return () => {
      if (showEmptyState) setShowEmptyState(false);
      if (showLoadingState) setShowLoadingState(false);
    };
  }, []);

  return (
    <div
      className={`relative ${styles.emptyState} bg-white flex justify-center items-center`}
    >
      <div className={`flex justify-center items-center flex-col`}>
        {!showLoadingState && (
          <div className="step-four p-[20px]">
            <p className="flex items-center opacity-[60%] text-[15px] leading-[24px] font-[400px] mb-[14px]">
              {currTab === TabNames.PROMPTTEMPLATE
                ? "Create a new template and get started"
                : "Create a new test case and get started"}
            </p>
            <div className="flex justify-center">
              <Button
                variant="outlined"
                sx={{ color: "#2196F3", textTransform: "none" }}
                onClick={() => {
                  if (currTab === TabNames.PROMPTTEMPLATE) setShowAdd(true);
                  else {
                    setAddTestCase(true);
                  }
                }}
              >
                <AddIcon className="mr-[11px]" />
                {currTab === TabNames.PROMPTTEMPLATE
                  ? "Add new template"
                  : "Add new test case"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default EmptyState;
