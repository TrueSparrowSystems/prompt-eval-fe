import React, { useState } from "react";
import Button from "@mui/material/Button";
import ViewReportArrow from "../../../../assets/Svg/ViewReportArrow";
import Clone from "../../../../assets/Svg/Clone";
import Calendar from "../../../../assets/Svg/Calendar";
import RunModal from "./RunModal";
import { getFormattedDate } from "../../../../utils/DateFormates";
import { useExpContext } from "../../../../context/ExpContext";
import { useCompSelectorContext } from "../../../../context/compSelectorContext";
import { useMutation } from "@apollo/client";
import Queries from "../../../../queries/Queries";
import AccuracyBadge from "../../../../assets/Svg/AccuracyBadge";
import { MESSAGES } from "../../../../constants/Messages";
import Toast from "../../../ToastMessage/Toast";

function PromptTemplateCells({ PromptTemplate, setRunSuccess }) {
  const { setReportId, setPromptTemplate, selectedExperimentInfo } =
    useExpContext();
  const { showClone, setShowClone, setShowReport, setShowEdit } =
    useCompSelectorContext();
  const [showRunModal, setShowRunModal] = useState(false);
  const accuracy = PromptTemplate.latestEvaluationReport[0]?.accuracy;
  const bgColor =
    accuracy >= 75
      ? "bg-[#2E7D321A]"
      : accuracy >= 25
      ? "bg-[#FFE6001A]"
      : "bg-[#F4825E1A]";
  const textColor =
    accuracy >= 75
      ? "text-[#2E7D54]"
      : accuracy >= 25
      ? "text-[#D9A900]"
      : "text-[#794839]";
  const [createPromptTemplate, { data, loading, error }] = useMutation(
    Queries.createPromptTemplate
  );

  const getConversation = (prompts) => {
    const conversation = [];
    prompts.forEach((prompt) => {
      conversation.push({ role: prompt.role, content: prompt.content });
    });
    return conversation;
  };

  const handleClone = () => {
    createPromptTemplate({
      variables: {
        name: "Untitled Template copy",
        description: PromptTemplate?.description,
        conversation: getConversation(PromptTemplate?.conversation),
        experimentId: selectedExperimentInfo?.id,
      },
    });
  };

  if (data) {
    const templateData = data?.createPromptTemplate?.promptTemplate;
    setPromptTemplate(templateData);
    setShowClone(true);
    setShowEdit(true);
  }

  return (
    <>
      {showClone && <Toast msg={MESSAGES.PROMPT_TEMPLATE.CLONED} />}
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
          {accuracy !== null && typeof accuracy === "number" ? (
            <div
              className={`flex flex-row items-center max-w-[100px] rounded-[8px] h-[32px] px-[10px] ${bgColor} ${textColor}`}
            >
              <AccuracyBadge accuracy={accuracy} />
            </div>
          ) : (
            "--"
          )}
        </div>
        <div className="basis-1/5 px-[10px]">
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
          <div
            className={`flex items-center gap-[10px] mt-[10px] z-10 ${
              PromptTemplate.latestEvaluationReport[0] !== null
                ? "cursor-pointer"
                : "opacity-60 cursor-not-allowed"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              if (PromptTemplate.latestEvaluationReport[0] !== null) {
                setShowReport(true);
                setReportId(PromptTemplate.latestEvaluationReport[0].id);
              }
            }}
          >
            <div className="underline">View Report</div>
            <div>
              <ViewReportArrow />
            </div>
          </div>
        </div>

        <div className="basis-1/5 flex items-center justify-around px-[10px] z-10">
          <div>
            <Button
              variant="outlined"
              className="z-10"
              sx={{ textTransform: "none" }}
              onClick={(e) => {
                e.stopPropagation();
                setShowRunModal(!showRunModal);
                setPromptTemplate(PromptTemplate);
              }}
            >
              Run
            </Button>
          </div>
          <div className="flex items-center gap-[20px]">
            <div
              onClick={(e) => {
                e.stopPropagation();
                handleClone();
              }}
              title="Create Clone"
            >
              <Clone />
            </div>
          </div>
        </div>
      </div>
      <RunModal
        showRunModal={showRunModal}
        setShowRunModal={setShowRunModal}
        setRunSuccess={setRunSuccess}
      />
    </>
  );
}

export default PromptTemplateCells;
