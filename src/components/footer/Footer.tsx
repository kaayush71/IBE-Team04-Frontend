import { Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import React from "react";
import "./Footer.scss";

export default function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: "#130739",
        color: "#fff",
        position: "fixed",
        bottom: "0",
        width: "100%",
      }}
    >
      <Container maxWidth="xl" sx={{ padding: "1rem 0" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <img
            src="https://team04-static-data.s3.ap-south-1.amazonaws.com/team04/footer-logo.png"
            alt="logo"
          />
          <Box sx={{ textAlign: "right" }}>
            <Typography>&copy; Kickdrum Technology Group LLC</Typography>
            <Typography>All Rights Reserved</Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
