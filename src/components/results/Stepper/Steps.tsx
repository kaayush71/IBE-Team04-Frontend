import { Box } from '@mui/system';
import React from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import  { steps }  from '../../../constants/constStepText';
import "./stepper.scss";

const Steps = () => {
 
  return (
    <Box className = {"main-stepper-section"} >
       <Stepper sx = {{"& .MuiSvgIcon-root": {color : 'white'} ,  width: '60%' } }activeStep={1} alternativeLabel>
        {steps.map((label) => (
          <Step sx={{}} className= {"step-size"} key={label}>
            <StepLabel sx = {{"& .MuiStepLabel-label.MuiCompleted" : {color : 'white'}}} className= {"step-label"}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  )
}

export default Steps;
