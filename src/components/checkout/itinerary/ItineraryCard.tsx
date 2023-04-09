import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import {
  fetchRoomTypeRates,
  setShowItineraryCard,
} from "../../../redux/reducers/checkoutDataSlice";
import { StyledDivider, TypographyGrey } from "../../styledComponents/styledComponents";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";
import PromotionModal from "./PromotionModal";
// buttonTetxt to change the text displayed
// on the button.
type Props = {
  buttonText: string;
};

// styles
const itineraryButtonStyle = {
  display: "flex",
  margin: "33px auto 0 auto",
  padding: "0.75rem 0.5rem",
  width: "60%",
  fontSize: "0.875rem",
  color: "#26266D",
  border: "3px solid #26266D ",
  "&:hover": { color: "#fff", backgroundColor: "#26266D", border: "3px solid #26266D " },
};

// Itinerary Card showing on the checkout page.
const ItineraryCard = ({ buttonText }: Props) => {
  const [isPromotionModalOpen, setIsPromotionModalOpen] = useState<boolean>();
  const handlePromotionModelOpen = () => setIsPromotionModalOpen(true);
  const handlePromotionModelClose = () => setIsPromotionModalOpen(false);

  const { t } = useTranslation();

  const guestConfig = useAppSelector((state) => state.checkout.guestTypes);
  const startDate = useAppSelector((state) => state.checkout.startDate);
  const endDate = useAppSelector((state) => state.checkout.endDate);
  const guestTypeStrings = guestConfig
    .filter((guestType) => guestType.count > 0)
    .map((guestType) => {
      const countString = guestType.count + " " + t(guestType.categoryName);
      return countString;
    });

  const numberOfRoomSelected = useAppSelector((state) => state.checkout.selectedRoom);
  const guestInformation = guestTypeStrings.join(", ");
  const selectedCurrency = useAppSelector((state) => state.currency.selectedCurrency);
  const location = useLocation();
  // currently selected promotion
  const { selectedPromotion, roomTypeRates, totalCostOfStay } = useAppSelector(
    (state) => state.checkout
  );
  const reduxDispatch = useAppDispatch();

  // currenlty selected room whose data is
  // being displayed.
  const checkoutRoom = useAppSelector((state) => state.checkout.room);
  const navigate = useNavigate();

  useEffect(() => {
    reduxDispatch(
      fetchRoomTypeRates({
        startTime: startDate,
        endTime: endDate,
        roomTypeId: checkoutRoom.roomTypeId,
      })
    );
  }, [checkoutRoom.roomTypeId, endDate, reduxDispatch, startDate]);

  // on click of the checkout/continue shopping
  // button, redirecting the user to room-search-results
  // or checkout page respectively.
  const handleClick = () => {
    if (buttonText === "CONTINUE SHOPPING") navigate("/room-search-results");
    else if (buttonText === "CHECKOUT") navigate("/checkout");
  };

  // remove the itinerary card and redirect the
  // user to home page or room-search-results page.
  const handleRemove = () => {
    reduxDispatch(setShowItineraryCard(false));
    if (buttonText === "CONTINUE SHOPPING") navigate("/");
    else if (buttonText === "CHECKOUT") navigate("/room-search-results");
  };
  return (
    <Box sx={{ background: "#EFF0F1", padding: "1.43rem" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography fontWeight={"700"} fontSize={"1.5rem"}>
          Your Trip Itinerary
        </Typography>
        <Button onClick={handleRemove} sx={{ cursor: "pointer", color: "#006EFF" }}>
          Remove
        </Button>
      </Box>
      <Box mt={"1rem"}>
        <Typography textTransform={"capitalize"} fontWeight={"700"} fontSize={"20px"}>
          {checkoutRoom.roomTypeName.replaceAll("_", " ").toLowerCase()}
        </Typography>
        <TypographyGrey>
          {format(new Date(startDate), "MMM,dd")}-{format(new Date(endDate), "MMM,dd")}
          {` `} {format(new Date(), "yyyy")} {` | `}
          {guestInformation}
        </TypographyGrey>
        <TypographyGrey>Executive Room</TypographyGrey>

        <TypographyGrey>
          {`${selectedCurrency.symbol} ${selectedCurrency.rate * checkoutRoom.roomRate}`} per night
        </TypographyGrey>
        <TypographyGrey>{numberOfRoomSelected} room</TypographyGrey>
        {/* ----------------------------------------------- Room Type Rates With Day ------------------------------------------- */}
        {location.pathname === "/room-search-results" &&
          roomTypeRates.map((roomTypeRate) => {
            return (
              <Box
                key={roomTypeRate.date}
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <TypographyGrey>
                  {format(new Date(roomTypeRate.date), "EEEE do MMMM")}
                </TypographyGrey>
                <Typography>{`${selectedCurrency.symbol} ${
                  selectedCurrency.rate * roomTypeRate.roomTypeRate
                }`}</Typography>
              </Box>
            );
          })}
        {/* -------------------------------------------------------------------------------------------------------------------- */}

        <TypographyGrey textTransform={"capitalize"}>
          {`${selectedPromotion.promotionTitle.replaceAll("_", " ").toLowerCase()}, ${
            selectedCurrency.symbol
          }${(
            selectedCurrency.rate *
            (checkoutRoom.roomRate * selectedPromotion.priceFactor)
          ).toFixed(1)}/night `}
          <InfoOutlinedIcon
            sx={{ cursor: "pointer" }}
            onClick={handlePromotionModelOpen}
            fontSize="small"
          />
        </TypographyGrey>
        {isPromotionModalOpen && (
          <PromotionModal open={isPromotionModalOpen} handleClose={handlePromotionModelClose} />
        )}
      </Box>
      <StyledDivider></StyledDivider>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <TypographyGrey>Subtotal</TypographyGrey>
        <Typography fontSize={"1.25rem"}>{`${selectedCurrency.symbol}${(
          selectedCurrency.rate *
          (totalCostOfStay * selectedPromotion.priceFactor)
        ).toFixed(1)}`}</Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <TypographyGrey>
          Taxes, Surcharges, Fees
          <InfoOutlinedIcon fontSize="small" />
        </TypographyGrey>
        <Typography fontSize={"1.25rem"}>$XXX.xx</Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <TypographyGrey>VAT</TypographyGrey>
        <Typography fontSize={"1.25rem"}>$XXX.xx</Typography>
      </Box>
      <StyledDivider></StyledDivider>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <TypographyGrey>Due now</TypographyGrey>
        <Typography fontSize={"1.25rem"}>$XXX.xx</Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <TypographyGrey>Due at resort</TypographyGrey>
        <Typography fontSize={"1.25rem"}>$XXX.xx</Typography>
      </Box>
      <Button onClick={handleClick} type="submit" sx={itineraryButtonStyle} variant="outlined">
        <Typography sx={{ fontWeight: "700", fontSize: "0.875rem" }}>{`${buttonText}`}</Typography>
      </Button>
    </Box>
  );
};

export default ItineraryCard;
