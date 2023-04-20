import { CircularProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { fetchCheckoutConfig, setFormToShow } from "../../redux/reducers/checkoutFormDataSlice";
import { fetchBillingConfig } from "../../redux/reducers/checkoutDataSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import Steps from "../roomResults/Stepper/Steps";
import BillingInfo from "./BillingInfo";
import HelpCard from "./HelpCard";
import ItineraryCard from "./itinerary/ItineraryCard";
import PaymentInfo from "./PaymentInfo";
import TravelerInfo from "./TravelerInfo";
import { useNavigate } from "react-router-dom";
import ReactGA from "react-ga";

type Props = {};

const checkOutContainerStyle = {
  padding: "0 1.5rem",
  margin: "3.43rem 0",
  display: "grid",
  gridTemplateColumns: { lg: "58.4% 1fr", md: "1fr 1fr" },
  columnGap: "8.35rem",
  rowGap: "2rem",
  minHeight: "67vh",
};

// Checkout Page
const Checkout = (props: Props) => {
  const KEY = "remainingTime";
  const { t } = useTranslation();
  const reduxDispatch = useAppDispatch();
  const navigate = useNavigate();
  const loading = useAppSelector((state) => state.checkoutConfig.loading);
  const { showItineraryCard } = useAppSelector((state) => state.checkout);

  const [remainingTime, setRemainingTime] = useState(600); // 10 minutes in seconds
  useEffect(() => {
    if (remainingTime > 0) {
      const interval = setInterval(() => {
        setRemainingTime((prevTime) => {
          const newTime = prevTime - 1;
          localStorage.setItem(KEY, newTime.toString()); // store remaining time in localStorage
          return newTime;
        });
      }, 1000);
      return () => clearInterval(interval);
    } else {
      navigate("/");
    }
  }, [remainingTime, navigate]);
  useEffect(() => {
    ReactGA.pageview(window.location.pathname);
    const storedTime = localStorage.getItem(KEY);
    if (storedTime) {
      setRemainingTime(parseInt(storedTime));
    }
    if (showItineraryCard === false) {
      navigate("/");
    }
    reduxDispatch(setFormToShow("travelerInfo"));
    reduxDispatch(fetchCheckoutConfig());
    reduxDispatch(fetchBillingConfig());
  }, [navigate, reduxDispatch, showItineraryCard]);

  return (
    <Box sx={{ width: "100%" }} className="checkout">
      <Steps />
      <Box sx={{ padding: "0 3.375rem", width: "100%" }}>
        <Box sx={checkOutContainerStyle}>
          <Box>
            {/* ---------------------------------------------- User Info ------------------------------------------ */}
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography fontSize={"1.5rem"} fontWeight={700}>
                {t("Payment Info")}
              </Typography>
              <Typography
                sx={{ backgroundColor: "#26266D", color: "#fff", padding: "0 1rem" }}
                fontWeight={700}
              >
                {"Remaining Time : "}
                {`${Math.floor(remainingTime / 60)}:${remainingTime % 60 < 10 ? "0" : ""}${
                  remainingTime % 60
                }`}
              </Typography>
            </Box>
            {loading ? (
              <CircularProgress />
            ) : (
              <Box>
                {/* ------------------------------------------------- Traveler Info ------------------------------------ */}
                <TravelerInfo />
                {/* ----------------------------------------------------------------------------------------------------- */}
                {/* ------------------------------------------------- Billing Info ------------------------------------ */}
                <BillingInfo />
                {/* ------------------------------------------------- Payment Info ------------------------------------ */}
                <PaymentInfo />
                {/* ----------------------------------------------------------------------------------------------------- */}
              </Box>
            )}
          </Box>
          {/* ---------------------------------------------- Itinerary section ------------------------------------------ */}
          <Box sx={{ display: "grid", gap: "2.5rem", gridAutoRows: "min-content" }}>
            {showItineraryCard ? <ItineraryCard buttonText="CONTINUE SHOPPING" /> : <></>}
            <HelpCard />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Checkout;
