import { Box, Typography} from "@mui/material";
import React from "react";
import { roomCard } from "../../../../../constants/types";
import RoomCard from "./RoomCard/RoomCard";
import "./roomSection.scss";

const RoomSection = () => {
  const rooms: roomCard[] = [
    {
      title: "Luxury Suite",
      address: "1234 Example St, Los Angeles, CA",
      roomImageArray: [
        "https://shorturl.at/jqxLT",
        "https://shorturl.at/kxFIY",
        "https://shorturl.at/kDJOX",
      ],
      breakfastOptions: "Buffet",
      area: "50 ft",
      personCapacity: 2,
      ratings: {
        showRatings: true,
        averageRatings: 4.5,
        totalReviews: 100,
      },
      bedType: "King",
      promotion: {
        showPromotion: true,
        promotionDescription: "Get 20% off for 3 nights or more!",
        discountPercentage: 20,
      },
      roomPrice: 150,
    },
    {
      title: "Deluxe Room",
      address: "5678 Example St, New York, NY",
      roomImageArray: [
        "https://shorturl.at/jqxLT",
        "https://shorturl.at/kxFIY",
        "https://shorturl.at/kDJOX",
      ],
      breakfastOptions: "Continental",
      area: "30 ft",
      personCapacity: 2,
      ratings: {
        showRatings: true,
        averageRatings: 4.2,
        totalReviews: 80,
      },
      bedType: "Queen",
      promotion: {
        showPromotion: true,
        promotionDescription: "Get 20% off for 3 nights or more!",
        discountPercentage: 0,
      },
      roomPrice: 120,
    },
    {
      title: "Standard Room",
      address: "9012 Example St, Chicago, IL",
      roomImageArray: [
        "https://shorturl.at/jqxLT",
        "https://shorturl.at/kxFIY",
        "https://shorturl.at/kDJOX",
      ],
      breakfastOptions: "None",
      area: "25 ft",
      personCapacity: 1,
      ratings: {
        showRatings: false,
        averageRatings: 0,
        totalReviews: 0,
      },
      bedType: "Twin",
      promotion: {
        showPromotion: true,
        promotionDescription: "Get 20% off for 3 nights or more!",
        discountPercentage: 0,
      },
      roomPrice: 80,
    },
    {
      title: "Executive Suite",
      address: "3456 Example St, San Francisco, CA",
      roomImageArray: [
        "https://shorturl.at/jqxLT",
        "https://shorturl.at/kxFIY",
        "https://shorturl.at/kDJOX",
      ],
      breakfastOptions: "Full American",
      area: "70 ft",
      personCapacity: 4,
      ratings: {
        showRatings: true,
        averageRatings: 4.8,
        totalReviews: 120,
      },
      bedType: "Two King",
      promotion: {
        showPromotion: true,
        promotionDescription: "Get 15% off for 4 nights or more!",
        discountPercentage: 15,
      },
      roomPrice: 250,
    },
    {
      title: "Standard Room",
      address: "7890 Example St, Miami, FL",
      roomImageArray: [
        "https://shorturl.at/jqxLT",
        "https://shorturl.at/kxFIY",
        "https://shorturl.at/kDJOX",
      ],
      breakfastOptions: "Continental",
      area: "25 ft",
      personCapacity: 1,
      ratings: {
        showRatings: true,
        averageRatings: 4.0,
        totalReviews: 60,
      },
      bedType: "Twin",
      promotion: {
        showPromotion: true,
        promotionDescription: "Get 20% off for 3 nights or more!",
        discountPercentage: 0,
      },
      roomPrice: 75,
    },
    {
      title: "Junior Suite",
      address: "2345 Example St, Seattle, WA",
      roomImageArray: [
        "https://shorturl.at/jqxLT",
        "https://shorturl.at/kxFIY",
        "https://shorturl.at/kDJOX",
      ],
      breakfastOptions: "Buffet",
      area: "40 ft",
      personCapacity: 2,
      ratings: {
        showRatings: true,
        averageRatings: 4.3,
        totalReviews: 90,
      },
      bedType: "Queen",
      promotion: {
        showPromotion: true,
        promotionDescription: "Get 25% off for 5 nights or more!",
        discountPercentage: 25,
      },
      roomPrice: 180,
    },
  ];

  return (
    <Box sx={{ width: "100%" }} className={"room-section"}>
      <Box className={"room-title"} sx={{display:"flex",justifyContent:"space-between"}}>
        <Typography fontWeight={700} fontSize="1.25rem" sx={{ padding: "0.5rem 0" }}>
          Room Results
        </Typography>
        <Typography fontWeight={700} fontSize="1" sx={{ padding: "0.5rem 0" }}>
          Showing 1-4 of 5 Results
        </Typography>
      </Box>
      <Box
        sx={{
          width: "50%",
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "1.55rem !important",
        }}
        className={"room-card-list"}
      >
        {rooms.map((room, index) => (
          <RoomCard key={index} room={room} />
        ))}
      </Box>
    </Box>
  );
};

export default RoomSection;
