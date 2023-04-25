import React, { useState, useRef } from "react";
import BackArrow from "../../../../assets/Svg/BackArrow";
import ReportCell from "./ReportCell";
import { useQuery } from "@apollo/client";
import Queries from "../../../../queries/Queries";
import { useExpContext } from "../../../../context/ExpContext";
import Pagination from "../../../Pagination/Pagination";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";

function Report() {
  const { reportId } = useExpContext();

  const [recordPerPage, setRecordPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  const totalCount = useRef(0);

  const startCount = (currentPage - 1) * recordPerPage + 1;
  const endCount =
    totalCount.current < startCount + recordPerPage - 1
      ? totalCount.current
      : startCount + recordPerPage - 1;

  const handleChange = (event) => {
    setRecordPerPage(event.target.value);
  };

  const handlePaginationChange = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  const { data, loading, error } = useQuery(Queries.getReportByReportId, {
    variables: {
      reportId: reportId,
      page: 1,
      limit: 10,
    },
  });
  // if (data?.promptListByPagination.totalCount) {
  //   totalCount.current = data?.promptListByPagination.totalCount;
  // }

  const [expanded, setExpanded] = useState("panel1");
  return (
    <div
      style={{
        background: " #ffffff",
        boxShadow:
          "0px 1px 3px rgba(0, 0, 0, 0.12), 0px 1px 1px rgba(0, 0, 0, 0.14),0px 2px 1px -1px rgba(0, 0, 0, 0.2)",
        borderRadius: "8px;",
        position: "absolute",
        zIndex: "100",
        top: "90px",
        width: "100%",
        height: "674px",
      }}
    >
      <div className="flex items-center gap-[10px] cursor-pointer hover:opacity-80 opacity-60 px-[30px]"  onClick={()=>{setShowReport(false);toggleTab(experimentTypes.promptTemplate)}}>
        <BackArrow />
        <div className="text-[14px] opacity-60 py-[25px]">View Report</div>
      </div>
      <div className={`flex items-center text-md font-bold border-t`}>
        <div className="w-1/6 py-[34px] px-[10px]">Test Case Name</div>
        <div className="w-4/6 pr-[10px] pl-[20px] py-[34px] border-l-2">
          Description
        </div>
        <div className="px-[10px] py-[34px]">Status</div>
      </div>
      <div className="h-[450px] overflow-auto">
        {data?.getReport?.testCaseEvaluationReport.map((report, index) => (
          <ReportCell
            key={index}
            report={report}
            index={index + 1}
            expanded={expanded}
            setExpanded={setExpanded}
          />
        ))}
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
                <MenuItem value={6}>6</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={30}>30</MenuItem>
                <MenuItem value={40}>40</MenuItem>
              </Select>
            </Box>
            <div className="mx-[25px]">
              {startCount}-{endCount} of {totalCount.current}
            </div>

            <Pagination
              handlePaginationChange={handlePaginationChange}
              pageCount={Math.ceil(
                totalCount.current && totalCount.current / recordPerPage
              )}
              initialPage={currentPage - 1}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Report;
