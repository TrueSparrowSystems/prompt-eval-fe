import React from "react";
import ExperimentList from "./ExperimentList";
import Button from "@mui/material/Button";
import ReactJoyride from "../../Onboarding/ReactJoyride";
import AddIcon from "../../../assets/Svg/AddIcon";


function LeftSideBar(props) {
  const showLanding = false
  return (
    <div className="px-[14px] bg-[#fff]">

      <div className="first-step pt-[5px]">
        <Button fullWidth variant="outlined" sx={{mt:'5px'}}>
          <AddIcon className="mr-[12px]"/> Create experiment
        </Button>
      </div>
      <ExperimentList />
      {showLanding && <ReactJoyride />}
    </div>
  );
}

export default LeftSideBar;
