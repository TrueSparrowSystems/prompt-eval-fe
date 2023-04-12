import React from "react";
import Joyride from "react-joyride";

function ReactJoyride() {
  const steps = [
    {
      target: ".first-step",
      placement: "right",
      disableBeacon: true,
      content: (
        <div className="text-[#000] text-[13px]">
          <div className="font-bold opacity-80">Add new experiment</div>{" "}
          <div className="opacity-40">
            You can create multiple new experiments by clicking here.
          </div>
        </div>
      ),
    },
    {
      target: ".second-step",
      placement: "right",
      content: (
        <div className="text-[#000] text-[13px]">
          <div className="font-bold opacity-80">
            These are your active experiments
          </div>
          <div className="opacity-40">
            You can create, add and keep track of all your experiments here, you
            can click to rename.
          </div>
        </div>
      ),
    },
    {
      target: ".step-three",
      placement: "right",
      content: (
        <div className="text-[#000] text-[13px]">
          <div className="font-bold opacity-80">Name & description</div>{" "}
          <div className="opacity-40">
            Click to add your experiment name and description here.
          </div>
        </div>
      ),
    },
    {
      target: ".step-four",
      content: (
        <div className="text-[#000] text-[13px]">
          <div className="font-bold opacity-80">Create prompt template</div>{" "}
          <div className="opacity-40">
            Click on + Add new template to get started.
          </div>
        </div>
      ),
    },
  ];
  return (
    <Joyride
      continuous={true}
      steps={steps}
      locale={{ last: "Great", next: "Next", back: "", close: "" }}
      styles={{
        options: {
          arrowColor: "#FFFFFF",
          backgroundColor: "#FFFFFF",
          primaryColor: "#2196F3",
          textColor: "#000",
          width: 200,
          height: 150,
          zIndex: 1000,
        },
        buttonClose: {
          display: "none",
        },
        buttonNext: {
          border: 0,
          borderRadius: 4,
          fontSize: 14,
          fontWeight: 600,
          color: "#FFF",
          outline: "none",
          lineHeight: 1,
          marginTop: -10,
          paddingLeft: 60,
          paddingRight: 60,
          paddingTop: 10,
          paddingBottom: 10,
          WebkitAppearance: "none",
        },
      }}
    />
  );
}

export default ReactJoyride;
