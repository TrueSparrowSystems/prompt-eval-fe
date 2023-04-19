import React, { useState } from "react";
import ExperimentCell from "./ExperimentCell";
import { useQuery } from "@apollo/client";
import Queries from "../../../queries/Queries";
import ExperimentListSkeleton from "../../Skeletons/ExperimentListSkeleton";

export default function ExperimentList() {
  const [selectedExperiment, setSelectedExperiment] = useState(0);
  const { data, loading, error } = useQuery(Queries.experimentList);

  if (loading) {
   return  <ExperimentListSkeleton />;
  }

  if (error) {
    return null;
  }
  return (
    <div
      className="mt-[20px] second-step"
      style={{
        height: `calc(100vh - 100px)`,
        overflow: "auto",
      }}
    >
      {data?.experimentList.map((experiment, index) => (
        <ExperimentCell
          experimentName={experiment.name}
          key={index}
          index={index}
          selectedExperiment={selectedExperiment}
          setSelectedExperiment={setSelectedExperiment}
        />
      ))}
    </div>
  );
}
