import { Box, IconButton, TextField, Typography } from "@mui/material";
import React, { useRef } from "react";
import { StyledButton } from "../../styledComponents/styledComponents";
import CloseIcon from "@mui/icons-material/Close";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { sendReviewMail } from "../../../redux/reducers/checkoutDataSlice";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

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

const CheckOutModal = (props: Props) => {
  const roomTypeId = useAppSelector((state) => state.checkout.room.roomTypeId);
  const sendReviewMailStatus = useAppSelector((state) => state.checkout.sendReviewMailStatus);
  const [open, setOpen] = React.useState(false);

  const handleClosed = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const reduxDispatch = useAppDispatch();
  const inputRef: any = useRef(null);
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setOpen(true);
    const emailId = inputRef?.current?.value;
    reduxDispatch(
      sendReviewMail({
        roomTypeId,
        emailId,
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
        Enter Your Email
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          placeholder="Please enter your email to get the review mail."
          required={true}
          type={"email"}
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
        open={sendReviewMailStatus !== "" && open}
        autoHideDuration={1500}
        onClose={handleClosed}
      >
        {sendReviewMailStatus === "success" ? (
          <Box>
            <Alert onClose={handleClosed} severity="success" sx={{ width: "100%" }}>
              Email send successfully..!
            </Alert>
          </Box>
        ) : sendReviewMailStatus === "rejected" ? (
          <Box>
            <Alert onClose={handleClosed} severity="error" sx={{ width: "100%" }}>
              Unable to send email,please try again..!
            </Alert>
          </Box>
        ) : (
          <></>
        )}
      </Snackbar>
    </Box>
  );
};

export default CheckOutModal;
