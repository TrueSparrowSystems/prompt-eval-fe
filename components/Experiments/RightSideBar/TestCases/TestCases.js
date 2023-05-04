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
import TestCaseEmptyState from "../TestCaseEmptyState";

export default function TestCases() {
  const { selectedExperimentInfo, promptTemplate } = useExpContext();
  const { data, loading, error, refetch } = useQuery(Queries.getTestCaseById, {
    variables: { experimentId: selectedExperimentInfo?.id },
  });
  const [createTestCases, { dataTestCase, loadingTestCase, errorTestCase }] =
    useMutation(Queries.createTestCases);

  const [selectTestCase, setSelectTestCase] = useState(0);

  const { addTestCase, setAddTestCase } = useCompSelectorContext();

  useEffect(() => {
    if (addTestCase) {
      handleAddTestCase();
      setAddTestCase(false);
    }
  }, [addTestCase,data,selectTestCase]);

  if (loading) {
    return <LoadingState />;
  }

  const handleAddTestCase = async () => {
    try {
      await createTestCases({
        variables: {
          name: "Untitled Test Case",
          description: "Initial Test Case Description",
          dynamicVarValues: JSON.stringify({ key: "hey", value: "value" }),
          expectedResult: ["hey", "hey10"],
          experimentId: selectedExperimentInfo?.id,
        },
      });
      await refetch();
    } catch (err) {
      return err;
    }
  };

  return (
    <div>
      {data?.testCases.length === 0 ? (
        <EmptyState />
        // <TestCaseEmptyState />
      ) : (
        <div className={`flex gap-[20px] ${styles.experimentBox}`}>
          {error ? (
            <div className="flex space-evenly text-[20px] text-[#ff0000] tracking-[0.2px] h-[400px]">
              {error.message}
            </div>
          ) : (
            <>
              <div className="basis-64 max-h-[674px] ">
                <TestCasesList
                  data={data}
                  selectTestCase={selectTestCase}
                  setSelectTestCase={setSelectTestCase}
                />
              </div>
              <div className="mt-[13px] w-full">
                <TestCaseTabs data={data?.testCases[selectTestCase]} />
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
