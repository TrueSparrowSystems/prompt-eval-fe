import React from "react";
import Skeleton from "@mui/material/Skeleton";

function UpdateTemplateSkeleton() {
  return (
    <div>
      <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
      <Skeleton variant="text" sx={{ fontSize: "1.5rem", mt:'20px' }} />
      <Skeleton variant="rectangular" width={400} height={60} sx={{ mt: "10rem" }}/>
      <Skeleton variant="button" width={300} height={20} />
    </div>
  );
}

export default UpdateTemplateSkeleton;
