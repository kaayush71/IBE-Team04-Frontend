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
import TaxModal from "./TaxModal";
import { useCustomHook } from "../../../constants/calculateRoomRates";
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
  const [isTaxModalOpen, setIsTaxModalOpen] = useState<boolean>();

  const handlePromotionModelOpen = () => setIsPromotionModalOpen(true);
  const handlePromotionModelClose = () => setIsPromotionModalOpen(false);

  const handleTaxModelOpen = () => setIsTaxModalOpen(true);
  const handleTaxModelClose = () => setIsTaxModalOpen(false);

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

  // -------------------------------------- importing functions from customHook --------------------------------------------------
  const { calculateVat, calculateTaxes, dueNowAmount, dueAtResortAmount } = useCustomHook();

  return (
    <Box sx={{ background: "#EFF0F1", padding: "1.43rem" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography fontWeight={"700"} fontSize={{ xs: "0.875rem", sm: "1.5rem" }}>
          {t("Your Trip Itinerary")}
        </Typography>
        <Button
          onClick={handleRemove}
          sx={{ cursor: "pointer", color: "#006EFF", fontSize: { xs: "0.875rem", sm: "1rem" } }}
        >
          {t("Remove")}
        </Button>
      </Box>
      <Box mt={"1rem"}>
        <Typography textTransform={"capitalize"} fontWeight={"700"} fontSize={"20px"}>
          {t("Property")} 4
        </Typography>
        <TypographyGrey fontSize={{ xs: "0.875rem", sm: "1rem" }}>
          {format(new Date(startDate), "MMM dd")}
          {` - `}
          {format(new Date(endDate), "MMM dd")}
          {` `} {format(new Date(), "yyyy")} {` | `}
          {guestInformation}
        </TypographyGrey>
        <TypographyGrey fontSize={{ xs: "0.875rem", sm: "1rem" }}>
          {t(checkoutRoom.roomTypeName.replaceAll("_", " "))}
        </TypographyGrey>

        <TypographyGrey fontSize={{ xs: "0.875rem", sm: "1rem" }}>
          {`${selectedCurrency.symbol} ${selectedCurrency.rate * checkoutRoom.roomRate}`}{" "}
          {t("per night")}
        </TypographyGrey>
        <TypographyGrey fontSize={{ xs: "0.875rem", sm: "1rem" }}>
          {numberOfRoomSelected} room
        </TypographyGrey>
        {/* ----------------------------------------------- Room Type Rates With Day ------------------------------------------- */}
        {location.pathname === "/room-search-results" &&
          roomTypeRates.map((roomTypeRate) => {
            return (
              <Box
                key={roomTypeRate.date}
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <TypographyGrey fontSize={{ xs: "0.875rem", sm: "1rem" }}>
                  {format(new Date(roomTypeRate.date), "EEEE do MMMM")}
                </TypographyGrey>
                <Typography fontSize={{ xs: "0.875rem", sm: "1.25rem" }}>{`${
                  selectedCurrency.symbol
                } ${(
                  selectedCurrency.rate *
                  roomTypeRate.roomTypeRate *
                  selectedPromotion.priceFactor
                ).toFixed(2)}`}</Typography>
              </Box>
            );
          })}
        {/* -------------------------------------------------------------------------------------------------------------------- */}

        <TypographyGrey fontSize={{ xs: "0.875rem", sm: "1rem" }} textTransform={"capitalize"}>
          {`${selectedPromotion.promotionTitle.replaceAll("_", " ").toLowerCase()}, ${
            selectedCurrency.symbol
          }${(
            selectedCurrency.rate *
            (checkoutRoom.roomRate * selectedPromotion.priceFactor)
          ).toFixed(2)}/night `}
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
        <TypographyGrey fontSize={{ xs: "0.875rem", sm: "1rem" }}>{t("Subtotal")}</TypographyGrey>
        <Typography fontSize={{ xs: "0.875rem", sm: "1.25rem" }}>{`${selectedCurrency.symbol}${(
          selectedCurrency.rate *
          (totalCostOfStay * selectedPromotion.priceFactor)
        ).toFixed(1)}`}</Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <TypographyGrey fontSize={{ xs: "0.875rem", sm: "1rem" }}>
          {t("Taxes, Surcharges, Fees")}
          <InfoOutlinedIcon
            sx={{ cursor: "pointer" }}
            onClick={handleTaxModelOpen}
            fontSize="small"
          />
        </TypographyGrey>
        {isTaxModalOpen && <TaxModal open={isTaxModalOpen} handleClose={handleTaxModelClose} />}
        <Typography fontSize={{ xs: "0.875rem", sm: "1.25rem" }}>
          {selectedCurrency.symbol}
          {calculateTaxes().toFixed(1)}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <TypographyGrey fontSize={{ xs: "0.875rem", sm: "1rem" }}>{t("VAT")}</TypographyGrey>
        <Typography fontSize={{ xs: "0.875rem", sm: "1.25rem" }}>
          {selectedCurrency.symbol}
          {calculateVat().toFixed(1)}
        </Typography>
      </Box>
      <StyledDivider></StyledDivider>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <TypographyGrey fontSize={{ xs: "0.875rem", sm: "1rem" }}>{t("Due now")}</TypographyGrey>
        <Typography fontSize={{ xs: "0.875rem", sm: "1.25rem" }}>
          {selectedCurrency.symbol}
          {dueNowAmount().toFixed(1)}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <TypographyGrey fontSize={{ xs: "0.875rem", sm: "1rem" }}>
          {t("Due at resort")}
        </TypographyGrey>
        <Typography fontSize={{ xs: "0.875rem", sm: "1.25rem" }}>
          {selectedCurrency.symbol}
          {dueAtResortAmount().toFixed(1)}
        </Typography>
      </Box>
      <Button onClick={handleClick} type="submit" sx={itineraryButtonStyle} variant="outlined">
        <Typography sx={{ fontWeight: "700", fontSize: "0.875rem" }}>
          {t(`${buttonText}`)}
        </Typography>
      </Button>
    </Box>
  );
};

export default ItineraryCard;
