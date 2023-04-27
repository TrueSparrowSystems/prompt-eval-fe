import React, { useState, useEffect, useRef } from "react";
import styles from "../ExperimentsDetails.module.scss";
import BackArrow from "../../../../assets/Svg/BackArrow";
import { useCompSelectorContext } from "../../../../context/compSelectorContext";
import { useExpContext } from "../../../../context/ExpContext";
import { useMutation } from "@apollo/client";
import Queries from "../../../../queries/Queries";
import UpdateTemplateSkeleton from "../../../Skeletons/UpdateTemplateSkeleton";
import Toast from "../../../ToastMessage/Toast";
import { MESSAGES } from "../../../../constants/Messages";

function ClonePromptTemplate() {
  const isCloned = useRef(false);
  const { promptTemplate, selectedExperimentInfo } = useExpContext();
  const { setShowClone } = useCompSelectorContext();
  const [templateName, setTemplateName] = useState("Untitled Template copy");

  const [createPromptTemplate, { data, loading, error }] = useMutation(
    Queries.createPromptTemplate
  );

  useEffect(() => {
    if (!isCloned.current) {
      createPromptTemplate({
        variables: {
          name: "Untitled Prompt Template",
          description: "Initial Prompt Template Description",
          conversation: { role: "system", content: "newone" },
          experimentId: selectedExperimentInfo?.id,
        },
      });
    }
    isCloned.current = true;
  }, []);

  return (
    <>
      {loading ? (
        <UpdateTemplateSkeleton />
      ) : (
        <>
          <Toast msg={MESSAGES.PROMPT_TEMPLATE_CLONED}/>
          <div className={`${styles.experimentBox}`}>
            <div
              className="flex items-center gap-[10px] cursor-pointer hover:opacity-80 opacity-60"
              onClick={() => {
                setShowClone(false);
              }}
            >
              <BackArrow />
              <div className="text-[14px] opacity-60 py-[25px]">
                Back to prompt templates
              </div>
            </div>
            <input
              className="text-[20px] font-bold opacity-60 outline-none pb-[25px] w-1/3"
              type="text"
              value={templateName}
              onChange={(e) => {
                setTemplateName(e.target.value);
              }}
            />
            {promptTemplate.conversation.map((chat) => (
              <div className="flex p-2">
                <div className="uppercase cursor-pointer text-md hover:bg-[#fff] p-[10px] h-[40px] basis-20">
                  {chat.role}
                </div>
                <textarea
                  className={`w-full border rounded-[4px] h-[120px] p-[10px] ml-[40px] mr-[10px] outline-none`}
                  value={chat.content}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}

export default ClonePromptTemplate;
