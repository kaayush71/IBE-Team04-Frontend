import { Box, Typography, Rating, TextareaAutosize } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { addReview } from "../../redux/reducers/checkoutDataSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { StyledButton } from "../styledComponents/styledComponents";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

type Props = {};

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return (
    <MuiAlert elevation={6} ref={ref} variant="filled" {...props}>
      {props.children}
    </MuiAlert>
  );
});

// styles
const ratingContainer = {
  minHeight: "79.6vh",
  margin: "1rem 4.875rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  position: "relative",
};

const ratingBox = {
  padding: "2rem",
  display: "grid",
  gap: "1rem",
  justifyContent: "center",
  alignItems: "center",
  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
};

const RatingPage = (props: Props) => {
  const [value, setValue] = React.useState<number | null>(2);
  const { id } = useParams();
  const reduxDispatch = useAppDispatch();
  const [open, setOpen] = React.useState(false);
  const addReviewStatus = useAppSelector((state) => state.checkout.addReviewStatus);
  const handleClosed = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setOpen(true);
    reduxDispatch(
      addReview({
        ratingId: id,
        ratingValue: value,
      })
    );
  };

  return (
    <Box sx={ratingContainer}>
      <Box sx={ratingBox}>
        <Typography fontSize={"1.5rem"}>Please give your feedback for your stay.</Typography>
        <Rating
          sx={{ placeSelf: "center" }}
          value={value}
          precision={0.5}
          max={5}
          name="unique-rating"
          onChange={(event, newValue) => setValue(newValue)}
        />
        <TextareaAutosize
          style={{ padding: "1rem" }}
          minLength={3}
          maxRows={3}
          placeholder="Please provide feedback comments."
        />
        <StyledButton
          onClick={handleSubmit}
          sx={{ width: "15rem", placeSelf: "center" }}
          variant="contained"
        >
          SUBMIT
        </StyledButton>
      </Box>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        sx={{ position: "absolute", bottom: "10vh" }}
        open={addReviewStatus !== "" && open}
        autoHideDuration={1500}
        onClose={handleClosed}
      >
        {addReviewStatus === "success" ? (
          <Box>
            <Alert onClose={handleClosed} severity="success" sx={{ width: "100%" }}>
              Review Added Sucessfully...!s
            </Alert>
          </Box>
        ) : addReviewStatus === "rejected" ? (
          <Box>
            <Alert onClose={handleClosed} severity="error" sx={{ width: "100%" }}>
              Unable to add review,Please try again later..!
            </Alert>
          </Box>
        ) : (
          <></>
        )}
      </Snackbar>
    </Box>
  );
};

export default RatingPage;
