import React, {useState} from "react";
import Button from "@mui/material/Button";
import Pass from "../../../../assets/Svg/Pass";
import Fail from "../../../../assets/Svg/Fail";
import ViewReportArrow from "../../../../assets/Svg/ViewReportArrow";
import Clone from "../../../../assets/Svg/Clone";
import Edit from "../../../../assets/Svg/Edit";
import Calendar from "../../../../assets/Svg/Calendar";


function PromptTemplateCells({ PromptTemplate, setReportId, setShowReport }) {
  const [status, setStatus] = useState("pass");
  return (
    <div className={`flex items-center text-[13px] border-b-2`}>
      <div className={`basis-1/5 border-r-2 px-[10px] py-[34px] mr-[10px]`}>
        {PromptTemplate.name}
      </div>
      <div className="basis-1/5 px-[10px]">
        {PromptTemplate.accuracy ? PromptTemplate.accuracy : "--"}
      </div>
      <div className="basis-1/5 px-[10px]">
        {PromptTemplate.model ? PromptTemplate.model : "--"}
      </div>
      <div className="basis-1/5 px-[10px]">
        <div className="flex items-center gap-[10px]">
          <Calendar />
          <div>{PromptTemplate.createdAt}</div>
        </div>
        <div
          className="flex items-center gap-[10px] cursor-pointer"
          onClick={() => {
            setShowReport(true);
            setReportId(PromptTemplate.Id);
          }}
        >
          <div className="underline">view report</div>
          <div>
            <ViewReportArrow />
          </div>
        </div>
      </div>

      <div className="basis-1/5 flex items-center justify-around px-[10px]">
        <div>
          <Button variant="outlined">run</Button>
        </div>
        <div className="flex items-center gap-[20px]">
          
            <Clone />
            <Edit />  
        </div>
      </div>
    </div>
  );
}

export default PromptTemplateCells;
