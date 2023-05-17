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
import Link from "next/link";

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
          setPromptTemplate(PromptTemplate);
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
              className={`flex flex-row items-center max-w-[100px] rounded-[8px] h-[32px] px-[10px] ${bgColor} ${textColor}`}
            >
              <AccuracyBadge accuracy={accuracy * 100} />
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
        <div className="basis-1/5 px-[10px]">
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
              {PromptTemplate.latestEvaluationReport[0]?.status.split(".")[1]}
            </div>
          ) : (
            <div className="mb-[10px]"></div>
          )}
          {PromptTemplate.latestEvaluationReport[0]?.status ===
          "Status.COMPLETED" ? (
            <Link
              href={{
                pathname: `/experiments/${selectedExperimentInfo?.id}`,
                query: {
                  reportId: PromptTemplate.latestEvaluationReport[0]?.id,
                },
              }}
            >
              <div
                className={`flex items-center gap-[10px] z-10 cursor-pointer`}
                onClick={(e) => {
                  e.stopPropagation();
                  setShowReport(true);
                  setReportId(PromptTemplate.latestEvaluationReport[0].id);
                }}
              >
                <div className="underline">View Report</div>
                <div>
                  <ViewReportArrow />
                </div>
              </div>
            </Link>
          ) : (
            <div
              className={`flex items-center gap-[10px] z-10 opacity-60 cursor-not-allowed`}
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
        </div>

        <div className="basis-1/5 flex items-center justify-around px-[10px] z-10">
          <div>
            <Button
              variant="outlined"
              className="z-10"
              sx={{
                textTransform: "none",
              }}
              onClick={(e) => {
                e.stopPropagation();
                setShowRunModal(!showRunModal);
                setPromptTemplate(PromptTemplate);
              }}
            >
              Run
            </Button>
          </div>
          <div
            className="flex items-center gap-[20px] py-[10px] px-[10px]"
            onClick={(e) => {
              e.stopPropagation();
              handleClone();
              setPromptTemplate(PromptTemplate);
            }}
            title="Create Clone"
          >
            <Clone />
          </div>
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
