import React, { useState } from "react";
import Alert from "@mui/material/Alert";
import { Collapse, IconButton } from "@mui/material";
import CrossIcon from "../../assets/Svg/CrossIcon";

export default function ErrorAlertToast({ message }) {
  const [open, setOpen] = useState(true);

  return (
    <div>
      <Collapse in={open}>
        <Alert
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CrossIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mt: 2, mb: 2 }}
        >
          {message}
        </Alert>
      </Collapse>
    </div>
  );
}
