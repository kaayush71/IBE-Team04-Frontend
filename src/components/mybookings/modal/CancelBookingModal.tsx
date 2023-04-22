import { Box, IconButton, Typography } from "@mui/material";
import React from "react";
import { StyledButton } from "../../styledComponents/styledComponents";
import CloseIcon from "@mui/icons-material/Close";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { deleteForLoginUser } from "../../../redux/reducers/confirmBookingSlice";

type Props = {
  bookingId: number;
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

const CancelBookingModal = (props: Props) => {
  const { deleteForLoginUserStatus } = useAppSelector((state) => state.confirmBooking);
  const { userEmail } = useAppSelector((state) => state.checkout);
  const [open, setOpen] = React.useState(false);

  const handleClosed = (event?: React.SyntheticEvent | Event, reason?: string) => {
    setOpen(false);
    if (deleteForLoginUserStatus === "success") {
      window.location.reload();
    }
  };
  const reduxDispatch = useAppDispatch();
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setOpen(true);
    reduxDispatch(
      deleteForLoginUser({
        bookingId: props.bookingId,
        emailId: userEmail,
      })
    );
  };
  return (
    <Box sx={{ height: "" }}>
      <IconButton sx={inconButtonStyle} onClick={props.handleClose}>
        <CloseIcon sx={{ fontWeight: "400" }} fontSize="medium" />
      </IconButton>
      <Typography mb={"1rem"} fontSize={"1.25rem"} fontWeight={"700"} textAlign={"center"}>
        Do you want to cancel the booking ...?
      </Typography>
      <form onSubmit={handleSubmit}>
        <StyledButton
          type="submit"
          sx={{ width: "15rem", display: "flex", margin: "0 auto" }}
          variant="contained"
        >
          Yes
        </StyledButton>
      </form>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        sx={{ marginTop: "5rem", position: "absolute", top: "100px" }}
        open={deleteForLoginUserStatus !== "" && open}
        autoHideDuration={700}
        onClose={handleClosed}
      >
        {deleteForLoginUserStatus === "success" ? (
          <Box>
            <Alert onClose={handleClosed} severity="success" sx={{ width: "100%" }}>
              Booking Deleted Successfully.
            </Alert>
          </Box>
        ) : deleteForLoginUserStatus === "rejected" ? (
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

export default CancelBookingModal;
