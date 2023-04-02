import { Box } from "@mui/system";
import { format } from "date-fns";
import React, { useCallback, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
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
  const sortToSend = useAppSelector((state) => state.resultsConfiguration.sortToSend);
  const landingFormData = useAppSelector((state) => state.landingForm);
  const filters = useAppSelector((state) => state.resultsConfiguration.filters);
  const params = useMemo(() => new URLSearchParams(location.search), [location.search]);

  const getSearchParams = useCallback(() => {
    const formData = JSON.parse(localStorage.getItem("formData") || "{}");

    // for property id
    const propertyId = params.get("propertyId");
    if (propertyId !== null && propertyId === "4") {
      formData.property = propertyId;
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
          // console.log(options);
          if (options) {
            const selectedFilterOptions = options?.split(",");
            filter.selectedOptions = selectedFilterOptions;
            console.log("params options", selectedFilterOptions);
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

      // for sort
      const sort = params.get("sort");
      if (sort !== null) {
        formData.sort = sort;
        reduxDispatch(setSortToSend(sort));
      } else if (formData.sort !== "#" && formData.sort !== undefined) {
        reduxDispatch(setSortToSend(formData.sort));
      }

      // for page
      const pageNumber = Number(params.get("page"));
      if (pageNumber !== 0) {
        console.log("params page number", pageNumber);
        localStorage.setItem("page", String(pageNumber));
        reduxDispatch(setPageNumber(pageNumber));
      } else {
        const localStoragePageNumber = Number(localStorage.getItem("page"));
        console.log("localstorage page number", localStoragePageNumber);
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
    });
    localStorage.setItem("formData", JSON.stringify(formData));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params, reduxDispatch]);

  type Filters = {
    [key: string]: string[];
  };

  type RequestBody = {
    sortType: string;
    numberOfRooms: number;
    numberOfBeds: number;
    pageSize: number;
    pageNumber: number;
    filters: Filters;
    startTime: string;
    endTime: string;
  };

  useEffect(() => {
    async function fetchData() {
      try {
        await reduxDispatch(fetchLandingConfigData());
        await reduxDispatch(fetchResultsConfigData());
        const startTime = format(new Date(landingFormData.startDate), "yyyy-MM-dd");
        const endTime = format(new Date(landingFormData.endDate), "yyyy-MM-dd");
        getSearchParams();
        reduxDispatch(getLocalstorageFormData());
        console.log("SORT TO SEND", sortToSend);
        console.log("FILTERS TO SEND", filters);
        const pageNumber = Number(localStorage.getItem("page"));
        console.log("pageNumber", pageNumber);
        const formData = JSON.parse(localStorage.getItem("formData") || "{}");
        const requestBody: RequestBody = {
          sortType: sortToSend,
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
        await reduxDispatch(fetchRoomResultsGraphQlData(requestBody));
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
