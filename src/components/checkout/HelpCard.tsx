import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

type Props = {};

// Help card which is displayed
// on checkout page.
const HelpCard = (props: Props) => {
  return (
    <Box sx={{ background: "#EFF0F1", padding: "1.43rem", minHeight: "9.375rem" }}>
      <Typography fontWeight={"700"} fontSize={"1.5rem"}>
        Need help?
      </Typography>
      <Box mt={"1rem"} sx={{ display: "grid", columnGap: "0.25rem" }}>
        <Typography fontWeight={"700"}>Call 1-800-555-5555</Typography>
        <Typography fontSize={"0.875rem"} color="#2F2F2F">
          Mon-Fr 8a-5p EST
        </Typography>
      </Box>
    </Box>
  );
};

export default HelpCard;
