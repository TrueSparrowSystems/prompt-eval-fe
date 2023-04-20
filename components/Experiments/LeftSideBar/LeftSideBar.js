import React, { useEffect } from "react";
import ExperimentList from "./ExperimentList";
import Button from "@mui/material/Button";
import ReactJoyride from "../../Onboarding/ReactJoyride";
import AddIcon from "../../../assets/Svg/AddIcon";
import { useMutation } from "@apollo/client";
import Queries from "../../../queries/Queries";
import { useQuery } from "@apollo/client";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/system";
import { useExpContext } from "../../../context/ExpContext";
function LeftSideBar(props) {
  const showLanding = false;

  const [createExperiment, { data, loading, error }] = useMutation(
    Queries.createExperiment
  );
  const { dataList, loadingList, errorList, refetch } = useQuery(
    Queries.experimentList
  );

  useEffect(() => {
    refetch();
  }, [data]);

  const handleClick = () => {
    createExperiment({
      variables: {
        name: "Untitled Experiment",
        description: "Use this template to track your experiments. Add your experiment description here. Click + Add new template to create a new prompt template on this board.",
      },
    });
    
  };

  const buttonSx = {
    ...((loading || loadingList) && {
      bgcolor: '#2196F3',
      '&:hover': {
        bgcolor:'#2196F3',
      },
      transform: 'none',
    }),
    color:'#2196F3',
  };

  return (
    <div className="px-[14px] bg-[#fff] ">
      <div className="second-step">
      <div className="first-step pt-[5px] relative ">
      <Box sx={{ m: 1, position: 'relative' }}>
        <Button
        fullWidth
          variant="outlined"
          sx={buttonSx}
          disabled={(loading || loadingList)}
          onClick={handleClick}
        >
          <AddIcon className={`mr-[12px]`} style={{fill:(loading || loadingList)?'#999999':'#2196F3'}}/> <span className="whitespace-nowrap">Create experiment{" "}</span>
        </Button>
        {(loading || loadingList) && (
          <CircularProgress
            size={24}
            sx={{
              color: '#2196F3',
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginTop: '-12px',
              marginLeft: '-24px',
            }}
          />
        )}
        {error && <div className="text-[#f00] text-[14px] mt-[12px] break-all">{error}</div>}
      </Box>
      </div>
      <ExperimentList />
      {showLanding && <ReactJoyride />}
    </div>
    </div>
  );
}

export default LeftSideBar;
