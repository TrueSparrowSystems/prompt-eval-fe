import { useState } from "react";
import Modal from "react-modal";
import RunPromptIcon from "../../../../assets/Svg/RunPromptIcon";
import CrossIcon from "../../../../assets/Svg/CrossIcon";
import { ExpandMore } from "@mui/icons-material";
import Button from "@mui/material/Button";
import { Select, MenuItem } from "@mui/material";

export default function RunModal({ showRunModal, setShowRunModal }) {
  const [model, setModel] = useState("GPT3 Turbo");
  const [evaluation, setEvaluation] = useState("GraphQL");
  const customStyle = {
    content: {
      inset: "0",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      position: "absolute",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: "20",
    },
  };

  return (
    <Modal
      isOpen={showRunModal}
      style={customStyle}
      className="flex item-center"
    >
      <div className="absolute w-[489px] h-[381px] bg-white py-[32px] px-[33px]">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row">
            <RunPromptIcon />
            <span className="font-[600] text-[15px] ml-[10px]">Run Prompt</span>
          </div>
          <button onClick={() => setShowRunModal(!showRunModal)}>
            <CrossIcon />
          </button>
        </div>
        <div className="mt-[8px] font-400 text-[13px] text-[#00000099]">
          Select your configurable variables to Run the prompt with.
        </div>
        <div className="mt-[24px] font-400 text-[13px] text-[#000000]">
          Model
        </div>
        <div className="mt-[6px] font-400 text-[13px] text-[#000000]">
          <Select
            className="w-[425px] h-[48px] rounded-[4px] outline-none"
            IconComponent={(props) => (
              <div {...props}>
                <ExpandMore />
              </div>
            )}
            value={model}
            onChange={(e) => setModel(e.target.value)}
          >
            <MenuItem
              value="GPT3 Turbo"
              selected={true}
              style={{ backgroundColor: "#F8FAFB" }}
            >
              GPT3 Turbo
            </MenuItem>
            <MenuItem value="A" style={{ color: "#00000099" }}>
              A
            </MenuItem>
            <MenuItem value="B" style={{ color: "#00000099" }}>
              B
            </MenuItem>
            <MenuItem value="C" style={{ color: "#00000099" }}>
              C
            </MenuItem>
            <MenuItem value="D" style={{ color: "#00000099" }}>
              D
            </MenuItem>
          </Select>
        </div>
        <div className="mt-[20px] font-400 text-[13px] text-[#000000]">
          Evaluation
        </div>
        <div className="mt-[6px] font-400 text-[13px] text-[#000000]">
          <Select
            className="w-[425px] h-[48px] rounded-[4px] outline-none cursor-pointer"
            IconComponent={(props) => (
              <div {...props}>
                <ExpandMore />
              </div>
            )}
            value={evaluation}
            onChange={(e) => setEvaluation(e.target.value)}
          >
            <MenuItem
              value="GraphQL"
              selected={true}
              style={{ backgroundColor: "#F8FAFB" }}
            >
              GraphQL
            </MenuItem>
            <MenuItem value="A" style={{ color: "#00000099" }}>
              A
            </MenuItem>
            <MenuItem value="B" style={{ color: "#00000099" }}>
              B
            </MenuItem>
            <MenuItem value="C" style={{ color: "#00000099" }}>
              C
            </MenuItem>
            <MenuItem value="D" style={{ color: "#00000099" }}>
              D
            </MenuItem>
          </Select>
        </div>
        <div className="flex flex-row item-center">
          <Button
            variant="contained"
            style={{
              background: "#2196F3",
            }}
            sx={{
              mt: "32px",
              textTransform: "none",
              width: "425px",
              height: "36px",
              boxShadow:
                "0px 1px 5px rgba(0, 0, 0, 0.12), 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.2)",
              bordeRadius: "4px",
            }}
          >
            Run
          </Button>
        </div>
      </div>
    </Modal>
  );
}
