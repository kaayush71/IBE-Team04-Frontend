import { Box } from "@mui/system";
import React from "react";
import Banner from "./Banner/Banner";
import Results from "./Results/Results";
import "./roomResults.scss";
import Stepper from "./Stepper/Steps";

export default function RoomResults() {
  return (
    <Box className={"room-results-page"}>
      <Box className={"banner-section"}>
        <Banner />
      </Box>
      <Box className={"stepper-section"}>
        <Stepper />
      </Box>
      <Box className={"results-section"}>
        <Results />
      </Box>
    </Box>
  );
}
