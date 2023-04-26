import React, { useEffect, useState } from "react";
import EmptyState from "../EmptyState";
import styles from "../ExperimentsDetails.module.scss";
import TestCaseTabs from "./TestCaseTabs";
import TestCasesList from "./TestCasesList";
import { useQuery } from "@apollo/client";
import Queries from "../../../../queries/Queries";
import { useExpContext } from "../../../../context/ExpContext";
import LoadingState from "../../LoadingState";

export default function TestCases({handleCreate}) {
  const { selectedExperimentInfo } = useExpContext();
  const { data, loading, error, refetch } = useQuery(Queries.getTestCaseById, {
    variables: { experimentId: selectedExperimentInfo?.id },
  });

  const [selectTestCase, setSelectTestCase] = useState(data?.testCases[0]);

  useEffect(() => {
    refetch();
  }, []);

  if (loading) {
    return <LoadingState />;
  }

  return (
    <div>
      {data === null || data === undefined || data.testCases.length === 0 || error ? (
        <EmptyState handleCreate={handleCreate}/>
      ) : (
        <div className={`flex gap-[20px] ${styles.experimentBox}`}>
          <div className="basis-56 max-h-[674px] overflow-auto">
            <TestCasesList data={data} setSelectTestCase={setSelectTestCase} />
          </div>
          <div className="mt-[13px] w-full overflow-auto">
            <TestCaseTabs selectTestCase={selectTestCase} />
          </div>
        </div>
      )}
    </div>
  );
}
