import React, { useEffect, useState } from "react";
import ExperimentList from "./ExperimentList";
import Button from "@mui/material/Button";
import ReactJoyride from "../../Onboarding/ReactJoyride";
import AddIcon from "../../../assets/Svg/AddIcon";
import { useMutation } from "@apollo/client";
import Queries from "../../../queries/Queries";
import { useQuery } from "@apollo/client";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/system";

function LeftSideBar() {
  const [createExperiment, { data, loading, error }] = useMutation(
    Queries.createExperiment
  );
  const [selectedExperiment, setSelectedExperiment] = useState(0);
  const {
    data: dataList,
    loading: loadingList,
    error: errorList,
    refetch,
  } = useQuery(Queries.experimentList);

  useEffect(() => {
    refetch();
  }, [data]);

  const handleClick = async () => {
    try {
      await createExperiment({
        variables: {
          name: "Untitled Experiment",
          description:
            "Use this template to track your experiments. Add your experiment description here. \nClick + Add new template to create a new prompt template on this board.",
        },
      });
      if(dataList?.experimentList?.length === 0) setSelectedExperiment(0);
      else
      setSelectedExperiment((prevCount) => prevCount + 1);
    } catch (err) {
      return err;
    }
  };

  const buttonSx = {
    ...((loading || loadingList) && {
      bgcolor: "#2196F3",
      "&:hover": {
        bgcolor: "#2196F3",
      },
    }),
    color: "#2196F3",
    textTransform: "none",
  };

  return (
    <div className="px-[14px] bg-[#fff] ">
      <div className="second-step">
        <div className="first-step pt-[5px] relative ">
          <Box sx={{ m: 1, position: "relative" }}>
            <Button
              fullWidth
              variant="outlined"
              sx={buttonSx}
              disabled={loading || loadingList}
              onClick={handleClick}
            >
              <AddIcon
                className={`mr-[12px]`}
                style={{ fill: loading || loadingList ? "#999999" : "#2196F3" }}
              />{" "}
              <span className="whitespace-nowrap">Create experiment </span>
            </Button>
            {(loading || loadingList) && (
              <CircularProgress
                size={24}
                sx={{
                  color: "#2196F3",
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  marginTop: "-12px",
                  marginLeft: "-15px",
                }}
              />
            )}
            {error && (
              <div className="text-[#f00] text-[14px] mt-[12px] break-all">
                {error.message}
              </div>
            )}
          </Box>
        </div>
        <ExperimentList
          selectedExperiment={selectedExperiment}
          setSelectedExperiment={setSelectedExperiment}
        />
        {true && <ReactJoyride />}
      </div>
    </div>
  );
}

export default LeftSideBar;
