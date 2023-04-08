import { Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import "./roomCard.scss";
import StarRateIcon from "@mui/icons-material/StarRate";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonIcon from "@mui/icons-material/Person";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BedIcon from "@mui/icons-material/Bed";
import { RoomType } from "../../../../../../redux/reducers/roomResultConfigDataSlice";
import { useAppDispatch, useAppSelector } from "../../../../../../redux/store";
import { useTranslation } from "react-i18next";
import RoomCardModal from "../../../../RoomCardModal/RoomCardModal";
import { sliderSettings } from "../../../../../../constants/sliderSettings";
import { StyledButton } from "../../../../../styledComponents/styledComponents";
import {
  fetchPromotions,
} from "../../../../../../redux/reducers/promotionsDataSlice";
import { format } from "date-fns";
import BookMark from "../BookMark/BookMark";

interface RoomCardProps {
  room: RoomType;
}

// styles
const modalContainerStyle = {
  margin: "5rem auto 0 auto",
  overflowY: "scroll",
  maxWidth: "90vw",
  bgcolor: "background.paper",
  boxShadow: 24,
};

const RoomCardNew: React.FC<RoomCardProps> = ({ room }) => {
  const [open, setOpen] = React.useState(false);
  const reduxDispatch = useAppDispatch();
  const startDate = useAppSelector((state) => state.landingForm.startDate);
  const endDate = useAppSelector((state) => state.landingForm.endDate);
  const handleOpen = () => {
    reduxDispatch(
      fetchPromotions({
        startDate: format(new Date(startDate), "yyyy-MM-dd"),
        endDate: format(new Date(endDate), "yyyy-MM-dd"),
      })
    );
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const roomTypeImages = useAppSelector((state) => state.resultsConfiguration.roomType);
  const selectedCurrency = useAppSelector((state) => state.currency.selectedCurrency);
  const { t } = useTranslation();
  return (
    <Box
      className="room-card"
      sx={{
        width: { lg: "18vw", md: "23vw", sm: "50.8vw", xs: "64vw" },
        borderRadius: "5px",
        boxShadow: "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
      }}
    >
      <Box sx={{ borderRadius: "5px" }}>
        <Slider className="slick-slider" {...sliderSettings}>
          {roomTypeImages[`${room.roomTypeName}`].images.map((image, index) => (
            <img className="room-image" key={index} src={image} alt="roomImage" />
          ))}
        </Slider>
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr",
          rowGap: "0.7rem",
          padding: "0.8rem",
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            paddingLeft: "0.35rem",
          }}
          className={"title-review-section"}
        >
          <Box className={"title"}>
            <Typography fontWeight={700}>{t(room.roomTypeName.replaceAll("_", " "))}</Typography>
          </Box>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr",
              placeSelf: "end",
            }}
            className={"review-section"}
          >
            <Box sx={{ placeSelf: "end" }} className={"average-ratings"}>
              <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
                <Box className="rating-star">
                  {<StarRateIcon sx={{ color: "#26266D" }} fontSize="small" />}
                </Box>
                <Box className="rating-number">
                  {room.ratingAndReviews.averageRatingValue.toFixed(1)}
                </Box>
              </Box>
            </Box>
            <Box className={"total-reviews"}>
              <Typography fontSize={"0.875rem"} color={"#5D5D5D"} fontWeight={400}>
                {room.ratingAndReviews.numberOfRatings} {t("reviews")}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: "grid",
            width: "10%",
            gridTemplateColumns: "1fr 1fr",
          }}
          className={"address-section"}
        >
          <Box className="address-icon">
            <LocationOnIcon sx={{ color: "#5D5D5D" }} />
          </Box>
          <Box sx={{ width: "7.0625rem" }} className="address-text">
            <Typography fontSize={"0.875rem"} color={"#5D5D5D"} fontWeight={400}>
              {room.propertyAddress}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "grid",
            paddingLeft: "0.35rem",
            gap: "0.5rem",
            gridTemplateColumns: "0.4fr 1fr",
          }}
        >
          <Box className="breakfastOption">
            <Typography fontSize={"0.875rem"} color={"#5D5D5D"} fontWeight={400}>
              {t("Inclusive")}
            </Typography>
          </Box>
          <Box sx={{ width: "2rem" }} className="areaSection">
            <Typography fontSize={"0.875rem"} color={"#5D5D5D"} fontWeight={400}>
              {`${room.areaInSquareFeet}ft`}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "grid",
            width: "20%",
            gridTemplateColumns: "1fr 1fr",
          }}
          className={"capacity-section"}
        >
          <Box className="icon">
            <PersonIcon sx={{ color: "#5d5d5d" }} />
          </Box>
          <Box className="capacity-number">
            <Typography fontSize={"0.875rem"} color={"#5D5D5D"} fontWeight={400}>
              1-{room.maxCapacity}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "grid",
            width: "20%",
            gridTemplateColumns: "1fr 1fr",
            gap: "0.5rem",
          }}
          className="bed-type-section"
        >
          <Box className="icon">
            <BedIcon sx={{ color: "#5d5d5d" }} />
          </Box>
          <Box className="capacity-number">
            <Typography
              fontSize={"0.875rem"}
              color={"#5D5D5D"}
              fontWeight={400}
              sx={{ width: "10rem" }}
            >
              {room.bedType}
            </Typography>
          </Box>
        </Box>
        <Box className="price-section">
          <Typography sx={{ fontWeight: "bolder", fontSize: "1rem" }}>{`${
            selectedCurrency.symbol
          } ${(selectedCurrency.rate * room.roomRate).toFixed(1)} `}</Typography>
          <Typography fontSize={"0.875rem"} color={"#5D5D5D"} fontWeight={400}>
            {t("per night")}
          </Typography>
        </Box>
        <Box>
          <BookMark />
          <Typography fontSize={"0.875rem"} color={"#5D5D5D"} fontWeight={400}>
            {room.bestPromotion.promotionDescription}
          </Typography>
        </Box>
        <Box className="button-section" sx={{ placeSelf: "end" }}>
          <StyledButton type="submit" onClick={handleOpen} variant="contained">
            <Typography sx={{ fontWeight: "700", fontSize: "0.775rem" }}>
              {t("SELECT ROOM")}
            </Typography>
          </StyledButton>
        </Box>
      </Box>
      {/* --------------------------------------------------------------- Modal Section ----------------------------------------------- */}
      <Box>
        <Modal sx={{ overflowY: "scroll" }} open={open} onClose={handleClose}>
          <Box sx={modalContainerStyle}>
            <RoomCardModal handleClose={handleClose} room={room}></RoomCardModal>
          </Box>
        </Modal>
      </Box>
    </Box>
  );
};

export default RoomCardNew;
