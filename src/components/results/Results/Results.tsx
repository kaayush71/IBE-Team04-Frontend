import { Box, Button } from "@mui/material";
import React from "react";
import CalendarMenu from "../../landing/CalendarMenu/CalendarMenu";
import GuestMenu from "../../landing/GuestsMenu/GuestMenu";
import RoomsMenu from "../../landing/Rooms/RoomsMenu";
import BedMenu from "./Beds/BedMenu";
import "./results.scss";

const Results = () => {
  return (
    <Box
      sx={{
        width: "100%",
        padding: "0 3.375rem",
      }}
      className={"main-result-section"}
    >
      <Box
        sx={{
          padding: "3.5rem 0",
          display: "grid",
          gridTemplateColumns: "16.5rem 8.25rem 8.25rem 1fr 1fr",
          columnGap : "1rem"
        }}
        className={"search-section"}
      >
        <GuestMenu />
        <RoomsMenu />
        <BedMenu />
        <CalendarMenu />
        <Button
          type="submit"
          sx={{
            backgroundColor: "#26266D",
            "&:hover": { backgroundColor: "#26266D" },
            display: "flex",
            padding: "0.75rem 1.25rem",
            width: "10.5rem",
          }}
          variant="contained"
        >
          {"SEARCH DATES"}
        </Button>
      </Box>
    </Box>
  );
};

export default Results;
