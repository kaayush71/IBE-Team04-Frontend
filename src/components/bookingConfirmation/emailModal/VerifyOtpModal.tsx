import { Box, IconButton, TextField, Typography } from "@mui/material";
import React, { useRef } from "react";
import { StyledButton } from "../../styledComponents/styledComponents";
import CloseIcon from "@mui/icons-material/Close";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { verifyOtpMail } from "../../../redux/reducers/confirmBookingSlice";

type Props = {
  handleClose: any;
};

// styles
const inconButtonStyle = {
  top: "0.2rem",
  right: "0.3rem",
  position: "absolute",
  color: "black",
};

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return (
    <MuiAlert elevation={6} ref={ref} variant="filled" {...props}>
      {props.children}
    </MuiAlert>
  );
});

const GetEmailModal = (props: Props) => {
  const { verifyOtpMailStatus, booking } = useAppSelector((state) => state.confirmBooking);
  const [open, setOpen] = React.useState(false);

  const handleClosed = (event?: React.SyntheticEvent | Event, reason?: string) => {
    setOpen(false);
    if (verifyOtpMailStatus === "success") {
      window.location.reload();
    }
  };
  const reduxDispatch = useAppDispatch();
  const inputRef: any = useRef(null);
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setOpen(true);
    reduxDispatch(
      verifyOtpMail({
        bookingId: booking.bookingId,
        Otp: inputRef.current.value,
      })
    );
    if (inputRef?.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <Box sx={{ height: "20vh" }}>
      <IconButton sx={inconButtonStyle} onClick={props.handleClose}>
        <CloseIcon sx={{ fontWeight: "400" }} fontSize="medium" />
      </IconButton>
      <Typography fontSize={"1.25rem"} fontWeight={"700"} textAlign={"center"}>
        Enter Your OTP to delete the booking.
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          placeholder="Please enter your OTP"
          required={true}
          type={"text"}
          inputRef={inputRef}
          sx={{ margin: "1rem auto", display: "flex" }}
        ></TextField>
        <StyledButton
          type="submit"
          sx={{ width: "15rem", display: "flex", margin: "0 auto" }}
          variant="contained"
        >
          Submit
        </StyledButton>
      </form>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        sx={{ marginTop: "5rem", position: "relative", bottom: "0" }}
        open={verifyOtpMailStatus !== "" && open}
        autoHideDuration={1000}
        onClose={handleClosed}
      >
        {verifyOtpMailStatus === "success" ? (
          <Box>
            <Alert onClose={handleClosed} severity="success" sx={{ width: "100%" }}>
              Booking Deleted Successfully.
            </Alert>
          </Box>
        ) : verifyOtpMailStatus === "rejected" ? (
          <Box>
            <Alert onClose={handleClosed} severity="error" sx={{ width: "100%" }}>
              Unable to verify OTP!
            </Alert>
          </Box>
        ) : (
          <></>
        )}
      </Snackbar>
    </Box>
  );
};

export default GetEmailModal;
