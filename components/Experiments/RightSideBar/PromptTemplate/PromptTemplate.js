import React, { useState } from "react";
import PromptTemplateCells from "./PromptTemplateCells";
import styles from "../ExperimentsDetails.module.scss";
import EmptyState from "../EmptyState";
import PaginationUI from "./PaginationUI";
import { useQuery } from "@apollo/client";
import Queries  from "../../../../queries/Queries";
import {useExpContext} from "../../../../context/ExpContext";
import LoadingState from "../../LoadingState";

function PromptTemplate({setReportId,setShowReport}) {
  
  const {selectedExperimentInfo, setSelectedExperimentInfo} = useExpContext();
  
  let {data,loading,error} = useQuery(Queries.promptListByPagination,{
    variables:{
      experimentId:selectedExperimentInfo?.id,
      page:1,
      limit:6
    }
  })

  if(loading){
    return <LoadingState />
  }
  if(error){
    console.log(error)
  }
  
  
  return (
    <div>
      {data && data?.promptListByPagination.totalCount === 0 ? (
        <EmptyState />
      ) : (
        <div className={`${styles.experimentBox}  max-h-[674px] overflow-auto`}>
          <div className={`flex items-center text-[13px] font-bold border-b-2`}>
            <div
              className={`basis-1/5 border-r-2 px-[10px] py-[34px] mr-[10px]`}
            >
              Name
            </div>
            <div className="basis-1/5 px-[10px] py-[34px]">Accuracy</div>
            <div className="basis-1/5 px-[10px] py-[34px]">Model</div>
            <div className="basis-1/5 px-[10px] py-[34px]">
              Execution Report
            </div>
            <div className="basis-1/5 flex items-center justify-around px-[10px] py-[34px]">
              <div>Run</div>
              <div>Actions</div>
            </div>
          </div>
          <div className="h-[580px] overflow-auto">
            {data?.promptListByPagination.prompts.map((PromptTemplate, index) => (
              <PromptTemplateCells
                key={index}
                PromptTemplate={PromptTemplate}
                setShowReport={setShowReport}
                setReportId={setReportId}

              />
            ))}
            <PaginationUI />
          </div>
        </div>
      )}
    </div>
  );
}

export default PromptTemplate;
