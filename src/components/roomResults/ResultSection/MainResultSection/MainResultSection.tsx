import { Box } from "@mui/system";
import React from "react";
import Filter from "./FilterSection/Filter";
import RoomSection from "./RoomSection/RoomSection";
import "./mainresultsection.scss";

const MainResultSection = () => {
  return (
    <Box sx={{ width: "100%" , padding:"0 3.375rem" }}>
      <Box sx={{ padding: "0rem !important", margin: "0" }} className="lower-section">
        <Box
          sx={{
            padding: "0 1.5rem",
            display: "grid",
            gridTemplateColumns: { lg: "0.3fr 1fr", md: "1fr" },
            gap: "1.375rem",
            alignItems: "self-start",
          }}
        >
          <Filter />
          <RoomSection />
        </Box>
      </Box>
    </Box>
  );
};

export default MainResultSection;
