import React from "react";
import ExperimentList from "./ExperimentList";
import Button from "@mui/material/Button";
import ReactJoyride from "../../Onboarding/ReactJoyride";
import AddIcon from "../../../assets/Svg/AddIcon";
import { useMutation } from "@apollo/client";
import Queries from "../../../queries/Queries";

function LeftSideBar(props) {
  const showLanding = false;

  const [createExperiment, { data, loading, error }] = useMutation(
    Queries.createExperiment
  );
  const handleClick = () => {
    createExperiment({
      variables: {
        name: "Untitled Experiment",
        description:
          "Use this template to track your experiments. Add your experiment description here. Click + Add new template to create a new prompt template on this board.",
      },
    });
  };

  return (
    <div className="px-[14px] bg-[#fff]">
      <div className="first-step pt-[5px]">
        <Button
          fullWidth
          variant="outlined"
          sx={{ mt: "5px" }}
          onClick={() => {
            handleClick();
          }}
        >
          <AddIcon className="mr-[12px]" /> Create experiment
        </Button>
      </div>
      <ExperimentList />
      {showLanding && <ReactJoyride />}
    </div>
  );
}

export default LeftSideBar;
