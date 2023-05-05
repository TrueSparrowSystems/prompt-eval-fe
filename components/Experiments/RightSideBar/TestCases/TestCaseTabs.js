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
import VariableCell from "./VariableCell";
import "intersection-observer";
import { useMutation } from "@apollo/client";
import Queries from "../../../../queries/Queries";
import { useExpContext } from "../../../../context/ExpContext";
import Toast from "../../../ToastMessage/Toast";
import { MESSAGES } from "../../../../constants/Messages";
import { CircularProgress } from "@mui/material";

export default function BasicTabs() {
  const [updateTestCases, { data, loading, error }] = useMutation(
    Queries.updateTestCases
  );
  const { selectedExperimentInfo, testCase } = useExpContext();

  let interSectionFlag = false;
  const isExpectedResultsPopulated = useRef(false);
  const [value, setValue] = React.useState(0);

  const [expectedResultsArr, setExpectedResultsArr] = useState([]);

  const variableNames = selectedExperimentInfo?.dynamicVars;
  const [variableValues, setVariableValues] = useState(
    JSON.parse(testCase?.dynamicVarValues ? testCase?.dynamicVarValues : "{}")
  );

  const [testCaseName, setTestCaseName] = useState("");
  const [testCaseDescription, setTestCaseDescription] = useState("");
  const [opacity, setOpacity] = useState("40");

  useEffect(() => {
    if (!isExpectedResultsPopulated.current) {
      readExpectedResults();
    }
    isExpectedResultsPopulated.current = true;
  }, [testCase]);

  useEffect(() => {
    if (testCase && Object.keys(testCase).length > 0) {

      setTestCaseName(testCase?.name);
      setTestCaseDescription(testCase?.description);
      setVariableValues(
        JSON.parse(
          testCase?.dynamicVarValues ? testCase?.dynamicVarValues : "{}"
        )
      );
      isExpectedResultsPopulated.current = false;
    }

    handleChange(null, 0);
  }, [testCase]);

  useEffect(() => {
    const root = document.querySelector("#testCaseContainer");
    const observer = new IntersectionObserver(
      (entries) => {
        interSectionFlag = false;

        entries.forEach((entry) => {
          if (!interSectionFlag && entry.isIntersecting) {
            interSectionFlag = true;
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

    let ele = document.getElementById("testCaseContainer");

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
    setExpectedResultsArr([]);
    testCase?.expectedResult?.map((expectedResult, index) => {
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
        key={index}
        expectedResult={expectedResult}
        id={index}
        removeExpectedResult={removeExpectedResult}
      />
    )
  );

  const handleUpdate = async () => {
    try {
      await updateTestCases({
        variables: {
          id: testCase?.id,
          name: testCaseName,
          dynamicVarValues: JSON.stringify(variableValues),
          description: testCaseDescription,
          expectedResult: expectedResultsArr.map(
            (expectedResult) => expectedResult.result
          ),
        },
      });
    } catch (err) {
      console.log(err);
      return err;
    }
  };

  return (
    <>
      {data && <Toast msg={MESSAGES.TEST_CASE.UPDATED} type="success" />}
      {error && <Toast msg={MESSAGES.TEST_CASE.UPDATE_ERROR} type="error" />}
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

        <div
          id="testCaseContainer"
          className="overflow-auto relative mb-[30px] max-h-[570px]"
        >
          <div id="0" className="tab ml-[20px]">
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
              className={`${styles.textareaStyle} resize-none`}
              placeholder="Add a description for your test case."
              value={testCaseDescription}
              onChange={(e) => {
                setTestCaseDescription(e.target.value);
              }}
            />
          </div>

          <div className="tab ml-[20px]" id="1">
            <div className="py-[30px]">
              <HorizontalLine />
            </div>
            <div>
              <p className="text-[14px] font-[500px] leading-[24px] tracking-[0.17px] text-black/[0.8]">
                Variable Definitions
              </p>
              {variableNames.map((variableName, index) => (
                <VariableCell
                  variableName={variableName}
                  key={index}
                  variableValues={variableValues}
                  setVariableValues={setVariableValues}
                  id={index}
                />
              ))}
            </div>
          </div>

          <div className="tab" id="2">
            <div className="py-[30px] ml-[20px]">
              <HorizontalLine />
            </div>
            <div id="result">
              <p className="text-[14px] font-[500px] leading-[24px] tracking-[0.17px] text-black/[0.8] ml-[20px]">
                Acceptable Results
              </p>
              <ul className="ml-[12px]">{expectedResultsList}</ul>
            </div>
            <div className="ml-[20px]">
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
                disabled={variableNames.length === 0}
              >
                <AddIcon
                  className="mr-[11px]"
                  style={{
                    fill: variableNames.length === 0 ? "#00000042" : "#2196F3",
                  }}
                />
                Add acceptable result
              </Button>
            </div>
            <div className="py-[30px] ml-[20px]">
              <HorizontalLine />
            </div>
            <div className="relative ml-[20px]">
              <Button
                variant="contained"
                className="bg-[#2196F3] absolute left-0  top-0 "
                sx={{
                  ...(loading && {
                    bgcolor: "#2196F3",
                    "&:hover": {
                      bgcolor: "#2196F3",
                    },
                  }),
                  ml: "10px",
                  textTransform: "none",
                  border: "1px solid rgba(0, 0, 0, 0.23)",
                }}
                onClick={() => {
                  handleUpdate();
                }}
                disabled={loading}
              >
                SAVE
              </Button>

              {loading && (
                <CircularProgress
                  size={24}
                  sx={{
                    color: "#2196F3",
                    position: "absolute",
                    marginTop: "-12px",
                    marginLeft: "-24px",
                  }}
                />
              )}
              {error && (
                <div className="text-[#f00] text-[14px] pt-[50px] break-all">
                  {error.message}
                </div>
              )}
            </div>
          </div>
        </div>
      </Box>
    </>
  );
}
