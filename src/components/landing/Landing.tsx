import { Box, Button, Checkbox, FormGroup, Paper, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect } from "react";
import CalendarMenu from "./CalendarMenu/CalendarMenu";
import "./Landing.scss";
import PropertyMenu from "./PropertyMenu/PropertyMenu";
import AccessibleIcon from "@mui/icons-material/Accessible";
import RoomsMenu from "./Rooms/RoomsMenu";
import GuestMenu from "./GuestsMenu/GuestMenu";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { fetchCalendarData } from "../../redux/reducers/calendarDataSlice";
import {
  fetchLandingConfigData,
  setAccessibility,
} from "../../redux/reducers/landingSearchFormSlice";

export default function Landing() {
  const reduxDispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.landingForm.loading);
  const landingConfig = useAppSelector((state) => state.landingForm.landingConfig);
  const accessibility = useAppSelector((state) => state.landingForm.accessibility);
  useEffect(() => {
    reduxDispatch(fetchCalendarData());
    reduxDispatch(fetchLandingConfigData());
  }, [reduxDispatch]);
  const handleCheckbox = () => {
    reduxDispatch(setAccessibility(!accessibility));
  };
  return loading ? (
    <Typography>Page is Loading</Typography>
  ) : (
    <Box
      sx={{
        backgroundImage: `url(${landingConfig.bannerImage})`,
        backgroundPosition: "center",
        padding: "0 1.5rem",
      }}
    >
      <Container sx={{ padding: "2rem 0" }} maxWidth="xl">
        <Paper sx={{ padding: "2rem", maxWidth: "25rem" }}>
          <FormGroup>
            <form
              style={{ rowGap: "1rem", display: "grid" }}
              onSubmit={() => console.log("form submitted")}
            >
              <Box>
                <Typography fontSize={".8rem"}>
                  Propery name <sub>*</sub>
                </Typography>
                <PropertyMenu />
              </Box>
              <Box>
                <Typography fontSize={".8rem"}>Select Dates</Typography>
                <CalendarMenu />
              </Box>
              <Box
                className={
                  landingConfig.searchForm.guest.showGuest
                    ? "landing__form-layout"
                    : "landing__form-layout--reverse"
                }
              >
                {landingConfig.searchForm.guest.showGuest ? (
                  <Box>
                    <Typography fontSize={".8rem"}>Guests</Typography>
                    <GuestMenu />
                  </Box>
                ) : (
                  <></>
                )}
                {landingConfig.searchForm.rooms.showRoom ? (
                  <Box>
                    <Typography fontSize={".8rem"}>Rooms</Typography>
                    <RoomsMenu />
                  </Box>
                ) : (
                  <></>
                )}
                {landingConfig.searchForm.accessibility.showAccessibility ? (
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Checkbox
                      checked={accessibility}
                      onChange={handleCheckbox}
                      sx={{ "& .MuiSvgIcon-root": { fontSize: 18 }, padding: "0" }}
                    />
                    <AccessibleIcon fontSize="small" />
                    <Typography>I need an Accessible Room</Typography>
                  </Box>
                ) : (
                  <></>
                )}
              </Box>
              <Button
                type="submit"
                sx={{
                  backgroundColor: "#26266D",
                  "&:hover": { backgroundColor: "#26266D" },
                  display: "flex",
                  margin: "5rem auto",
                  width: "10rem",
                }}
                variant="contained"
              >
                Search
              </Button>
            </form>
          </FormGroup>
        </Paper>
      </Container>
    </Box>
  );
}
