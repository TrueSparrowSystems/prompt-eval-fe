import React,{useEffect, useState} from "react";
import EmptyState from "../EmptyState";
import styles from "../ExperimentsDetails.module.scss";
import TestCaseTabs from "./TestCaseTabs";
import TestCasesList from "./TestCasesList";
import { useQuery } from "@apollo/client";
import Queries from "../../../../queries/Queries";
import { useExpContext } from "../../../../context/ExpContext";
import LoadingState from "../../LoadingState";

export default function TestCases(props) {

  const { selectedExperimentInfo,setSelectedExperimentInfo } = useExpContext();
  const { data, loading, error } = useQuery(Queries.getTestCaseById, {
    variables: { experimentId: selectedExperimentInfo?.id },
  });

  const [selectTestCase,setSelectTestCase] = useState(data?.testCases[0]);

  useEffect(() => {
    console.log("useEffect",selectedExperimentInfo?.testCases);
  }, [selectedExperimentInfo]);

  if (loading) {
    return <LoadingState />
  }

  if (error) {
    console.error(error);
    return null;
  }

  return (
    <div>
      {data===null || data===undefined || data.testCases.length === 0 ? (
        <EmptyState />
      ) : (
        
        <div className={`flex gap-[20px] ${styles.experimentBox}`}>
          <div className="basis-56 max-h-[674px] overflow-auto">
            <TestCasesList data={data} setSelectTestCase={setSelectTestCase}/>
          </div>
          <div className="mt-[13px] w-full">
            <TestCaseTabs selectTestCase={selectTestCase}/>
          </div>
        </div>
        
      )}
    </div>
  );
}
