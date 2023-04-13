/* eslint-disable array-callback-return */
import React from "react";
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
import { setFormToShow } from "../../redux/reducers/checkoutConfigDataSlice";

type Props = {};

const BillingInfo = (props: Props) => {
  const { billingInfo, formToShow } = useAppSelector((state) => state.checkoutConfig);
  const defaultValues = {
    firstName: "",
    lastName: "",
    mailingAddress1: "",
    mailingAddress2: "",
    country: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    email: "",
  };
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(billingInfoSchema),
    defaultValues,
  });

  const reduxDispatch = useAppDispatch();

  const country = watch("country");
  const state = watch("state");

  const onSubmit = (data: any) => {
    console.log("billing info", billingInfo);
    reduxDispatch(setFormToShow("paymentInfo"));
  };
  const handleClick = () => {
    reduxDispatch(setFormToShow("travelerInfo"));
  };

  return (
    <Box display={"grid"} sx={{ gap: "1rem" }} mb={"2rem"}>
      <Typography
        fontSize={"1.25rem"}
        fontWeight={700}
        sx={{ background: "#EFF0F1", borderRadius: "0.3rem", padding: "0.43rem 0.3rem" }}
      >
        2.Billing Info
      </Typography>
      {formToShow === "billingInfo" ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* ------------------------------------------- first row ----------------------------------------------------- */}
          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2.4rem" }}>
            <Box display={"grid"}>
              <TypographyGrey>First Name</TypographyGrey>
              <TextField
                {...register("firstName")}
                error={!!errors.firstName}
                helperText={errors.firstName ? errors.firstName?.message?.toString() : " "}
              />
            </Box>
            <Box display={"grid"}>
              <TypographyGrey>Last Name</TypographyGrey>
              <TextField
                {...register("lastName")}
                error={!!errors.lastName}
                helperText={errors.lastName ? errors.lastName?.message?.toString() : " "}
              />
            </Box>
          </Box>
          {/* ------------------------------------------- second row ----------------------------------------------------- */}
          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2.4rem" }}>
            <Box display={"grid"}>
              <TypographyGrey>Mailing Address1</TypographyGrey>
              <TextField
                {...register("mailingAddress1")}
                error={!!errors.mailingAddress1}
                helperText={
                  errors.mailingAddress1 ? errors.mailingAddress1?.message?.toString() : " "
                }
              />
            </Box>
            <Box display={"grid"}>
              <TypographyGrey>Mailing Address2</TypographyGrey>
              <TextField
                {...register("mailingAddress2")}
                error={!!errors.mailingAddress2}
                helperText={
                  errors.mailingAddress2 ? errors.mailingAddress2?.message?.toString() : " "
                }
              />
            </Box>
          </Box>
          {/* ------------------------------------------------------ third row ------------------------------------------------ */}
          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2.4rem" }}>
            <Box display={"grid"}>
              <TypographyGrey>Country</TypographyGrey>
              <FormControl fullWidth error={!!errors.country}>
                <Select
                  renderValue={() =>
                    country === "" ? <em style={{ color: "#858685" }}>Choose</em> : country
                  }
                  displayEmpty
                  {...register("country")}
                  defaultValue=""
                  value={country}
                  IconComponent={KeyboardArrowDownIcon}
                >
                  {json.map((data) => (
                    <MenuItem key={data.countryName} value={data.countryName}>
                      {data.countryName}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>
                  {errors.country ? errors.country.message?.toString() : " "}
                </FormHelperText>
              </FormControl>
            </Box>
          </Box>
          {/* ------------------------------------------------------ fourth row ------------------------------------------------ */}
          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2.4rem" }}>
            <Box display={"grid"}>
              <TypographyGrey>City</TypographyGrey>
              <TextField
                {...register("city")}
                error={!!errors.city}
                helperText={errors.city ? errors.city?.message?.toString() : " "}
              />
            </Box>
            {/* ---------------------------------------------------------- right side --------------------------------------------- */}
            <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <Box display={"grid"}>
                <TypographyGrey>State</TypographyGrey>
                <FormControl fullWidth error={!!errors.state}>
                  <Select
                    disabled={country === ""}
                    renderValue={() =>
                      country === "" ? (
                        <em style={{ color: "#858685" }}>Choose</em>
                      ) : state === "" ? (
                        <em style={{ color: "#858685" }}>Choose</em>
                      ) : (
                        state
                      )
                    }
                    displayEmpty
                    {...register("state")}
                    defaultValue=""
                    value={state}
                    IconComponent={KeyboardArrowDownIcon}
                  >
                    {json.map((data) => {
                      if (data.countryName === country) {
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
                    {errors.state ? errors.state.message?.toString() : " "}
                  </FormHelperText>
                </FormControl>
              </Box>
              {/* ---------------------------------------------------------- zip --------------------------------------------- */}
              <Box display={"grid"}>
                <TypographyGrey>Zip</TypographyGrey>
                <TextField
                  {...register("zip")}
                  error={!!errors.zip}
                  helperText={errors.zip ? errors.zip?.message?.toString() : " "}
                />
              </Box>
            </Box>
          </Box>
          {/* ------------------------------------------------------ fifth row ------------------------------------------------ */}
          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2.4rem" }}>
            <Box display={"grid"}>
              <TypographyGrey>Phone</TypographyGrey>
              <TextField
                {...register("phone")}
                error={!!errors.phone}
                helperText={errors.phone ? errors.phone?.message?.toString() : " "}
              />
            </Box>
          </Box>
          {/* ------------------------------------------------------ sixth row ------------------------------------------------ */}
          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2.4rem" }}>
            <Box display={"grid"}>
              <TypographyGrey>Email</TypographyGrey>
              <TextField
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email ? errors.email?.message?.toString() : " "}
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
                Edit Traveler Info.
              </Button>
              <StyledButtonNoMargin sx={{ maxWidth: "12rem" }} variant="contained" type="submit">
                NEXT:PAYMENT INFO
              </StyledButtonNoMargin>
            </Box>
          </Box>
        </form>
      ) : (
        <></>
      )}
    </Box>
  );
};

export default BillingInfo;
