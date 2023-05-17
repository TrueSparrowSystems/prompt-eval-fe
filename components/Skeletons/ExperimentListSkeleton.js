import React from "react";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

function ExperimentListSkeleton(props) {
  return (
    <Box>
      <Skeleton animation="wave" height={60} width={252}/>
      <Skeleton animation="wave" height={60} width={252}/>
      <Skeleton animation="wave" height={60} width={252}/>
      <Skeleton animation="wave" height={60} width={252}/>
      <Skeleton animation="wave" height={60} width={252}/>
      <Skeleton animation="wave" height={60} width={252}/>
      <Skeleton animation="wave" height={60} width={252}/>
      <Skeleton animation="wave" height={60} width={252}/>
      <Skeleton animation="wave" height={60} width={252}/>
      <Skeleton animation="wave" height={60} width={252}/>
      <Skeleton animation="wave" height={60} width={252}/>
    </Box>
  );
}

export default ExperimentListSkeleton;
