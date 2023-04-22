import React, { useEffect } from "react";
import { Box, CircularProgress, IconButton, Modal, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useAppDispatch, useAppSelector } from "../../../../../../redux/store";
import { fetchAllRatings } from "../../../../../../redux/reducers/ratingsDataSlice";
import RatingCard from "./RatingCard";

type Props = {
  open: boolean;
  handleClose: () => void;
  roomTypeId: number;
};

const ratingsModalStyle = {
  position: "absolute" as const,
  top: "13.25rem",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70vw",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const RatingsModal = ({ open, handleClose, roomTypeId }: Props) => {
  const dispatch = useAppDispatch();
  const { ratings, getRatingsStatus } = useAppSelector((state) => state.ratings);

  useEffect(() => {
    if (open) {
      dispatch(fetchAllRatings({ roomTypeId }));
    }
  }, [open, roomTypeId, dispatch]);

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={ratingsModalStyle}>
        <IconButton
          sx={{
            top: "0.2rem",
            right: "0.3rem",
            position: "absolute",
            color: "black",
          }}
          onClick={handleClose}
        >
          <CloseIcon sx={{ fontWeight: "400" }} fontSize="medium" />
        </IconButton>
        <Typography mb={"1rem"} fontSize={"1.5rem"} fontWeight={"700"}>
          Ratings and Reviews by customers.
        </Typography>
        {getRatingsStatus === "loading" ? (
          <CircularProgress />
        ) : (
          <Box sx={{ display: "grid", gap: "1rem" }}>
            {ratings.map((rating) => (
              <RatingCard key={rating.ratingId} rating={rating} />
            ))}
          </Box>
        )}
      </Box>
    </Modal>
  );
};

export default RatingsModal;
