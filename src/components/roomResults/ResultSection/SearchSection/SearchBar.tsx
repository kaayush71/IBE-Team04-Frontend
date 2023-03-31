import { Box, Button } from "@mui/material";
import React, { useEffect } from "react";
import { fetchCalendarData } from "../../../../redux/reducers/calendarDataSlice";
import { useAppDispatch } from "../../../../redux/store";
import CalendarMenu from "../../../landing/CalendarMenu/CalendarMenu";
import GuestMenu from "../../../landing/GuestsMenu/GuestMenu";
import RoomsMenu from "../../../landing/Rooms/RoomsMenu";
import BedMenu from "./Beds/BedMenu";
import "./searchBar.scss";

const SearchBar = () => {
  const reduxDispatch = useAppDispatch();
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
          gridTemplateColumns: "1fr 0.7fr 0.7fr 2fr 1fr",
          columnGap: "1rem",
        }}
        className={"search-section"}
      >
        <GuestMenu onRoomResultsPage={true} />
        <RoomsMenu onRoomResultsPage={true} />
        <BedMenu/>
        <CalendarMenu onRoomResultsPage={true} />
        <Button
          type="submit"
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
          {"SEARCH DATES"}
        </Button>
      </Box>
    </Box>
  );
};

export default SearchBar;
