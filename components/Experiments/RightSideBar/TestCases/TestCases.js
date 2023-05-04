import React, { useEffect, useState } from "react";
import EmptyState from "../EmptyState";
import styles from "../ExperimentsDetails.module.scss";
import TestCaseTabs from "./TestCaseTabs";
import TestCasesList from "./TestCasesList";
import { useQuery } from "@apollo/client";
import Queries from "../../../../queries/Queries";
import { useExpContext } from "../../../../context/ExpContext";
import LoadingState from "../../LoadingState";
import { useCompSelectorContext } from "../../../../context/compSelectorContext";
import { useMutation } from "@apollo/client";
import { MESSAGES } from "../../../../constants/Messages";
import Toast from "../../../ToastMessage/Toast";
export default function TestCases() {
  const { selectedExperimentInfo, testCase, setTestCase } = useExpContext();

  const { data, loading, error, refetch } = useQuery(Queries.getTestCaseById, {
    variables: { experimentId: selectedExperimentInfo?.id },
  });

  const [
    createTestCases,
    {
      data: createTestCase,
      loading: loadingCreateTestCase,
      error: errorCreateTestCase,
    },
  ] = useMutation(Queries.createTestCases);

  const { addTestCase, setAddTestCase } = useCompSelectorContext();

  useEffect(() => {
    if (addTestCase) {
      handleAddTestCase();
      setAddTestCase(false);
    }
    setTestCase(data?.testCases[0]);
  }, [addTestCase, data, createTestCase]);

  if (loading) {
    return <LoadingState />;
  }

  const handleAddTestCase = async () => {
    try {
      let allDynamicVars = {};
      if (selectedExperimentInfo?.dynamicVariables) {
        for (let i = 0;i < selectedExperimentInfo?.dynamicVariables.length;i++) {
          allDynamicVars[selectedExperimentInfo?.dynamicVars[i]] = "";
        }
      }

      await createTestCases({
        variables: {
          name: "Untitled Test Case",
          description: "Initial Test Case Description",
          dynamicVarValues: JSON.stringify(allDynamicVars),
          experimentId: selectedExperimentInfo?.id,
        },
      });
      await refetch();
    } catch (err) {
      console.log(err);
      return err;
    }
  };
  //Todo add error handling
  return (
    <div>
      {createTestCase && (
        <Toast msg={MESSAGES.TEST_CASE.CREATED} type="success" />
      )}
      {errorCreateTestCase && (
        <Toast msg={MESSAGES.TEST_CASE.FAILED} type="error" />
      )}
      {data?.testCases.length === 0 ? (
        <EmptyState />
      ) : (
        <div className={`flex gap-[20px] ${styles.experimentBox}`}>
          {error ? (
            <div className="flex space-evenly text-[20px] text-[#ff0000] tracking-[0.2px] h-[400px]">
              {error.message}
            </div>
          ) : (
            <>
              <div className="basis-64 max-h-[674px] ">
                <TestCasesList data={data} />
              </div>
              <div className="mt-[13px] w-full">
                <TestCaseTabs />
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
