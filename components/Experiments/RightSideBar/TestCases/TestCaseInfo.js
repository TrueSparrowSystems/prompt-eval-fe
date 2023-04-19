import { useEffect, useRef, useState } from "react";
import Button from "@mui/material/Button";

export default function TestCaseInfo({
  value,
  isClicked,

}) {
  const [variableName, setVariableName] = useState("Untitled Variable");
  const [acceptedResult, setAcceptedResult] = useState("Untitled Result");
  const [testCaseName, setTestCaseName] = useState("Untitled Test Case");
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
      
      //Need to solve this problem
      if (tabsTop <= tabeTop ) {

        console.log("tab", index,tabsTop,tabeTop);
        // document.getElementById(`tab-${index}`).click();
        // setValue(index);
        return;
      
    }
  };
}

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
        />
      </div>

      <div className="py-[30px] tab" id="1">
        <svg width="100%" height="1">
          <line
            x1="100%"
            y1="50%"
            y2="50%"
            stroke="black"
            stroke-opacity="0.2"
            stroke-dasharray="6 6"
          />
        </svg>
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
        />
      </div>
      <div className="py-[30px] tab" id="2">
        <svg width="100%" height="1">
          <line
            x1="100%"
            y1="50%"
            y2="50%"
            stroke="black"
            stroke-opacity="0.2"
            stroke-dasharray="6 6"
          />
        </svg>
      </div>
      <div>
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
        <svg width="100%" height="1" className="z-[1] absolute top-0 left-0">
          <line
            x1="100%"
            y1="50%"
            y2="50%"
            stroke="black"
            stroke-opacity="0.2"
            stroke-dasharray="6 6"
          />
        </svg>

        <svg
          width="24"
          height="24"
          className="z-[2] absolute top-[-11px] left-[50%]"
        >
          <path
            d="M17.4346 13.1203C17.8488 13.1203 18.1846 12.7845 18.1846 12.3703C18.1846 11.9561 17.8488 11.6203 17.4346 11.6203V13.1203ZM6.56544 11.6203C6.15123 11.6203 5.81544 11.9561 5.81544 12.3703C5.81544 12.7845 6.15123 13.1203 6.56544 13.1203V11.6203ZM11.25 17.8048C11.25 18.2191 11.5858 18.5548 12 18.5548C12.4142 18.5548 12.75 18.2191 12.75 17.8048H11.25ZM12.75 6.93572C12.75 6.52151 12.4142 6.18572 12 6.18572C11.5858 6.18572 11.25 6.52151 11.25 6.93572H12.75ZM19.1553 19.5256C15.2035 23.4773 8.79646 23.4773 4.8447 19.5256L3.78404 20.5862C8.32159 25.1238 15.6784 25.1238 20.216 20.5862L19.1553 19.5256ZM4.8447 19.5256C0.892939 15.5738 0.892939 9.16674 4.8447 5.21498L3.78404 4.15432C-0.753508 8.69187 -0.753508 16.0487 3.78404 20.5862L4.8447 19.5256ZM4.8447 5.21498C8.79646 1.26322 15.2035 1.26322 19.1553 5.21498L20.216 4.15432C15.6784 -0.383227 8.32159 -0.383227 3.78404 4.15432L4.8447 5.21498ZM19.1553 5.21498C23.1071 9.16674 23.1071 15.5738 19.1553 19.5256L20.216 20.5862C24.7535 16.0487 24.7535 8.69187 20.216 4.15432L19.1553 5.21498ZM17.4346 11.6203L12 11.6203V13.1203L17.4346 13.1203V11.6203ZM12 11.6203H6.56544V13.1203H12V11.6203ZM12.75 17.8048V12.3703H11.25V17.8048H12.75ZM12.75 12.3703V6.93572H11.25V12.3703H12.75Z"
            fill="#2196F3"
          />
        </svg>
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
