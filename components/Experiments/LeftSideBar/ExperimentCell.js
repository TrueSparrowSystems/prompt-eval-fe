import React, { useEffect, useState, useRef } from "react";
import ExperimentsIcon from "../../../assets/Svg/ExperimentsIcon";
import Rename from "../../../assets/Svg/Rename";
import { useMutation } from "@apollo/client";
import Queries from "../../../queries/Queries";
import { useExpContext } from "../../../context/ExpContext";
import { useCompSelectorContext } from "../../../context/compSelectorContext";
import Link from "next/link";
import ErrorAlertToast from "../../ToastMessage/ErrorAlertToast"

function ExperimentCell({
  id,
  experimentName,
  index,
  selectedExperiment,
  setSelectedExperiment,
}) {
  const [showEditIcon, setShowEditIcon] = useState(false);
  const [editable, setEditable] = useState(false);
  const [newExperimentName, setNewExperimentName] = useState(experimentName);
  const { selectedExperimentInfo, setSelectedExperimentInfo } = useExpContext();
  const {
    setShowReport,
    setShowAdd,
    setShowClone,
    setShowEdit,
    setAddTestCase,
  } = useCompSelectorContext();
  const inputRef = useRef(null);

  const [updateExperiment, { data, loading, error }] = useMutation(
    Queries.updateExperiment
  );

  useEffect(() => {
    setNewExperimentName(experimentName);
  }, [experimentName]);

  useEffect(() => {
    if (
      selectedExperimentInfo &&
      Object.keys(selectedExperimentInfo).length !== 0 &&
      selectedExperimentInfo?.id === id
    )
      setNewExperimentName(selectedExperimentInfo?.name);
  }, [selectedExperimentInfo]);

  useEffect(() => {
    if (editable) inputRef.current.focus();
  }, [editable]);

  const handleUpdate = async () => {
    if (newExperimentName.length === 0) {
      setNewExperimentName(selectedExperimentInfo?.name);
      return;
    }

    try {
      await updateExperiment({
        variables: {
          documentId: id,
          name: newExperimentName,
        },
      });

      setSelectedExperimentInfo((prevState) => ({
        ...prevState,
        name: newExperimentName,
      }));
    } catch (err) {
      setNewExperimentName(selectedExperimentInfo?.name);
      return err;
    }
  };

  return (
    <>
      <Link href={`/experiments/${id}`}>
        <a>
          <div
            className={`flex items-center gap-[10px] p-[12px] cursor-pointer ${
              showEditIcon ? "bg-[#F0F0F0]" : ""
            } ${
              selectedExperiment == index ? "bg-[#F8FAFB] rounded-[4px]" : ""
            }`}
            onClick={() => {
              setSelectedExperiment(index);
              setShowReport(false);
              setShowAdd(false);
              setShowClone(false);
              setShowEdit(false);
              setAddTestCase(false);
            }}
            onMouseEnter={() => setShowEditIcon(true)}
            onMouseLeave={() => setShowEditIcon(false)}
          >
            <div>
              <ExperimentsIcon />
            </div>

            <input
              ref={inputRef}
              type="text"
              value={newExperimentName}
              className={`text-md text-[#00000099] focus:outline-none outline-none text-ellipsis pl-[5px] ${
                selectedExperiment == index
                  ? editable
                    ? "bg-white"
                    : "bg-[#F8FAFB]"
                  : showEditIcon
                  ? ""
                  : "bg-white"
              }`}
              onChange={(e) => setNewExperimentName(e.target.value)}
              onBlur={() => {
                setEditable(false);
                handleUpdate();
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  setEditable(false);
                  handleUpdate();
                }
              }}
              disabled={!editable}
            />
            <button
              className={`ml-auto hover:bg-[#0000001A] p-[5px] ${
                showEditIcon ? "opacity-100" : "opacity-0"
              }`}
              title="Rename"
              onClick={() => {
                setEditable(true);
              }}
            >
              <Rename />
            </button>
          </div>
        </a>
      </Link>
      {error && (
        <ErrorAlertToast message={error.message}/>
      )}
    </>
  );
}

export default ExperimentCell;
