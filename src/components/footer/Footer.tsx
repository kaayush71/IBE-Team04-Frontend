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
        height:"5.25rem"
      }}
    >
      <Container maxWidth={false} sx={{ padding: "1rem 0" }}>
        <Box
          sx={{
            padding: "0 3.375rem",
            display: { xs: "block", md: "flex" },
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            <img className="footer__logo" src={footerLogo} alt="logo" />
          </Box>
          <Box sx={{ textAlign: { xs: "center", md: "right" } }}>
            <Typography>&copy; {t(`${compnayTitle}`)}</Typography>
            <Typography>{t(`${licenseText}`)}</Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
