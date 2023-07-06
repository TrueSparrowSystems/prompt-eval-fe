import React, { useState, useEffect, useRef } from "react";
import styles from "../ExperimentsDetails.module.scss";
import NewChat from "./NewChat";
import Button from "@mui/material/Button";
import { v4 as uuid } from "uuid";
import BackArrow from "../../../../assets/Svg/BackArrow";
import { useCompSelectorContext } from "../../../../context/compSelectorContext";
import { TabNames } from "../../../../constants/TabNames";
import { useExpContext } from "../../../../context/ExpContext";
import { useMutation } from "@apollo/client";
import Queries from "../../../../queries/Queries";
import { useToastContext } from "../../../../context/ToastContext";
import { MESSAGES } from "../../../../constants/Messages";
import AddIcon from "../../../../assets/Svg/AddIcon";
import CircularProgress from "@mui/material/CircularProgress";
import ErrorAlertToast from "../../../ToastMessage/ErrorAlertToast";
import Rename from "../../../../assets/Svg/Rename";

function CreatePromptTemplate({ setCurrentPage }) {
  const [prevRole, setPrevRole] = useState("system");
  const { selectedExperimentInfo, promptTemplate } = useExpContext();
  const { showClone, setCurrTab, showAdd, setShowAdd, setShowClone } =
    useCompSelectorContext();
  const { setShowToast, setToastMessage, setToastType } = useToastContext();

  const [templateName, setTemplateName] = useState(
    showClone ? promptTemplate.name + " Copy" : "Untitled Template"
  );

  const [createPromptTemplate, { data, loading, error }] = useMutation(
    Queries.createPromptTemplate
  );

  const readConversation = (conversation) => {
    let allChat = [];
    conversation.forEach((convs, index) => {
      const chat = {
        id: uuid(),
        role: convs.role,
        content: convs.content,
      };
      allChat.push(chat);
    });

    return allChat;
  };

  const [prompts, setPrompts] = useState(
    showClone
      ? readConversation(promptTemplate.conversation)
      : [{ id: uuid(), role: "system", content: "" }]
  );

  const getConversation = () => {
    const conversation = [];
    prompts.forEach((prompt) => {
      conversation.push({ role: prompt.role, content: prompt.content });
    });
    return conversation;
  };

  const createNewPromptTemplate = async () => {
    try {
      await createPromptTemplate({
        variables: {
          name: templateName,
          description: "Initial Prompt Template Description",
          conversation: getConversation(),
          experimentId: selectedExperimentInfo?.id,
        },
      });
      setCurrentPage(1);
    } catch (err) {
      return err;
    }
  };

  useEffect(() => {
    if (data) {
      setShowToast(true);
      setToastMessage(
        showClone
          ? MESSAGES.PROMPT_TEMPLATE.CLONED
          : MESSAGES.PROMPT_TEMPLATE.CREATED
      );
      setToastType("success");
      setShowAdd(false);
      setShowClone(false);
      setCurrTab(TabNames.PROMPTTEMPLATE);
    }

    if (error) {
      setShowToast(true);
      setToastMessage(
        showClone
          ? MESSAGES.PROMPT_TEMPLATE.CLONE_ERROR
          : MESSAGES.PROMPT_TEMPLATE.CREATE_ERROR
      );
      setToastType("error");
    }
  }, [data, error]);

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

  const [showEditIcon, setShowEditIcon] = useState(false);
  const [editable, setEditable] = useState(false);

  useEffect(() => {
    if (editable) inputRef.current.focus();
  }, [editable]);

  const inputRef = useRef(null);

  return (
    <>
      <div>
        <>
          <div className={`${styles.heading}`}>
            <div className=" py-[15px]">
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
                  setShowAdd(false);
                  setShowClone(false);
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
            <div
              className={`flex items-center gap-[10px] p-[8px] cursor-pointer mb-[22px] ${
                showEditIcon ? "bg-[#F0F0F0]" : ""
              } rounded-[8px]`}
              onMouseEnter={() => setShowEditIcon(true)}
              onMouseLeave={() => {
                if (!editable) setShowEditIcon(false);
              }}
              onClick={() => {
                setEditable(true);
              }}
            >
              <input
                ref={inputRef}
                className={`text-[#00000099] w-full focus:outline-none outline-none text-ellipsis pl-[5px] text-[20px] 
                ${showEditIcon ? "bg-[#F0F0F0]" : "bg-white"}
                ${editable?"font-medium":"font-semibold"}
                cursor-pointer
                `}
                type="text"
                value={templateName}
                onChange={(e) => {
                  setTemplateName(e.target.value);
                  if (!unsavedChanges) setUnsavedChanges(true);
                }}
                onBlur={() => {
                  setEditable(false);
                  setShowEditIcon(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    e.target.blur();
                    setEditable(false);
                    setShowEditIcon(false);
                  }
                }}
                maxLength={70}
                disabled={!editable}
              />
              <button
                className={`ml-auto p-[5px] ${
                  showEditIcon ? "opacity-100" : "opacity-0"
                }`}
                title="Rename"
                onClick={() => {
                  setEditable(true);
                }}
              >
                <Rename />
              </button>
            </div>
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
                  variant="contained"
                  onClick={() => {
                    createNewPromptTemplate();
                    setUnsavedChanges(false);
                  }}
                  className="bg-[#2196F3]"
                  sx={{
                    ml: "10px",
                    textTransform: "none",
                    backgroundColor: "#2196F3",
                    border: "1px solid rgba(0, 0, 0, 0.23)",
                  }}
                  disabled={loading}
                >
                  {showAdd && !showClone ? "Create" : "Clone template"}
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

export default CreatePromptTemplate;
