import React, { useEffect, useState } from "react";
import EmptyState from "../EmptyState";
import styles from "../ExperimentsDetails.module.scss";
import TestCaseTabs from "./TestCaseTabs";
import TestCasesList from "./TestCasesList";
import { useQuery } from "@apollo/client";
import Queries from "../../../../queries/Queries";
import { useExpContext } from "../../../../context/ExpContext";
import { useCompSelectorContext } from "../../../../context/compSelectorContext";
import { getUnsanitizedValue } from "../../../../utils/DecodeString";

export default function TestCases() {
  const { selectedExperimentInfo, setTestCase } = useExpContext();

  const { data, loading, error, refetch } = useQuery(Queries.getTestCaseById, {
    variables: { experimentId: selectedExperimentInfo?.id },
  });

  const {
    addTestCase,
    setAddDynamicVars,
    setShowEmptyState,
    setShowLoadingState,
  } = useCompSelectorContext();

  const [unsavedChanges, setUnsavedChanges] = useState(false);

  useEffect(() => {
    setTestCase(getUnsanitizedValue(data?.testCases[0]));
  }, [data]);

  useEffect(() => {
    if (!addTestCase) refetch();
  }, [addTestCase]);

  useEffect(() => {
    setAddDynamicVars(true);
    refetch();

    if (data?.testCases.length === 0) setShowEmptyState(true);
    else setShowEmptyState(false);
  }, []);

  useEffect(() => {
    if (loading) {
      setShowLoadingState(true);
    } else setShowLoadingState(false);
  }, [loading]);

  return (
    <div>
      {!addTestCase &&
      ((loading) ||
        data == null ||
        data?.testCases.length === 0) || selectedExperimentInfo == null? (

        <EmptyState />
      ) : (
        <div className={`flex ${styles.experimentBox}`}>
          {error ? (
            <div className="flex space-evenly text-[20px] text-[#ff0000] tracking-[0.2px] h-[400px]">
              {error.message}
            </div>
          ) : (
            <>
              <div className={`basis-64 ${styles.subBoxHeight}`}>
                <TestCasesList data={data} unsavedChanges={unsavedChanges} />
              </div>
              <div className="mt-[13px] w-full ">
                <TestCaseTabs
                  unsavedChanges={unsavedChanges}
                  setUnsavedChanges={setUnsavedChanges}
                />
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
