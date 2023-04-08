import { Box, Button, Checkbox, FormGroup, Paper, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, { useCallback, useEffect } from "react";
import CalendarMenu from "./CalendarMenu/CalendarMenu";
import "./Landing.scss";
import PropertyMenu from "./PropertyMenu/PropertyMenu";
import AccessibleIcon from "@mui/icons-material/Accessible";
import RoomsMenu from "./Rooms/RoomsMenu";
import GuestMenu from "./GuestsMenu/GuestMenu";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import {
  fetchLandingConfigData,
  getLocalstorageFormData,
  setAccessibility,
  setIsLandingFormDisbale,
  setPropertyId,
} from "../../redux/reducers/landingSearchFormSlice";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { setShowItineraryCard } from "../../redux/reducers/checkoutDataSlice";
import { fetchCalendarData } from "../../redux/reducers/calendarDataSlice";

// styles

const searchButtonStyle = {
  backgroundColor: "#26266D",
  "&:hover": { backgroundColor: "#26266D" },
  display: "flex",
  padding: "0.75rem 1.25rem",
  margin: { md: "5rem auto 3rem auto", xs: "4rem auto 3rem auto" },
  width: "10rem",
};

export default function Landing() {
  const bannerImage = useAppSelector((state) => state.config.bannerImage);
  const landingContainerStyle = {
    backgroundImage: `url(${bannerImage})`,
    backgroundSize: "100% 75vh",
    backgroundRepeat: "no-repeat",
    padding: "0 3.375rem",
    height: "83vh",
  };

  const reduxDispatch = useAppDispatch();
  const navigate = useNavigate();
  const currency = useAppSelector((state) => state.currency);
  const language = useAppSelector((state) => state.language);
  const landingConfig = useAppSelector((state) => state.landingForm.landingConfig);
  const landingFormData = useAppSelector((state) => state.landingForm);
  const accessibility = useAppSelector((state) => state.landingForm.accessibility);
  const { t } = useTranslation();
  const handleCheckbox = () => {
    reduxDispatch(setAccessibility(!accessibility));
  };

  const fetchData = useCallback(async () => {
    await reduxDispatch(fetchLandingConfigData());
    reduxDispatch(getLocalstorageFormData());
  }, [reduxDispatch]);

  useEffect(() => {
    reduxDispatch(fetchCalendarData());
    reduxDispatch(setShowItineraryCard(false));
    const formData = JSON.parse(localStorage.getItem("formData") || "{}");
    if (JSON.stringify(formData) === "{}") {
      reduxDispatch(setIsLandingFormDisbale(true));
      reduxDispatch(setPropertyId(""));
    } else {
      fetchData();
    }
  }, [fetchData, reduxDispatch]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const searchParams = new URLSearchParams();
    localStorage.setItem("isFormDisable", String(landingFormData.isLandingFormDisable));
    const formData = {
      property: landingFormData.propertyId,
      startDate: landingFormData.startDate,
      endDate: landingFormData.endDate,
      rooms: landingFormData.numberOfRoomSelected,
      guestDetails: landingConfig.searchForm.guest.guestTypes,
      accessibility: landingFormData.accessibility,
      totalGuestCount: landingFormData.totalGuestCount,
    };
    localStorage.setItem("formData", JSON.stringify(formData));
    searchParams.set("propertyId", formData.property);
    searchParams.set("startDate", format(new Date(formData.startDate), "yyyy-MM-dd"));
    searchParams.set("endDate", format(new Date(formData.endDate), "yyyy-MM-dd"));
    formData.guestDetails.forEach((guest) => {
      if (guest.show === true) {
        searchParams.set(`${guest.categoryName}`, `${guest.count}`);
      }
    });
    searchParams.set("currency", currency.selectedCurrency.name);
    searchParams.set("lang", language.selectedLanguage);
    searchParams.set("rooms", `${formData.rooms}`);
    navigate(`/room-search-results?${searchParams.toString()}`);
  };
  return (
    <Box sx={landingContainerStyle}>
      <Container sx={{ padding: "3.5rem 0" }} maxWidth={false}>
        <Paper
          sx={{ padding: "2.75rem", maxWidth: "25.75rem", marginBottom: { xs: "5rem", md: "0" } }}
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
                <CalendarMenu onRoomResultsPage={false} />
              </Box>
              {landingFormData.isLandingFormDisable ? (
                <></>
              ) : (
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
                      <GuestMenu onRoomResultsPage={false} />
                    </Box>
                  ) : (
                    <></>
                  )}
                  {landingConfig.searchForm.rooms.showRoom ? (
                    <Box>
                      <Typography fontSize={".875rem"}>{t("Rooms")}</Typography>
                      <RoomsMenu onRoomResultsPage={false} />
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
              )}

              <Button type="submit" sx={searchButtonStyle} variant="contained">
                {t("SEARCH")}
              </Button>
            </form>
          </FormGroup>
        </Paper>
      </Container>
    </Box>
  );
}
