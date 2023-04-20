import React from "react";
import styles from "./RightSideBar/ExperimentsDetails.module.scss";
function LoadingState(props) {
  return (
    <div
      className={`relative w-full ${styles.emptyState} flex justify-center items-center`}
    ></div>
  );
}

export default LoadingState;
