import React from "react";
import ExperimentList from "./ExperimentList";
import Button from "@mui/material/Button";

function LeftSideBar(props) {
  return (
    <div className="px-[14px] bg-[#fff]">
      <Button
        fullWidth
        variant="outlined"
      >
       + Create experiment
      </Button>
      <ExperimentList />
    </div>
  );
}

export default LeftSideBar;
