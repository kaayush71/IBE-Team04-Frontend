import React from "react";
import { Box } from "@mui/system";
import { Typography, TextField, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Checkbox } from "@mui/material";
import { paymentInfoSchema } from "./checkOutSchema";
import { StyledButtonNoMargin } from "../styledComponents/styledComponents";
import { TypographyGrey } from "../styledComponents/styledComponents";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { setFormToShow } from "../../redux/reducers/checkoutConfigDataSlice";

type Props = {};

const PaymentInfo = (props: Props) => {
  const defaultValues = {
    agreeToTerms: false,
    cardNumber: "",
    expMM: "",
    expYY: "",
    specialDeal: false,
    cvv: "",
  };
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(paymentInfoSchema),
    defaultValues,
  });

  const { formToShow } = useAppSelector((state) => state.checkoutConfig);

  const specialDeal = watch("specialDeal");
  const agreeToTerms = watch("agreeToTerms");
  const reduxDispatch = useAppDispatch();

  const onSubmit = (data: any) => {
    console.log(data);
  };
  const handleClick = () => {
    reduxDispatch(setFormToShow("billingInfo"));
  };
  return (
    <Box display={"grid"} sx={{ gap: "1rem" }} mb={"2rem"}>
      <Typography
        fontSize={"1.25rem"}
        fontWeight={700}
        sx={{ background: "#EFF0F1", borderRadius: "0.3rem", padding: "0.43rem 0.3rem" }}
      >
        3.Payment Info
      </Typography>
      {formToShow === "paymentInfo" ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* --------------------------------------------------------- First Row -------------------------------------------- */}
          <Box sx={{ display: "grid", gridTemplateColumns: "45.4% 1fr", gap: "2.4rem" }}>
            <Box display={"grid"}>
              <TypographyGrey>Card Number</TypographyGrey>
              <TextField
                {...register("cardNumber", {
                  onChange: (e) => {
                    const value = e.target.value.replace(/\D/g, ""); // Remove all non-digit characters
                    const formattedValue = value
                      .replace(/(\d{4})(?=\d)/g, "$1-") // Add hyphen after every 4 digits except the last group
                      .slice(0, 19); // Limit the input to 19 characters
                    e.target.value = formattedValue;
                  },
                })}
                onKeyDown={(e) => {
                  // Allow backspace key
                  if (e.key === "Backspace") {
                    return true;
                  }
                  // Prevent input of non-digit characters
                  if (e.key.length === 1 && !/\d/.test(e.key)) {
                    e.preventDefault();
                  }
                }}
                error={!!errors.cardNumber}
                helperText={errors.cardNumber ? errors.cardNumber?.message?.toString() : " "}
              />
            </Box>
            {/* --------------------------------------------- ExpMonth and ExpYear ------------------------------------------ */}
            <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <Box display={"grid"}>
                <TypographyGrey>Exp MM</TypographyGrey>
                <TextField
                  {...register("expMM")}
                  error={!!errors.expMM}
                  helperText={errors.expMM ? errors.expMM?.message?.toString() : " "}
                />
              </Box>
              <Box display={"grid"}>
                <TypographyGrey>Exp YY</TypographyGrey>
                <TextField
                  {...register("expYY")}
                  error={!!errors.expYY}
                  helperText={errors.expYY ? errors.expYY?.message?.toString() : " "}
                />
              </Box>
            </Box>
          </Box>
          {/* --------------------------------------------------------- Second Row --------------------------------------- */}
          <Box sx={{ display: "grid", gridTemplateColumns: "22%", gap: "1rem" }}>
            <Box display={"grid"}>
              <TypographyGrey>CVV</TypographyGrey>
              <TextField
                type={"password"}
                {...register("cvv")}
                error={!!errors.cvv}
                helperText={errors.cvv ? errors.cvv?.message?.toString() : " "}
              />
            </Box>
          </Box>

          {/* ----------------------------------------------------- Special Offers -------------------------------------  */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Checkbox checked={!!specialDeal} color="primary" {...register("specialDeal")} />
            <Typography>Send me special offers.</Typography>
          </Box>
          {/* ----------------------------------------------------- Terms and conditions -------------------------------------  */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Checkbox checked={!!agreeToTerms} color="primary" {...register("agreeToTerms")} />
            <Typography>I agree to the Terms and Policies of travel</Typography>
          </Box>
          {
            <Typography ml={"0.8rem"} color={"red"} fontSize={"0.75rem"}>
              {errors.agreeToTerms ? errors.agreeToTerms.message?.toString() : " "}
            </Typography>
          }
          {/* ------------------------------------------------------ Submit Button --------------------------------------------- */}
          <Box sx={{ display: "grid", margin: "0.5rem 0" }}>
            <Box sx={{ placeSelf: "end", display: "flex", gap: "2rem", alignItems: "center" }}>
              <Button
                onClick={handleClick}
                sx={{ cursor: "pointer", color: "#26266d", width: "8.5rem", fontSize: "0.875rem" }}
              >
                Edit Billing Info
              </Button>
              <StyledButtonNoMargin sx={{ maxWidth: "12rem" }} variant="contained" type="submit">
                NEXT:BILLING INFO
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

export default PaymentInfo;
