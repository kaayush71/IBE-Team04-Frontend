import { Box, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { promotionBoxStyle } from "../../../../constants/styledConstants";
import {
  setCheckoutRoom,
  setShowItineraryCard,
} from "../../../../redux/reducers/checkoutDataSlice";
import { RoomType } from "../../../../redux/reducers/roomResultConfigDataSlice";
import { useAppDispatch, useAppSelector } from "../../../../redux/store";
import { StyledButton } from "../../../styledComponents/styledComponents";

type Props = {
  room: RoomType;
};

const PromotionCard = ({ room }: Props) => {
  const selectedCurrency = useAppSelector((state) => state.currency.selectedCurrency);
  const reduxDispatch = useAppDispatch();
  const handleSubmit = () => {
    reduxDispatch(setCheckoutRoom(room));
    reduxDispatch(setShowItineraryCard(true));
  };
  return (
    <Box mt={"1rem"} sx={promotionBoxStyle}>
      <Box
        sx={{
          padding: "26px 23px",
        }}
      >
        <Typography fontWeight={"700"}>Standard Rate</Typography>
        <Typography color={"#5D5D5D"} mt={"0.75rem"}>
          Spend $10 every night you stay and earn $150 in dining credit at the resort.
        </Typography>
      </Box>
      <Box sx={{ backgroundColor: "#EFF0F1", padding: "26px 23px" }}>
        <Typography fontSize={"1.25rem"} fontWeight={"700"} textAlign={"end"}>
          {`${selectedCurrency.symbol} ${(selectedCurrency.rate * 100).toFixed(1)}`}
        </Typography>
        <Typography color={"#858685"} textAlign={"end"}>
          per night
        </Typography>
        <Link style={{ textDecoration: "none" }} to={"/checkout"}>
          <StyledButton type="submit" variant="contained" onClick={handleSubmit}>
            <Typography sx={{ fontWeight: "700", fontSize: "0.875rem" }}>
              {"SELECT PACKAGE"}
            </Typography>
          </StyledButton>
        </Link>
      </Box>
    </Box>
  );
};

export default PromotionCard;
