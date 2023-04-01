import { Box } from "@mui/system";
import React, { useCallback, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  fetchLandingConfigData,
  getLocalstorageFormData,
} from "../../redux/reducers/landingSearchFormSlice";
import {
  fetchResultsConfigData,
  setSortToSend,
} from "../../redux/reducers/roomResultConfigDataSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import Banner from "./Banner/Banner";
import ResultSection from "./ResultSection/ResultSection";
import "./roomResults.scss";
import Stepper from "./Stepper/Steps";

export default function RoomResults() {
  const reduxDispatch = useAppDispatch();
  const location = useLocation();
  const propertyId = useAppSelector((state) => state.landingForm.propertyId);
  const navigate = useNavigate();

  const params = useMemo(() => new URLSearchParams(location.search), [location.search]);

  const getSearchParams = useCallback(() => {
    const formData = JSON.parse(localStorage.getItem("formData") || "{}");

    // for startDate
    const startDate = params.get("startDate");
    if (startDate !== null) {
      formData.startDate = startDate;
    }
    // for endDate
    const endDate = params.get("endDate");
    if (endDate !== null) {
      formData.endDate = endDate;
    }

    // for room count
    const roomCount = params.get("rooms");
    console.log("room count param", roomCount);
    if (roomCount !== null && Number(roomCount) < 5) {
      console.log("inside");
      formData.rooms = roomCount;
      localStorage.setItem("formData", JSON.stringify(formData));
    }

    // for beds count
    const bedCount = params.get("beds");
    if (bedCount && Number(bedCount) < 4) {
      formData.beds = bedCount;
      localStorage.setItem("formData", JSON.stringify(formData));
    }

    // for guestDetails
    formData.guestDetails.forEach((guest: any) => {
      if (guest.show === true) {
        const guestData = params.get(`${guest.categoryName}`);
        if (guestData) guest.count = guestData;
      }

      // for sort
      const sort = params.get("sort");
      if (sort !== null || formData.sort !== "#") {
        formData.sort = sort;
        reduxDispatch(setSortToSend(sort));
      }
    });
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [params, reduxDispatch]);

  useEffect(() => {
    async function fetchData() {
      try {
        await reduxDispatch(fetchLandingConfigData());
        await reduxDispatch(fetchResultsConfigData());
        getSearchParams();
        reduxDispatch(getLocalstorageFormData());
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [getSearchParams, navigate, propertyId, reduxDispatch]);

  return (
    <Box className={"room-results-page"}>
      <Box className={"banner-section"}>
        <Banner />
      </Box>
      <Box className={"stepper-section"}>
        <Stepper />
      </Box>
      <Box sx={{ width: "100%" }} className={"results-section"}>
        <ResultSection />
      </Box>
    </Box>
  );
}
