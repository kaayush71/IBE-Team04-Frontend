import { Box, Button } from "@mui/material";
import { format } from "date-fns";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { fetchCalendarData } from "../../../../redux/reducers/calendarDataSlice";
import { setSortToSend } from "../../../../redux/reducers/roomResultConfigDataSlice";
import { useAppDispatch, useAppSelector } from "../../../../redux/store";
import CalendarMenu from "../../../landing/CalendarMenu/CalendarMenu";
import GuestMenu from "../../../landing/GuestsMenu/GuestMenu";
import RoomsMenu from "../../../landing/Rooms/RoomsMenu";
import BedMenu from "./Beds/BedMenu";
import "./searchBar.scss";

const SearchBar = () => {
  const reduxDispatch = useAppDispatch();
  const landingConfig = useAppSelector((state) => state.landingForm.landingConfig);
  const landingFormData = useAppSelector((state) => state.landingForm);
  const sortName = useAppSelector((state) => state.resultsConfiguration.selectedSortName);
  const sortValue = useAppSelector((state) => state.resultsConfiguration.selectedSortValue);
  const filters = useAppSelector((state) => state.resultsConfiguration.filters);
  const currency = useAppSelector((state) => state.currency);
  const language = useAppSelector((state) => state.language);
  const paramsSort = `${sortName}#${sortValue}`;
  const { t } = useTranslation();

  // creating new URLSeachParams object
  const searchParams = new URLSearchParams();
  const navigate = useNavigate();

  // creating a object with all the required fields
  // to be stored in localstorage.
  const handleSubmit = () => {
    const formData = {
      property: landingFormData.propertyId,
      startDate: landingFormData.startDate,
      endDate: landingFormData.endDate,
      rooms: landingFormData.numberOfRoomSelected,
      guestDetails: landingConfig.searchForm.guest.guestTypes,
      accessibility: landingFormData.accessibility,
      totalGuestCount: landingFormData.totalGuestCount,
      beds: landingFormData.numberOfBedsSelected,
      sort: paramsSort,
      filters: filters,
    };
    reduxDispatch(setSortToSend(paramsSort));

    // setting the object in localstorage
    localStorage.setItem("formData", JSON.stringify(formData));

    // setting all the different params to make URL
    // shareable.
    searchParams.set("propertyId", formData.property);
    searchParams.set("startDate", format(new Date(formData.startDate), "yyyy-MM-dd"));
    searchParams.set("endDate", format(new Date(formData.endDate), "yyyy-MM-dd"));

    // iterating oveer the guest array and
    // checking if the show value is true then setting
    // the guest count against the categoryname.
    formData.guestDetails.forEach((guest) => {
      if (guest.show === true) {
        searchParams.set(`${guest.categoryName}`, `${guest.count}`);
      }
    });

    // iterating oveer the filters array and
    // checking if the show value is true then setting
    // the selected filter options against filter name.
    formData.filters.forEach((filter) => {
      if (filter.show === true) {
        if (filter.selectedOptions.length !== 0)
          searchParams.set(`${filter.filterName}`, `${filter.selectedOptions}`);
      }
    });
    searchParams.set("rooms", `${formData.rooms}`);
    searchParams.set("beds", `${formData.beds}`);
    searchParams.set("sort", paramsSort);
    searchParams.set("currency", currency.selectedCurrency.name);
    searchParams.set("lang", language.selectedLanguage);

    // navigating the user to room-search-results
    // after pressing the search dates button
  
    navigate(`/room-search-results?${searchParams.toString()}`);
  };
  useEffect(() => {
    reduxDispatch(fetchCalendarData());
  }, [reduxDispatch]);
  return (
    <Box
      sx={{
        padding: "0 3.375rem",
      }}
      className={"main-result-section"}
    >
      <Box
        sx={{
          div: { height: "100%" },
          padding: "3.5rem 1.5rem",
          display: "grid",
          gridTemplateColumns: { md: "1fr 0.7fr 0.7fr 2fr 1fr", xs: "1fr" },
          columnGap: "1rem",
          rowGap: "1rem",
        }}
        className={"search-section"}
      >
        <GuestMenu onRoomResultsPage={true} />
        <RoomsMenu onRoomResultsPage={true} />
        <BedMenu />
        <CalendarMenu onRoomResultsPage={true} />
        <Button
          type="submit"
          onClick={handleSubmit}
          sx={{
            backgroundColor: "#26266D",
            "&:hover": { backgroundColor: "#26266D" },
            display: "flex",
            padding: "0.75rem 1.25rem",
            height: "4.125rem",
            width: "100%",
          }}
          variant="contained"
        >
          {t("SEARCH DATES")}
        </Button>
      </Box>
    </Box>
  );
};

export default SearchBar;
