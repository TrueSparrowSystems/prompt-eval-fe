import React, { useState, useEffect, useRef } from "react";
import PromptTemplateCells from "./PromptTemplateCells";
import styles from "../ExperimentsDetails.module.scss";
import EmptyState from "../EmptyState";
import { useQuery } from "@apollo/client";
import Queries from "../../../../queries/Queries";
import { useExpContext } from "../../../../context/ExpContext";
import { useCompSelectorContext } from "../../../../context/compSelectorContext";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import Pagination from "../../../Pagination/Pagination";

function PromptTemplate() {
  const { selectedExperimentInfo } = useExpContext();
  const { setShowEmptyState, setShowLoadingState } = useCompSelectorContext();
  const [recordPerPage, setRecordPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  const totalCount = useRef(0);
  const [runSuccess, setRunSuccess] = useState(false);

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

  const { data, loading, error, refetch } = useQuery(
    Queries.promptListByPagination,
    {
      skip:
        selectedExperimentInfo == null ||
        Object.keys(selectedExperimentInfo).length === 0,
      variables: {
        experimentId: selectedExperimentInfo?.id,
        page: currentPage,
        limit: recordPerPage,
      },
    }
  );

  const isRunnable = data?.promptListByPagination?.isRunnable;

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (data?.promptListByPagination.prompts.length === 0)
      setShowEmptyState(true);
    else if (data?.promptListByPagination.prompts.length > 0)
      setShowEmptyState(false);
  }, [data]);

  useEffect(() => {
    if (runSuccess) {
      refetch();
      setRunSuccess(false);
    }
  }, [runSuccess]);

  let delayLoad = false;

  useEffect(() => {
    if (loading) {
      setShowLoadingState(true);
      setTimeout(() => {
        delayLoad = true;
      }, 1000);
    } else setShowLoadingState(false);
  }, [loading]);

  if (data?.promptListByPagination?.totalCount) {
    totalCount.current = data?.promptListByPagination.totalCount;
  }

  if (error && selectedExperimentInfo != null) {
    return (
      <div className={`flex ${styles.experimentBox}`}>
        <div className="flex space-evenly text-[20px] text-[#ff0000] tracking-[0.2px] h-[400px]">
          {error.message}
        </div>
      </div>
    );
  }

  return (
    <div>
      {error ||
      (delayLoad && loading) ||
      data == null ||
      data?.promptListByPagination.prompts.length === 0 ? (
        <EmptyState />
      ) : (
        <div className={`${styles.experimentBox}`}>
          <div
            className={`flex items-center text-[15px] tracking-[0.2px] font-semibold border-b-2`}
          >
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
              <div>{"       "}</div>
            </div>
          </div>
          <div>
            <div className={`${styles.subBoxHeight} overflow-auto`}>
              {data?.promptListByPagination.prompts.map(
                (PromptTemplate, index) => (
                  <PromptTemplateCells
                    key={index}
                    index={index}
                    PromptTemplate={PromptTemplate}
                    runSuccess={runSuccess}
                    setRunSuccess={setRunSuccess}
                    isRunnable={isRunnable}
                    currentPage={currentPage}
                    recordPerPage={recordPerPage}
                    refetchList={refetch}
                  />
                )
              )}
            </div>
            <div className="flex justify-end px-[20px] py-[15px] border-b-2 border-t-2">
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
      )}
    </div>
  );
}

export default PromptTemplate;
