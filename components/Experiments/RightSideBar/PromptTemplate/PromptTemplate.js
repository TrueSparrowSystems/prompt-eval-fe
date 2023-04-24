import React, { useState, useEffect } from "react";
import PromptTemplateCells from "./PromptTemplateCells";
import styles from "../ExperimentsDetails.module.scss";
import EmptyState from "../EmptyState";
import PaginationUI from "./PaginationUI";
import { useQuery } from "@apollo/client";
import Queries from "../../../../queries/Queries";
import { useExpContext } from "../../../../context/ExpContext";
import LoadingState from "../../LoadingState";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import Pagination from "../../../Pagination/Pagination";

function PromptTemplate({ setReportId, setShowReport }) {
  const { selectedExperimentInfo } = useExpContext();
  const [recordPerPage, setRecordPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(0);

  const startCount = currentPage * recordPerPage + 1;
  const endCount = startCount + recordPerPage - 1;

  const handleChange = (event) => {
    setRecordPerPage(event.target.value);
  };

  const handlePaginationChange = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  const { data, loading, error, refetch } = useQuery(
    Queries.promptListByPagination,
    {
      variables: {
        experimentId: selectedExperimentInfo?.id,
        page: currentPage,
        limit: recordPerPage,
      },
    }
  );

  useEffect(() => {
    refetch();
  }, []);

  if (loading) {
    return <LoadingState />;
  }
  return (
    <div>
      {loading || error || data?.promptListByPagination.totalCount === 0 ? (
        <EmptyState />
      ) : (
        <div className={`${styles.experimentBox}  max-h-[674px] overflow-auto`}>
          <div className={`flex items-center text-md font-bold border-b-2`}>
            <div
              className={`basis-1/5 border-r-2 px-[10px] py-[34px] mr-[10px]`}
            >
              Name
            </div>
            <div className="basis-1/5 px-[10px] py-[34px]">Accuracy</div>
            <div className="basis-1/5 px-[10px] py-[34px]">Model</div>
            <div className="basis-1/5 px-[10px] py-[34px]">
              Execution Report
            </div>
            <div className="basis-1/5 flex items-center justify-around px-[10px] py-[34px]">
              <div>Run</div>
              <div>Actions</div>
            </div>
          </div>
          <div className="h-[580px] overflow-auto">
            {data?.promptListByPagination.prompts.map(
              (PromptTemplate, index) => (
                <PromptTemplateCells
                  key={index}
                  PromptTemplate={PromptTemplate}
                  setShowReport={setShowReport}
                  setReportId={setReportId}
                />
              )
            )}
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
                    <MenuItem value={10}>30</MenuItem>
                    <MenuItem value={20}>40</MenuItem>
                  </Select>
                </Box>
                <div className="mx-[25px]">
                  {startCount}-{endCount} of{" "}
                  {data?.promptListByPagination.totalCount}
                </div>

                <Pagination
                  handlePaginationChange={handlePaginationChange}
                  pageCount={Math.ceil(
                    data?.promptListByPagination.totalCount / recordPerPage
                  )}
                  initialPage={currentPage}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PromptTemplate;
