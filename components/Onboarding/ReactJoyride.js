import React, { useEffect, useState } from "react";
import Joyride from "react-joyride";
import CloseTooltip from "../../assets/Svg/CloseTooltip";

function ReactJoyride() {
  const [showCross, setShowCross] = useState(false);
  const [showJoyRide, setShowJoyRide] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("onBoardingKey") === "false") {
      setShowJoyRide(true);
    }

    if (localStorage.getItem("onBoardingWithExitButton") === "true") {
      setShowCross(true);
    }

    return () => {
      localStorage.removeItem("onBoardingWithExitButton");
    };
  }, []);

  const callback = (data) => {
    if (
      data.action === "close" ||
      data.action === "skip" ||
      data.action === "reset"
    ) {
      setShowJoyRide(false);
      localStorage.setItem("onBoardingKey", "true");
    }
  };

  const steps = [
    {
      target: ".first-step",
      placement: "right",
      disableBeacon: true,
      content: (
        <div className="text-[#000] text-md">
          <div className="flex flex-row justify-between items-baseline">
            <div className="font-bold opacity-80 mb-[8px]">
              Add new experiment
            </div>
            <button
              onClick={() => {
                setShowJoyRide(false);
                localStorage.setItem("onBoardingKey", "true");
              }}
            >
              <CloseTooltip />
            </button>
          </div>

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
        <div className="text-[#000] text-md">
          <div className="flex flex-row justify-between items-baseline">
            <div className="font-bold opacity-80 mb-[8px]">
              These are your active experiments
            </div>
            <button
              onClick={() => {
                setShowJoyRide(false);
                localStorage.setItem("onBoardingKey", "true");
              }}
            >
              <CloseTooltip />
            </button>
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
        <div className="text-[#000] text-md">
          <div className="flex flex-row justify-between items-baseline">
            <div className="font-bold opacity-80 mb-[8px]">
              Name & description
            </div>
            <button
              onClick={() => {
                setShowJoyRide(false);
                localStorage.setItem("onBoardingKey", "true");
              }}
            >
              <CloseTooltip />
            </button>
          </div>{" "}
          <div className="opacity-40">
            Click to add your experiment name and description here.
          </div>
        </div>
      ),
    },
    {
      target: ".step-four",
      content: (
        <div className="text-[#000] text-md">
          <div className="flex flex-row justify-between items-baseline">
            <div className="font-bold opacity-80 mb-[8px]">
              Create prompt template
            </div>
            <button
              onClick={() => {
                setShowJoyRide(false);
                localStorage.setItem("onBoardingKey", "true");
              }}
            >
              <CloseTooltip />
            </button>
          </div>{" "}
          <div className="opacity-40">
            Click on + Add new template to get started.
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
      {showJoyRide && (
        <Joyride
          run={showJoyRide}
          callback={callback}
          continuous={true}
          steps={steps}
          locale={{ last: "Great", next: "Next", back: "", close: "" }}
          disableOverlayClose={true}
          hideBackButton={true}
          styles={{
            options: {
              arrowColor: "#FFFFFF",
              backgroundColor: "#FFFFFF",
              primaryColor: "#2196F3",
              textColor: "#000",
              width: 215,
              zIndex: 1000,
              textAlign: "left",
              padding: "16px",
            },
            spotlight: {
              margin: 0,
              padding: 0,
            },
            buttonClose: {
              display: "none",
            },
            tooltipContent: {
              padding: "0px",
              textAlign: "left",
            },
            buttonNext: {
              border: 0,
              borderRadius: 4,
              fontSize: 14,
              fontWeight: 600,
              color: "#FFF",
              outline: "none",
              flexDirection: "column",
              lineHeight: 1,
              paddingLeft: 70,
              paddingRight: 70,
              paddingTop: 10,
              paddingBottom: 10,
              WebkitAppearance: "none",
              position: "relative",
              margin: "auto",
              width: "100%",
            },
            tooltip: {
              borderRadius: 8,
            },
          }}
        />
      )}
    </>
  );
}

export default ReactJoyride;
