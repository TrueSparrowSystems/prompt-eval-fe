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
import { MESSAGES } from "../../../../constants/Messages";
import AddIcon from "../../../../assets/Svg/AddIcon";
import { useToastContext } from "../../../../context/ToastContext";
import ErrorAlertToast from "../../../ToastMessage/ErrorAlertToast";
import CircularProgress from "@mui/material/CircularProgress";

function EditePromptTemplate() {
  const { promptTemplate } = useExpContext();
  const { showAdd, setShowEdit, setCurrTab } = useCompSelectorContext();
  const { setShowToast, setToastMessage, setToastType } = useToastContext();
  const isTemplatedRead = useRef(false);
  const [templateName, setTemplateName] = useState(promptTemplate.name);
  const [titleOpacity, setTitleOpacity] = useState("40");

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
    const newPrompt = { id: uuid(), role: newRole, content: "" };
    setPrompts((prompts) => [...prompts, newPrompt]);
    setPrevRole(newRole);
  };

  const removePrompt = (id) => {
    setPrompts(prompts.filter((prompt) => prompt.id !== id));
  };

  const [selectedChat, setSelectedChat] = useState(null);
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  const promptsList = prompts.map((prompt) => (
    <NewChat
      remove={removePrompt}
      prompt={prompt}
      key={prompt.id}
      selectedChat={selectedChat}
      setSelectedChat={setSelectedChat}
      unsavedChanges={unsavedChanges}
      setUnsavedChanges={setUnsavedChanges}
    />
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
    try {
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

  useEffect(() => {
    if (data) {
      setShowToast(true);
      setToastMessage(MESSAGES.PROMPT_TEMPLATE.UPDATED);
      setToastType("success");
      setShowEdit(false);
      setCurrTab(TabNames.PROMPTTEMPLATE);
    }

    if (error) {
      setShowToast(true);
      setToastMessage(MESSAGES.PROMPT_TEMPLATE.UPDATE_ERROR);
      setToastType("error");
    }
  }, [data, error]);

  useEffect(() => {
    if (!isTemplatedRead.current) {
      readPromptTemplate();
    }
    isTemplatedRead.current = true;
  }, []);

  return (
    <>
      <div>
        <>
        <div className={`${styles.heading}`}>
          <div className="py-[15px]">
            <Button
              className="flex items-center gap-[5px] pl-0"
              onClick={() => {
                if (unsavedChanges) {
                  if (
                    !confirm(
                      "Your changes have not been saved. Are you sure you want to discard this changes?"
                    )
                  )
                    return;
                  setUnsavedChanges(false);
                }
                setShowEdit(false);
                setCurrTab(TabNames.PROMPTTEMPLATE);
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
          <input
            className={`text-[20px] font-bold opacity-${titleOpacity} hover:opacity-80 outline-none pb-[25px] w-full`}
            type="text"
            value={templateName}
            onChange={(e) => {
              setTemplateName(e.target.value);
              if (!unsavedChanges) setUnsavedChanges(true);
            }}
            onFocus={() => setTitleOpacity("80")}
            onBlur={() => setTitleOpacity("40")}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                e.target.blur();
              }
            }}
            maxLength={70}
          />
          </div>
          <div className={`${styles.experimentBox1}`}>
          <ul>{promptsList}</ul>
          <div className="flex gap-[25px]">
            <div className="basis-20"></div>
            <div className="pb-[37px]">
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
                  setUnsavedChanges(false);
                }}
                variant="contained"
                className="bg-[#2196F3]"
                sx={{
                  ml: "10px",
                  textTransform: "none",
                  backgroundColor: "#2196F3",
                  border: "1px solid rgba(0, 0, 0, 0.23)",
                }}
                disabled={loading}
              >
                Save
                {loading && (
                  <CircularProgress
                    size={24}
                    sx={{
                      color: "#2196F3",
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      marginTop: "-12px",
                      marginLeft: "-15px",
                    }}
                  />
                )}
              </Button>
            </div>
          </div>
          </div>
          {error && <ErrorAlertToast message={error.message} />}
        </>
      </div>
    </>
  );
}

export default EditePromptTemplate;
