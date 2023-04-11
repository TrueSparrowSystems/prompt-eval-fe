import React from "react";
import PromptTemplateCells from "./PromptTemplateCells";

function PromptTemplate(props) {
  const ExperimentListData = [
    {
      Id: " 1",
      name: "Cell 1",
      accuracy: "23%",
      model: "turbo",
      date: "27/01/2023",
      status: "pass",
    },
    {
      Id: " 2",
      name: "Cell 1",
      accuracy: "23%",
      model: "turbo",
      date: "27/01/2023",
      status: "pass",
    },
    {
      Id: " 3",
      name: "Cell 1",
      accuracy: "23%",
      model: "turbo",
      date: "27/01/2023",
      status: "pass",
    },
    {
      Id: " 4",
      name: "Cell 1",
      accuracy: "23%",
      model: "turbo",
      date: "27/01/2023",
      status: "pass",
    },
    {
      Id: " 5",
      name: "Cell 1",
      accuracy: "23%",
      model: "turbo",
      date: "27/01/2023",
      status: "pass",
    },
    {
      Id: " 6",
      name: "Cell 1",
      accuracy: "23%",
      model: "turbo",
      date: "27/01/2023",
      status: "pass",
    },
  ];
  return (
    <div className="bg-[#fff] ">
      <div className={`flex items-center text-[13px] font-bold border-b-2`}>
        <div className={`basis-1/5 border-r-2 px-[10px] py-[34px] mr-[10px]`}>Name</div>
        <div className="basis-1/5 px-[10px] py-[34px]">Accuracy</div>
        <div className="basis-1/5 px-[10px] py-[34px]">Model</div>
        <div className="basis-1/5 px-[10px] py-[34px]">Execution Report</div>
        <div className="basis-1/5 flex items-center justify-around px-[10px] py-[34px]">
          <div>Run</div>
          <div>Actions</div>
        </div>
      </div>
      {ExperimentListData.map((PromptTemplate, index) => (
        <PromptTemplateCells key={index} PromptTemplate={PromptTemplate}/>
      ))}
    </div>
  );
}

export default PromptTemplate;
