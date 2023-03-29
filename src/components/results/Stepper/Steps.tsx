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
        sx={{ "& .MuiSvgIcon-root": { color: "white" }, width: "31.5%"}}
        activeStep={1}
        alternativeLabel
      >
        {steps.map((label, index) => (
          <Step sx={{}} className={"step-size"} key={label}>
            <StepLabel
              sx={{ "& .MuiStepLabel-label.MuiCompleted": { color: "white" } }}
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
