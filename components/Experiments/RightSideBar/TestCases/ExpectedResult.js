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
        className="flex hover:bg-[#F8FAFB] rounded-[8px]"
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <textarea
          className={`${styles.textareaStyle} ${
            isHover ? "border-[#2196F380] bg-[#F8FAFB]" : ""
          } resize-none ml-[10px] mt-[10px]`}
          placeholder="Define acceptable result for this test case."
          value={expectedResultMessage}
          onChange={(e) => {
            setExpectedResultMessage(e.target.value);
            if (!unsavedChanges) setUnsavedChanges(true);
          }}
          onBlur={(e) => {
            expectedResult.result = e.target.value;
          }}
        />
        <div
          className={`cursor-pointer ml-[10px] pt-[15px] pb-[110px] pr-[10px] ${
            isHover ? "opacity-40  hover:opacity-60" : "opacity-0"
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
