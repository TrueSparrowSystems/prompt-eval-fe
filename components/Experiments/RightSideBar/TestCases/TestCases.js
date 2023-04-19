import React from "react";
import EmptyState from "../EmptyState";
import styles from "../ExperimentsDetails.module.scss";
import TestCaseTabs from "./TestCaseTabs";
import TestCasesList from "./TestCasesList";

export default function TestCases(props) {
  const TestCaseList = [];

  return (
    <div>
      {TestCaseList.length === 0 ? (
        <EmptyState />
      ) : (
        <div className={`flex gap-[20px] ${styles.experimentBox}`}>
          <div className="basis-48 max-h-[674px] overflow-auto">
            <TestCasesList />
          </div>
          <div className="mt-[13px] w-full">
            <TestCaseTabs />
          </div>
        </div>
      )}
    </div>
  );
}
