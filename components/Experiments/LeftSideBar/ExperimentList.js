import React, { useEffect, useState, useRef } from "react";
import ExperimentCell from "./ExperimentCell";
import { useQuery } from "@apollo/client";
import Queries from "../../../queries/Queries";
import ExperimentListSkeleton from "../../Skeletons/ExperimentListSkeleton";
import { useExpContext } from "../../../context/ExpContext";
import { useCompSelectorContext } from "../../../context/compSelectorContext";

export default function ExperimentList() {
  const experimentDetailsFetched = useRef(false);
  const [selectedExperiment, setSelectedExperiment] = useState(0);
  const { data, loading, error, refetch } = useQuery(Queries.experimentList);
  const { selectedExperimentInfo, setSelectedExperimentInfo } = useExpContext();

  const { addDynamicVars, setAddDynamicVars } = useCompSelectorContext();

  const handleChange = (index) => {
    setSelectedExperiment(index);
    setSelectedExperimentInfo(data?.experimentList[index]);
  };

  useEffect(() => {
    handleChange(selectedExperiment);
  }, [data]);

  useEffect(() => {
    refetch();
    handleChange(selectedExperiment);

    setAddDynamicVars(false);
  }, [addDynamicVars]);

  useEffect(() => {
    if (!experimentDetailsFetched.current && data?.experimentList.length) {
      experimentDetailsFetched.current = true;
      if (
        selectedExperimentInfo == null ||
        Object.keys(selectedExperimentInfo).length === 0
      )
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
      className="mt-[20px]"
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
