import { FormControl, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import React from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { setSelectedRoom } from "../../../redux/reducers/landingSearchFormSlice";

type Props = {};

const RoomsMenu = (props: Props) => {
  const rooms = useAppSelector((state) => state.landingForm.landingConfig.searchForm.rooms);
  const reduxDispatch = useAppDispatch();
  const handleChange = (event: SelectChangeEvent) => {
    reduxDispatch(setSelectedRoom(Number(event.target.value)));
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
        value={String(rooms.defaultRoomCount)}
        onChange={handleChange}
        IconComponent={KeyboardArrowDownIcon}
      >
        {rooms.roomCountArray.map((room) => {
          return (
            <MenuItem key={room} value={room}>
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
