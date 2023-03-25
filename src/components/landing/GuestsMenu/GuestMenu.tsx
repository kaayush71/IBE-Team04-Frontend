import { FormControl, Select, Typography } from "@mui/material";
import React from "react";
import GuestType from "./GuestType/GuestType";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useAppSelector } from "../../../redux/store";

type Props = {};

const GuestMenu = (props: Props) => {
  const guestConfig = useAppSelector((state) => state.landingForm.landingConfig.searchForm.guest);
  const guestTypeStrings = guestConfig.guestTypes
    .filter((guestType) => guestType.count > 0)
    .map((guestType) => {
      const countString = guestType.count + " " + guestType.categoryName;
      return countString;
    });

  const guestInformation = guestTypeStrings.join(", ");

  const GuestMenuInput = () => {
    return <Typography>{guestInformation}</Typography>;
  };
  return guestConfig.showGuest ? (
    <FormControl fullWidth>
      <Select
        sx={{
          "& .MuiSelect-select": {
            padding: "0.7rem",
          },
        }}
        displayEmpty={true}
        IconComponent={KeyboardArrowDownIcon}
        renderValue={() => <GuestMenuInput />}
      >
        {guestConfig.guestTypes.map((guest) => {
          return <GuestType key={guest.categoryName} guest={guest} />;
        })}
      </Select>
    </FormControl>
  ) : (
    <></>
  );
};

export default GuestMenu;
