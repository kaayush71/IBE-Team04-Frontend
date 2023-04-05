import { Box, Button, Divider, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
type Props = {};

const ItineraryCard = (props: Props) => {
  const navigate = useNavigate();
  const hnadleRemove = () => {
    navigate("/room-search-results");
  };
  return (
    <Box sx={{ background: "#EFF0F1", padding: "1.43rem" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography fontWeight={"700"} fontSize={"1.5rem"}>
          Your Trip Itinerary
        </Typography>
        <Typography onClick={hnadleRemove} sx={{ cursor: "pointer" }} color={"#006EFF"}>
          Remove
        </Typography>
      </Box>
      <Box mt={"1rem"}>
        <Typography fontWeight={"700"} fontSize={"20px"}>
          {"Long Beautiful Resort Name"}
        </Typography>
        <Typography color={"#5D5D5D"} fontWeight={400}>
          May 9 - May 16, 2022 | 1 adult 1 child
        </Typography>
        <Typography color={"#5D5D5D"} fontWeight={400}>
          Executive Room
        </Typography>
        <Typography color={"#5D5D5D"} fontWeight={400}>
          $132 per night
        </Typography>
        <Typography color={"#5D5D5D"} fontWeight={400}>
          1 room
        </Typography>
        <Typography color={"#5D5D5D"} fontWeight={400}>
          Special Promoname, $132/night
          <InfoOutlinedIcon fontSize="small" />
        </Typography>
      </Box>
      <Divider sx={{ margin: "1rem 0", color: "#5D5D5D", borderWidth: "1px" }}></Divider>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography color={"#5D5D5D"}>Subtotal</Typography>
        <Typography fontSize={"1.25rem"}>$XXX.xx</Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography color={"#5D5D5D"} fontWeight={400}>
          Taxes, Surcharges, Fees
          <InfoOutlinedIcon fontSize="small" />
        </Typography>
        <Typography fontSize={"1.25rem"}>$XXX.xx</Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography color={"#5D5D5D"}>VAT</Typography>
        <Typography fontSize={"1.25rem"}>$XXX.xx</Typography>
      </Box>
      <Divider sx={{ margin: "0.5rem 0", color: "#5D5D5D", borderWidth: "1px" }}></Divider>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography color={"#5D5D5D"}>Due now</Typography>
        <Typography fontSize={"1.25rem"}>$XXX.xx</Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography color={"#5D5D5D"}>Due at resort</Typography>
        <Typography fontSize={"1.25rem"}>$XXX.xx</Typography>
      </Box>
      <Button
        onClick={() => navigate("/room-search-results")}
        type="submit"
        sx={{
          display: "flex",
          margin: "33px auto 0 auto",
          padding: "0.75rem 0.5rem",
          width: "60%",
          fontSize: "0.875rem",
          color: "#26266D",
          border: "3px solid #26266D ",
          "&:hover": { color: "#26266D", background: "none", border: "3px solid #26266D " },
        }}
        variant="outlined"
      >
        <Typography sx={{ fontWeight: "700", fontSize: "0.875rem" }}>
          {"CONTINUE SHOPPING"}
        </Typography>
      </Button>
    </Box>
  );
};

export default ItineraryCard;
