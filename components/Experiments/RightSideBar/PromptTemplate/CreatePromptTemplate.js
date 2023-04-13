import React, { useState } from "react";
import styles from "../ExperimentsDetails.module.scss";
import NewChat from "./NewChat";
import Button from "@mui/material/Button";
import { v4 as uuid } from "uuid";

function CreatePromptTemplate() {
  const [templateName, setTemplateName] = useState("Untitled Template");
  const [prompts, setPrompts] = useState([{ id: uuid(), role: "system" }]);
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

  return (
    <div className={`${styles.experimentBox}`}>
      <div className="flex items-center gap-[10px] cursor-pointer hover:opacity-80 opacity-60">
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.7787 5.5575L10.7212 4.5L6.22119 9L10.7212 13.5L11.7787 12.4425L8.34369 9L11.7787 5.5575Z"
            fill="black"
            fillOpacity="0.6"
          />
        </svg>
        <div className="text-[14px] opacity-60 py-[25px]">Cellular exp 1</div>
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
            sx={{ ml: "10px" }}
          >
            RUN
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CreatePromptTemplate;
