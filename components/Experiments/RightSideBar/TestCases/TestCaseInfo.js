import { useEffect, useRef, useState } from "react";
import Button from "@mui/material/Button";
import HorizontalLine from "../../../../assets/Svg/HorizontalLine";
import HorzLineWithAddIcon from "../../../../assets/Svg/HorzLineWithAddIcon";
import styles from "./TestCaseInfo.module.scss";

export default function TestCaseInfo({ value, isClicked, data }) {
  const [variableName, setVariableName] = useState("Untitled Variable");
  const [variableValue, setVariableValue] = useState(
    data?.dynamicVarValues
      ? JSON.stringify(JSON.parse(data?.dynamicVarValues))
      : ""
  );
  const [acceptedResult, setAcceptedResult] = useState(["Untitled Result"]);
  const [acceptedResultValue, setAcceptedResultValue] = useState([
    data?.expectedResult,
  ]);

  const [testCaseName, setTestCaseName] = useState(data?.name);
  const [testCaseDescription, setTestCaseDescription] = useState(
    data?.description
  );
  const [opacity, setOpacity] = useState("40");
  const scrollRef = useRef(null);

  useEffect(() => {
    if (isClicked) {
      moveToTop(value);
    }
  }, [isClicked, data]);

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

  const addTextBox = () => {
    let titleBox = document.createElement("input");
    titleBox.className = `${styles.inputStyle}`;
    titleBox.placeholder = "Untitled Result";

    let textBox = document.createElement("textarea");
    textBox.className = `${styles.textareaStyle}`;
    textBox.placeholder =
      "Define template variables in {‘variable_name’} format within the prompt.";

    document.getElementById("result").appendChild(titleBox);
    document.getElementById("result").appendChild(textBox);
  };

  return (
    <div
      ref={scrollRef}
      id="cont"
      className="overflow-auto relative mb-[30px] max-h-[570px]"
      onScroll={handleScroll} // this is the problem
    >
      <div id="0" className="tab">
        <input
          className={`text-[15px] font-bold opacity-${opacity} outline-none pt-[27px]`}
          type="text"
          value={testCaseName}
          onChange={(e) => {
            setTestCaseName(e.target.value);
          }}
          // on={(e) => setOpacity("80")}
          onBlur={(e) => setOpacity("40")}
        />

        <p className="text-[14px] font-[500px] leading-[24px] tracking-[0.17px] text-black/[0.8] pt-[12px] pb-[6px]">
          Description
        </p>
        <textarea
          className={`${styles.textareaStyle}`}
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
          className={`${styles.inputStyle} opacity-40`}
          type="text"
          value={variableName}
          onChange={(e) => {
            setVariableName(e.target.value);
          }}
        />
        <textarea
          className={`${styles.textareaStyle}`}
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
          className={`${styles.inputStyle} opacity-40`}
          type="text"
          value={acceptedResult[0][0]}
          onChange={(e) => {
            setAcceptedResult({ ...acceptedResult, 0: e.target.value });
          }}
        />
        <textarea
          className={`${styles.textareaStyle}`}
          placeholder="Define template variables in {‘variable_name’} format within the prompt."
          value={acceptedResultValue[0]}
          onChange={(e) => {
            setAcceptedResultValue({
              ...acceptedResultValue,
              0: e.target.value,
            });
          }}
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
          className=" bg-[#2196F3] absolute left-0  top-0 "
          sx={{ textTransform: "none" }}
        >
          SAVE
        </Button>
      </div>
    </div>
  );
}
