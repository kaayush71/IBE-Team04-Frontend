import { Alert, Box, CircularProgress } from "@mui/material";
import React, { useEffect } from "react";
import MyBookingCard from "./MyBookingCard";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { getAllBookingData } from "../../redux/reducers/confirmBookingSlice";

type Props = {};

const MyBookings = (props: Props) => {
  const { userId, userEmail } = useAppSelector((state) => state.checkout);
  const navigate = useNavigate();
  const { allBookings, getAllBookingStatus } = useAppSelector((state) => state.confirmBooking);
  const reduxDispatch = useAppDispatch();
  useEffect(() => {
    if (userId === "") {
      navigate("/");
    }
    reduxDispatch(getAllBookingData(userEmail));
  }, [navigate, reduxDispatch, userEmail, userId]);
  return (
    <Box sx={{ minHeight: "82.9vh" }}>
      {getAllBookingStatus === "" ? (
        <Box
          sx={{
            display: "flex",
            minHeight: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : getAllBookingStatus === "rejected" ? (
        <Alert severity="error">No Booking Found</Alert>
      ) : (
        allBookings.map((bookings) => {
          return <MyBookingCard key={bookings.bookingId} booking={bookings} />;
        })
      )}
    </Box>
  );
};

export default MyBookings;
