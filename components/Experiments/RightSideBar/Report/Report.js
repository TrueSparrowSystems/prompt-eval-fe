import React,{useState} from "react";
import BackArrow from "../../../../assets/Svg/BackArrow";
import ReportCell from "./ReportCell";
import PaginationUI from "../PromptTemplate/PaginationUI";

function Report(props) {
  const [expanded, setExpanded] = useState("panel1");

  const ReportData = [
    {
      Id: " 1",
      name: "Cell 1",
      desc: "Lorem ipsum dolor sit amet. Aut vitae earum qui iste internos est eligendi nemo. Et unde inventore ut sint Lorem ipsum dolor sit amet. Aut vitae earum qui iste internos est eligendi nemo. Et unde inventore ut sint Lorem ipsum dolor sit amet. Aut vitae earum qui iste internos est eligendi nemo. Et unde inventore ut sint repellendus ut totam iusto et tempo..",
      status: "failed",
    },
    {
      Id: " 2",
      name: "Cell 1",
      desc: "Lorem ipsum dolor sit amet. Aut vitae earum qui iste internos est eligendi nemo. Et unde inventore ut sint Lorem ipsum dolor sit amet. Aut vitae earum qui iste internos est eligendi nemo. Et unde inventore ut sint Lorem ipsum dolor sit amet. Aut vitae earum qui iste internos est eligendi nemo. Et unde inventore ut sint repellendus ut totam iusto et tempo..",
      status: "failed",
    },
    {
      Id: " 3",
      name: "Cell 1",
      desc: "Lorem ipsum dolor sit amet. Aut vitae earum qui iste internos est eligendi nemo. Et unde inventore ut sint Lorem ipsum dolor sit amet. Aut vitae earum qui iste internos est eligendi nemo. Et unde inventore ut sint Lorem ipsum dolor sit amet. Aut vitae earum qui iste internos est eligendi nemo. Et unde inventore ut sint repellendus ut totam iusto et tempo..",
      status: "pass",
    },
    {
      Id: " 4",
      name: "Cell 1",
      desc: "Lorem ipsum dolor sit amet. Aut vitae earum qui iste internos est eligendi nemo. Et unde inventore ut sint Lorem ipsum dolor sit amet. Aut vitae earum qui iste internos est eligendi nemo. Et unde inventore ut sint Lorem ipsum dolor sit amet. Aut vitae earum qui iste internos est eligendi nemo. Et unde inventore ut sint repellendus ut totam iusto et tempo..",
      status: "pass",
    },
    {
      Id: " 2",
      name: "Cell 1",
      desc: "Lorem ipsum dolor sit amet. Aut vitae earum qui iste internos est eligendi nemo. Et unde inventore ut sint Lorem ipsum dolor sit amet. Aut vitae earum qui iste internos est eligendi nemo. Et unde inventore ut sint Lorem ipsum dolor sit amet. Aut vitae earum qui iste internos est eligendi nemo. Et unde inventore ut sint repellendus ut totam iusto et tempo..",
      status: "pass",
    },
    {
      Id: " 3",
      name: "Cell 1",
      desc: "Lorem ipsum dolor sit amet. Aut vitae earum qui iste internos est eligendi nemo. Et unde inventore ut sint Lorem ipsum dolor sit amet. Aut vitae earum qui iste internos est eligendi nemo. Et unde inventore ut sint Lorem ipsum dolor sit amet. Aut vitae earum qui iste internos est eligendi nemo. Et unde inventore ut sint repellendus ut totam iusto et tempo..",
      status: "pass",
    },
    {
      Id: " 4",
      name: "Cell 1",
      desc: "Lorem ipsum dolor sit amet. Aut vitae earum qui iste internos est eligendi nemo. Et unde inventore ut sint Lorem ipsum dolor sit amet. Aut vitae earum qui iste internos est eligendi nemo. Et unde inventore ut sint Lorem ipsum dolor sit amet. Aut vitae earum qui iste internos est eligendi nemo. Et unde inventore ut sint repellendus ut totam iusto et tempo..",
      status: "pass",
    },
    {
      Id: " 5",
      name: "Cell 1",
      desc: "Lorem ipsum dolor sit amet. Aut vitae earum qui iste internos est eligendi nemo. Et unde inventore ut sint Lorem ipsum dolor sit amet. Aut vitae earum qui iste internos est eligendi nemo. Et unde inventore ut sint Lorem ipsum dolor sit amet. Aut vitae earum qui iste internos est eligendi nemo. Et unde inventore ut sint repellendus ut totam iusto et tempo..",
      status: "pass",
    },
    {
      Id: " 6",
      name: "Cell 1",
      desc: "Lorem ipsum dolor sit amet. Aut vitae earum qui iste internos est eligendi nemo. Et unde inventore ut sint Lorem ipsum dolor sit amet. Aut vitae earum qui iste internos est eligendi nemo. Et unde inventore ut sint Lorem ipsum dolor sit amet. Aut vitae earum qui iste internos est eligendi nemo. Et unde inventore ut sint repellendus ut totam iusto et tempo..",
      status: "pass",
    },
  ];
  return (
    <div
      style={{
        background: " #ffffff",
        "box-shadow":
          "0px 1px 3px rgba(0, 0, 0, 0.12), 0px 1px 1px rgba(0, 0, 0, 0.14),0px 2px 1px -1px rgba(0, 0, 0, 0.2)",
        " border-radius": " 8px;",
      }}
    >
      <div className="flex items-center gap-[10px] cursor-pointer hover:opacity-80 opacity-60 px-[30px]">
        <BackArrow />
        <div className="text-[14px] opacity-60 py-[25px]">View Report</div>
      </div>
      <div className={`flex items-center text-md font-bold border-t`}>
        <div className="w-1/6 py-[34px] px-[10px]">Test Case Name</div>
        <div className="w-4/6 pr-[10px] pl-[20px] py-[34px] border-l-2">
          Description
        </div>
        <div className="px-[10px] py-[34px]">Status</div>
      </div>
      <div className="h-[450px] overflow-auto">
        {ReportData.map((report, index) => (
          <ReportCell key={index} report={report} index={index+1}  expanded={expanded} setExpanded={setExpanded}/>
        ))}
        <PaginationUI />
      </div>
    </div>
  );
}

export default Report;
