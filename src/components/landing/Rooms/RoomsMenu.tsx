import { Box, FormControl, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import React from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { setSelectedRoom } from "../../../redux/reducers/landingSearchFormSlice";
import { useTranslation } from "react-i18next";

type Props = {
  onRoomResultsPage: boolean;
};

const RoomsMenu = (props: Props) => {
  const isLandingFormDisable = useAppSelector((state) => state.landingForm.isLandingFormDisable);
  const state = useAppSelector((state) => state.landingForm);
  const { t } = useTranslation();
  const rooms = useAppSelector((state) => state.landingForm.landingConfig.searchForm.rooms);
  const numberOfRoomsSelected = useAppSelector((state) => state.landingForm.numberOfRoomSelected);
  const reduxDispatch = useAppDispatch();
  const handleChange = (event: SelectChangeEvent) => {
    reduxDispatch(setSelectedRoom(Number(event.target.value)));
  };

  const RoomsMenuInput = () => {
    if (props.onRoomResultsPage) {
      return (
        <Box>
          <Typography fontSize={"0.875rem"} color={"#858685"}>
            {t("Rooms")}
          </Typography>
          <Typography fontWeight={700}>{numberOfRoomsSelected}</Typography>
        </Box>
      );
    } else {
      return (
        <Typography>
          {isLandingFormDisable ? `Rooms` : `${String(numberOfRoomsSelected)}`}
        </Typography>
      );
    }
  };
  return (
    <FormControl fullWidth>
      <Select
        disabled={isLandingFormDisable}
        sx={{
          width: "100%",
          "& .MuiSelect-select": {
            padding: "0.7rem",
          },
        }}
        defaultValue=""
        displayEmpty={true}
        renderValue={() => <RoomsMenuInput />}
        onChange={handleChange}
        IconComponent={KeyboardArrowDownIcon}
      >
        {rooms.roomCountArray.map((room) => {
          return (
            <MenuItem
              disabled={state.totalGuestCount / rooms.maximumRoomOccupancy > room}
              key={room}
              value={room}
            >
              <Typography data-testid="room-count" id="room-count">
                {room}
              </Typography>
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default RoomsMenu;
