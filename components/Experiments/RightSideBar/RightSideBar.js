import React, { useState } from "react";
import ExperimentsDetails from "./ExperimentsDetails";
import { useMutation } from "@apollo/client";
import Queries from "../../../queries/Queries";
import { useEffect } from "react";
import { useExpContext } from "../../../context/ExpContext";
import { TextField } from "@mui/material";

function RightSideBar() {
  const { selectedExperimentInfo, setSelectedExperimentInfo } = useExpContext();
  const [experimentName, setExperimentName] = useState("Untitled 1");
  const [experimentDescription, setExperimentDescription] = useState(
    "Copy Use this template to track your experiments. \nClick + Add new template to create a new prompt template on this board."
  );

  const [updateExperiment, { data, loading, error }] = useMutation(
    Queries.updateExperiment
  );

  useEffect(() => {
    if (
      selectedExperimentInfo &&
      Object.keys(selectedExperimentInfo).length !== 0
    ) {
      setExperimentName(selectedExperimentInfo?.name);
      setExperimentDescription(selectedExperimentInfo?.description);
    }
  }, [selectedExperimentInfo]);

  const handleUpdate = async (isNameChanged) => {
    if (experimentName?.length === 0) {
      setExperimentName(selectedExperimentInfo?.name);
      return;
    }

    if (experimentDescription?.length === 0) {
      setExperimentDescription(selectedExperimentInfo?.description);
      return;
    }

    let variables = { documentId: selectedExperimentInfo?.id };

    if (isNameChanged) {
      variables.name = experimentName;
    } else {
      variables.description = experimentDescription;
    }

    try {
      await updateExperiment({
        variables: variables,
      });
      setSelectedExperimentInfo((prevState) => ({
        ...prevState,
        name: experimentName,
        description: experimentDescription,
      }));
    } catch (err) {
      return err;
    }
  };

  const textFieldStyles = {
    "& .MuiInputBase-root.Mui-disabled:before": {
      borderBottom: "none",
      color: "black",
    },
    "& .MuiInputBase-root.Mui-disabled:hover:before": {
      borderBottom: "none",
      color: "black",
    },
    "& .MuiInput-underline:before": {
      borderBottom: "none",
    },
    "& .MuiInput-underline:after": {
      borderBottom: "1px solid black",
    },
    "& .MuiInput-underline:hover": {
      borderBottom: "none",
      outline: "none",
    },
    "& .MuiInput-underline:hover:before": {
      borderBottom: "1px solid black",
    },
    "& .MuiInput-underline:hover:after": {
      borderBottom: "1px solid black",
    },
  };
  return (
    <div>
      <div className="w-[80%] step-three">
        <div>
          <TextField
            sx={textFieldStyles}
            id="standard-basic"
            variant="standard"
            value={experimentName}
            onChange={(e) => {
              setExperimentName(e.target.value);
            }}
            className={`text-[#000] bg-transparent outline-none w-full`}
            disabled={selectedExperimentInfo == null}
            onBlur={() => handleUpdate(true)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                e.target.blur();
                handleUpdate(true);
              }
            }}
            inputProps={{
              maxLength: 70,
              style: {
                fontSize: "20px",
                fontWeight: "600",
                lineHeight: "32px",
              },
            }}
          />
        </div>
        <div>
          <TextField
            sx={textFieldStyles}
            id="standard-basic"
            variant="standard"
            value={experimentDescription}
            onChange={(e) => {
              setExperimentDescription(e.target.value);
            }}
            className={`bg-transparent outline-none break-words resize-none w-full`}
            disabled={selectedExperimentInfo == null}
            onBlur={() => {
              handleUpdate(false);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.target.blur();
                handleUpdate(false);
              }
            }}
            inputProps={{
              maxLength: 240,
              style: {
                fontSize: "14px",
                fontWeight: "400",
                color: "#00000099",
              },
            }}
            multiline
            maxRows={2}
          />
          {error && (
            <div className="text-[#f00] text-[14px] mt-[2px] break-all">
              {error.message}
            </div>
          )}
        </div>
      </div>
      <ExperimentsDetails />
    </div>
  );
}

export default RightSideBar;
