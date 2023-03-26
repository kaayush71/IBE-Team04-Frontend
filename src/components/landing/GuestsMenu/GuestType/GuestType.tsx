import { Box, Typography } from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { IconButton } from "@mui/material";
import { useAppDispatch } from "../../../../redux/store";
import {
  decreaseGuestCount,
  increaseGuestCount,
} from "../../../../redux/reducers/landingSearchFormSlice";
import { useTranslation } from "react-i18next";

type Props = {
  guest: {
    categoryName: string;
    ageRange: string;
    show: boolean;
    count: number;
  };
};

const GuestType = ({ guest }: Props) => {
  const {t} = useTranslation();
  const reduxDispatch = useAppDispatch();
  const handleIncrement = () => {
    reduxDispatch(increaseGuestCount(guest));
  };
  const handleDecrement = () => {
    reduxDispatch(decreaseGuestCount(guest));
  };
  return guest.show ? (
    <Box
      sx={{
        padding: "0.7rem",
        margin: "0.5rem 0",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
      }}
    >
      <Box>
        <Typography>{t(guest.categoryName)}</Typography>
        <Typography fontSize={"0.7rem"}>{`Ages ${guest.ageRange}`}</Typography>
      </Box>
      <Box sx={{ display: "flex", gap: "1rem", alignItems: "start" }}>
        <IconButton onClick={handleDecrement} sx={{ padding: "0" }}>
          <RemoveIcon sx={{ color: "black" }} />
        </IconButton>
        <Typography>{guest.count}</Typography>
        <IconButton onClick={handleIncrement} sx={{ padding: "0" }}>
          <AddIcon sx={{ color: "black" }} />
        </IconButton>
      </Box>
    </Box>
  ) : (
    <></>
  );
};

export default GuestType;
