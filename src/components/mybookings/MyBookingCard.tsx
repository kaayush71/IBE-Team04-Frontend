import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Box, Button, Modal, Typography } from "@mui/material";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { useAppSelector } from "../../redux/store";
import { Booking } from "../../constants/types";
import { format, differenceInDays } from "date-fns";
import { useNavigate } from "react-router-dom";
import CancelBookingModal from "./modal/CancelBookingModal";

type Props = {
  booking: Booking;
};

const dateBoxStyle = {
  maxWidth: "125px",
  border: "1px solid #858685",
  padding: "0.75rem",
  textAlign: "center",
  borderRadius: "0.3rem",
  display: "grid",
  gap: "0.3rem",
};

const modalContainerStyle = {
  position: "absolute" as "absolute",
  top: "30%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40vw",
  bgcolor: "background.paper",
  boxShadow: 24,
  padding: "1rem 1.5rem",
};

const MyBookingCard = ({ booking }: Props) => {
  const { t } = useTranslation();
  const { selectedCurrency } = useAppSelector((state) => state.currency);
  const startDate = booking.checkInDate.substring(0, 10);
  const endDate = booking.checkOutDate.substring(0, 10);
  const totalStayDuration = differenceInDays(new Date(endDate), new Date(startDate));
  const navigate = useNavigate();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const handleConfirmDeleteClose = () => setConfirmDelete(false);

  const handleCancelRoomClick = () => {
    console.log("hello");
    setConfirmDelete(true);
  };

  const handleClick = () => {
    console.log("clicked");
    if (booking.isCancelled !== true) {
      navigate(`/confirm-booking/${booking.bookingId}`);
    }
  };
  return (
    <Box sx={{ width: "100%", position: "relative" }} className="checkout">
      <Box sx={{ padding: "0 3.375rem", width: "100%", position: "relative" }}>
        <Box sx={{ width: "100%", padding: "2.18rem 6.9rem" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            {booking.isCancelled ? (
              <Typography color={"red"} fontSize={"1.5rem"} fontWeight={"700"}>
                {t("Cancelled reservation")} #{booking.bookingId}
              </Typography>
            ) : (
              <Typography fontSize={"1.5rem"} fontWeight={"700"}>
                {t("Upcoming reservation")} #{booking.bookingId}
              </Typography>
            )}
          </Box>
          {/* -------------------------------------------------- Rooom Details Container ---------------------------------------- */}
          <Box
            sx={{
              border: " 1px solid #C1C2C2",
              borderRadius: "0.3rem",
              margin: "0.8rem 0",
              padding: "1.8rem",
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
              backgroundColor: booking.isCancelled ? "#F3D7D7" : "#fff",
            }}
          >
            {/* ---------------------------------------------------------- First row --------------------------------------------- */}
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "2rem",
                }}
              >
                <Typography fontSize={"1.5rem"} fontWeight={"700"}>
                  Room {booking.roomTypeId}:{" "}
                  {t(booking.roomTypeName.replaceAll("_", " ").toLowerCase())}
                </Typography>
                <Box sx={{ display: "flex", gap: "0.5rem", height: "100%" }}>
                  <PersonOutlinedIcon sx={{ color: "#858685" }} />
                  <Typography color="#5D5D5D">
                    {booking.adultCount > 0 ? `${booking.adultCount} ${t("Adults")}` : ""}
                    {booking.teenCount > 0 ? `, ${booking.teenCount} Teens` : ""}
                    {booking.childCount > 0 ? `, ${booking.childCount} Children` : ""}
                  </Typography>
                </Box>
              </Box>
              {booking.isCancelled ? (
                <></>
              ) : (
                <Button onClick={handleCancelRoomClick} color="primary">
                  {t("Cancel Room")}
                </Button>
              )}
              <Modal open={confirmDelete} onClose={handleConfirmDeleteClose}>
                <Box sx={modalContainerStyle}>
                  <CancelBookingModal
                    bookingId={booking.bookingId}
                    handleClose={handleConfirmDeleteClose}
                  />
                </Box>
              </Modal>
            </Box>
            {/* --------------------------------------------------------- Second row -------------------------------------------- */}
            <Box
              onClick={handleClick}
              sx={{
                display: "grid",
                gridTemplateColumns: { md: "1fr", lg: "20.5rem 1fr" },
                gap: "1.375rem",
                margin: "1.875rem 0 2.5rem 0",
                cursor: booking.isCancelled ? "" : "pointer",
              }}
            >
              <Box sx={{ height: "14rem", width: "20.5rem" }}>
                <img
                  style={{ height: "100%", width: "100%" }}
                  src="https://d2rvepoyu8e9fg.cloudfront.net/team04/hotel-room-1.jpg"
                  alt=""
                />
              </Box>
              {/* -------------------------------------------------------- right side ------------------------------------------- */}
              <Box>
                <Box sx={{ display: "flex", gap: "0.4rem" }}>
                  <Box sx={dateBoxStyle}>
                    <Typography color={"#858685"} fontSize={"0.875rem"}>
                      {t("Check In")}
                    </Typography>
                    <Typography fontWeight={700}>{format(new Date(startDate), "d")}</Typography>
                    <Typography>{format(new Date(startDate), "MMM yyyy")}</Typography>
                  </Box>
                  <Box sx={dateBoxStyle}>
                    <Typography color={"#858685"} fontSize={"0.875rem"}>
                      {t("Check Out")}
                    </Typography>
                    <Typography fontWeight={700}>{format(new Date(endDate), "d")}</Typography>
                    <Typography>{format(new Date(endDate), "MMM yyyy")}</Typography>
                  </Box>
                </Box>
                <Typography m={"1rem 0 0 0"} fontSize={"1.25rem"} fontWeight={700}>
                  {booking.customPromotion === null
                    ? booking.graphQlPromotion?.promotionTitle
                    : booking.customPromotion.promotionTitle}
                </Typography>
                <Typography color={"#5D5D5D"}>
                  {booking.customPromotion === null
                    ? booking.graphQlPromotion?.promotionDescription
                    : booking.customPromotion.promotionDescription}
                </Typography>
                <Box
                  sx={{
                    display: { md: "initial", lg: "flex" },
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "1.5rem",
                  }}
                >
                  <Typography color={"#5D5D5D"}>
                    {t("Copy explaining the cancellation policy, if applicable")}
                  </Typography>
                  <Typography fontSize={"1.25rem"}>
                    {selectedCurrency.symbol}
                    {(
                      (booking.totalCostOfStay * selectedCurrency.rate) /
                      totalStayDuration
                    ).toFixed(1)}
                    /{t("night total")}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default MyBookingCard;
