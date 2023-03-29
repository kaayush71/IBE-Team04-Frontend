import { Box } from "@mui/system";
import React from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { steps } from "../../../constants/constStepText";
import "./stepper.scss";

const Steps = () => {
  return (
    <Box className={"main-stepper-section"}>
      <Stepper
        sx={{ "& .MuiSvgIcon-root": { color: "white" }}}
        activeStep={1}
        className={"starter-stepper-section"}
        alternativeLabel
      >
        {steps.map((label, index) => (
          <Step sx={{}} className={"step-size"} key={label}>
            <StepLabel
              sx={{ "& .MuiStepLabel-label": { color: "white",marginTop:"0.1rem !important" }}}
              className={"step-label"}
            >
              {label}
            </StepLabel>
            {index < steps.length - 1 && <div className="step-connector" />}
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default Steps;
