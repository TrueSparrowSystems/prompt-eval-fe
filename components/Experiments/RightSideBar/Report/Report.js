import React, { useState, useRef, useEffect } from "react";
import BackArrow from "../../../../assets/Svg/BackArrow";
import ReportCell from "./ReportCell";
import { useQuery } from "@apollo/client";
import Queries from "../../../../queries/Queries";
import { useExpContext } from "../../../../context/ExpContext";
import Pagination from "../../../Pagination/Pagination";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import { useCompSelectorContext } from "../../../../context/compSelectorContext";
import { TabNames } from "../../../../constants/TabNames";
import styles from "../ExperimentsDetails.module.scss";
import { useRouter } from "next/router";
import EmptyState from "../EmptyState";
import ErrorAlertToast from "../../../ToastMessage/ErrorAlertToast";
import { Button } from "@mui/material";
import { getUnsanitizedValue } from "../../../../utils/DecodeString";

function Report() {
  const { reportId } = useExpContext();

  const { setShowReport, setCurrTab, setShowLoadingState } =
    useCompSelectorContext();

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

  const { data, loading, error, refetch } = useQuery(
    Queries.getReportByReportId,
    {
      variables: {
        reportId: reportId,
        page: currentPage,
        limit: recordPerPage,
      },
    }
  );

  useEffect(() => {
    if (
      data?.getReport?.testCaseEvaluationReport.length === 0 &&
      currentPage > 1
    ) {
      setCurrentPage(currentPage - 1);
    }
  }, [data]);

  useEffect(() => {
    refetch();
  }, [currentPage, recordPerPage]);

  if (data?.getReport?.totalCount) {
    totalCount.current = data?.getReport.totalCount;
  }

  const [expanded, setExpanded] = useState();

  const router = useRouter();

  useEffect(() => {
    if (loading) {
      setShowLoadingState(true);
    } else setShowLoadingState(false);
  }, [loading]);

  return (
    <div>
      {loading ||
      data == null ||
      data?.getReport.testCaseEvaluationReport?.length === 0 ? (
        <EmptyState />
      ) : (
        <div
          style={error == null ? { height: "auto" } : {}}
        >
          {error ? (
            <div
              style={{ height: `calc(100vh - 300px)`, overflow: "auto" }}
              className="break-all"
            >
              <ErrorAlertToast message={error?.message} showCrossIcon={false} />
            </div>
          ) : (
            <>
            <div className={`${styles.heading}`}>
              <div className="py-[15px]">
                <Button
                  className="flex items-center gap-[5px] pl-0"
                  onClick={() => {
                    setShowReport(false);
                    setCurrTab(TabNames.PROMPTTEMPLATE);
                    router.back();
                  }}
                  sx={{
                    textTransform: "none",
                    color: "#2196F3",
                  }}
                >
                  <BackArrow isBlue={true} />
                  Back to Prompt Templates
                </Button>
              </div>
              <div
                className={`flex items-center text-[15px] tracking-[0.2px] font-semibold border-t border-b`}
              >
                <div className="w-1/6 py-[34px] px-[10px]">Test Case Name</div>
                <div className="w-4/6 pr-[10px] pl-[20px] py-[34px] border-l-2">
                  Description
                </div>
                <div className="px-[10px] py-[34px]">Status</div>
              </div>
              </div>
              <div className={`${styles.experimentBox1}`}>
                <div className={`${styles.Box}`}>
                  {data?.getReport?.testCaseEvaluationReport.map(
                    (report, index) => (
                      <ReportCell
                        key={index}
                        report={getUnsanitizedValue(report)}
                        index={index + 1}
                        expanded={expanded}
                        setExpanded={setExpanded}
                      />
                    )
                  )}
                </div>
                <div className="flex justify-end px-[20px] py-[15px] border-t-2 border-b-2">
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
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Report;
