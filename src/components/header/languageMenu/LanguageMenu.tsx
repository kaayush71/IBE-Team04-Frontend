import { FormControl, InputAdornment, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import React from "react";
import { setSelectedLanguage } from "../../../redux/reducers/languageDataSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { useTranslation } from "react-i18next";

export default function LanguageMenu() {
  const language = useAppSelector((state) => state.language.selectedLanguage);
  const { i18n } = useTranslation();
  const reduxDispatch = useAppDispatch();
  const handleLanguageChange = (event: SelectChangeEvent) => {
    i18n.changeLanguage(event.target.value);
    reduxDispatch(setSelectedLanguage(event.target.value));
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
  );
}
