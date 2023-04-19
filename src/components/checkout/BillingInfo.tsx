/* eslint-disable array-callback-return */
import React, { useEffect } from "react";
import { Box } from "@mui/system";
import {
  Typography,
  TextField,
  Select,
  FormControl,
  FormHelperText,
  MenuItem,
  Button,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { billingInfoSchema } from "./checkOutSchema";
import { StyledButtonNoMargin } from "../styledComponents/styledComponents";
import { TypographyGrey } from "../styledComponents/styledComponents";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import json from "country-region-data/data.json";
import { setBillingInfo, setFormToShow } from "../../redux/reducers/checkoutFormDataSlice";
import { useTranslation } from "react-i18next";

type Props = {};

const BillingInfo = (props: Props) => {
  const { formToShow, billingFormInfo } = useAppSelector((state) => state.checkoutConfig);
  const defaultValues = {
    billingFirstName: "",
    billingLastName: "",
    billingMailingAddress1: "",
    billingMailingAddress2: "",
    billingCountry: "",
    billingCity: "",
    billingState: "",
    billingZip: "",
    billingPhoneNumber: "",
    billingEmail: "",
  };
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(billingInfoSchema),
    defaultValues,
    criteriaMode: "all",
    reValidateMode: "onChange",
    mode: "all",
  });

  useEffect(() => {
    reset(billingFormInfo);
  }, [billingFormInfo, reset]);

  const reduxDispatch = useAppDispatch();

  const billingCountry = watch("billingCountry");
  const billingState = watch("billingState");

  const onSubmit = (data: any) => {
    console.log("Clicked on Billing info submit button!");
    reduxDispatch(setBillingInfo(data));
    reduxDispatch(setFormToShow("paymentInfo"));
  };
  const handleClick = () => {
    reduxDispatch(setFormToShow("travelerInfo"));
  };

  const { t } = useTranslation();

  return (
    <Box display={"grid"} sx={{ gap: "1rem" }} mb={"2rem"}>
      <Typography
        fontSize={"1.25rem"}
        fontWeight={700}
        sx={{ background: "#EFF0F1", borderRadius: "0.3rem", padding: "0.43rem 0.3rem" }}
      >
        2.{t("Billing Info")}
      </Typography>
      <Box sx={{ display: formToShow === "billingInfo" ? "initial" : "none" }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* ------------------------------------------- first row ----------------------------------------------------- */}
          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2.4rem" }}>
            <Box display={"grid"}>
              <TypographyGrey>{t("First Name")}</TypographyGrey>
              <TextField
                {...register("billingFirstName")}
                error={!!errors.billingFirstName}
                helperText={
                  errors.billingFirstName ? errors.billingFirstName?.message?.toString() : " "
                }
              />
            </Box>
            <Box display={"grid"}>
              <TypographyGrey>{t("Last Name")}</TypographyGrey>
              <TextField
                {...register("billingLastName")}
                error={!!errors.billingLastName}
                helperText={
                  errors.billingLastName ? errors.billingLastName?.message?.toString() : " "
                }
              />
            </Box>
          </Box>
          {/* ------------------------------------------- second row ----------------------------------------------------- */}
          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2.4rem" }}>
            <Box display={"grid"}>
              <TypographyGrey>{t("Mailing Address1")}</TypographyGrey>
              <TextField
                {...register("billingMailingAddress1")}
                error={!!errors.billingMailingAddress1}
                helperText={
                  errors.billingMailingAddress1
                    ? errors.billingMailingAddress1?.message?.toString()
                    : " "
                }
              />
            </Box>
            <Box display={"grid"}>
              <TypographyGrey>{t("Mailing Address2")}</TypographyGrey>
              <TextField
                {...register("billingMailingAddress2")}
                error={!!errors.billingMailingAddress2}
                helperText={
                  errors.billingMailingAddress2
                    ? errors.billingMailingAddress2?.message?.toString()
                    : " "
                }
              />
            </Box>
          </Box>
          {/* ------------------------------------------------------ third row ------------------------------------------------ */}
          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2.4rem" }}>
            <Box display={"grid"}>
              <TypographyGrey>{t("Country")}</TypographyGrey>
              <FormControl fullWidth error={!!errors.billingCountry}>
                <Select
                  renderValue={() =>
                    billingCountry === "" ? (
                      <em style={{ color: "#858685" }}>Choose</em>
                    ) : (
                      billingCountry
                    )
                  }
                  displayEmpty
                  {...register("billingCountry")}
                  defaultValue=""
                  value={billingCountry}
                  IconComponent={KeyboardArrowDownIcon}
                >
                  {json.map((data) => (
                    <MenuItem key={data.countryName} value={data.countryName}>
                      {data.countryName}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>
                  {errors.billingCountry ? errors.billingCountry.message?.toString() : " "}
                </FormHelperText>
              </FormControl>
            </Box>
          </Box>
          {/* ------------------------------------------------------ fourth row ------------------------------------------------ */}
          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2.4rem" }}>
            <Box display={"grid"}>
              <TypographyGrey>{t("City")}</TypographyGrey>
              <TextField
                {...register("billingCity")}
                error={!!errors.billingCity}
                helperText={errors.billingCity ? errors.billingCity?.message?.toString() : " "}
              />
            </Box>
            {/* ---------------------------------------------------------- right side --------------------------------------------- */}
            <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <Box display={"grid"}>
                <TypographyGrey>{t("State")}</TypographyGrey>
                <FormControl fullWidth error={!!errors.billingState}>
                  <Select
                    disabled={billingCountry === ""}
                    renderValue={() =>
                      billingCountry === "" ? (
                        <em style={{ color: "#858685" }}>{t("Choose")}</em>
                      ) : billingState === "" ? (
                        <em style={{ color: "#858685" }}>{t("Choose")}</em>
                      ) : (
                        billingState
                      )
                    }
                    displayEmpty
                    {...register("billingState")}
                    defaultValue=""
                    value={billingState}
                    IconComponent={KeyboardArrowDownIcon}
                  >
                    {json.map((data) => {
                      if (data.countryName === billingCountry) {
                        return data.regions.map((region) => {
                          return (
                            <MenuItem key={region.name} value={region.name}>
                              {region.name}
                            </MenuItem>
                          );
                        });
                      }
                    })}
                  </Select>
                  <FormHelperText>
                    {errors.billingState ? errors.billingState.message?.toString() : " "}
                  </FormHelperText>
                </FormControl>
              </Box>
              {/* ---------------------------------------------------------- zip --------------------------------------------- */}
              <Box display={"grid"}>
                <TypographyGrey>{t("Zip")}</TypographyGrey>
                <TextField
                  {...register("billingZip")}
                  error={!!errors.billingZip}
                  helperText={errors.billingZip ? errors.billingZip?.message?.toString() : " "}
                />
              </Box>
            </Box>
          </Box>
          {/* ------------------------------------------------------ fifth row ------------------------------------------------ */}
          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2.4rem" }}>
            <Box display={"grid"}>
              <TypographyGrey>{t("Phone")}</TypographyGrey>
              <TextField
                {...register("billingPhoneNumber")}
                error={!!errors.billingPhoneNumber}
                helperText={
                  errors.billingPhoneNumber ? errors.billingPhoneNumber?.message?.toString() : " "
                }
              />
            </Box>
          </Box>
          {/* ------------------------------------------------------ sixth row ------------------------------------------------ */}
          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2.4rem" }}>
            <Box display={"grid"}>
              <TypographyGrey>{t("Email")}</TypographyGrey>
              <TextField
                {...register("billingEmail")}
                error={!!errors.billingEmail}
                helperText={errors.billingEmail ? errors.billingEmail?.message?.toString() : " "}
              />
            </Box>
          </Box>
          {/* ------------------------------------------------------ Submit Button --------------------------------------------- */}
          <Box sx={{ display: "grid", margin: "0.5rem 0" }}>
            <Box sx={{ placeSelf: "end", display: "flex", gap: "2rem", alignItems: "center" }}>
              <Button
                onClick={handleClick}
                sx={{ cursor: "pointer", color: "#26266d", width: "9rem", fontSize: "0.875rem" }}
              >
                {t("Edit Traveler Info.")}
              </Button>
              <StyledButtonNoMargin sx={{ maxWidth: "12rem" }} variant="contained" type="submit">
                {t("NEXT:PAYMENT INFO")}
              </StyledButtonNoMargin>
            </Box>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default BillingInfo;
