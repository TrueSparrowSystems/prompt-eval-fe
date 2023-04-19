import { useEffect, useRef, useState } from "react";
import Button from "@mui/material/Button";
import HorizontalLine from "../../../../assets/Svg/HorizontalLine";
import HorzLineWithAddIcon from "../../../../assets/Svg/HorzLineWithAddIcon";
export default function TestCaseInfo({ value, isClicked, data }) {
  const [variableName, setVariableName] = useState(
    data?.dynamicVarValues[0]?.key
  );
  const [variableValue, setVariableValue] = useState(
    data?.dynamicVarValues[0]?.value
  );
  const [acceptedResult, setAcceptedResult] = useState(data?.expectedResult[0]);
  const [testCaseName, setTestCaseName] = useState(data?.name);
  const [testCaseDescription, setTestCaseDescription] = useState(
    data?.description
  );
  const scrollRef = useRef(null);

  useEffect(() => {
    
    if (isClicked) {
      moveToTop(value);
    }
  }, [isClicked]);

  async function moveToTop(Id) {
    const element = document.getElementById(Id);

    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });

    let ele = document.getElementById("cont");

    const containerPosition =
      ele.getBoundingClientRect().top + window.pageYOffset;
    let extraPadding = ele.getBoundingClientRect().height - containerPosition;
    ele.style.paddingBottom = extraPadding + "px";
  }

  const handleScroll = async (e) => {
    let container = scrollRef.current;

    const tabsRect = container.getBoundingClientRect();
    const tabsTop = Math.trunc(tabsRect.top);
    const tabsBottom = Math.trunc(tabsRect.bottom);
    let tabElements = container.querySelectorAll(".tab");

    for (let index = 0; index < tabElements.length; index++) {
      let tabElement = tabElements[index];
      const tabRect = tabElement.getBoundingClientRect();
      const tabeTop = tabRect.top;
      const tabeBottom = tabRect.bottom;
      
      //needs to solve this problem
      if (tabsTop <= tabeTop) {
        
        return;
      }
    }
  };

  <textarea className="w-full border rounded-[4px] h-[120px] p-[10px] outline-none my-[30px]" />;
  const addTextBox = () => {
    let titleBox = document.createElement("input");
    titleBox.className="text-[14px] font-[500px] leading-[24px] tracking-[0.17px] text-black/[0.8]";
    titleBox.placeholder="Untitled Result";

    let textBox = document.createElement("textarea");
    textBox.className =
      "w-full border rounded-[4px] h-[120px] p-[10px] outline-none my-[30px]";
    textBox.placeholder =
      "Define template variables in {‘variable_name’} format within the prompt.";
    // textBox.value = variableName;
    // textBox.onchange = (e) => {
    //   setVariableName(e.target.value);
    // };

    document.getElementById("result").appendChild(titleBox);
    document.getElementById("result").appendChild(textBox);
  };

  return (
    <div
      ref={scrollRef}
      id="cont"
      className="overflow-auto relative max-h-[674px]"
      onScroll={handleScroll} // this is the problem
    >
      <div id="0" className="tab">
        <input
          className="text-[15px] font-bold opacity-40 outline-none py-[25px]"
          type="text"
          value={testCaseName}
          onChange={(e) => {
            setTestCaseName(e.target.value);
          }}
        />

        <p className="text-[14px] font-[500px] leading-[24px] tracking-[0.17px] text-black/[0.8] my-[6px]">
          Description
        </p>
        <textarea
          className="w-full border rounded-[4px] h-[120px] p-[10px] outline-none"
          placeholder="Define template variables in {‘variable_name’} format within the prompt."
          value={testCaseDescription}
          onChange={(e) => {
            setTestCaseDescription(e.target.value);
          }}
        />
      </div>

      <div className="py-[30px] tab" id="1">
        <HorizontalLine />
      </div>
      <div>
        <p className="text-[14px] font-[500px] leading-[24px] tracking-[0.17px] text-black/[0.8]">
          Variable Definitions
        </p>
        <input
          className="text-[15px] font-bold opacity-40 outline-none py-[25px]"
          type="text"
          value={variableName}
          onChange={(e) => {
            setVariableName(e.target.value);
          }}
        />
        <textarea
          className="w-full border rounded-[4px] h-[120px] p-[10px] outline-none"
          placeholder="Define template variables in {‘variable_name’} format within the prompt."
          value={variableValue}
          onChange={(e) => {
            setVariableValue(e.target.value);
          }}

        />
      </div>
      <div className="py-[30px] tab" id="2">
        <HorizontalLine />
      </div>
      <div id="result">
        <p className="text-[14px] font-[500px] leading-[24px] tracking-[0.17px] text-black/[0.8]">
          Acceptable Results
        </p>
        <input
          className="text-[15px] font-bold opacity-40 outline-none py-[25px]"
          type="text"
          value={acceptedResult}
          onChange={(e) => {
            setAcceptedResult(e.target.value);
          }}
        />
        <textarea
          className="w-full border rounded-[4px] h-[120px] p-[10px] outline-none my-[30px]"
          placeholder="Define template variables in {‘variable_name’} format within the prompt."
        />
      </div>
      <div className="my-[30px] relative">
        <HorizontalLine />
        <button
          className="z-[0] absolute top-[-11px] left-[50%]"
          onClick={() => {
            addTextBox();
          }}
        >
          <HorzLineWithAddIcon />
        </button>
      </div>
      <div className="relative">
        <Button
          variant="contained"
          className="my-[40px] bg-[#2196F3] absolute left-0  top-0"
        >
          SAVE
        </Button>
      </div>
    </div>
  );
}
