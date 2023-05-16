import React, { useState } from "react";
import StatusBadge from "./StatusBadge";
import Share from "../../../../assets/Svg/Share";
import { Accordion, AccordionSummary, AccordionDetails } from "./AccordionComp";
import ShareModal from "./ShareModal";
function ReportCell({ report, index, setExpanded, expanded }) {
  const [showShareModal, setShowShareModal] = useState(false);

  const [actualResult] = useState(report?.actualResult[0]);
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <>
      <Accordion
        expanded={expanded === `panel${index}`}
        staus={report.accuracy!=null && report.accuracy < 60 ? "failed" : "pass"}
        onChange={handleChange(`panel${index}`)}
      >
        <AccordionSummary
          aria-controls={`panel${index}d-content`}
          id={`panel${index}d-header`}
        >
          <div className={`flex items-center text-md cursor-pointer w-full`}>
            <div className="w-1/6 px-[10px] py-[34px]">
              {report?.testCaseName}
            </div>
            <div className="pr-[10px] pl-[20px] py-[34px] w-4/6 border-l-2">
              {report?.testCaseDescription}
            </div>
            <div className="px-[10px] py-[34px] ml-[10px]">
              <StatusBadge status={report.accuracy!=null && report.accuracy < 60 ? "failed" : "pass"} />
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails
          sx={
            report.accuracy!=null && report.accuracy < 60
              ? { borderLeft: `2px solid rgba(179, 38, 30, 1)` }
              : { borderLeft: `2px solid rgba(46, 125, 50, 1)` }
          }
        >
          <div className={`bg-[#2196F30A] py-[30px] px-[20px]`}>
            <div className="flex items-center text-[#000] opacity-60 text-[14px] py-[10px]">
              <div>Actual Result</div>
              <div
                className="flex ietms-center gap-[10px] cursor-pointer ml-auto"
                onClick={() => setShowShareModal(true)}
              >
                <Share />
                <div> Share Report</div>
              </div>
            </div>
            <textarea
              value={actualResult}
              className={`w-full rounded-[4px] h-[120px] p-[10px] outline-none border ${
                report.accuracy!=null && report.accuracy < 60 ? "border-[#B3261E]" : "border-[#2E7D32]"
              } resize-none`}
              placeholder="No actual result found."
              disabled={true}
            />
            <div className="border border-dashed border-[#00000033] my-[30px]"></div>
            <div className="text-[#000] opacity-60 text-[14px]">
              Acceptable Results
            </div>
            {report?.acceptableResult.map((result, index) => (
              <div key={index}>
                <div className="text-[#000] text-[15px] mt-[15px] mb-[10px]">
                  Acceptable Result {index + 1}
                </div>
                <textarea
                  className={`w-full border rounded-[4px] h-[120px] p-[10px] outline-none resize-none`}
                  value={result}
                  placeholder="No expected result found."
                  disabled={true}
                />
              </div>
            ))}
          </div>
        </AccordionDetails>
      </Accordion>
      <ShareModal
        showShareModal={showShareModal}
        setShowShareModal={setShowShareModal}
      />
    </>
  );
}

export default ReportCell;
