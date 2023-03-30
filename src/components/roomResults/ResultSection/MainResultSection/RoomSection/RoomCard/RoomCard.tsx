import { Button, Card, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { roomCard } from "../../../../../../constants/types";
import "./roomCard.scss";
import StarRateIcon from "@mui/icons-material/StarRate";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonIcon from "@mui/icons-material/Person";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BedIcon from "@mui/icons-material/Bed";
import BookMark from "../BookMark/BookMark";

interface RoomCardProps {
  room: roomCard;
}

const RoomCard: React.FC<RoomCardProps> = ({ room }) => {
  const settings = {
    autoplay: true,
    autoplaySpeed: 1500,
    arrows: true,
    dots: true,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Box>
      <Card
        className="room-card"
        sx={{
          width: "18.3125rem",
          height: "39.0625rem",
          boxShadow:
            "rgba(0, 0, 0, 0.15) 0px 1px 1px 0px inset, rgba(0, 0, 0, 0.15) 0px 50px 100px -20px, rgba(0, 0, 0, 0.15) 0px 30px 60px -30px",
        }}
      >
        <Slider className="slick-slider" {...settings}>
          {room.roomImageArray.map((image, index) => (
            <img
              className="room-image"
              key={index}
              src={image}
              alt="roomImage"
            />
          ))}
        </Slider>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr",
            rowGap: "1rem",
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
              <Typography>{room.title}</Typography>
            </Box>
            {room.ratings.showRatings ? (
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "1fr",
                  placeSelf: "end",
                }}
                className={"review-section"}
              >
                <Box sx={{ placeSelf: "end" }} className={"average-ratings"}>
                  <Typography
                    sx={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}
                  >
                    <Box className="rating-star">{<StarRateIcon />}</Box>
                    <Box className="rating-number">
                      {room.ratings.averageRatings}
                    </Box>
                  </Typography>
                </Box>
                <Box className={"total-reviews"}>
                  {room.ratings.totalReviews} reviews
                </Box>
              </Box>
            ) : (
              <Box
                sx={{
                  width: "6.1875rem",
                  height: "1.4375rem",
                  placeSelf: "end",
                  paddingTop: "0.5rem",
                  backgroundColor: "#ccd0e8",
                  borderRadius: "5px",
                  paddingBottom: "0.35rem",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "0.875rem",
                    fontWeight: "400",
                    display: "grid",
                    placeItems: "center",
                  }}
                >
                  New Property
                </Typography>
              </Box>
            )}
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
              <LocationOnIcon />
            </Box>
            <Box sx={{ width: "7.0625rem" }} className="address-text">
              <Typography sx={{ fontSize: "0.875rem" }}>
                {room.address}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "grid",
              width: "45%",
              paddingLeft: "0.35rem",
              gap: "0.5rem",
              gridTemplateColumns: "1fr 1fr",
            }}
          >
            <Box className="breakfastOption">
              <Typography sx={{ fontSize: "0.875rem" }}>
                {room.breakfastOptions}
              </Typography>
            </Box>
            <Box sx={{ width: "4rem" }} className="areaSection">
              <Typography sx={{ fontSize: "0.875rem" }}>{room.area}</Typography>
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
              <PersonIcon />
            </Box>
            <Box className="capacity-number">
              <Typography>1-{room.personCapacity}</Typography>
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
              <BedIcon />
            </Box>
            <Box className="capacity-number">
              <Typography sx={{ width: "9rem" }}>{room.bedType}</Typography>
            </Box>
          </Box>
          {room.promotion.showPromotion ? (
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: "0.5rem",
              }}
            >
              <BookMark />
              <Typography>{room.promotion.promotionDescription}</Typography>
            </Box>
          ) : (
            <></>
          )}
          <Box className="price-section">
            <Typography sx={{ fontWeight: "bolder", fontSize: "1rem" }}>
              ${room.roomPrice}
            </Typography>
            <Typography>per night</Typography>
          </Box>
          <Box className="button-section" sx={{ placeSelf: "end" }}>
            {room.promotion.showPromotion === false ? <Box sx = {{paddingTop:"6.1rem"}}></Box> : <></>}

            <Button
              type="submit"
              sx={{
                backgroundColor: "#26266D",
                "&:hover": { backgroundColor: "#26266D" },
                display: "flex",
                padding: "0.75rem 1.25rem",
                height: "2.75rem",
                width: "8rem",
                fontSize: "0.875rem",
              }}
              variant="contained"
            >
              <Typography sx={{ fontWeight: "700", fontSize: "0.775rem" }}>
                SELECT ROOM
              </Typography>
            </Button>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default RoomCard;
