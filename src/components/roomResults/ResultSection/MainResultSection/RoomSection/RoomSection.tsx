import { Box, FormControl, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import React from "react";
import { roomCard } from "../../../../../constants/types";
import { setSortToSend } from "../../../../../redux/reducers/roomResultConfigDataSlice";
import { useAppDispatch, useAppSelector } from "../../../../../redux/store";
import RoomCard from "./RoomCard/RoomCard";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import "./roomSection.scss";

const RoomSection = () => {
  const sorts = useAppSelector((state) => state.resultsConfiguration.sorts);
  const roomResults = useAppSelector((state) => state.resultsConfiguration);
  const reduxDispatch = useAppDispatch();
  const handleChange = (event: SelectChangeEvent) => {
    console.log("sort value", event.target.value);
    reduxDispatch(setSortToSend(event.target.value));
  };
  const rooms: roomCard[] = [
    {
      title: "Luxury Suite",
      address: "Near city center",
      roomImageArray: [
        "https://d2rvepoyu8e9fg.cloudfront.net/team04/HotelImage-1.avif",
        "https://d2rvepoyu8e9fg.cloudfront.net/team04/HotelImage-2.jpeg",
        "https://d2rvepoyu8e9fg.cloudfront.net/team04/HotelImage-3.jpeg",
      ],
      breakfastOptions: "Inclusive",
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
      address: "Near city center",
      roomImageArray: [
        "https://d2rvepoyu8e9fg.cloudfront.net/team04/HotelImage-1.avif",
        "https://d2rvepoyu8e9fg.cloudfront.net/team04/HotelImage-2.jpeg",
        "https://d2rvepoyu8e9fg.cloudfront.net/team04/HotelImage-3.jpeg",
      ],
      breakfastOptions: "Inclusive",
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
      address: "Near city center",
      roomImageArray: [
        "https://d2rvepoyu8e9fg.cloudfront.net/team04/HotelImage-1.avif",
        "https://d2rvepoyu8e9fg.cloudfront.net/team04/HotelImage-2.jpeg",
        "https://d2rvepoyu8e9fg.cloudfront.net/team04/HotelImage-3.jpeg",
      ],
      breakfastOptions: "Inclusive",
      area: "25 ft",
      personCapacity: 1,
      ratings: {
        showRatings: true,
        averageRatings: 3.9,
        totalReviews: 40,
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
      address: "Near city center",
      roomImageArray: [
        "https://d2rvepoyu8e9fg.cloudfront.net/team04/HotelImage-1.avif",
        "https://d2rvepoyu8e9fg.cloudfront.net/team04/HotelImage-2.jpeg",
        "https://d2rvepoyu8e9fg.cloudfront.net/team04/HotelImage-3.jpeg",
      ],
      breakfastOptions: "Inclusive",
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
      address: "Near city center",
      roomImageArray: [
        "https://d2rvepoyu8e9fg.cloudfront.net/team04/HotelImage-1.avif",
        "https://d2rvepoyu8e9fg.cloudfront.net/team04/HotelImage-2.jpeg",
        "https://d2rvepoyu8e9fg.cloudfront.net/team04/HotelImage-3.jpeg",
      ],
      breakfastOptions: "Inclusive",
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
      address: "Near city center",
      roomImageArray: [
        "https://d2rvepoyu8e9fg.cloudfront.net/team04/HotelImage-1.avif",
        "https://d2rvepoyu8e9fg.cloudfront.net/team04/HotelImage-2.jpeg",
        "https://d2rvepoyu8e9fg.cloudfront.net/team04/HotelImage-3.jpeg",
      ],
      breakfastOptions: "Inclusive",
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
      <Box
        className={"room-title"}
        sx={{ display: "flex", justifyContent: "space-between", marginBottom: "0.7rem" }}
      >
        <Typography fontWeight={700} fontSize="1.25rem" sx={{ padding: "0.5rem 0" }}>
          Room Results
        </Typography>
        <Box sx={{ display: "flex", gap: "2rem", alignItems: "center" }}>
          <Typography fontWeight={700} fontSize="1" sx={{ padding: "0.5rem 0" }}>
            Showing 1-4 of 5 Results
          </Typography>
          <FormControl
            sx={{ width: roomResults.sortToSend === "" ? "5rem" : "9rem" }}
            variant="outlined"
          >
            <Select
              className="sorting"
              name="sort"
              displayEmpty={true}
              defaultValue=""
              IconComponent={KeyboardArrowDownIcon}
              renderValue={
                roomResults.sortToSend === ""
                  ? () => <Typography fontWeight={700}>Sort</Typography>
                  : () => (
                      <Typography
                        fontWeight={700}
                      >{`${roomResults.selectedSortName}->${roomResults.selectedSortValue}`}</Typography>
                    )
              }
              onChange={handleChange}
              style={{ width: "100%", height: "30px" }}
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "0 none",
                },
              }}
            >
              {sorts.map((sort) => {
                return (
                  sort.show &&
                  sort.options.map((option) => {
                    return (
                      <MenuItem
                        key={`${sort.sortName}+${option}`}
                        value={`${sort.sortName}#${option}`}
                      >{`${sort.sortName} -> ${option}`}</MenuItem>
                    );
                  })
                );
              })}
            </Select>
          </FormControl>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "2rem",
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
