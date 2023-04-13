import React from "react";
import BackArrow from "../../../../assets/Svg/BackArrow";
import styles from "../ExperimentsDetails.module.scss";
import ReportCell from "./ReportCell";
import PaginationUI from "../PromptTemplate/PaginationUI";

function Report(props) {
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
    <div className={`${styles.experimentBox}`}>
      <div className="flex items-center gap-[10px] cursor-pointer hover:opacity-80 opacity-60">
        <BackArrow />
        <div className="text-[14px] opacity-60 py-[25px]">View Report</div>
      </div>
      <div className={`flex items-center text-[13px] font-bold border-b-2`}>
        <div className="w-1/6 py-[34px] px-[10px]">Test Case Name</div>
        <div className="w-4/6 pr-[10px] pl-[20px] py-[34px] border-l-2">
          Description
        </div>
        <div className="px-[10px] py-[34px]">Status</div>
      </div>
      <div className="h-[450px] overflow-auto">
        {ReportData.map((report, index) => (
          <ReportCell key={index} report={report} />
        ))}
        <PaginationUI />
      </div>
    </div>
  );
}

export default Report;
