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
import { useCompSelectorContext } from "../../../../context/compSelectorContext";
import { MESSAGES } from "../../../../constants/Messages";
import { CircularProgress } from "@mui/material";
import { useToastContext } from "../../../../context/ToastContext";
import ErrorAlertToast from "../../../ToastMessage/ErrorAlertToast";

export default function BasicTabs({ unsavedChanges, setUnsavedChanges }) {
  const [updateTestCases, { data, loading, error }] = useMutation(
    Queries.updateTestCases
  );
  const [
    createTestCases,
    {
      data: createTestCase,
      loading: loadingCreateTestCase,
      error: errorCreateTestCase,
    },
  ] = useMutation(Queries.createTestCases);

  const { selectedExperimentInfo, testCase } = useExpContext();
  const { addTestCase, setAddTestCase } = useCompSelectorContext();
  const { setShowToast, setToastMessage, setToastType } = useToastContext();

  let interSectionFlag = false;
  const [tabValue, setTabValue] = React.useState(0);

  const [expectedResultsArr, setExpectedResultsArr] = useState([]);

  const variableNames = selectedExperimentInfo?.dynamicVars;
  const [variableValues, setVariableValues] = useState(
    JSON.parse(testCase?.dynamicVarValues ? testCase?.dynamicVarValues : "{}")
  );

  const [testCaseName, setTestCaseName] = useState("");
  const [testCaseDescription, setTestCaseDescription] = useState("");
  const [opacity, setOpacity] = useState("40");

  useEffect(() => {
    if (!addTestCase && testCase && Object.keys(testCase).length > 0) {
      setTestCaseName(testCase?.name);
      setTestCaseDescription(testCase?.description);
      setVariableValues(
        JSON.parse(
          testCase?.dynamicVarValues ? testCase?.dynamicVarValues : "{}"
        )
      );
      readExpectedResults();
    } else if (addTestCase) {
      setTestCaseName("Untitled Test Case");
      setTestCaseDescription("");
      setVariableValues({});
      setExpectedResultsArr([]);
    }

    handleChange(null, 0);
    setUnsavedChanges(false);
  }, [addTestCase, testCase]);

  useEffect(() => {
    const root = document.querySelector("#testCaseContainer");
    const observer = new IntersectionObserver(
      (entries) => {
        interSectionFlag = false;

        entries.forEach((entry) => {
          if (!interSectionFlag && entry.isIntersecting) {
            interSectionFlag = true;
            setTabValue(parseInt(entry.target.id));
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
    setTabValue(parseInt(newValue));
    const section = document.querySelector(`#\\3${newValue}`);
    const innerContainer = document.getElementById("testCaseContainer");
    const elementOffsetTop = section.offsetTop;

    innerContainer.scrollTop = elementOffsetTop;
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
    let resultArr = [];

    testCase?.expectedResult?.map((expectedResult, index) => {
      resultArr.push({
        id: uuid(),
        result: expectedResult,
      });
    });
    setExpectedResultsArr(resultArr);
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
        unsavedChanges={unsavedChanges}
        setUnsavedChanges={setUnsavedChanges}
      />
    )
  );

  const handleCreateOrUpdate = async () => {
    try {
      if (testCaseName.length === 0) {
        alert("To proceed, please provide test case title.");
        return;
      }

      if (expectedResultsArr.length === 0) {
        alert("To proceed, please add at least one acceptable result.");
        return;
      }

      if (addTestCase) {
        await createTestCases({
          variables: {
            name: testCaseName,
            description: testCaseDescription,
            dynamicVarValues: JSON.stringify(variableValues),
            experimentId: selectedExperimentInfo?.id,
            expectedResult: expectedResultsArr.map(
              (expectedResult) => expectedResult.result
            ),
          },
        });
        setAddTestCase(false);
      } else {
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
      }

      setShowToast(true);
      setToastMessage(
        addTestCase ? MESSAGES.TEST_CASE.CREATED : MESSAGES.TEST_CASE.UPDATED
      );
      setToastType("success");
    } catch (err) {
      setShowToast(true);
      setToastMessage(
        addTestCase
          ? MESSAGES.TEST_CASE.FAILED
          : MESSAGES.TEST_CASE.UPDATE_ERROR
      );
      setToastType("error");

      console.log(err);
      return err;
    }
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          marginTop: "-20px",
          minHeight: "calc(100vh - 172px)",
        }}
      >
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={tabValue}
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
          className={`relative ${styles.subBoxHeightForTestContent} overflow-auto scroll-smooth`}
        >
          <div id="0" className="tab ml-[20px]">
            <input
              className={`text-[15px] font-bold opacity-${opacity} hover:opacity-80 outline-none pt-[27px] w-full text-ellipsis`}
              type="text"
              value={testCaseName}
              onChange={(e) => {
                setTestCaseName(e.target.value);
                if (!unsavedChanges) setUnsavedChanges(true);
              }}
              onFocus={() => setOpacity("80")}
              onBlur={() => setOpacity("40")}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  e.target.blur();
                }
              }}
              maxLength={70}
            />

            <p className="text-[14px] font-[500px] leading-[24px] tracking-[0.17px] text-black/[0.8] pt-[12px] pb-[6px]">
              Description
            </p>
            <div className="pr-[40px]">
              <textarea
                className={`${styles.textareaStyle}`}
                placeholder="Add a description for your test case."
                value={testCaseDescription || ""}
                onChange={(e) => {
                  setTestCaseDescription(e.target.value);
                  if (!unsavedChanges) setUnsavedChanges(true);
                }}
              />
            </div>
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
                  unsavedChanges={unsavedChanges}
                  setUnsavedChanges={setUnsavedChanges}
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
              >
                <AddIcon className="mr-[11px]" />
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
                  ...(loading ||
                    (loadingCreateTestCase && {
                      bgcolor: "#2196F3",
                      "&:hover": {
                        bgcolor: "#2196F3",
                      },
                    })),
                  ml: "10px",
                  textTransform: "none",
                  border: "1px solid rgba(0, 0, 0, 0.23)",
                }}
                onClick={() => {
                  handleCreateOrUpdate();
                  setUnsavedChanges(false);
                }}
                disabled={loading || loadingCreateTestCase}
              >
                {addTestCase?"CREATE":"SAVE"}
              </Button>

              {(loading || loadingCreateTestCase) && (
                <CircularProgress
                  size={24}
                  sx={{
                    color: "#2196F3",
                    position: "absolute",
                    marginTop: "-24px",
                    marginLeft: "-24px",
                  }}
                />
              )}
            </div>
          </div>
          <div className="mt-[35px] ml-[20px]">
            {error && <ErrorAlertToast message={error.message} />}
            {errorCreateTestCase && (
              <ErrorAlertToast message={errorCreateTestCase.message} />
            )}
          </div>
        </div>
      </Box>
    </>
  );
}
