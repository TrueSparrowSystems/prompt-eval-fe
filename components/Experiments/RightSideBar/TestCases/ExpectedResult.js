import React, { useState, useEffect } from "react";
import RemoveIcon from "../../../../assets/Svg/RemoveIcon";
import styles from "./TestCaseTabs.module.scss";

function ExpectedResult({
  expectedResult,
  removeExpectedResult,
  unsavedChanges,
  setUnsavedChanges,
}) {
  const [expectedResultMessage, setExpectedResultMessage] = useState(
    expectedResult.result
  );
  const [isHover, setIsHover] = useState(false);

  useEffect(() => {
    if (expectedResult.result != null)
      setExpectedResultMessage(expectedResult.result);
  }, [expectedResult.result]);

  return (
    <li>
      <div
        className="flex hover:bg-[#F8FAFB] rounded-[8px] pt-[15px] pl-[15px] pb-[15px]"
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <textarea
          style={{ height: "auto", marginTop: "0px" }}
          className={`${styles.textareaStyle} ${
            isHover ? "border-[#2196F380] bg-[#F8FAFB]" : ""
          }`}
          placeholder="Define acceptable result for this test case."
          value={expectedResultMessage || ""}
          onChange={(e) => {
            setExpectedResultMessage(e.target.value);
            if (!unsavedChanges) setUnsavedChanges(true);
          }}
          onBlur={(e) => {
            expectedResult.result = e.target.value;
          }}
          rows={10}
        />
        <div
          className={`cursor-pointer ml-[10px] pb-[110px] pr-[10px] ${
            isHover ? "opacity-40  hover:opacity-80" : "opacity-0"
          }`}
          onClick={(e) => {
            removeExpectedResult(expectedResult.id);
          }}
        >
          <RemoveIcon />
        </div>
      </div>
    </li>
  );
}

export default ExpectedResult;
