import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { getLocalstorageFormData } from "../../redux/reducers/landingSearchFormSlice";
import { fetchResultsConfigData } from "../../redux/reducers/roomResultConfigDataSlice";
import { useAppDispatch } from "../../redux/store";
import Banner from "./Banner/Banner";
import ResultSection from "./ResultSection/ResultSection";
import "./roomResults.scss";
import Stepper from "./Stepper/Steps";

export default function RoomResults() {
  const reduxDispatch = useAppDispatch();
  useEffect(() => {
    reduxDispatch(getLocalstorageFormData());
    reduxDispatch(fetchResultsConfigData())
  }, [reduxDispatch]);

  return (
    <Box className={"room-results-page"}>
      <Box className={"banner-section"}>
        <Banner />
      </Box>
      <Box className={"stepper-section"}>
        <Stepper />
      </Box>
      <Box sx={{ width: "100%" }} className={"results-section"}>
        <ResultSection/>
      </Box>
    </Box>
  );
}
