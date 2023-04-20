import { Typography, Box, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { StyledButtonNoMargin, TypographyGrey } from "../styledComponents/styledComponents";
import { travelerInfoSchema } from "./checkOutSchema";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { setFormToShow, setTravellerInfo } from "../../redux/reducers/checkoutFormDataSlice";
import { useTranslation } from "react-i18next";

type Props = {};

const TravelerInfo = (props: Props) => {
  // const defaultValues = {
  //   travellerFirstName: "",
  //   travellerLastName: "",
  //   travellerEmail: "",
  //   travellerPhoneNumber: "",
  // };
  const { t } = useTranslation();
  const { travelerInfo, formToShow } = useAppSelector((state) => state.checkoutConfig);
  const { travellerFormInfo } = useAppSelector((state) => state.checkoutConfig);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(travelerInfoSchema),
    // defaultValues,
    criteriaMode: "all",
    reValidateMode: "onChange",
    mode: "onChange",
  });
  const reduxDispatch = useAppDispatch();
  useEffect(() => {
    reset(travellerFormInfo);
  }, [reset, travellerFormInfo]);
  const onSubmit = (data: any) => {
    reduxDispatch(setTravellerInfo(data));
    reduxDispatch(setFormToShow("billingInfo"));
  };

  return (
    <Box display={"grid"} sx={{ gap: "1rem" }} mb={"2rem"}>
      <Typography
        fontSize={"1.25rem"}
        fontWeight={700}
        sx={{ background: "#EFF0F1", borderRadius: "0.3rem", padding: "0.43rem 0.3rem" }}
      >
        1.{t("Traveller Info")}
      </Typography>
      <Box sx={{ display: formToShow === "travelerInfo" ? "initial" : "none" }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* ------------------------------------------- first row ----------------------------------------------------- */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "2.4rem",
            }}
          >
            {travelerInfo[0].map((item) => {
              return (
                item.show && (
                  <Box key={item.fieldName} display={"grid"}>
                    <TypographyGrey>{t(item.fieldName)}</TypographyGrey>
                    <TextField
                      {...register(`${item.inputName}`)}
                      error={!!errors[item.inputName]}
                      helperText={
                        errors[item.inputName] ? errors[item.inputName]?.message?.toString() : " "
                      }
                    />
                    {errors.type?.type === "matches" && (
                      <Typography style={{ color: "red" }}>Error</Typography>
                    )}
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
                    <TypographyGrey>{t(item.fieldName)}</TypographyGrey>
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
                    <TypographyGrey>{t(item.fieldName)}</TypographyGrey>
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
              {t("NEXT:BILLING INFO")}
            </StyledButtonNoMargin>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default TravelerInfo;
