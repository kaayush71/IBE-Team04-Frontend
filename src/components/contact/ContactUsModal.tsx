/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, IconButton, Typography } from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import "./ContactUsModal.scss";

type Props = {
  handleClose: any;
};

const inconButtonStyle = {
  top: "0.2rem",
  left: "0.3rem",
  position: "absolute",
  color: "black",
};

const ContactUsModal = (props: Props) => {
  return (
    <Box>
      <IconButton sx={inconButtonStyle} onClick={props.handleClose}>
        <CloseIcon sx={{ fontWeight: "400" }} fontSize="small" />
      </IconButton>
      <Box sx={{ display: "grid", gridTemplateColumns: "0.7fr 1fr" }}>
        <Box sx={{ padding: "1rem" }}>
          <Typography fontSize={"2.5rem"} fontWeight={"700"}>
            Kickdrum Hotel
          </Typography>
          <Typography fontSize={"1.5rem"}>Property-4</Typography>
          <Typography fontSize={"1.5rem"} color={"#666874"} mt={"2rem"}>
            Kickdrum Technologies India Private Limited First Floor, #570/571, 1st Cross, 3rd Block,
            Koramangala, Bangalore 560034
          </Typography>
        </Box>
        <Box>
          <iframe
            title="map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.6999979084353!2d77.62020877516744!3d12.92699328738425!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1447adb132a7%3A0xc6fb1979684ea893!2sKickdrum!5e0!3m2!1sen!2sin!4v1682234264672!5m2!1sen!2sin&amp;output=embed&amp;iwloc=near"
            height="450"
            style={{ border: "0", width: "100%" }}
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </Box>
      </Box>
    </Box>
  );
};

export default ContactUsModal;
