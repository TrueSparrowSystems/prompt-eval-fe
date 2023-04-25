import { React } from "react";
import styles from "./ExperimentsDetails.module.scss";
import { Button } from "@mui/material";
import AddIcon from "../../../assets/Svg/AddIcon";

function EmptyState({setAddnewTemplate,handleCreate}) {
  return (
    <div
      className={`relative ${styles.emptyState} flex justify-center items-center top-[-48px]`}
    >
      <div className={`flex justify-center items-center flex-col`}>
        <div className="step-four p-[20px]">
          <p className="flex items-center opacity-[60%] text-[15px] leading-[24px] font-[400px] mb-[14px]">
            Create a new template and get started
          </p>
          <div className="flex justify-center">
            <Button
              variant="outlined"
              sx={{ color: "#2196F3",textTransform: "none" }}
              onClick={() => {
                setAddnewTemplate(true);
                handleCreate("promptTemplate");
              }}
            >
              <AddIcon className="mr-[11px]" /> Add new template
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmptyState;
