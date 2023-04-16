import React from "react";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

type Props = {};

const NotFoundPage = (props: Props) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };
  return (
    <Box
      sx={{
        minHeight: "82.9vh",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Box sx={{ height: "60vh", width: "90vw", display: "flex", margin: "0 auto" }}>
        <img
          style={{ height: "100%", width: "100%" }}
          src="https://colorlib.com/wp/wp-content/uploads/sites/2/404-error-template-3.png"
          alt=""
        ></img>
      </Box>
      <Button onClick={handleClick} sx={{ width: "15rem", dislay: "flex", margin: "0 auto" }}>
        Go to home page
      </Button>
    </Box>
  );
};

export default NotFoundPage;
