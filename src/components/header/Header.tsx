import { AppBar, Box, FormControl, InputAdornment, Toolbar, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import "./Header.scss";
import LanguageIcon from "@mui/icons-material/Language";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { setSelectedCuurency } from "../../redux/reducers/currencyDataSlice";
import { setSelectedLanguage } from "../../redux/reducers/languageDataSlice";

export default function Header() {
  const language = useAppSelector((state) => state.language.selectedLanguage);
  const currency = useAppSelector((state) => state.currency.selectedCurrency.name);
  const [t, i18n] = useTranslation();
  const applicationTitle = useAppSelector((state) => state.config.applicationTitle);
  const reduxDispatch = useAppDispatch();
  const headerLogo = useAppSelector((state) => state.config.companyLogo.headerLogo);

  const handleLanguageChange = (event: SelectChangeEvent) => {
    i18n.changeLanguage(event.target.value);
    reduxDispatch(setSelectedLanguage(event.target.value));
  };

  // set the selected currency to redux store
  const handleCurrencyChnage = (event: SelectChangeEvent) => {
    reduxDispatch(setSelectedCuurency(event.target.value));
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
              sx={{ paddingTop: "0.2rem", color: "#26266D", fontWeight: "600", fontSize: "1.2rem" }}
            >
              {t(`${applicationTitle}`)}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <Typography fontWeight={600} color={"black"}>
              {t("MY BOOKINGS")}
            </Typography>
            <FormControl
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "0 none",
                },
                "& .MuiSelect-icon": {
                  display: "none",
                },
                minWidth: 80,
              }}
            >
              <Select
                sx={{ color: "#26266D" }}
                className="languageInput"
                labelId="language-select"
                id="language-select"
                onChange={handleLanguageChange}
                value={language}
                startAdornment={
                  <InputAdornment position="start">
                    <LanguageIcon sx={{ color: "#26266D" }} />
                  </InputAdornment>
                }
              >
                <MenuItem value="en">En</MenuItem>
                <MenuItem value="fr">Fr</MenuItem>
              </Select>
            </FormControl>
            <FormControl
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "0 none",
                },
                "& .MuiSelect-icon": {
                  display: "none",
                },
                minWidth: 80,
              }}
            >
              <Select
                sx={{ color: "#26266D" }}
                className="languageInput"
                labelId="language-select"
                id="language-select"
                onChange={handleCurrencyChnage}
                value={currency}
              >
                <MenuItem value="USD">$ USD</MenuItem>
                <MenuItem value="INR">₹ INR</MenuItem>
                <MenuItem value="EUR">€ EUR</MenuItem>
              </Select>
            </FormControl>
            <Button
              sx={{ backgroundColor: "#26266D", "&:hover": { backgroundColor: "#26266D" } }}
              variant="contained"
            >
              {t("LOGIN")}
            </Button>
          </Box>
        </Container>
      </Toolbar>
    </AppBar>
  );
}
