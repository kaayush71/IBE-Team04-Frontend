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
import { useTranslation } from "react-i18next";

export default function Landing() {
  const reduxDispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.landingForm.loading);
  const landingConfig = useAppSelector((state) => state.landingForm.landingConfig);
  const landingFormData = useAppSelector((state) => state.landingForm);
  const accessibility = useAppSelector((state) => state.landingForm.accessibility);
  const { t } = useTranslation();
  useEffect(() => {
    reduxDispatch(fetchCalendarData());
    reduxDispatch(fetchLandingConfigData());
  }, [reduxDispatch]);
  const handleCheckbox = () => {
    reduxDispatch(setAccessibility(!accessibility));
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = {
      property: landingFormData.propertyId,
      startDate: landingFormData.startDate,
      endDate: landingFormData.endDate,
      rooms: landingFormData.numberOfRoomSelected,
      guestDetails: landingConfig.searchForm.guest.guestTypes,
      accessibility: landingFormData.accessibility,
    };
    console.log("form submitted", formData);
  };
  return loading ? (
    <Typography>Page is Loading</Typography>
  ) : (
    <Box
      sx={{
        backgroundImage: `url(${landingConfig.bannerImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "0 3.375rem",
      }}
    >
      <Container sx={{ padding: "3.5rem 0" }} maxWidth={false}>
        <Paper
          sx={{ padding: "2.75rem", maxWidth: "23.75rem", marginBottom: { xs: "5rem", md: "0" } }}
        >
          <FormGroup>
            <form style={{ rowGap: "1.15rem", display: "grid" }} onSubmit={handleSubmit}>
              <Box>
                <Typography fontSize={".875rem"}>
                  {t("Property name")}
                  <sub>*</sub>
                </Typography>
                <PropertyMenu />
              </Box>
              <Box>
                <Typography fontSize={".875rem"}>{t("Select Dates")}</Typography>
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
                    <Typography fontSize={".875rem"}>{t("Guests")}</Typography>
                    <GuestMenu />
                  </Box>
                ) : (
                  <></>
                )}
                {landingConfig.searchForm.rooms.showRoom ? (
                  <Box>
                    <Typography fontSize={".875rem"}>{t("Rooms")}</Typography>
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
                    <Typography fontSize={{ xs: "0.9rem", md: "1rem" }}>
                      {t("I need an Accessible Room")}
                    </Typography>
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
                  padding: "0.75rem 1.25rem",
                  margin: { md: "9.18rem auto 4rem auto", xs: "4rem auto 3rem auto" },
                  width: "10rem",
                }}
                variant="contained"
              >
                {t("Search")}
              </Button>
            </form>
          </FormGroup>
        </Paper>
      </Container>
    </Box>
  );
}
