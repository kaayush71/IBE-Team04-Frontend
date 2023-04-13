import { Typography, Box, TextField } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { StyledButtonNoMargin, TypographyGrey } from "../styledComponents/styledComponents";
import { travelerInfoSchema } from "./checkOutSchema";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { setFormToShow } from "../../redux/reducers/checkoutConfigDataSlice";

type Props = {};

const TravelerInfo = (props: Props) => {
  const { travelerInfo, formToShow } = useAppSelector((state) => state.checkoutConfig);
  const {
    register,
    handleSubmit,
    formState: { errors },
    // reset,
  } = useForm({
    resolver: yupResolver(travelerInfoSchema),
  });
  const reduxDispatch = useAppDispatch();
  const onSubmit = (data: any) => {
    console.log(data);
    reduxDispatch(setFormToShow("billingInfo"));
    // reset();
  };

  return (
    <Box display={"grid"} sx={{ gap: "1rem" }} mb={"2rem"}>
      <Typography
        fontSize={"1.25rem"}
        fontWeight={700}
        sx={{ background: "#EFF0F1", borderRadius: "0.3rem", padding: "0.43rem 0.3rem" }}
      >
        1.Traveler Info
      </Typography>
      {formToShow === "travelerInfo" ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* ------------------------------------------- first row ----------------------------------------------------- */}
          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2.4rem" }}>
            {travelerInfo[0].map((item) => {
              return (
                item.show && (
                  <Box key={item.fieldName} display={"grid"}>
                    <TypographyGrey>{item.fieldName}</TypographyGrey>
                    <TextField
                      {...register(`${item.inputName}`)}
                      error={!!errors[item.inputName]}
                      helperText={
                        errors[item.inputName] ? errors[item.inputName]?.message?.toString() : " "
                      }
                    />
                  </Box>
                )
              );
            })}
          </Box>
          {/* -------------------------------------------- second row ------------------------------------------------------*/}

          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2.4rem" }}>
            {travelerInfo[1].map((item) => {
              return (
                item.show && (
                  <Box key={item.fieldName} display={"grid"}>
                    <TypographyGrey>{item.fieldName}</TypographyGrey>
                    <TextField
                      {...register(`${item.inputName}`)}
                      error={!!errors[item.inputName]}
                      helperText={
                        errors[item.inputName] ? errors[item.inputName]?.message?.toString() : " "
                      }
                    />
                  </Box>
                )
              );
            })}
          </Box>
          {/* ---------------------------------------------------------------------------------------------------------------*/}

          {/* -------------------------------------------- third row ------------------------------------------------------*/}
          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2.4rem" }}>
            {travelerInfo[2].map((item) => {
              return (
                item.show && (
                  <Box key={item.fieldName} display={"grid"}>
                    <TypographyGrey>{item.fieldName}</TypographyGrey>
                    <TextField
                      {...register(`${item.inputName}`)}
                      error={!!errors[item.inputName]}
                      helperText={
                        errors[item.inputName] ? errors[item.inputName]?.message?.toString() : " "
                      }
                    />
                  </Box>
                )
              );
            })}
          </Box>
          {/* ---------------------------------------------------------------------------------------------------------------*/}

          <Box sx={{ display: "grid", margin: "0.5rem 0" }}>
            <StyledButtonNoMargin
              sx={{ maxWidth: "12rem", placeSelf: "end" }}
              variant="contained"
              type="submit"
            >
              NEXT:BILLING INFO
            </StyledButtonNoMargin>
          </Box>
        </form>
      ) : (
        <></>
      )}
    </Box>
  );
};

export default TravelerInfo;
