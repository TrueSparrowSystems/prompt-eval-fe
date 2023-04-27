import React, { useEffect, useState, useRef } from "react";
import ExperimentCell from "./ExperimentCell";
import { useQuery } from "@apollo/client";
import Queries from "../../../queries/Queries";
import ExperimentListSkeleton from "../../Skeletons/ExperimentListSkeleton";
import { useExpContext } from "../../../context/ExpContext";

export default function ExperimentList() {
  const experimentDetailsFetched = useRef(false);
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

  useEffect(() => {
    if (!experimentDetailsFetched.current && data?.experimentList.length) {
      experimentDetailsFetched.current = true;
      setSelectedExperimentInfo(data.experimentList[0]);
    }
  }, [data]);

  if (loading) {
    return <ExperimentListSkeleton />;
  }

  if (error) {
    return (
      <div className="text-[#f00] text-[14px] mt-[12px] break-all p-[10px]">
        {error.message}
      </div>
    );
  }
  return (
    <div
      className="mt-[20px] second-step"
      style={{
        height: `calc(100vh - 100px)`,
        overflow: "auto",
      }}
    >
      {data?.experimentList.length > 0 ? (
        <>
          {data?.experimentList.map((experiment, index) => (
            <ExperimentCell
              id={experiment.id}
              experimentName={experiment.name}
              key={index}
              index={index}
              selectedExperiment={selectedExperiment}
              setSelectedExperiment={handleChange}
            />
          ))}{" "}
        </>
      ) : (
        <div className="mt-[30px] opacity-60 p-[10px]">
          No experiments created.
        </div>
      )}
    </div>
  );
}
