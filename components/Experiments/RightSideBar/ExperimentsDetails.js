import React from "react";
import Button from "@mui/material/Button";
import styles from "./ExperimentsDetails.module.scss";
import PromptTemplate from "./PromptTemplate";

function ExperimentsDetails() {
  return (
    <div className="relative">
      <div>
        <div className="pt-[25px] flex items-center justify-between ">
          <div className="flex items-center uppercase border-b relative">
            <div
              className={`px-[50px] pt-[20px] pb-[25px] cursor-pointer ${styles.SelectedTab}`}
            >
              Prompt Template
            </div>
            <div
              className={`px-[50px] pt-[20px] pb-[25px] cursor-pointer ${styles.NotSelectedtab}`}
            >
              Text Cases
            </div>
          </div>
          <div>
            <Button size="large">+ Add new template</Button>
          </div>
        </div>
      </div>
      <div className="w-full">
        <PromptTemplate />
      </div>
    </div>
  );
}

export default ExperimentsDetails;
