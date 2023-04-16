import { Box, Button, CircularProgress, Divider, Typography, Modal } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { format } from "date-fns";
import RoomTotalSummary from "./RoomTotalSummary";
import GuestInformation from "./GuestInformation";
import BillingAddress from "./BillingAddress";
import PayementInformation from "./PaymentInformation";
import { useParams } from "react-router-dom";
import {
  getBookingData,
  sendConfirmBookingMail,
  sendOtpMail,
  setOpenAllAccordion,
} from "../../redux/reducers/confirmBookingSlice";
import NotFoundPage from "./NotFoundPage";
import { differenceInDays } from "date-fns";
import { setMakeBookingStatus } from "../../redux/reducers/checkoutFormDataSlice";
import VerifyOtpModal from "./emailModal/VerifyOtpModal";
import ConfirmDeleteModal from "./emailModal/ConfirmDeleteModal";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

type Props = {};

// styles
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

const BookingConfirmation = (props: Props) => {
  const { userId } = useAppSelector((state) => state.checkout);
  const { selectedCurrency } = useAppSelector((state) => state.currency);
  const { loading, booking, getBookingStatus, sendOtpMailStatus, confirmBookingMailStatus } =
    useAppSelector((state) => state.confirmBooking);
  const { t } = useTranslation();
  const { id } = useParams();
  const reduxDispatch = useAppDispatch();
  useEffect(() => {
    reduxDispatch(setMakeBookingStatus());
    reduxDispatch(getBookingData(id));
  }, [id, reduxDispatch]);

  const startDate = booking.checkInDate.substring(0, 10);
  const endDate = booking.checkOutDate.substring(0, 10);
  const totalStayDuration = differenceInDays(new Date(endDate), new Date(startDate)) + 1;

  const handlePrint = () => {
    console.log("check in date", booking.checkInDate);
    reduxDispatch(setOpenAllAccordion(true));
    setTimeout(function () {
      window.print();
      reduxDispatch(setOpenAllAccordion(false));
    }, 0);
  };

  // for modals
  const [emailModalOpen, setEmailModalOpen] = React.useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const handleConfirmDeleteClose = () => setConfirmDelete(false);
  const handleEmailModalClose = () => setEmailModalOpen(false);

  const handleCancelRoomClick = () => {
    if (userId !== "") {
      setConfirmDelete(true);
    } else {
      setEmailModalOpen(true);
      reduxDispatch(
        sendOtpMail({
          bookingId: booking.bookingId,
          emailId: booking.travellerEmail,
        })
      );
    }
  };

  const handleSendConfirmationEmail = () => {
    reduxDispatch(sendConfirmBookingMail(booking.bookingId));
    setOpen(true);
  };

  // for snackbar
  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
    return (
      <MuiAlert elevation={6} ref={ref} variant="filled" {...props}>
        {props.children}
      </MuiAlert>
    );
  });

  const [open, setOpen] = useState(false);
  const handleClosed = (event?: React.SyntheticEvent | Event, reason?: string) => {
    setOpen(false);
  };

  return loading ? (
    <Box
      sx={{ minHeight: "85vh", display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <CircularProgress />
    </Box>
  ) : getBookingStatus === "rejected" ? (
    <NotFoundPage />
  ) : (
    <Box sx={{ width: "100%", position: "relative" }} className="checkout">
      <Box sx={{ padding: "0 3.375rem", width: "100%", position: "relative" }}>
        <Box sx={{ width: "100%", padding: "2.18rem 6.9rem", minHeight: "82.9vh" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography fontSize={"1.5rem"} fontWeight={"700"}>
              {t("Upcoming reservation")} #{booking.bookingId}
            </Typography>
            <Box>
              <Button onClick={handlePrint} color="primary">
                {t("Print")}
              </Button>
              <Button onClick={handleSendConfirmationEmail}>{t("Email")}</Button>
            </Box>
          </Box>
          {/* -------------------------------------------------- Rooom Details Container ---------------------------------------- */}
          <Box
            sx={{
              border: " 1px solid #C1C2C2",
              borderRadius: "0.3rem",
              margin: "0.8rem 0",
              padding: "1.8rem",
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
                <Typography fontSize={"1.5rem"} fontWeight={"700"} textTransform={"capitalize"}>
                  Room {booking.roomTypeId}:{" "}
                  {booking.roomTypeName.replaceAll("_", " ").toLowerCase()}
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
              <Button onClick={handleCancelRoomClick} color="primary">
                {t("Cancel Room")}
              </Button>
              <Modal
                open={emailModalOpen && sendOtpMailStatus === "success"}
                // open={emailModalOpen}
                onClose={handleEmailModalClose}
              >
                <Box sx={modalContainerStyle}>
                  <VerifyOtpModal handleClose={handleEmailModalClose} />
                </Box>
              </Modal>
              <Modal open={confirmDelete} onClose={handleConfirmDeleteClose}>
                <Box sx={modalContainerStyle}>
                  <ConfirmDeleteModal handleClose={handleConfirmDeleteClose} />
                </Box>
              </Modal>
            </Box>
            {/* --------------------------------------------------------- Second row -------------------------------------------- */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { md: "1fr", lg: "20.5rem 1fr" },
                gap: "1.375rem",
                margin: "1.875rem 0 2.5rem 0",
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
            {/* --------------------------------------------------------------------------------------------------------- */}
            <Divider sx={{ borderWidth: "1px" }} />
            {/* ----------------------------------------------------- Room Summary -------------------------------------- */}
            <RoomTotalSummary />
            <Divider sx={{ borderWidth: "1px" }} />
            {/* ----------------------------------------------------- Guest Info -------------------------------------- */}
            <GuestInformation />
            <Divider sx={{ borderWidth: "1px" }} />
            {/* ----------------------------------------------------- Billing Address -------------------------------------- */}
            <BillingAddress />
            <Divider sx={{ borderWidth: "1px" }} />
            {/* ----------------------------------------------------- Payment Info -------------------------------------- */}
            <PayementInformation />
          </Box>
        </Box>
      </Box>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        sx={{ marginTop: "5rem", position: "absolute", bottom: "0" }}
        open={confirmBookingMailStatus !== "" && open}
        autoHideDuration={700}
        onClose={handleClosed}
      >
        {confirmBookingMailStatus === "success" ? (
          <Box>
            <Alert onClose={handleClosed} severity="success" sx={{ width: "100%" }}>
              Booking Deleted Successfully.
            </Alert>
          </Box>
        ) : confirmBookingMailStatus === "rejected" ? (
          <Box>
            <Alert onClose={handleClosed} severity="error" sx={{ width: "100%" }}>
              Unable to delete the booking.
            </Alert>
          </Box>
        ) : (
          <></>
        )}
      </Snackbar>
    </Box>
  );
};

export default BookingConfirmation;
