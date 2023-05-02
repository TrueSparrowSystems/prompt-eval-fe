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
import AddIcon from "../../../../assets/Svg/AddIcon";

function EditePromptTemplate() {
  const { promptTemplate } = useExpContext();
  const { showAdd, setShowEdit, setCurrTab, showClone } = useCompSelectorContext();
  const isTemplatedRead = useRef(false);
  const [templateName, setTemplateName] = useState(promptTemplate.name);

  const initialPrompts = [];

  const [updateTemplate, { data, loading, error }] = useMutation(
    Queries.updatePromptTemplate
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

  const updatePromptTemplate = async () => {
    try{
      await updateTemplate({
        variables: {
          name: templateName,
          description: promptTemplate.description,
          conversation: getConversation(),
          id: promptTemplate?.id,
        },
      });
    } catch (err) {
      return err;
    }
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
      {data && (
        <Toast
          msg={
            showClone
              ? MESSAGES.PROMPT_TEMPLATE_CLONED
              : MESSAGES.PROMPT_TEMPLATE_UPDATED
          }
        />
      )}
      <div className={`${styles.experimentBox} overflow-auto`}>
        {error ? (
          <div className="flex items-center justify-center text-[20px] text-[#ff0000] tracking-[0.2px] h-[400px]">
            {error.message}
          </div>
        ) : (
          <>
            <div
              className="flex items-center gap-[10px] cursor-pointer hover:opacity-80 opacity-60"
              onClick={() => {
                setShowEdit(false);
              }}
              variant="contained"
              style={{
                background: "#2196F3",
                border: "1px solid rgba(0, 0, 0, 0.23)",
              }}
              sx={{ ml: "10px", textTransform: "none" }}
            >
              <BackArrow />
              <div className="text-[15px] opacity-60 py-[25px]">
                Back to all prompt templates
              </div>
            </div>
            <input
              className="text-[20px] font-bold opacity-60 outline-none pb-[25px] w-full"
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
                <div className="ml-[15px] mt-[8px] mb-[15px]">
                  <Button
                    size="large"
                    style={{
                      textTransform: "none",
                      color: "#000",
                      fontSize: "14px",
                      opacity: "0.8",
                    }}
                    onClick={(e) => {
                      addNewPrompt(e);
                    }}
                  >
                    <AddIcon className="fill-black mr-[12px]" /> Add message
                  </Button>
                </div>
                <Button
                  onClick={() => {
                    updatePromptTemplate();
                  }}
                  variant="contained"
                  className="bg-[#2196F3]"
                  sx={{
                    ml: "10px",
                    textTransform: "none",
                    backgroundColor: "#2196F3",
                    border: "1px solid rgba(0, 0, 0, 0.23)",
                  }}
                >
                  Save
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default EditePromptTemplate;
