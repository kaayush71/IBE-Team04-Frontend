import { Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import React from "react";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../redux/store";
import "./Footer.scss";

export default function Footer() {
  const compnayTitle = useAppSelector((state) => state.config.companyTitle);
  const licenseText = useAppSelector((state) => state.config.licenseText);
  const footerLogo = useAppSelector((state) => state.config.companyLogo.footerLogo);
  const [t] = useTranslation();
  return (
    <Box
      sx={{
        backgroundColor: "#130739",
        color: "#fff",
        position: "fixed",
        bottom: "0",
        width: "100%",
      }}
    >
      <Container maxWidth="xl" sx={{ padding: "1rem 0" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <img src={footerLogo} alt="logo" />
          <Box sx={{ textAlign: "right" }}>
            <Typography>&copy; {t(`${compnayTitle}`)}</Typography>
            <Typography>{t(`${licenseText}`)}</Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
