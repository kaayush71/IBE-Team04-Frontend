import { Box } from '@mui/system'
import React from 'react'
import MainResultSection from './MainResultSection/MainResultSection';
import SearchBar from './SearchSection/SearchBar';

const ResultSection=()=>{
  return (
    <Box>
        <SearchBar />
        <MainResultSection />
    </Box>
  )
}

export default ResultSection;
