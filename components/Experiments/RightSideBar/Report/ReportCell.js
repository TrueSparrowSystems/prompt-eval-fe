import React from "react";
import StatusBadge from "./StatusBadge";
import Share from "../../../../assets/Svg/Share";
import { Accordion, AccordionSummary, AccordionDetails } from "./AccordionComp";

function ReportCell({ report, index, setExpanded, expanded }) {
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  return (
    <>
      <Accordion
        expanded={expanded === `panel${index}`}
        staus={report.status}
        onChange={handleChange(`panel${index}`)}
      >
        <AccordionSummary
          aria-controls={`panel${index}d-content`}
          id={`panel${index}d-header`}
        >
          <div className={`flex items-center text-md cursor-pointer`}>
            <div className="w-1/6 px-[10px] py-[34px]">Name</div>
            <div className="pr-[10px] pl-[20px] py-[34px] w-4/6 border-l-2">
              {report.desc}
            </div>
            <div className="px-[10px] py-[34px]">
              <StatusBadge status={report.status} />
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <div className={`bg-[#2196F30A] py-[30px] px-[20px]`}>
            <div className="flex items-center text-[#000] opacity-60 text-[14px] py-[10px]">
              <div>Actual Result</div>
              <div className="flex ietms-center gap-[10px] cursor-pointer ml-auto">
                <Share />
                <div> Share Report</div>
              </div>
            </div>
            <textarea
              className={`w-full rounded-[4px] h-[120px] p-[10px] outline-none border ${
                report.status === "failed"
                  ? "border-[#B3261E]"
                  : "border-[#2E7D32]"
              }`}
              placeholder="Define template variables in {‘variable_name’} format within the prompt."
            />
            <div className="border border-dashed border-[#00000033] my-[30px]"></div>
            <div className="text-[#000] opacity-60 text-[14px]">
              Acceptable Results
            </div>
            <div className="text-[#000] text-[15px] mt-[15px] mb-[10px]">
              Untitled Result
            </div>
            <textarea
              className={`w-full border rounded-[4px] h-[120px] p-[10px] outline-none`}
              placeholder="Define template variables in {‘variable_name’} format within the prompt."
            />

            <div className="text-[#000] text-[15px] mt-[15px] mb-[10px]">
              Untitled Result
            </div>
            <textarea
              className={`w-full border rounded-[4px] h-[120px] p-[10px] outline-none`}
              placeholder="Define template variables in {‘variable_name’} format within the prompt."
            />
          </div>
        </AccordionDetails>
      </Accordion>
    </>
  );
}

export default ReportCell;
