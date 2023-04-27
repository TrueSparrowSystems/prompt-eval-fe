import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import ViewReportArrow from "../../../../assets/Svg/ViewReportArrow";
import Clone from "../../../../assets/Svg/Clone";
import Edit from "../../../../assets/Svg/Edit";
import Calendar from "../../../../assets/Svg/Calendar";
import RunModal from "./RunModal";
import { getFormattedDate } from "../../../../utils/DateFormates";
import { useExpContext } from "../../../../context/ExpContext";
import { useCompSelectorContext } from "../../../../context/compSelectorContext";
import { useMutation } from "@apollo/client";
import Queries from "../../../../queries/Queries";

function PromptTemplateCells({ PromptTemplate }) {
  const { setReportId, setPromptTemplate, selectedExperimentInfo } =
    useExpContext();
  const { setShowClone, setShowReport, setShowEdit } = useCompSelectorContext();
  const [showRunModal, setShowRunModal] = useState(false);

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
    <div className={`flex items-center text-md border-b-2`}>
      <div className={`basis-1/5 border-r-2 px-[10px] py-[44px] mr-[10px]`}>
        {PromptTemplate.name}
      </div>
      <div className="basis-1/5 px-[10px]">
        {PromptTemplate.latestEvaluationReport[0] !== null
          ? PromptTemplate.latestEvaluationReport[0].accuracy + "%"
          : "--"}
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
          className={`flex items-center gap-[10px] mt-[10px] ${
            PromptTemplate.latestEvaluationReport[0] !== null
              ? "cursor-pointer"
              : ""
          }`}
          onClick={() => {
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

      <div className="basis-1/5 flex items-center justify-around px-[10px]">
        <div>
          <Button
            variant="outlined"
            sx={{ textTransform: "none" }}
            onClick={(e) => {
              setShowRunModal(!showRunModal);
            }}
          >
            Run
          </Button>
          <RunModal
            showRunModal={showRunModal}
            setShowRunModal={setShowRunModal}
          />
        </div>
        <div className="flex items-center gap-[20px]">
          <div
            onClick={() => {
              handleClone();
            }}
          >
            <Clone />
          </div>
          <div
            onClick={() => {
              setPromptTemplate(PromptTemplate);
              setShowClone(false);
              setShowEdit(true);
            }}
          >
            <Edit />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PromptTemplateCells;
