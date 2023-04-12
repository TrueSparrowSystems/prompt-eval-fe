import React, { useState } from "react";
import PromptTemplateCells from "./PromptTemplateCells";
import styles from "../ExperimentsDetails.module.scss";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";

function PromptTemplate(props) {
  const ExperimentListData = [
    {
      Id: " 1",
      name: "Cell 1",
      accuracy: "23%",
      model: "turbo",
      date: "27/01/2023",
      status: "pass",
    },
    {
      Id: " 2",
      name: "Cell 1",
      accuracy: "23%",
      model: "turbo",
      date: "27/01/2023",
      status: "pass",
    },
    {
      Id: " 3",
      name: "Cell 1",
      accuracy: "23%",
      model: "turbo",
      date: "27/01/2023",
      status: "pass",
    },
    {
      Id: " 4",
      name: "Cell 1",
      accuracy: "23%",
      model: "turbo",
      date: "27/01/2023",
      status: "pass",
    },
    {
      Id: " 2",
      name: "Cell 1",
      accuracy: "23%",
      model: "turbo",
      date: "27/01/2023",
      status: "pass",
    },
    {
      Id: " 3",
      name: "Cell 1",
      accuracy: "23%",
      model: "turbo",
      date: "27/01/2023",
      status: "pass",
    },
    {
      Id: " 4",
      name: "Cell 1",
      accuracy: "23%",
      model: "turbo",
      date: "27/01/2023",
      status: "pass",
    },
    {
      Id: " 5",
      name: "Cell 1",
      accuracy: "23%",
      model: "turbo",
      date: "27/01/2023",
      status: "pass",
    },
    {
      Id: " 6",
      name: "Cell 1",
      accuracy: "23%",
      model: "turbo",
      date: "27/01/2023",
      status: "pass",
    },
  ];
  const [recordPerPage, setRecordPerPage] = useState(6);

  const handleChange = (event) => {
    setRecordPerPage(event.target.value);
  };
  return (
    <div className={`${styles.experimentBox}`}>
      <div className={`flex items-center text-[13px] font-bold border-b-2`}>
        <div className={`basis-1/5 border-r-2 px-[10px] py-[34px] mr-[10px]`}>
          Name
        </div>
        <div className="basis-1/5 px-[10px] py-[34px]">Accuracy</div>
        <div className="basis-1/5 px-[10px] py-[34px]">Model</div>
        <div className="basis-1/5 px-[10px] py-[34px]">Execution Report</div>
        <div className="basis-1/5 flex items-center justify-around px-[10px] py-[34px]">
          <div>Run</div>
          <div>Actions</div>
        </div>
      </div>
      <div className="h-[580px] overflow-auto">
        {ExperimentListData.map((PromptTemplate, index) => (
          <PromptTemplateCells key={index} PromptTemplate={PromptTemplate} />
        ))}
        <div className="flex justify-end px-[20px] py-[15px] border-b-2">
          <div className="flex items-center text-[13px] text-[#000]">
            <div className="opacity-60 mr-[20px]">Rows per page:</div>
            <Box
              sx={{
                minWidth: 60,
              }}
            >
              <Select
                value={recordPerPage}
                onChange={handleChange}
                sx={{ "& > fieldset": { border: "none" } }}
              >
                <MenuItem value="6">6</MenuItem>
                <MenuItem value={"10"}>10</MenuItem>
                <MenuItem value={"20"}>20</MenuItem>
                <MenuItem value={"10"}>30</MenuItem>
                <MenuItem value={"20"}>40</MenuItem>
              </Select>
            </Box>
            <div className="mx-[25px]">1-5 of 13</div>
            <div className="flex gap-[40px]">
              <svg
                width="8"
                height="12"
                viewBox="0 0 8 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.70492 1.41L6.29492 0L0.294922 6L6.29492 12L7.70492 10.59L3.12492 6L7.70492 1.41Z"
                  fill="black"
                  fillOpacity="0.56"
                />
              </svg>
              <svg
                width="8"
                height="12"
                viewBox="0 0 8 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.70492 0L0.294922 1.41L4.87492 6L0.294922 10.59L1.70492 12L7.70492 6L1.70492 0Z"
                  fill="black"
                  fillOpacity="0.56"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PromptTemplate;
