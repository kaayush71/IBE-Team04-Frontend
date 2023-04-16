import { Box, Typography } from "@mui/material";
import React from "react";
import { Accordion, AccordionSummary, AccordionDetails } from "../styledComponents/CustomAccordion";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { setBillingAddress } from "../../redux/reducers/confirmBookingSlice";
import { useTranslation } from "react-i18next";

type Props = {};

// style
const billingBoxStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginLeft: "2rem",
};

const BillingAddress = (props: Props) => {
  const { t } = useTranslation();
  const reduxDispatch = useAppDispatch();
  const { booking, billingAddress, openAllAccordion } = useAppSelector(
    (state) => state.confirmBooking
  );
  const handleChange = () => {
    reduxDispatch(setBillingAddress(!billingAddress));
  };
  return (
    <Box>
      <Accordion expanded={openAllAccordion || billingAddress} onChange={handleChange}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography fontSize={"1.25rem"} fontWeight={700}>
            {t("Billing Address")}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={billingBoxStyle}>
            <Typography>{t("Mailing Address 1")}</Typography>
            <Typography>{booking.billingMailingAddress1}</Typography>
          </Box>
        </AccordionDetails>
        <AccordionDetails>
          <Box sx={billingBoxStyle}>
            <Typography>{t("Mailing Address 2")}</Typography>
            <Typography>
              {booking.billingMailingAddress2 === "" ? "-" : booking.billingMailingAddress2}
            </Typography>
          </Box>
        </AccordionDetails>
        <AccordionDetails>
          <Box sx={billingBoxStyle}>
            <Typography>{t("Country")}</Typography>
            <Typography>{booking.billingCountry}</Typography>
          </Box>
        </AccordionDetails>
        <AccordionDetails>
          <Box sx={billingBoxStyle}>
            <Typography>{t("State")}</Typography>
            <Typography>{booking.billingState}</Typography>
          </Box>
        </AccordionDetails>
        <AccordionDetails>
          <Box sx={billingBoxStyle}>
            <Typography>{t("City")}</Typography>
            <Typography>{booking.billingCity}</Typography>
          </Box>
        </AccordionDetails>
        <AccordionDetails>
          <Box sx={billingBoxStyle}>
            <Typography>{t("Zip")}</Typography>
            <Typography>{booking.billingZip}</Typography>
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default BillingAddress;
