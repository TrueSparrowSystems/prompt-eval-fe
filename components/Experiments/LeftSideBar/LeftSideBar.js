import React from "react";
import ExperimentList from "./ExperimentList";
import Button from "@mui/material/Button";
import AddIcon from "../../../assets/Svg/AddIcon";

function LeftSideBar(props) {
  return (
    <div className="px-[14px] bg-[#fff]">
      <Button
        fullWidth
        variant="outlined"
        sx={{ color: "#2196F3" }}
      >
       <AddIcon className="mr-[12px]"/> Create experiment
      </Button>
      <ExperimentList />
    </div>
  );
}

export default LeftSideBar;
