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
import React, { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { setPropertyId } from "../../../redux/reducers/landingSearchFormSlice";

type Props = {};

const PropertyMenu = (props: Props) => {
  const reduxDispatch = useAppDispatch();
  const [selected, setSelected] = useState("");
  const properties = useAppSelector(
    (state) => state.landingForm.landingConfig.searchForm.properties
  );

  const handleChange = (event: SelectChangeEvent) => {
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
        value={selected}
        onChange={handleChange}
        displayEmpty={true}
        required={true}
        IconComponent={KeyboardArrowDownIcon}
        renderValue={
          selected === ""
            ? () => (
                <Typography
                  sx={{ padding: "0" }}
                  color={"#858685"}
                  fontStyle={"italic"}
                  fontWeight={100}
                >
                  Search All Properties
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
