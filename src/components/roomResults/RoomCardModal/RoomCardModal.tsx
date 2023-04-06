import { Box, IconButton, TextField, Typography } from "@mui/material";
import React from "react";
import Slider from "react-slick";
import { RoomType } from "../../../redux/reducers/roomResultConfigDataSlice";
import { useAppSelector } from "../../../redux/store";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import BedIcon from "@mui/icons-material/Bed";

import "./RoomCardModal.scss";
import PromotionCard from "./PromotionCard/PromotionCard";
import { sliderSettings } from "../../../constants/sliderSettings";
import { roomTypeName } from "../../../constants/styledConstants";
import { StyledButtonNoMargin } from "../../styledComponents/styledComponents";
type Props = {
  room: RoomType;
  handleClose: any;
};

const RoomCardModal = ({ room, handleClose }: Props) => {
  const roomType = useAppSelector((state) => state.resultsConfiguration.roomType);
  return (
    <Box>
      <Box sx={{ position: "relative" }}>
        <Slider className="slick-slider modal" {...sliderSettings}>
          {roomType[`${room.roomTypeName}`].images.map((image, index) => (
            <Box
              key={index}
              sx={{
                height: "23.81rem",
                width: "100%",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                display: "flex",
                placeSelf: "baseline",
                backgroundPosition: "100% 60%",
                background: `linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0)),url(${image}) center`,
              }}
            ></Box>
          ))}
        </Slider>
        <Typography sx={roomTypeName} color={"#ffffff"} fontSize={"2rem"}>
          {room.roomTypeName.replaceAll("_", " ").toLowerCase()}
        </Typography>
        <IconButton
          sx={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            color: "white",
          }}
          onClick={handleClose}
        >
          <CloseIcon sx={{ fontWeight: "400" }} fontSize="medium" />
        </IconButton>
      </Box>
      <Box sx={{ padding: "2.31rem 5%" }}>
        <Box
          sx={{
            display: { md: "grid", xs: "flex" },
            gridTemplateColumns: { lg: "60% 1fr", md: "65% 1fr" },
            gap: "5rem",
            flexDirection: "column-reverse",
          }}
        >
          <Box>
            <Box sx={{ display: "flex", gap: "2.18rem" }}>
              <Box sx={{ display: "flex", gap: "0.3rem" }}>
                <PersonOutlineIcon sx={{ color: "#5d5d5d" }} />
                <Typography fontSize={"0.875rem"} color={"#5D5D5D"} fontWeight={400}>
                  1-{room.maxCapacity}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", gap: "0.4rem" }}>
                <BedIcon sx={{ color: "#5d5d5d" }} />
                <Typography fontSize={"0.875rem"} color={"#5D5D5D"} fontWeight={400}>
                  {room.bedType}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", gap: "0.3rem" }}>
                <Typography fontSize={"0.875rem"} color={"#5D5D5D"} fontWeight={400}>
                  {`${room.areaInSquareFeet}ft`}
                </Typography>
              </Box>
            </Box>
            <Typography mt={"1.375rem"}>{roomType[`${room.roomTypeName}`].description}</Typography>

            {/* ------------------------------------------------------- Promotions ---------------------------------------------------- */}
            <Box mt={"1.625rem"} className="standard-rate">
              <Typography fontSize={"1.25rem"} fontWeight={"700"}>
                Standard Rate
              </Typography>
              {/* --------------------------------------- Promotion Card ----------------------------------------------------------- */}
              <PromotionCard room={room} />
            </Box>
            {/* ---------------------------------------------------------------- Deals And Packages ------------------------------------- */}
            <Box mt={"2.5rem"} className="deals-packages">
              <Typography fontSize={"1.25rem"} fontWeight={"700"}>
                Deals & Packages
              </Typography>
              <PromotionCard room={room} />
              <PromotionCard room={room} />
            </Box>
            {/* --------------------------------------------------------------- Promo Code ------------------------------------------------ */}
            <Box mt={"2.5rem"}>
              <Typography>Enter a promo code</Typography>
              <Box
                mt={"5px"}
                sx={{
                  display: "grid",
                  gridTemplateColumns: "0.7fr 0.3fr",
                  gap: "0.813rem",
                  maxWidth: "20rem",
                }}
              >
                <TextField id="outlined-basic" variant="outlined" />
                <StyledButtonNoMargin type="submit" variant="contained">
                  <Typography sx={{ fontWeight: "700", fontSize: "0.875rem" }}>
                    {"APPLY"}
                  </Typography>
                </StyledButtonNoMargin>
              </Box>
            </Box>
            {/* ------------------------------------------------------------------------------------------------------------------------- */}
          </Box>
          {/* -------------------------------------------------------------- Ammenities ----------------------------------------------- */}
          <Box>
            <Typography>Ammenities</Typography>
            <Box
              sx={{
                marginTop: "1rem",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "0.3rem",
              }}
            >
              {roomType[`${room.roomTypeName}`].ammenities.map((ammenity, index) => {
                return (
                  <Box key={index} sx={{ display: "flex", gap: "0.5rem" }}>
                    <CheckCircleOutlineIcon />
                    <Typography>{ammenity}</Typography>
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default RoomCardModal;
