import { Box, FormControl, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../../../../redux/store";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { setNumberOfBeds } from "../../../../../redux/reducers/landingSearchFormSlice";
import { useTranslation } from "react-i18next";

const BedMenu = () => {
  const reduxDispatch = useAppDispatch();
  const handleChange = (event: SelectChangeEvent) => {
    reduxDispatch(setNumberOfBeds(Number(event.target.value)));
  };
  const { t } = useTranslation();
  const beds = useAppSelector((state) => state.resultsConfiguration.beds.bedCountArray);
  const numberOfBedsSelected = useAppSelector((state) => state.landingForm.numberOfBedsSelected);

  const BedMenuInput = () => {
    return (
      <Box>
        <Typography fontSize={{ md: "0.7rem", xs: "0.875rem", lg: "0.875rem" }} color={"#858685"}>
          {t("Beds")}
        </Typography>
        <Typography fontWeight={700}>{numberOfBedsSelected}</Typography>
      </Box>
    );
  };

  return (
    <FormControl fullWidth>
      <Select
        sx={{
          width: "100%",
          "& .MuiSelect-select": {
            padding: "0.7rem",
          },
        }}
        renderValue={() => <BedMenuInput />}
        displayEmpty={true}
        defaultValue=""
        onChange={handleChange}
        IconComponent={KeyboardArrowDownIcon}
      >
        {beds.map((bed) => {
          return (
            <MenuItem key={bed} value={bed}>
              <Typography data-testid="room-count" id="room-count">
                {bed}
              </Typography>
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default BedMenu;
