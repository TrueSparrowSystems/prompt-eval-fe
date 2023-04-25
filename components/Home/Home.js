import Onboarding from "../Onboarding/Onboarding";
import styles from "./Home.module.scss";
import Button from "@mui/material/Button";
import Link from "next/link";
export default function Home() {
  return (
    <>
      <div className="flex h-[100vh]">
        <div className="basis-2/12 py-[26px] ">
          <div className="px-[14px] bg-[#fff]">
            <Button fullWidth variant="outlined" sx={{ textTransform: "none" }}>
              + Create experiment
            </Button>
            <div
              className={`flex items-center gap-[10px] cursor-pointer pt-[20px] opacity-60`}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.5001 2V5C12.5001 5.55228 12.9478 6 13.5001 6H16.5001M7.00007 15V11M10.0001 15L10.0001 7M13.0001 15V11M15.0001 3.5C14.555 3.10178 14.0932 2.62948 13.8016 2.32273C13.6076 2.11861 13.3395 2 13.0579 2H5.49983C4.39527 2 3.49984 2.89542 3.49983 3.99999L3.49976 15.9999C3.49975 17.1045 4.39518 18 5.49975 18L14.4998 18C15.6043 18 16.4998 17.1046 16.4998 16L16.5001 5.39819C16.5001 5.14249 16.4025 4.8967 16.2251 4.71261C15.8969 4.3722 15.3489 3.8121 15.0001 3.5Z"
                  stroke="black"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="text-md text-[#000]">Untitled 1</div>
            </div>
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
            <div className="my-[46px] text-[20px] font-bold flex justify-center">
              Evaluate your prompt accuracy
            </div>
            <Onboarding />
          </div>
        </div>
      </div>
    </>
  );
}
