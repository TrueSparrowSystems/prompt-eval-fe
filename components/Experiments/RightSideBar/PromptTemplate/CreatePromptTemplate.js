import React, { useEffect, useRef, useState } from "react";
import styles from "../ExperimentsDetails.module.scss";
import NewChat from "./NewChat";
import Button from "@mui/material/Button";
import { v4 as uuid } from "uuid";
import BackArrow from "../../../../assets/Svg/BackArrow";
import { useCompSelectorContext } from "../../../../context/compSelectorContext";
import { TabNames } from "../../../../constants/TabNames";
import { useMutation } from "@apollo/client";
import Queries from "../../../../queries/Queries";
import { useExpContext } from "../../../../context/ExpContext";

function CreatePromptTemplate() {
  const [templateName, setTemplateName] = useState("Untitled Template");
  const [prompts, setPrompts] = useState([{ id: uuid(), role: "system" }]);
  const [prevRole, setPrevRole] = useState("system");

  const { setCurrTab, setShowAdd } = useCompSelectorContext();
  const { selectedExperimentInfo } = useExpContext();

  const [createPromptTemplate, { data, loading, error }] = useMutation(
    Queries.createPromptTemplate
  );

  const isCreated = useRef(false);

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

  const handleCreate = async () => {
    try {
      await createPromptTemplate({
        variables: {
          name: templateName,
          description: "Initial Prompt Template Description",
          conversation: { role: "system", content: "newone" },
          experimentId: selectedExperimentInfo?.id,
        },
      });
    } catch (err) {
      return err;
    }
  };

  useEffect(() => {
    if (!isCreated.current) {
      handleCreate();
    }
    isCreated.current = true;
  }, []);

  return (
    <div className={`${styles.experimentBox}`}>
      <div
        className="flex items-center gap-[10px] cursor-pointer hover:opacity-100 opacity-80"
        onClick={() => {
          setShowAdd(false);
          setCurrTab(TabNames.PROMPTTEMPLATE);
        }}
      >
        <BackArrow />
        <div className="text-[14px] opacity-80 py-[25px]">Cellular exp 1</div>
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

export default CreatePromptTemplate;
