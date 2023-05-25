import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import ViewReportArrow from "../../../../assets/Svg/ViewReportArrow";
import Clone from "../../../../assets/Svg/Clone";
import Calendar from "../../../../assets/Svg/Calendar";
import RunModal from "./RunModal";
import { getFormattedDate } from "../../../../utils/DateFormates";
import { useExpContext } from "../../../../context/ExpContext";
import { useCompSelectorContext } from "../../../../context/compSelectorContext";
import { useQuery } from "@apollo/client";
import Queries from "../../../../queries/Queries";
import AccuracyBadge from "../../../../assets/Svg/AccuracyBadge";
import Pass from "../../../../assets/Svg/Pass";
import Fail from "../../../../assets/Svg/Fail";
import RunningLoader from "../../../../assets/Svg/RunningLoader";
import { useRouter } from "next/router";
import { Tooltip } from "@mui/material";
import { getUnsanitizedValue } from "../../../../utils/DecodeString";

function PromptTemplateCells({
  index,
  PromptTemplate,
  setRunSuccess,
  isRunnable,
  currentPage,
  recordPerPage,
  refetchList,
}) {
  const { setReportId, setPromptTemplate, selectedExperimentInfo } =
    useExpContext();
  const { setShowClone, setShowReport, setShowEdit, setShowAdd } =
    useCompSelectorContext();
  const [showRunModal, setShowRunModal] = useState(false);
  const accuracy = PromptTemplate.latestEvaluationReport[0]?.accuracy;
  const bgColor =
    accuracy >= 0.75
      ? "bg-[#2E7D321A]"
      : accuracy >= 0.25
      ? "bg-[#FFE6001A]"
      : "bg-[#F4825E1A]";

  const textColor =
    accuracy >= 0.75
      ? "text-[#2E7D54]"
      : accuracy >= 0.25
      ? "text-[#D9A900]"
      : "text-[#794839]";

  const {
    data: evalsAndModelOptions,
    loading: loadingOptions,
    error: errorForOptions,
  } = useQuery(Queries.getEvalAndModels);

  const {
    data: promptList,
    startPolling,
    stopPolling,
  } = useQuery(Queries.getStatusForRunPrompt, {
    variables: {
      experimentId: selectedExperimentInfo?.id,
      page: currentPage,
      limit: recordPerPage,
    },
  });

  const [startRun, setStartRun] = useState(false);
  const router = useRouter();

  const [isHover, setIsHover] = useState(false);
  useEffect(() => {
    if (startRun) {
      startPolling(10000);
    } else stopPolling();
  }, [startRun]);

  useEffect(() => {
    if (!startRun) return;

    if (
      promptList?.promptListByPagination?.prompts[index]
        ?.latestEvaluationReport[0]?.status === "Status.COMPLETED" ||
      promptList?.promptListByPagination?.prompts[index]
        ?.latestEvaluationReport[0]?.status === "Status.FAILED"
    ) {
      setStartRun(false);
      setRunSuccess(true);
    }
  }, [promptList]);

  const getConversation = (prompts) => {
    const conversation = [];
    prompts.forEach((prompt) => {
      conversation.push({ role: prompt.role, content: prompt.content });
    });
    return conversation;
  };

  const handleClone = () => {
    setShowClone(true);
    setShowAdd(true);
  };

  return (
    <>
      <div
        className={`flex items-center text-md border-b-2 cursor-pointer`}
        onClick={() => {
          setPromptTemplate(getUnsanitizedValue(PromptTemplate));
          setShowClone(false);
          setShowEdit(true);
        }}
      >
        <div className={`basis-1/5 border-r-2 px-[10px] py-[44px] mr-[10px]`}>
          {PromptTemplate.name}
        </div>
        <div className="basis-1/5 px-[10px]">
          {accuracy != null && typeof accuracy === "number" ? (
            <div
              className={`flex flex-row items-center w-max rounded-[8px] h-[32px] p-[10px] ${bgColor} ${textColor}`}
            >
              <AccuracyBadge
                accuracy={parseFloat((accuracy * 100).toFixed(2))}
              />
            </div>
          ) : (
            "--"
          )}
        </div>
        <div className="basis-1/5 px-[10px] line-clamp-2 text-ellipsis">
          {PromptTemplate.latestEvaluationReport[0] !== null
            ? PromptTemplate.latestEvaluationReport[0].model
            : "--"}
        </div>
        <div
          className="basis-1/5 px-[10px]"
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          onClick={(e) => {
            router.push({
              pathname: `/experiments/${selectedExperimentInfo?.id}`,
              query: {
                reportId: PromptTemplate.latestEvaluationReport[0]?.id,
              },
            });
            e.stopPropagation();
            setShowReport(true);
            setReportId(PromptTemplate.latestEvaluationReport[0].id);
          }}
        >
          <Tooltip
            title={
              PromptTemplate.latestEvaluationReport[0]?.status ===
              "Status.COMPLETED"
                ? "Click here to access your report"
                : "No report generated yet"
            }
          >
            <span>
          <div className="flex items-center gap-[10px]">
            <Calendar />
            <div>
              {PromptTemplate.createdAt &&
                getFormattedDate(PromptTemplate.createdAt)}
            </div>
          </div>
          {PromptTemplate.latestEvaluationReport[0] ? (
            <div className="flex items-center gap-[10px] my-[3px]">
              {(PromptTemplate.latestEvaluationReport[0]?.status ===
                "Status.COMPLETED" && <Pass />) ||
                (PromptTemplate.latestEvaluationReport[0]?.status ===
                  "Status.FAILED" && <Fail />) || <RunningLoader />}
              <div className="capitalize">
                {PromptTemplate.latestEvaluationReport[0]?.status
                  .split(".")[1]
                  .toLowerCase()}
              </div>
            </div>
          ) : (
            <div className="mb-[10px]"></div>
          )}
              {PromptTemplate.latestEvaluationReport[0]?.status ===
              "Status.COMPLETED" ? (
                <div
                  className={`flex items-center gap-[5px] z-10 cursor-pointer `}
                >
                  <div className={`underline ${isHover && "text-[#2196F3]"}`}>
                    View Report
                  </div>
                  <div>
                    <ViewReportArrow isHover={isHover} />
                  </div>
                </div>
              ) : (
                <div
                  className={`flex items-center gap-[10px] z-10 opacity-40 cursor-not-allowed`}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <div className="underline">View Report</div>
                  <div>
                    <ViewReportArrow />
                  </div>
                </div>
              )}
            </span>
          </Tooltip>
        </div>

        <div className="basis-1/5 flex items-center justify-around px-[10px]">
          <div>
            <Button
              variant="outlined"
              sx={{
                textTransform: "none",
              }}
              onClick={(e) => {
                e.stopPropagation();
                setShowRunModal(!showRunModal);
                setPromptTemplate(getUnsanitizedValue(PromptTemplate));
              }}
            >
              Run
            </Button>
          </div>
          <Tooltip title="Clone">
            <span>
              <div
                className="flex items-center gap-[20px] py-[10px] px-[10px] hover:bg-[#F8FAFB] rounded-[4px] opacity-60 hover:opacity-100"
                onClick={(e) => {
                  e.stopPropagation();
                  handleClone();
                  setPromptTemplate(getUnsanitizedValue(PromptTemplate));
                }}
              >
                <Clone />
              </div>
            </span>
          </Tooltip>
        </div>
      </div>
      <RunModal
        showRunModal={showRunModal}
        setShowRunModal={setShowRunModal}
        modelOptions={evalsAndModelOptions?.getEvalAndModels?.models}
        evalOptions={evalsAndModelOptions?.getEvalAndModels?.evals}
        isRunnable={isRunnable}
        refetchList={refetchList}
        setStartRun={setStartRun}
      />
    </>
  );
}

export default PromptTemplateCells;
