import { AppBar, Box, Divider, Drawer, IconButton, Toolbar, Typography } from "@mui/material";
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

export default function Header() {
  const [t] = useTranslation();
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
    <AppBar position="static" sx={{ backgroundColor: "#fff" }}>
      <Toolbar>
        <Container
          maxWidth="xl"
          sx={{
            padding: "0.7rem 0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <img className="header__logo" src={headerLogo} alt="" />
            <Typography
              sx={{
                display: { xs: "none", md: "block" },
                paddingTop: "0.2rem",
                color: "#26266D",
                fontWeight: "600",
                fontSize: "1.2rem",
              }}
            >
              {t(`${applicationTitle}`)}
            </Typography>
          </Box>
          <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: "1rem" }}>
            <Typography fontWeight={600} color={"black"}>
              {t("MY BOOKINGS")}
            </Typography>
            <LanguageMenu />
            <CurrencyMenu />
            <Button
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
                padding: "0.5rem",
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
                <IconButton sx={{ mb: 2 }}>
                  <CloseIcon onClick={toggleDrawer(false)} />
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
                      sx={{ backgroundColor: "#26266D", "&:hover": { backgroundColor: "#26266D" } }}
                      variant="contained"
                    >
                      {t("LOGIN")}
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Drawer>
          </Box>
        </Container>
      </Toolbar>
    </AppBar>
  );
}
