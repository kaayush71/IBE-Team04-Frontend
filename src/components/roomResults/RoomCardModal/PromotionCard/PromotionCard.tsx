import { Box, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Promotion } from "../../../../constants/types";
import {
  fetchRoomTypeRates,
  setBedCount,
  setCheckoutRoom,
  setCheckoutSelectedRoom,
  setDates,
  setIsCustomPromotion,
  setSelectedGuestType,
  setSelectedPromotion,
  setShowItineraryCard,
} from "../../../../redux/reducers/checkoutDataSlice";
import { RoomType } from "../../../../redux/reducers/roomResultConfigDataSlice";
import { useAppDispatch, useAppSelector } from "../../../../redux/store";
import { StyledButton } from "../../../styledComponents/styledComponents";

type Props = {
  room: RoomType;
  promotion: Promotion;
};

// styles
const promotionBoxStyle = {
  display: { md: "grid", sm: "block" },
  gridTemplateColumns: "70% 1fr",
  boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.1)",
  border: "1px solid #EFF0F1",
  maxWidth: { xl: "45w", lg: "50vw", md: "60vw" },
};

const PromotionCard = ({ room, promotion }: Props) => {
  const { t } = useTranslation();
  const selectedCurrency = useAppSelector((state) => state.currency.selectedCurrency);
  const startDate = useAppSelector((state) => state.landingForm.startDate);
  const endDate = useAppSelector((state) => state.landingForm.endDate);
  const selectedRoom = useAppSelector((state) => state.landingForm.numberOfRoomSelected);
  const bedCount = useAppSelector((state) => state.landingForm.numberOfBedsSelected);
  const { showSpecialPromotion } = useAppSelector((state) => state.promotions);
  const reduxDispatch = useAppDispatch();
  const guest = useAppSelector(
    (state) => state.landingForm.landingConfig.searchForm.guest.guestTypes
  );
  const handleSubmit = () => {
    reduxDispatch(
      setDates({
        startDate,
        endDate,
      })
    );
    reduxDispatch(
      fetchRoomTypeRates({
        startTime: startDate,
        endTime: endDate,
        roomTypeId: room.roomTypeId,
      })
    );
    reduxDispatch(setIsCustomPromotion(showSpecialPromotion));
    reduxDispatch(setCheckoutSelectedRoom(selectedRoom));
    reduxDispatch(setSelectedGuestType(guest));
    reduxDispatch(setSelectedPromotion(promotion));
    reduxDispatch(setCheckoutRoom(room));
    reduxDispatch(setShowItineraryCard(true));
    reduxDispatch(setBedCount(bedCount));
  };
  return (
    <Box mt={"1rem"} sx={promotionBoxStyle}>
      <Box
        sx={{
          padding: "26px 23px",
        }}
      >
        <Typography textTransform={"capitalize"} fontWeight={"700"}>
          {promotion.promotionTitle.replaceAll("_", " ").toLowerCase()}
        </Typography>
        <Typography textTransform={"capitalize"} color={"#5D5D5D"} mt={"0.75rem"}>
          {t(`${promotion.promotionDescription.replaceAll("_", " ").toLowerCase()}`)}
        </Typography>
      </Box>
      <Box sx={{ backgroundColor: "#EFF0F1", padding: "26px 23px" }}>
        <Typography fontSize={"1.25rem"} fontWeight={"700"} textAlign={"end"}>
          {`${selectedCurrency.symbol} ${(
            selectedCurrency.rate *
            (room.roomRate * promotion.priceFactor)
          ).toFixed(1)}`}
        </Typography>
        <Typography color={"#858685"} textAlign={"end"}>
          {t("per night")}
        </Typography>
        <Link style={{ textDecoration: "none" }} to={"/checkout"}>
          <StyledButton type="submit" variant="contained" onClick={handleSubmit}>
            <Typography sx={{ fontWeight: "700", fontSize: "0.875rem" }}>
              {t("SELECT PACKAGE")}
            </Typography>
          </StyledButton>
        </Link>
      </Box>
    </Box>
  );
};

export default PromotionCard;
