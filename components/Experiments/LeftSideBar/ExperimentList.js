import React,{useState} from "react";
import ExperimentCell from "./ExperimentCell";
const ExperimentListData = [
  { name: "Experiment 1" },
  { name: "Experiment 2" },
  { name: "Experiment 3" },
  { name: "Experiment 4" },
  { name: "Experiment 5" },
  { name: "Experiment 6" },
];
export default function ExperimentList() {
  const [selectedExperiment , setSelectedExperiment] = useState(0);
  return (
    <div className="mt-[20px]">
      {ExperimentListData.map((experiment, index) => (
        <ExperimentCell experimentName={experiment.name} key={index} index ={index} selectedExperiment={selectedExperiment} setSelectedExperiment={setSelectedExperiment}/>
      ))}
    </div>
  );
}
