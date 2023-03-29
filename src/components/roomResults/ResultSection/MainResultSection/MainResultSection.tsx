import { Box } from '@mui/system';
import React from 'react'
import Filter from './FilterSection/Filter';
import Itinerary from './ItinerarySection/Itinerary';
import RoomSection from './RoomSection/RoomSection';

const  MainResultSection = () => {
  return (
    <Box className="main-result-section">
        <Filter/>
        <Itinerary />
        <RoomSection />
    </Box>
  )
}

export default MainResultSection;
