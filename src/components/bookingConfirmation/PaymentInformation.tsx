import { Box, Typography } from "@mui/material";
import React from "react";
import { Accordion, AccordionSummary, AccordionDetails } from "../styledComponents/CustomAccordion";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { AES, enc } from "crypto-js";
import { format } from "date-fns";
import { setPaymentInformation } from "../../redux/reducers/confirmBookingSlice";
import { useTranslation } from "react-i18next";

type Props = {};

//style
const paymentInfoStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginLeft: "2rem",
};

const PayementInformation = (props: Props) => {
  const { t } = useTranslation();
  const { booking, openAllAccordion, paymentInfo } = useAppSelector(
    (state) => state.confirmBooking
  );
  const secretKey = "mySecretKey";
  const decryptedCardNumber = AES.decrypt(booking.cardNumber, secretKey).toString(enc.Utf8);
  const maskCreditCardNumber = (number: string) => {
    return String(number).replace(/.(?=.{4})/g, "*");
  };
  const reduxDispatch = useAppDispatch();
  const handleChange = () => {
    reduxDispatch(setPaymentInformation(!paymentInfo));
  };
  return (
    <Box>
      <Accordion expanded={openAllAccordion || paymentInfo} onChange={handleChange}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography fontSize={"1.25rem"} fontWeight={700}>
            {t("Payment Info")}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={paymentInfoStyle}>
            <Typography>{t("Card Number")}</Typography>
            <Typography>{maskCreditCardNumber(decryptedCardNumber)}</Typography>
          </Box>
        </AccordionDetails>
        <AccordionDetails>
          <Box sx={paymentInfoStyle}>
            <Typography>{t("Card Exp Month")}</Typography>
            <Typography>
              {format(new Date(2021, Number(booking.cardNumberExpiryMonth) - 1), "MMMM")}
            </Typography>
          </Box>
        </AccordionDetails>
        <AccordionDetails>
          <Box sx={paymentInfoStyle}>
            <Typography>{t("Card Exp Year")}</Typography>
            <Typography>
              {20}
              {booking.cardNumberExpiryYear}
            </Typography>
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default PayementInformation;
