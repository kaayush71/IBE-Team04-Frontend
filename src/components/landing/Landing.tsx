import { Box, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../redux/store";
import "./Landing.scss";

export default function Landing() {
  const selectedCurrency = useAppSelector((state) => state.currency.selectedCurrency);
  const applicationTitle = useAppSelector((state) => state.config.applicationTitle);
  const [t] = useTranslation();
  return (
    <Box>
      <Container
        sx={{ display: "grid", justifyContent: "center", alignItems: "center", marginTop: "5rem" }}
        maxWidth="xl"
      >
        <Typography fontSize={`3rem`}>{t(`${applicationTitle}`)}</Typography>
        <Typography mt={4} fontSize={`2rem`} textAlign={`center`}>
          {`${selectedCurrency.symbol}${selectedCurrency.rate * 5000}`}
        </Typography>
      </Container>
    </Box>
  );
}
