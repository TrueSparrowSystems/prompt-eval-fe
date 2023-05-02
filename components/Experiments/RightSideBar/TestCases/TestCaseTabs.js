import React, { useEffect, useState, useRef } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import styles from "./TestCaseTabs.module.scss";
import Button from "@mui/material/Button";
import HorizontalLine from "../../../../assets/Svg/HorizontalLine";
import AddIcon from "../../../../assets/Svg/AddIcon";
import { v4 as uuid } from "uuid";
import ExpectedResult from "./ExpectedResult";
import "intersection-observer";

export default function BasicTabs({ data }) {
  let flag = false;
  const isExpectedResultsPopulated = useRef(false);
  const [value, setValue] = React.useState(0);
  const [variableValue, setVariableValue] = useState(
    data?.dynamicVarValues ? JSON.parse(data?.dynamicVarValues).value : ""
  );

  const [expectedResultsArr, setExpectedResultsArr] = useState([]);

  const [testCaseName, setTestCaseName] = useState(data?.name);
  const [testCaseDescription, setTestCaseDescription] = useState(
    data?.description
  );
  const [opacity, setOpacity] = useState("40");

  useEffect(() => {
    if (!isExpectedResultsPopulated.current) {
      readExpectedResults();
    }
    isExpectedResultsPopulated.current = true;
  }, []);

  useEffect(() => {
    const root = document.querySelector("#cont");
    const observer = new IntersectionObserver(
      (entries) => {
        flag = false;

        entries.forEach((entry) => {
          if (!flag && entry.isIntersecting) {
            flag = true;
            setValue(parseInt(entry.target.id));
          }
        });
      },
      { root },
      { threshold: 0.3 }
    );

    const sections = document.querySelectorAll(".tab");
    sections.forEach((section) => {
      observer.observe(section);
    });

    let ele = document.getElementById("cont");

    const containerPosition =
      ele.getBoundingClientRect().top + window.pageYOffset;
    let extraPadding = ele.getBoundingClientRect().height - containerPosition;
    ele.style.paddingBottom = extraPadding + 100 + "px";

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  const handleChange = (event, newValue) => {
    setValue(parseInt(newValue));
    const section = document.querySelector(`#\\3${newValue}`);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
  };

  const addExpectedResult = () => {
    const newExpectedResult = {
      id: uuid(),
      result: "",
    };
    setExpectedResultsArr((expectedResultsArr) => [
      ...expectedResultsArr,
      newExpectedResult,
    ]);
  };

  const readExpectedResults = () => {
    data?.expectedResult?.map((expectedResult, index) => {
      const newExpectedResult = {
        id: uuid(),
        result: expectedResult,
      };
      setExpectedResultsArr((expectedResultsArr) => [
        ...expectedResultsArr,
        newExpectedResult,
      ]);
    });
  };

  const removeExpectedResult = (id) => {
    setExpectedResultsArr(
      expectedResultsArr.filter((expectedResult) => expectedResult.id !== id)
    );
  };

  const expectedResultsList = expectedResultsArr?.map(
    (expectedResult, index) => (
      <ExpectedResult
        expectedResult={expectedResult}
        id={index}
        removeExpectedResult={removeExpectedResult}
      />
    )
  );

  return (
    <Box sx={{ width: "100%", marginTop: "-20px" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Details" />
          <Tab label="VARIABLE DEFINITIONS" />
          <Tab label="acceptable results" />
        </Tabs>
      </Box>
      <div id="cont" className="overflow-auto relative mb-[30px] max-h-[570px]">
        <div id="0" className="tab">
          <input
            className={`text-[15px] font-bold opacity-${opacity} hover:opacity-80 outline-none pt-[27px]`}
            type="text"
            value={testCaseName}
            onChange={(e) => {
              setTestCaseName(e.target.value);
            }}
            onFocus={() => setOpacity("80")}
            onBlur={() => setOpacity("40")}
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

        <div className="tab" id="1">
          <div className="py-[30px]">
            <HorizontalLine />
          </div>
          <div>
            <p className="text-[14px] font-[500px] leading-[24px] tracking-[0.17px] text-black/[0.8]">
              Variable Definitions
            </p>
            <div className={`${styles.inputStyle} opacity-40 cursor-auto`}>
              {data?.dynamicVarValues
                ? JSON.parse(data?.dynamicVarValues).key
                : "--"}
            </div>
            <textarea
              className={`${styles.textareaStyle}`}
              placeholder="Define template variables in {‘variable_name’} format within the prompt."
              value={variableValue}
              onChange={(e) => {
                setVariableValue(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="tab" id="2">
          <div className="py-[30px]">
            <HorizontalLine />
          </div>
          <div id="result">
            <p className="text-[14px] font-[500px] leading-[24px] tracking-[0.17px] text-black/[0.8]">
              Acceptable Results
            </p>
            <ul>{expectedResultsList}</ul>
          </div>
          <div>
            <Button
              size="large"
              style={{
                textTransform: "none",
                marginTop: "20px",
                fontSize: "14px",
              }}
              onClick={() => {
                addExpectedResult();
              }}
              sx={{ color: "#2196F3" }}
            >
              <AddIcon className="mr-[11px]" />
              Add acceptable result
            </Button>
          </div>
          <div className="py-[30px]">
            <HorizontalLine />
          </div>
          <div className="relative">
            <Button
              variant="contained"
              className="bg-[#2196F3] absolute left-0  top-0 "
              sx={{
                ml: "10px",
                textTransform: "none",
                border: "1px solid rgba(0, 0, 0, 0.23)",
              }}
            >
              SAVE
            </Button>
          </div>
        </div>
      </div>
    </Box>
  );
}
