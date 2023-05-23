import React, { useState } from "react";
import Modal from "react-modal";
import Share from "../../../../assets/Svg/Share";
import CopyLinkIcon from "../../../../assets/Svg/CopyLinkIcon";
import Button from "@mui/material/Button";
import { useExpContext } from "../../../../context/ExpContext";
import { useEffect } from "react";
import { MESSAGES } from "../../../../constants/Messages";
import styles from "../TestCases/TestCaseTabs.module.scss";
import { useToastContext } from "../../../../context/ToastContext";
import { useRouter } from "next/router";

Modal.setAppElement("*");

export default function ShareModal({ showShareModal, setShowShareModal }) {
  const { reportId, selectedExperimentInfo } = useExpContext();
  const { setShowToast, setToastMessage, setToastType } = useToastContext();

  const [link, setLink] = useState("");

  const [isHover, setIsHover] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setLink(
      `${window.location.origin}/experiments/${selectedExperimentInfo.id}?reportId=${reportId}`
    );
  }, []);

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
      zIndex: "110",
    },
  };

  return (
    <>
      <Modal
        isOpen={showShareModal}
        style={customStyle}
        className="flex item-center"
        onRequestClose={() => setShowShareModal(!showShareModal)}
      >
        <div className="absolute w-[489px] h-[276px] bg-white py-[32px] px-[33px] tracking-[-0.18px] rounded-[8px]">
          <div className="flex flex-row gap-x-[10px] mb-[8px]">
            <Share className="flex flex-col" />
            <div className="font-semibold tracking-[-0.18px] text-[15px]">
              Share Report
            </div>
          </div>
          <div className="flex flex-row text-[13px] text-[#00000099] mb-[24px]">
            Anyone who has this link will be able to view this.
          </div>
          <div className="flex flex-row mb-[6px] text-[13px]">Model</div>
          <div className="flex flex-row gap-x-[10px] mb-[16px]">
            <div
              className={`w-[366px] max-h-[48px] text-[13px] border rounded-[4px] py-[14px] pl-[16px] border-[#2196F380] whitespace-nowrap ${
                isHover ? "bg-[#2196F30D]" : ""
              }`}
            >
              <div
                className={`relative right-[9px] overflow-auto ${styles.scrollCont}`}
              >
                {link}
              </div>
            </div>
            <CopyLinkIcon
              onClick={() => {
                navigator.clipboard.writeText(link);
                setShowToast(true);
                setToastMessage(MESSAGES.SHARE.SUCCESS);
                setToastType("info");
              }}
              className={`cursor-pointer`}
              fill={isHover ? "#1565c0" : "#2196F3"}
              onMouseEnter={() => setIsHover(true)}
              onMouseLeave={() => setIsHover(false)}
            />
          </div>
          <div className="flex flex-row justify-end">
            <Button
              variant="outlined"
              onClick={() => setShowShareModal(false)}
              sx={{ outline: "none" }}
            >
              Close
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
