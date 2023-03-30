import { Box } from "@mui/material";
import React from "react";
import { useAppSelector } from "../../../redux/store";
import "./banner.scss";

const Banner = () => {
  const bannerImage = useAppSelector((state) => state.landingForm.landingConfig.bannerImage);
  return (
    <Box
      sx={{
        backgroundImage: `url(${bannerImage})`,
        backgroundSize: "cover",
        backgroundPosition:"center",
        backgroundRepeat: "no-repeat",
      }}
      className={"main-banner-section"}
    ></Box>
  );
};

export default Banner;
