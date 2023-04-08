import { Box, Typography, Rating } from "@mui/material";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { StyledButton } from "../styledComponents/styledComponents";

type Props = {};

// styles
const ratingContainer = {
  minHeight: "79.6vh",
  margin: "1rem 4.875rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
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
  useEffect(() => {
    console.log(id);
  }, [id]);

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
        <StyledButton sx={{ width: "15rem", placeSelf: "center" }} variant="contained">
          SUBMIT
        </StyledButton>
      </Box>
    </Box>
  );
};

export default RatingPage;
