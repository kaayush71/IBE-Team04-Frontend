import { Box, IconButton, TextField, Typography } from "@mui/material";
import React, { useRef } from "react";
import { StyledButton } from "../../styledComponents/styledComponents";
import CloseIcon from "@mui/icons-material/Close";

type Props = {
  handleClose: any;
};

// styles
const inconButtonStyle = {
  top: "0.2rem",
  right: "0.3rem",
  position: "absolute",
  color: "black",
};

const CheckOutModal = (props: Props) => {
  const inputRef: any = useRef(null);
  const handleSubmit = () => {
    console.log("email", inputRef?.current?.value);
  };
  return (
    <Box>
      <IconButton sx={inconButtonStyle} onClick={props.handleClose}>
        <CloseIcon sx={{ fontWeight: "400" }} fontSize="medium" />
      </IconButton>
      <Typography fontSize={"1.25rem"} fontWeight={"700"} textAlign={"center"}>
        Enter Your Email
      </Typography>
      <form action="">
        <TextField
          placeholder="Please enter your email to get the review mail."
          required={true}
          type={"email"}
          inputRef={inputRef}
          sx={{ margin: "1rem auto", display: "flex" }}
        ></TextField>
        <StyledButton
          type="submit"
          onSubmit={handleSubmit}
          sx={{ width: "15rem", display: "flex", margin: "0 auto" }}
          variant="contained"
        >
          Submit
        </StyledButton>
      </form>
    </Box>
  );
};

export default CheckOutModal;
