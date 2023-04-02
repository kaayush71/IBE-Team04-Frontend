import { AppBar, Box, Divider, Drawer, IconButton, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, { useState } from "react";
import "./Header.scss";
import Button from "@mui/material/Button";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../redux/store";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import LanguageMenu from "./languageMenu/LanguageMenu";
import CurrencyMenu from "./currecnyMenu/CurrencyMenu";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [t] = useTranslation();
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/login");
  };
  const applicationTitle = useAppSelector((state) => state.config.applicationTitle);
  const headerLogo = useAppSelector((state) => state.config.companyLogo.headerLogo);
  const [open, setOpenState] = useState(false);
  const toggleDrawer = (open: boolean) => (event: any) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    setOpenState(open);
  };

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "#fff", height: "5.25rem", position: "sticky", top: "0", zIndex: "2" }}
    >
      <Box sx={{ padding: "0 3.375rem", height: "100%", display: "flex" }}>
        <Container
          maxWidth={false}
          sx={{
            padding: "0.7rem 0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: "1.06rem" }}>
            <img date-testid="header-logo" className="header__logo" src={headerLogo} alt="" />
            <Typography
              data-testid="header-title"
              sx={{
                display: { xs: "none", md: "block" },
                color: "#26266D",
                fontWeight: "700",
                fontSize: "1.25rem",
              }}
            >
              {t(`${applicationTitle}`)}
            </Typography>
          </Box>
          <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: "1.34rem" }}>
            <Typography fontSize={"0.875rem"} fontWeight={700} color={"black"}>
              {t("MY BOOKINGS")}
            </Typography>
            <LanguageMenu />
            <CurrencyMenu />
            <Button
              onClick={handleClick}
              sx={{ backgroundColor: "#26266D", "&:hover": { backgroundColor: "#26266D" } }}
              variant="contained"
            >
              {t("LOGIN")}
            </Button>
          </Box>
          <Box sx={{ display: { xs: "grid", md: "none" } }}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer(true)}
              sx={{
                pr: 0,
                backgroundColor: "#26266D",
                padding: "0.75rem 1rem",
                ":hover": {
                  backgroundColor: "#26266D",
                },
              }}
            >
              <MenuIcon />
            </IconButton>

            <Drawer anchor="right" open={open} onClick={toggleDrawer(!open)}>
              <Box
                sx={{
                  p: 2,
                  height: 1,
                  backgroundColor: "#eee",
                }}
              >
                <IconButton onClick={toggleDrawer(false)} sx={{ mb: 2 }}>
                  <CloseIcon />
                </IconButton>
                <Divider sx={{ mb: 2 }} />
                <Box sx={{ mb: 2 }}>
                  <Typography fontWeight={600} color={"black"}>
                    {t("MY BOOKINGS")}
                  </Typography>
                  <Box sx={{ display: "flex", mt: 3 }}>
                    <LanguageMenu />
                    <CurrencyMenu />
                    <Button
                      onClick={handleClick}
                      sx={{
                        backgroundColor: "#26266D",
                        width: "5.31rem !important",
                        "&:hover": { backgroundColor: "#26266D" },
                      }}
                    >
                      {t("LOGIN")}
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Drawer>
          </Box>
        </Container>
      </Box>
    </AppBar>
  );
}
