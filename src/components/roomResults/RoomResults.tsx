/* eslint-disable react-hooks/exhaustive-deps */
import { Box } from "@mui/system";
import React, { useCallback, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { RequestBody } from "../../constants/types";
import { setSelectedCuurency } from "../../redux/reducers/currencyDataSlice";
import {
  fetchLandingConfigData,
  getLocalstorageFormData,
} from "../../redux/reducers/landingSearchFormSlice";
import { setSelectedLanguage } from "../../redux/reducers/languageDataSlice";
import {
  fetchResultsConfigData,
  fetchRoomResultsGraphQlData,
  setExistingFilters,
  setPageNumber,
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
  const resultConfig = useAppSelector((state) => state.resultsConfiguration);
  const { sortToSend } = useAppSelector((state) => state.resultsConfiguration);
  const landingFormData = useAppSelector((state) => state.landingForm);
  const params = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const navigate = useNavigate();

  const getSearchParams = useCallback(() => {
    const formData = JSON.parse(localStorage.getItem("formData") || "{}");

    // for property id
    const propertyId = params.get("propertyId");
    if (propertyId !== null && propertyId === "4") {
      formData.property = propertyId;
    } else if (formData.property === "") {
      navigate("/");
    }

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
    if (roomCount !== null && Number(roomCount) < 4) {
      formData.rooms = roomCount;
      localStorage.setItem("formData", JSON.stringify(formData));
    }

    // for beds count
    const bedCount = params.get("beds");
    if (bedCount && Number(bedCount) < 5) {
      formData.beds = bedCount;
      localStorage.setItem("formData", JSON.stringify(formData));
    } else {
      formData.beds = landingFormData.numberOfBedsSelected;
      localStorage.setItem("formData", JSON.stringify(formData));
    }

    // for guestDetails
    formData.guestDetails.forEach((guest: any) => {
      if (guest.show === true) {
        const guestData = params.get(`${guest.categoryName}`);
        if (guestData) guest.count = guestData;
      }

      // for filters
      formData.filters.forEach((filter: any) => {
        if (filter.show === true) {
          const options = params.get(`${filter.filterName}`);
          if (options) {
            const selectedFilterOptions = options?.split(",");
            filter.selectedOptions = selectedFilterOptions;
            reduxDispatch(
              setExistingFilters({
                filterName: filter.filterName,
                option: selectedFilterOptions,
              })
            );
          } else {
            reduxDispatch(
              setExistingFilters({
                filterName: filter.filterName,
                option: filter.selectedOptions,
              })
            );
          }
        }
      });

      // for page
      const pageNumber = Number(params.get("page"));
      if (pageNumber !== 0) {
        localStorage.setItem("page", String(pageNumber));
        reduxDispatch(setPageNumber(pageNumber));
      } else {
        const localStoragePageNumber = Number(localStorage.getItem("page"));
        if (localStoragePageNumber !== 0) reduxDispatch(setPageNumber(localStoragePageNumber));
      }

      // for language
      const language = params.get("lang");
      if (language) {
        reduxDispatch(setSelectedLanguage(language));
      }

      // //for currency
      const currency = params.get("currency");
      if (currency) {
        reduxDispatch(setSelectedCuurency(currency));
      }

      // for sort
      const sort = params.get("sort");
      if (sort !== null) {
        formData.sort = sort;
        reduxDispatch(setSortToSend(sort));
      } else if (formData.sort !== "#" && formData.sort !== undefined) {
        reduxDispatch(setSortToSend(formData.sort));
      }
    });
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [navigate, reduxDispatch, params]);

  useEffect(() => {
    localStorage.removeItem("remainingTime");
    async function fetchData() {
      try {
        landingFormData.landingConfig.searchForm.guest.guestTypes.length === 0 &&
          (await reduxDispatch(fetchLandingConfigData()));
        resultConfig.filters.length === 0 && (await reduxDispatch(fetchResultsConfigData()));
        getSearchParams();
        reduxDispatch(getLocalstorageFormData());
        const pageNumber = Number(localStorage.getItem("page"));
        const formData = JSON.parse(localStorage.getItem("formData") || "{}");
        const startTime = formData.startDate;
        const endTime = formData.endDate;
        const requestBody: RequestBody = {
          sortType: formData.sortToSend || sortToSend,
          numberOfRooms: formData.rooms,
          numberOfBeds: formData.beds || 1,
          pageSize: 3,
          pageNumber: pageNumber || 1,
          filters: {},
          startTime,
          endTime,
        };
        formData.filters.forEach((filter: any) => {
          if (filter.selectedOptions.length > 0) {
            requestBody.filters[filter.sendingName] = filter.selectedOptions;
          }
        });
        if (sortToSend !== "") {
          await reduxDispatch(fetchRoomResultsGraphQlData(requestBody));
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [getSearchParams, reduxDispatch, sortToSend]);

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
