import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { setShowItineraryCard } from "../../../redux/reducers/checkoutDataSlice";
import { itineraryButtonStyle } from "../../../constants/styledConstants";
import { StyledDivider, TypographyGrey } from "../../styledComponents/styledComponents";
// buttonTetxt to change the text displayed
// on the button.
type Props = {
  buttonText: string;
};

// Itinerary Card showing on the checkout page.
const ItineraryCard = ({ buttonText }: Props) => {
  // currenlty selected room whose data is
  // being displayed.
  const checkoutRoom = useAppSelector((state) => state.checkout.room);
  const reduxDispatch = useAppDispatch();
  const navigate = useNavigate();

  // on click of the checkout/continue shopping
  // button, redirecting the user to room-search-results
  // or checkout page respectively.
  const handleClick = () => {
    if (buttonText === "CONTINUE SHOPPING") navigate("/room-search-results");
    else if (buttonText === "CHECKOUT") navigate("/checkout");
  };

  // remove the itinerary card and redirect the
  // user to home page or room-search-results page.
  const hnadleRemove = () => {
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
        <Button onClick={hnadleRemove} sx={{ cursor: "pointer", color: "#006EFF" }}>
          Remove
        </Button>
      </Box>
      <Box mt={"1rem"}>
        <Typography textTransform={"capitalize"} fontWeight={"700"} fontSize={"20px"}>
          {checkoutRoom.roomTypeName.replaceAll("_", " ").toLowerCase()}
        </Typography>
        <TypographyGrey>May 9 - May 16, 2022 | 1 adult 1 child</TypographyGrey>
        <TypographyGrey>Executive Room</TypographyGrey>
        <TypographyGrey>{`$ ${checkoutRoom.roomRate}`} per night</TypographyGrey>
        <TypographyGrey>1 room</TypographyGrey>
        <TypographyGrey>
          Special Promoname, $132/night
          <InfoOutlinedIcon fontSize="small" />
        </TypographyGrey>
      </Box>
      <StyledDivider></StyledDivider>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <TypographyGrey>Subtotal</TypographyGrey>
        <Typography fontSize={"1.25rem"}>$XXX.xx</Typography>
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
        <Typography>Due now</Typography>
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
