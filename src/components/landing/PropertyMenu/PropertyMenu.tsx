import {
  Checkbox,
  FormControl,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import {
  fetchLandingConfigData,
  setIsLandingFormDisbale,
  setPropertyId,
} from "../../../redux/reducers/landingSearchFormSlice";
import { useTranslation } from "react-i18next";
import { fetchCalendarData } from "../../../redux/reducers/calendarDataSlice";

type Props = {};

const PropertyMenu = (props: Props) => {
  const { t } = useTranslation();
  const reduxDispatch = useAppDispatch();
  const [selected, setSelected] = useState("");
  const selectedProperty = useAppSelector((state)=>state.landingForm.propertyId);
  const properties = useAppSelector((state) => state.config.properties);
  useEffect(()=> {
    reduxDispatch(setPropertyId(""));
  },[reduxDispatch])

  const handleChange = (event: SelectChangeEvent) => {
    reduxDispatch(fetchLandingConfigData());
    reduxDispatch(fetchCalendarData());
    reduxDispatch(setIsLandingFormDisbale(false));
    reduxDispatch(setPropertyId(event.target.value));
    setSelected(event.target.value);
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
        onChange={handleChange}
        displayEmpty={true}
        required={true}
        IconComponent={KeyboardArrowDownIcon}
        renderValue={
          selected === ""
            ? () => (
                <Typography sx={{ padding: "0" }} fontStyle={"italic"} fontWeight={400}>
                  {t("Search All Properties")}
                </Typography>
              )
            : (selected) => <Typography>{`Property ${selected}`}</Typography>
        }
      >
        {properties.availaibleProperties.map((option) => (
          <MenuItem disabled={option !== "4"} key={option} value={option}>
            <ListItemIcon>
              <Checkbox checked={selected.includes(option)} />
            </ListItemIcon>
            <ListItemText primary={`Property ${option}`} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
export default PropertyMenu;
