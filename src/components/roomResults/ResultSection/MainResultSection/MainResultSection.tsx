import { Box } from '@mui/system';
import React from 'react'
import Filter from './FilterSection/Filter';
import RoomSection from './RoomSection/RoomSection';
import "./mainresultsection.scss";

const  MainResultSection = () => {
  return (
    <Box className="lower-section">
        <Filter/>
        <RoomSection />
    </Box>
  )
}

export default MainResultSection;
