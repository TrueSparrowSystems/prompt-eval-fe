import React, { useState, useRef, useEffect } from "react";
import styles from "../ExperimentsDetails.module.scss";
import NewChat from "./NewChat";
import Button from "@mui/material/Button";
import { v4 as uuid } from "uuid";
import BackArrow from "../../../../assets/Svg/BackArrow";
import { useExpContext } from "../../../../context/ExpContext";
import { useCompSelectorContext } from "../../../../context/compSelectorContext";

function EditePromptTemplate() {
  const { promptTemplate } = useExpContext();
  const { showAdd, setShowEdit, setShowAdd } = useCompSelectorContext();
  const isTemplatedRead = useRef(false);
  const [templateName, setTemplateName] = useState("Untitled Template");

  const initialPrompts = [];

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
      const newPrompt = { role: prompt.role, content: prompt.content };
      setPrompts((prompts) => [...prompts, newPrompt]);
    });
  };

  useEffect(() => {
    if (!isTemplatedRead.current) {
      readPromptTemplate();
    }
    isTemplatedRead.current = true;
  }, []);

  return (
    <div className={`${styles.experimentBox}`}>
      <div
        className="flex items-center gap-[10px] cursor-pointer hover:opacity-80 opacity-60"
        onClick={() => {
          setShowEdit(false);
          setShowAdd(false);
        }}
      >
        <BackArrow />
        <div className="text-[14px] opacity-60 py-[25px]">
          {promptTemplate.name}
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
            variant="contained"
            style={{
              background: "#2196F3",
              border: "1px solid rgba(0, 0, 0, 0.23)",
            }}
            sx={{ ml: "10px", textTransform: "none" }}
          >
            Run Now
          </Button>
        </div>
      </div>
    </div>
  );
}

export default EditePromptTemplate;
