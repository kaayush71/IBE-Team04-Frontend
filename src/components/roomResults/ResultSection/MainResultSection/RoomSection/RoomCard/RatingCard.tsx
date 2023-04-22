import { Avatar, Box, Paper, Rating, Typography } from "@mui/material";
import React from "react";
import { Ratings } from "../../../../../../constants/types";

type Props = {
  rating: Ratings;
};

const RatingCard = ({ rating }: Props) => {
  return (
    <Paper elevation={3} sx={{ padding: "0.5rem" }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <Avatar sx={{ bgcolor: "#26266D" }}>{rating.travellerName.substring(0, 1)}</Avatar>
        <Typography fontWeight={700}>{rating.travellerName}</Typography>
        <Rating value={rating.ratingValue} readOnly />
      </Box>
      <Typography sx={{ textTransform: "capitalize" }} mt={"0.5rem"}>
        {rating.reviewDescription}
      </Typography>
    </Paper>
  );
};

export default RatingCard;
