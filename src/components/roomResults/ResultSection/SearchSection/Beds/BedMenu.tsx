import { Box, FormControl, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import React from "react";
import { setBedCount } from "../../../../../redux/reducers/roomResultsDataSlice";
import { useAppDispatch, useAppSelector } from "../../../../../redux/store";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const BedMenu = () => {
  const numberOfBedsSelected = useAppSelector((state) => state.results.bed.bedCountSelected);
  const reduxDispatch = useAppDispatch();
  const handleChange = (event: SelectChangeEvent) => {
    reduxDispatch(setBedCount(Number(event.target.value)));
  };
  const beds = useAppSelector((state) => state.results.bed.bedCountArray);
  const BedMenuInput = () => {
    return (
      <Box>
        <Typography fontSize={"0.875rem"} color={"#858685"}>
          Beds
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
