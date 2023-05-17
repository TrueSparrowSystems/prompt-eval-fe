import React, { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import RightArrow from "../../../../assets/Svg/RightArrow";
import LeftArrow from "../../../../assets/Svg/LeftArrow";

function PaginationUI() {
  const [recordPerPage, setRecordPerPage] = useState(6);

  const handleChange = (event) => {
    setRecordPerPage(event.target.value);
  };
  
  return (
    <div className="flex justify-end px-[20px] py-[15px] border-b-2">
      <div className="flex items-center text-md text-[#000]">
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
        <div className="flex gap-[40px] items-center">
          <RightArrow />
          <LeftArrow />
        </div>
      </div>
    </div>
  );
}

export default PaginationUI;
