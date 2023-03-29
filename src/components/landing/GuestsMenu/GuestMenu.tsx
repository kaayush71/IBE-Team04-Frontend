import { Box, FormControl, Select, Typography } from "@mui/material";
import React from "react";
import GuestType from "./GuestType/GuestType";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useAppSelector } from "../../../redux/store";
import { useTranslation } from "react-i18next";

type Props = {
  onRoomResultsPage: boolean;
};

const GuestMenu = (props: Props) => {
  const { t } = useTranslation();
  const isLandingFormDisable = useAppSelector((state) => state.landingForm.isLandingFormDisable);
  const guestConfig = useAppSelector((state) => state.landingForm.landingConfig.searchForm.guest);
  const guestTypeStrings = guestConfig.guestTypes
    .filter((guestType) => guestType.count > 0)
    .map((guestType) => {
      const countString = guestType.count + " " + t(guestType.categoryName);
      return countString;
    });

  const guestInformation = guestTypeStrings.join(", ");

  const GuestMenuInput = () => {
    if (props.onRoomResultsPage) {
      return (
        <Box>
          <Typography fontSize={"0.875rem"} color={"#858685"}>
            Guests
          </Typography>
          <Typography fontWeight={700}>{guestInformation}</Typography>
        </Box>
      );
    } else {
      return <Typography>{isLandingFormDisable ? `Guests` : guestInformation}</Typography>;
    }
  };
  return guestConfig.showGuest ? (
    <FormControl fullWidth>
      <Select
        disabled={isLandingFormDisable}
        sx={{
          "& .MuiSelect-select": {
            padding: "0.7rem",
          },
        }}
        displayEmpty={true}
        IconComponent={KeyboardArrowDownIcon}
        renderValue={() => <GuestMenuInput />}
        value=""
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
