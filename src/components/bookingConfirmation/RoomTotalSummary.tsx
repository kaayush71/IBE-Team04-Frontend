import { Box, Typography } from "@mui/material";
import React from "react";
import { Accordion, AccordionSummary, AccordionDetails } from "../styledComponents/CustomAccordion";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { TypographyGrey } from "../styledComponents/styledComponents";
import { setRoomTotalSummary } from "../../redux/reducers/confirmBookingSlice";
import { useTranslation } from "react-i18next";

//
const boxStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginLeft: "2rem",
};

type Props = {};
const RoomTotalSummary = (props: Props) => {
  const { t } = useTranslation();
  const { booking, roomTotalSummary, openAllAccordion } = useAppSelector(
    (state) => state.confirmBooking
  );
  const { selectedCurrency } = useAppSelector((state) => state.currency);
  const reduxDispatch = useAppDispatch();
  const handleChange = () => {
    reduxDispatch(setRoomTotalSummary(!roomTotalSummary));
  };

  return (
    <Box>
      <Accordion expanded={roomTotalSummary || openAllAccordion} onChange={handleChange}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography fontSize={"1.25rem"} fontWeight={700}>
            {t("Room total summary")}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={boxStyle}>
            <TypographyGrey>{t("Nightly rate")}</TypographyGrey>
            <Typography>
              {selectedCurrency.symbol}
              {(selectedCurrency.rate * booking.nightlyRate).toFixed(1)}
            </Typography>
          </Box>
        </AccordionDetails>
        <AccordionDetails>
          <Box sx={boxStyle}>
            <TypographyGrey>{t("Subtotal")}</TypographyGrey>
            <Typography>
              {selectedCurrency.symbol}
              {(selectedCurrency.rate * booking.subTotal).toFixed(1)}
            </Typography>
          </Box>
        </AccordionDetails>
        <AccordionDetails>
          <Box sx={boxStyle}>
            <TypographyGrey>{t("Taxes,Surcharges,Fees")}</TypographyGrey>
            <Typography>
              {selectedCurrency.symbol}
              {(selectedCurrency.rate * booking.tax).toFixed(1)}
            </Typography>
          </Box>
        </AccordionDetails>
        <AccordionDetails>
          <Box sx={boxStyle}>
            <TypographyGrey>VAT</TypographyGrey>
            <Typography>
              {selectedCurrency.symbol}
              {(selectedCurrency.rate * booking.vat).toFixed(1)}
            </Typography>
          </Box>
        </AccordionDetails>
        <AccordionDetails>
          <Box sx={boxStyle}>
            <TypographyGrey>{t("Total for stay")}</TypographyGrey>
            <Typography>
              {selectedCurrency.symbol}
              {(selectedCurrency.rate * booking.totalCostOfStay).toFixed(1)}
            </Typography>
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default RoomTotalSummary;
