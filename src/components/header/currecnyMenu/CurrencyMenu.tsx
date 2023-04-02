import { FormControl, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { setSelectedCuurency } from "../../../redux/reducers/currencyDataSlice";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import EuroIcon from "@mui/icons-material/Euro";
import "./CurrencyMenu.scss";
import { Box } from "@mui/system";
export default function CurrencyMenu() {
  const currency = useAppSelector((state) => state.currency.selectedCurrency.name);
  const reduxDispatch = useAppDispatch();
  // set the selected currency to redux store
  const handleCurrencyChnage = (event: SelectChangeEvent) => {
    reduxDispatch(setSelectedCuurency(event.target.value));
  };
  return (
    <FormControl
      sx={{
        "& .MuiOutlinedInput-notchedOutline": {
          border: "0 none",
        },
        "& .MuiSelect-icon": {
          display: "none",
        },
        display: "flex",
        alignItems: "center",
        minWidth: 80,
      }}
    >
      <Select
        sx={{
          color: "#26266D",
          "& .MuiSelect-select": {
            padding: "0",
          },
        }}
        MenuProps={{
          PaperProps: {
            sx: {
              "& .MuiMenuItem-root": {
                paddingLeft: "0.1rem",
              },
            },
          },
        }}
        className="currencyInput"
        labelId="currency-select"
        id="currency-select"
        onChange={handleCurrencyChnage}
        value={currency}
      >
        <MenuItem className="currency__dropdown" value="USD">
          <Box sx={{ display: "flex" }}>
            <AttachMoneyIcon />
            <Typography>USD</Typography>
          </Box>
        </MenuItem>
        <MenuItem value="INR" sx={{ display: "flex" }}>
          <Box sx={{ display: "flex" }}>
            <CurrencyRupeeIcon />
            <Typography>INR</Typography>
          </Box>
        </MenuItem>
        <MenuItem value="EUR">
          <Box sx={{ display: "flex" }}>
            <EuroIcon />
            <Typography>EUR</Typography>
          </Box>
        </MenuItem>
      </Select>
    </FormControl>
  );
}
