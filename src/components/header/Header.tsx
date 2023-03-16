import { AppBar, Box, FormControl, InputAdornment, Toolbar, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import "./Header.scss";
import LanguageIcon from "@mui/icons-material/Language";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";

export default function Header() {
  const [language, setLanguage] = React.useState("en");
  const [currency, setCurrency] = React.useState("inr");

  const handleLanguageChange = (event: SelectChangeEvent) => {
    setLanguage(event.target.value);
  };

  const handleCurrencyChnage = (event: SelectChangeEvent) => {
    setCurrency(event.target.value);
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
            <img
              src="https://team04-static-data.s3.ap-south-1.amazonaws.com/team04/header-logo.png"
              alt=""
            />
            <Typography
              sx={{ paddingTop: "0.2rem", color: "#26266D", fontWeight: "600", fontSize: "1.2rem" }}
            >
              Internet Booking Engine
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <Typography fontWeight={600} color={"black"}>
              MY BOOKINGS
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
                <MenuItem value="inr">₹ INR</MenuItem>
                <MenuItem value="usd">$ USD</MenuItem>
                <MenuItem value="eur">€ EUR</MenuItem>
              </Select>
            </FormControl>
            <Button
              sx={{ backgroundColor: "#26266D", "&:hover": { backgroundColor: "#26266D" } }}
              variant="contained"
            >
              Login
            </Button>
          </Box>
        </Container>
      </Toolbar>
    </AppBar>
  );
}
