import { Box } from "@mui/system";
import React from "react";
import Filter from "./FilterSection/Filter";
import RoomSection from "./RoomSection/RoomSection";
import "./mainresultsection.scss";

const MainResultSection = () => {
  return (
    // <Box>
      <Box sx={{padding:"0 3.375rem"}} className="lower-section">
        <Box sx={{padding:"0 1.5rem",display:"grid",gridTemplateColumns:"0.3fr 1fr",gap:"1.375rem",alignItems:"self-start"}}>
          <Filter />
          <RoomSection />
        </Box>
      {/* </Box> */}
    </Box>
  );
};

export default MainResultSection;
