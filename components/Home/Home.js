import Onboarding from "../Onboarding/Onboarding";
import styles from "./Home.module.scss";
import Button from "@mui/material/Button";
import Link from "next/link";
export default function Home() {
  const handleClick = () => {
    localStorage.setItem("onBoardingWithExitButton", "true"); //cycle incomplete
  };

  return (
    
    <div onClick={handleClick}>
      <Link href="/experiments/1">
        <div className="flex h-[100vh]">
          <div className="basis-2/12 py-[26px] ">
            <div className="px-[14px] bg-[#fff]">
              <Button
                fullWidth
                variant="outlined"
                sx={{ textTransform: "none", whiteSpace: "nowrap" }}
              >
                + Create Experiment
              </Button>
              <div
                className={`flex items-center gap-[10px] cursor-pointer pt-[20px] opacity-60`}
              ></div>
            </div>
          </div>
          <div className="bg-[#F3F4F6] w-full px-[35px] py-[26px] flex justify-center pt-[150px]">
            <div>
              <div className="flex justify-center">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.037 24.1481L15.8518 36L31.2592 19.4074L22.9629 14.6667L24.1481 4L8.74072 20.5926L17.037 24.1481Z"
                    stroke="black"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  r
                </svg>
                <div className="font-bold text-[24px]">PromptEval</div>
              </div>
              <div
                className={`${styles.gradientBox} px-2 flex items-end mt-[38px]`}
              >
                <div onClick={(event) => event.stopPropagation()}>
                  <Link href="/experiments/1">
                    <div>
                      <Button style={{ textTransform: "none", color: "#fff" }}>
                        Quickstart tutorial
                      </Button>
                      <div className="text-[#fff] text-md px-2 pb-[20px]">
                        Learn by starting your first experiment
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
              <div className="my-[46px] text-[20px] font-bold flex justify-center">
                Evaluate your prompt accuracy
              </div>
              <Onboarding />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
