import { useEffect, useState } from "react";
import Modal from "react-modal";
import RunPromptIcon from "../../../../assets/Svg/RunPromptIcon";
import CrossIcon from "../../../../assets/Svg/CrossIcon";
import DropDownArrow from "../../../../assets/Svg/DropDownArrow";
import Button from "@mui/material/Button";
import { CircularProgress } from "@mui/material";
import { Select, MenuItem } from "@mui/material";
import Queries from "../../../../queries/Queries";
import { useMutation } from "@apollo/client";
import { useExpContext } from "../../../../context/ExpContext";
import { MESSAGES } from "../../../../constants/Messages";
import { useToastContext } from "../../../../context/ToastContext";
import { useCompSelectorContext } from "../../../../context/compSelectorContext";
import AddIcon from "../../../../assets/Svg/AddIcon";

Modal.setAppElement("*");

export default function RunModal({
  showRunModal,
  setShowRunModal,
  modelOptions,
  evalOptions,
  isRunnable,
  refetchList,
  setStartRun,
  selectedModel,
  selectedEval
}) {
  const [model, setModel] = useState("");
  const [evaluation, setEvaluation] = useState("");
  const { setShowToast, setToastMessage, setToastType } = useToastContext();
  const { setCurrTab, setAddTestCase } = useCompSelectorContext();

  useEffect(() => {
    if(selectedModel && selectedEval){
      setModel(selectedModel);
      setEvaluation(selectedEval);
      return;
    }
    if (modelOptions) setModel(modelOptions[0]);

    if (evalOptions) setEvaluation(evalOptions[0]);
  }, [modelOptions, evalOptions]);

  const customStyle = {
    content: {
      inset: "0",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      position: "absolute",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: "20",
    },
  };

  const [createEvaluation, { data, loading, error }] = useMutation(
    Queries.createEvaluation
  );

  const { promptTemplate } = useExpContext();
  const [errorMsg, setErrorMsg] = useState(null);

  const handleRun = async () => {
    try {
      await createEvaluation({
        variables: {
          promptTemplateId: promptTemplate?.id,
          model: model,
          eval: evaluation,
        },
      });
      setStartRun(true);
      handleClose();

      setShowToast(true);
      setToastMessage(MESSAGES.RUN.SUCCESS);
      setToastType("success");
    } catch (err) {
      setShowToast(true);
      setToastMessage(MESSAGES.RUN.FAILURE);
      setToastType("error");
      setErrorMsg(err.message);
      return err;
    }
  };

  const handleClose = () => {
    setShowRunModal(!showRunModal);
    setErrorMsg(null);
    refetchList();
  };
  return (
    <Modal
      isOpen={showRunModal}
      style={customStyle}
      className="flex item-center"
    >
      <div className="absolute w-[489px] bg-white py-[32px] px-[33px] rounded-[8px]">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row">
            <RunPromptIcon />
            <span className="font-[600] text-[15px] ml-[10px]">Run Prompt</span>
          </div>
          <button onClick={() => handleClose()}>
            <CrossIcon />
          </button>
        </div>
        {isRunnable ? (
          <>
            <div className="mt-[8px] font-400 text-[13px] text-[#00000099]">
              Select your configurable variables to Run the prompt with.
            </div>
            <div className="mt-[24px] font-400 text-[13px] text-[#000000]">
              Model
            </div>
            <div className="mt-[6px] font-400 text-[13px] text-[#000000]">
              <Select
                className="w-[425px] h-[48px] rounded-[4px] outline-none"
                IconComponent={(props) => (
                  <div {...props} className="mr-[20px]">
                    <DropDownArrow />
                  </div>
                )}
                value={model}
                onChange={(e) => setModel(e.target.value)}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      maxHeight: 224,
                    },
                  },
                }}
                autoWidth
              >
                {modelOptions &&
                  modelOptions.map((item, index) => (
                    <MenuItem
                      key={index}
                      value={item}
                      selected={model === item}
                      style={
                        model === item ? { backgroundColor: "#F8FAFB" } : {}
                      }
                    >
                      {item}
                    </MenuItem>
                  ))}
              </Select>
            </div>
            <div className="mt-[20px] font-400 text-[13px] text-[#000000]">
              Evaluation
            </div>
            <div className="mt-[6px] font-400 text-[13px] text-[#000000]">
              <Select
                className="w-[425px] h-[48px] rounded-[4px] outline-none cursor-pointer"
                IconComponent={(props) => (
                  <div {...props} className="mr-[20px]">
                    <DropDownArrow />
                  </div>
                )}
                value={evaluation}
                onChange={(e) => setEvaluation(e.target.value)}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      maxHeight: 224,
                    },
                  },
                }}
              >
                {evalOptions &&
                  evalOptions.map((item, index) => (
                    <MenuItem
                      key={index}
                      value={item}
                      selected={evaluation === item}
                      style={
                        evaluation === item
                          ? { backgroundColor: "#F8FAFB" }
                          : {}
                      }
                    >
                      {item}
                    </MenuItem>
                  ))}
              </Select>
            </div>
            <div className="flex flex-row item-center">
              <Button
                variant="contained"
                style={{
                  background: "#2196F3",
                }}
                sx={{
                  ...(loading && {
                    bgcolor: "#2196F3",
                  }),
                  mt: "32px",
                  textTransform: "none",
                  width: "425px",
                  height: "36px",
                  boxShadow:
                    "0px 1px 5px rgba(0, 0, 0, 0.12), 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.2)",
                  bordeRadius: "4px",
                }}
                disabled={loading}
                onClick={() => {
                  handleRun();
                }}
              >
                {loading ? (
                  <CircularProgress
                    size={24}
                    sx={{
                      color: "white",
                    }}
                  />
                ) : (
                  "Run"
                )}
              </Button>
            </div>
            {error && (
              <div className="text-[#f00] text-[14px] mt-[6px] break-all text-ellipsis line-clamp-2 flex justify-center items-center">
                {errorMsg}
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col">
            <div className="py-[20px] text-[13px]">
              There are no test cases available. Please click on the button
              below to create a new test case.
            </div>
            <div className={`flex items-end justify-center`}>
              <Button
                variant="outlined"
                sx={{ color: "#2196F3", textTransform: "none" }}
                onClick={() => {
                  setCurrTab("testCases");
                  setAddTestCase(true);
                  setStartRun(true);
                  handleClose();
                }}
              >
                <AddIcon className="mr-[11px]" />
                Add new test case
              </Button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
