import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { checkOutContainerStyle } from "../../constants/styledConstants";
import Steps from "../roomResults/Stepper/Steps";
import HelpCard from "./HelpCard";
import ItineraryCard from "./itinerary/ItineraryCard";

type Props = {};

// Checkout Page
const Checkout = (props: Props) => {
  return (
    <Box sx={{ width: "100%" }} className="checkout">
      <Steps />
      <Box sx={{ padding: "0 3.375rem", width: "100%" }}>
        <Box sx={checkOutContainerStyle}>
          <Box>
            <Typography sx={{}}></Typography>
          </Box>
          {/* ---------------------------------------------- Itinerary section ------------------------------------------ */}
          <Box sx={{ display: "grid", gap: "2.5rem" }}>
            <ItineraryCard buttonText="CONTINUE SHOPPING" />
            <HelpCard />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Checkout;
