import { Box } from "@mui/material";
import React from "react";
import { useAppSelector } from "../../../redux/store";
import "./banner.scss";

const Banner = () => {
  const bannerImage = useAppSelector((state) => state.config.bannerImage);
  return (
    <Box
      sx={{
        backgroundImage: `url(${bannerImage})`,
        backgroundSize: "cover",
        backgroundPosition:"100% 60%",
        backgroundRepeat: "no-repeat",
      }}
      className={"main-banner-section"}
    ></Box>
  );
};

export default Banner;
