import React, { useState } from "react";
import RemoveIcon from "../../../../assets/Svg/RemoveIcon";
import styles from "./TestCaseInfo.module.scss";

function ExpectedResult({ expectedResult, id, removeExpectedResult }) {
  const [expectedResultMessage, setExpectedResultMessage] = useState(
    expectedResult.result
  );
  const [isHover, setIsHover] = useState(false);
  return (
    <li>
      <div
        className={`${styles.inputStyle} opacity-40 outline-none`}
      >{`Acceptable result ${id + 1}`}</div>
      <div
        className="flex hover:bg-[#F8FAFB] p-2"
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <textarea
          className={`${styles.textareaStyle} ${
            isHover ? "border-[#2196F380] bg-[#F8FAFB]" : ""
          }`}
          placeholder="Define template variables in {‘variable_name’} format within the prompt."
          value={expectedResultMessage}
          onChange={(e) => {
            setExpectedResultMessage(e.target.value);
          }}
          onBlur={(e) => {
            expectedResult.result = e.target.value;
          }}
        />
        <div
          className={`cursor-pointer ml-[10px] ${
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
