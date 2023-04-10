import { Box } from "@mui/system";
import React from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { steps } from "../../../constants/constStepText";
import "./stepper.scss";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

const Steps = () => {
  const {t} = useTranslation();

  let currentLocation = useLocation();
  let stepNumber =1;
  if(currentLocation.pathname === "/checkout"){
    stepNumber = 2;
  }

  return (
    <Box className={"main-stepper-section"}>
      <Stepper
        sx={{ "& .MuiSvgIcon-root": { color: "white" },height:"30px",width:"30px"}}
        activeStep={stepNumber}
        className={"starter-stepper-section"}
        alternativeLabel
      >
        {steps.map((label, index) => (
          <Step sx={{}} className={"step-size"} key={label}>
            <StepLabel
              sx={{ "& .MuiStepLabel-label": { color: "white",marginTop:"0.1rem !important" }}}
              className={"step-label"}
            >
              {t(label)}
            </StepLabel>
            {index < steps.length - 1 && <div className="step-connector" />}
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default Steps;
