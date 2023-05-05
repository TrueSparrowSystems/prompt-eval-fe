import React, { useRef, useEffect } from "react";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

function Toast({ msg, type }) {
  const toastRef = useRef(null);

  useEffect(() => {
    const hideToast = setTimeout(() => {
      toastRef.current.style.display = "none";
    }, 5000);

    return () => {
      clearTimeout(hideToast);
    };
  }, []);

  return (
    <Snackbar
      ref={toastRef}
      open={true}
      autoHideDuration={5000}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <MuiAlert severity={type} sx={{ width: "100%", }} elevation={6}>
        {msg}
      </MuiAlert>
    </Snackbar>
  );
}

export default Toast;
