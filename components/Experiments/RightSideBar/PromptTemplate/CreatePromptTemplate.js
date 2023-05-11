import React, { useState } from "react";
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
import Toast from "../../../ToastMessage/Toast";
import { MESSAGES } from "../../../../constants/Messages";
import AddIcon from "../../../../assets/Svg/AddIcon";

function CreatePromptTemplate() {
  const [prevRole, setPrevRole] = useState("system");
  const { selectedExperimentInfo, promptTemplate } = useExpContext();
  const { showClone, setCurrTab, setShowAdd, setShowClone } =
    useCompSelectorContext();

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
    } catch (err) {
      return err;
    }
  };
  if (data) {
    setTimeout(() => {
      setShowAdd(false);
      setCurrTab(TabNames.PROMPTTEMPLATE);
    }, 2000);
  }

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

  const [selectedChat, setSelectedChat] = useState(prompts[0]?.id);
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  const promptsList = prompts.map((prompt) => (
    <NewChat remove={removePrompt} prompt={prompt} key={prompt.id} selectedChat={selectedChat} setSelectedChat={setSelectedChat} unsavedChanges={unsavedChanges} setUnsavedChanges={setUnsavedChanges} />
  ));

  
  return (
    <>
      {data && <Toast msg={MESSAGES.PROMPT_TEMPLATE.CREATED} />}

      <div className={`${styles.experimentBox} overflow-auto`}>
        {error ? (
          <div className="flex items-center justify-center text-[20px] text-[#ff0000] tracking-[0.2px] h-[400px]">
            {error.message}
          </div>
        ) : (
          <>
            <div
              className="flex items-center gap-[10px] cursor-pointer hover:opacity-100 opacity-80"
              onClick={() => {
                if(unsavedChanges){
                  if(!confirm("Your changes have not been saved. Are you sure you want to discard this changes?")) return;
                  setUnsavedChanges(false);
                }
                setShowAdd(false);
                setShowClone(false);
                setCurrTab(TabNames.PROMPTTEMPLATE);
              }}
            >
              <BackArrow />
              <div className="text-[15px] opacity-80 py-[25px]">
                Back to all Template
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

export default CreatePromptTemplate;
