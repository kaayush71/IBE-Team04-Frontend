import {
  Checkbox,
  FormControl,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import {
  fetchLandingConfigData,
  resetStateToDefault,
  setEndDate,
  setIsLandingFormDisbale,
  setPropertyId,
  setStartDate,
} from "../../../redux/reducers/landingSearchFormSlice";
import { useTranslation } from "react-i18next";
import { fetchCalendarData } from "../../../redux/reducers/calendarDataSlice";
import { addDays } from "date-fns";

type Props = {};

const PropertyMenu = (props: Props) => {
  const { t } = useTranslation();
  const reduxDispatch = useAppDispatch();
  const selectedProperty = useAppSelector((state) => state.landingForm.propertyId);
  const properties = useAppSelector((state) => state.config.properties);

  const handleClick = (property: String) => {
    if (selectedProperty !== "") {
      reduxDispatch(setPropertyId(""));
      localStorage.clear();
      reduxDispatch(setIsLandingFormDisbale(true));
      reduxDispatch(resetStateToDefault());
    } else {
      reduxDispatch(fetchLandingConfigData());
      reduxDispatch(fetchCalendarData());
      reduxDispatch(setStartDate(new Date().toDateString()));
      reduxDispatch(setEndDate(addDays(new Date(), 2).toDateString()));
      reduxDispatch(setIsLandingFormDisbale(false));
      reduxDispatch(setPropertyId(property));
    }
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
        id="demo-simple-select"
        MenuProps={{
          PaperProps: {
            sx: {
              "& .MuiMenu-list": {
                padding: 0,
                "& .MuiMenuItem-root": {
                  padding: 0,
                },
              },
            },
          },
        }}
        value={selectedProperty}
        displayEmpty={true}
        required={true}
        defaultValue=""
        IconComponent={KeyboardArrowDownIcon}
        renderValue={
          selectedProperty === ""
            ? () => (
                <Typography sx={{ padding: "0" }} fontStyle={"italic"} fontWeight={400}>
                  {t("Search All Properties")}
                </Typography>
              )
            : (selectedProperty) => <Typography>{`Property ${selectedProperty}`}</Typography>
        }
      >
        {properties.availaibleProperties.map((option) => (
          <MenuItem
            onClick={() => handleClick(option)}
            disabled={option !== "4"}
            key={option}
            value={option}
          >
            <ListItemIcon>
              <Checkbox checked={selectedProperty === option} />
            </ListItemIcon>
            <ListItemText primary={`Property ${option}`} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
export default PropertyMenu;
