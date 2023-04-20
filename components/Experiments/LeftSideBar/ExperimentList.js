import React, { useEffect, useState } from "react";
import ExperimentCell from "./ExperimentCell";
import { useQuery } from "@apollo/client";
import Queries from "../../../queries/Queries";
import ExperimentListSkeleton from "../../Skeletons/ExperimentListSkeleton";
import { useExpContext } from "../../../context/ExpContext";

export default function ExperimentList() {
  const [selectedExperiment, setSelectedExperiment] = useState(0);
  const { data, loading, error } = useQuery(Queries.experimentList);
  const { setSelectedExperimentInfo } = useExpContext();

  const handleChange = (index) => {
    setSelectedExperiment(index);
    setSelectedExperimentInfo(data?.experimentList[index]);
  };

  useEffect(() => {
    handleChange(selectedExperiment);
  }, []);

  if (loading) {
    return <ExperimentListSkeleton />;
  }

  if (error) {
    return null;
  }
  if (data?.experimentList.length !== 0) {
    setSelectedExperimentInfo(data?.experimentList[0]);
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
          id={experiment.id}
          experimentName={experiment.name}
          key={index}
          index={index}
          selectedExperiment={selectedExperiment}
          setSelectedExperiment={handleChange}
        />
      ))}
    </div>
  );
}
