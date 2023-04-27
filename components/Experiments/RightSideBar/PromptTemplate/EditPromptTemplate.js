import React, { useState, useRef, useEffect } from "react";
import styles from "../ExperimentsDetails.module.scss";
import NewChat from "./NewChat";
import Button from "@mui/material/Button";
import { v4 as uuid } from "uuid";
import BackArrow from "../../../../assets/Svg/BackArrow";
import { useExpContext } from "../../../../context/ExpContext";
import { useCompSelectorContext } from "../../../../context/compSelectorContext";
import { TabNames } from "../../../../constants/TabNames";
import { useMutation } from "@apollo/client";
import Queries from "../../../../queries/Queries";
import Toast from "../../../ToastMessage/Toast";
import { MESSAGES } from "../../../../constants/Messages";

function EditePromptTemplate() {
  const { promptTemplate, selectedExperimentInfo } = useExpContext();
  const { showAdd, setShowEdit, setCurrTab } = useCompSelectorContext();
  const isTemplatedRead = useRef(false);
  const [templateName, setTemplateName] = useState(promptTemplate.name);

  const initialPrompts = [];

  const [updateTemplate, { data, loading, error }] = useMutation(
    Queries.createPromptTemplate
  );

  if (showAdd) {
    initialPrompts.push({ id: uuid(), role: "system" });
  }

  const [prompts, setPrompts] = useState(initialPrompts);
  const [prevRole, setPrevRole] = useState("system");

  const addNewPrompt = (e) => {
    e.preventDefault();
    const newRole = prevRole === "system" ? "user" : "system";
    const newPrompt = { id: uuid(), role: newRole };
    setPrompts((prompts) => [...prompts, newPrompt]);
    setPrevRole(newRole);
  };

  const removePrompt = (id) => {
    setPrompts(prompts.filter((prompt) => prompt.id !== id));
  };

  const promptsList = prompts.map((prompt) => (
    <NewChat remove={removePrompt} prompt={prompt} key={prompt.id} />
  ));

  const readPromptTemplate = () => {
    promptTemplate.conversation.map((prompt) => {
      const newPrompt = {
        role: prompt.role,
        content: prompt.content,
        id: uuid(),
      };
      setPrompts((prompts) => [...prompts, newPrompt]);
    });
  };

  const getConversation = () => {
    const conversation = [];
    prompts.forEach((prompt) => {
      conversation.push({ role: prompt.role, content: prompt.content });
    });
    return conversation;
  };

  const updatePromptTemplate = () => {
    updateTemplate({
      variables: {
        name: templateName,
        description: promptTemplate.description,
        conversation: getConversation(),
        experimentId: selectedExperimentInfo?.id,
      },
    });
  };
  if (data) {
    setTimeout(() => {
      setShowEdit(false);
      setCurrTab(TabNames.PROMPTTEMPLATE);
    }, 5000);
  }

  useEffect(() => {
    if (!isTemplatedRead.current) {
      readPromptTemplate();
    }
    isTemplatedRead.current = true;
  }, []);

  return (
    <>
      {data && <Toast msg={MESSAGES.PROMPT_TEMPLATE_UPDATED} />}
      <div className={`${styles.experimentBox}`}>
        {error && (
          <div className="flex items-center justify-center text-[20px] text-[#ff0000] tracking-[0.2px] h-[400px]">
            {error.message}
          </div>
        )}
        <div
          className="flex items-center gap-[10px] cursor-pointer hover:opacity-80 opacity-60"
          onClick={() => {
            setShowEdit(false);
          }}
        >
          <BackArrow />
          <div className="text-[14px] opacity-60 py-[25px]">
            Back to all prompt templates
          </div>
        </div>
        <input
          className="text-[20px] font-bold opacity-60 outline-none pb-[25px]"
          type="text"
          value={templateName}
          onChange={(e) => {
            setTemplateName(e.target.value);
          }}
        />
        <ul>{promptsList}</ul>
        <div className="flex gap-[25px]">
          <div className="basis-20"></div>
          <div>
            <div>
              <Button
                size="large"
                style={{ textTransform: "none", color: "#000" }}
                onClick={(e) => {
                  addNewPrompt(e);
                }}
              >
                + Add message
              </Button>
            </div>
            <Button
              onClick={() => {
                updatePromptTemplate();
              }}
              variant="contained"
              style={{
                background: "#2196F3",
                border: "1px solid rgba(0, 0, 0, 0.23)",
              }}
              sx={{ ml: "10px", textTransform: "none" }}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditePromptTemplate;
