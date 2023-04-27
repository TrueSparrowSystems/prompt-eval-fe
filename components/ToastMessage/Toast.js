import React, { useRef, useEffect } from "react";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref}  {...props} />;
});

function Toast({ msg }) {
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
      open={open}
      autoHideDuration={5000}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <Alert severity="success" sx={{ width: "100%" }}>
        {msg}
      </Alert>
    </Snackbar>
  );
}

export default Toast;
