import { FormControl, Select, Typography } from "@mui/material";
import React from "react";
import GuestType from "./GuestType/GuestType";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useAppSelector } from "../../../redux/store";
import { useTranslation } from "react-i18next";

type Props = {};

const GuestMenu = (props: Props) => {
  const { t } = useTranslation();
  const guestConfig = useAppSelector((state) => state.landingForm.landingConfig.searchForm.guest);
  const guestTypeStrings = guestConfig.guestTypes
    .filter((guestType) => guestType.count > 0)
    .map((guestType) => {
      const countString = guestType.count + " " + t(guestType.categoryName);
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
