import React, { useState } from "react";
import RemoveIcon from "../../../../assets/Svg/RemoveIcon";
import styles from "./TestCaseTabs.module.scss";

function ExpectedResult({ expectedResult, removeExpectedResult }) {
  const [expectedResultMessage, setExpectedResultMessage] = useState(
    expectedResult.result
  );
  const [isHover, setIsHover] = useState(false);
  return (
    <li>
      <div
        className="flex hover:bg-[#F8FAFB]"
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <textarea
          className={`${styles.textareaStyle} ${
            isHover ? "border-[#2196F380] bg-[#F8FAFB]" : ""
          }`}
          placeholder="Define acceptable result for this test case."
          value={expectedResultMessage}
          onChange={(e) => {
            setExpectedResultMessage(e.target.value);
          }}
          onBlur={(e) => {
            expectedResult.result = e.target.value;
          }}
        />
        <div
          className={`cursor-pointer ml-[10px] pt-2 ${
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
