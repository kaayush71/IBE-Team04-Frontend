import { Box, Typography } from "@mui/material";
import React from "react";
import { Accordion, AccordionSummary, AccordionDetails } from "../styledComponents/CustomAccordion";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { setGuestInfo } from "../../redux/reducers/confirmBookingSlice";
import { useTranslation } from "react-i18next";

type Props = {};

// style
const guestBoxStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginLeft: "2rem",
};

const GuestInformation = (props: Props) => {
  const { t } = useTranslation();
  const { booking, guestInfo, openAllAccordion } = useAppSelector((state) => state.confirmBooking);
  const reduxDispatch = useAppDispatch();
  const handleChange = () => {
    reduxDispatch(setGuestInfo(!guestInfo));
  };
  return (
    <Box>
      <Accordion expanded={openAllAccordion || guestInfo} onChange={handleChange}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography fontSize={"1.25rem"} fontWeight={700}>
            {t("Guest Information")}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={guestBoxStyle}>
            <Typography>{t("First Name")}</Typography>
            <Typography>{booking.travellerFirstName}</Typography>
          </Box>
        </AccordionDetails>
        <AccordionDetails>
          <Box sx={guestBoxStyle}>
            <Typography>{t("Last Name")}</Typography>
            <Typography>
              {booking.travellerLastName === "" ? "-" : booking.travellerLastName}
            </Typography>
          </Box>
        </AccordionDetails>
        <AccordionDetails>
          <Box sx={guestBoxStyle}>
            <Typography>{t("Email")}</Typography>
            <Typography>{booking.travellerEmail}</Typography>
          </Box>
        </AccordionDetails>
        <AccordionDetails>
          <Box sx={guestBoxStyle}>
            <Typography>{t("Phone Number")}</Typography>
            <Typography>{booking.travellerPhoneNumber}</Typography>
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default GuestInformation;
