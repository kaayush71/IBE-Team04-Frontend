import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import { Typography, TextField, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Checkbox } from "@mui/material";
import { paymentInfoSchema } from "./checkOutSchema";
import { StyledButtonNoMargin } from "../styledComponents/styledComponents";
import { TypographyGrey } from "../styledComponents/styledComponents";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { makeBooking, setFormToShow } from "../../redux/reducers/checkoutFormDataSlice";
import { useCustomHook } from "../../constants/calculateRoomRates";
import { AES } from "crypto-js";
import { useNavigate } from "react-router-dom";
import { setShowItineraryCard } from "../../redux/reducers/checkoutDataSlice";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { useTranslation } from "react-i18next";
import TermsAndConditionsModal from "./TermsAndConditionsModal";
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
    criteriaMode: "all",
    reValidateMode: "onChange",
    mode: "onChange",
  });
  const { calculateVat, calculateTaxes, totalDueAmount } = useCustomHook();
  const navigate = useNavigate();
  const secretKey = "mySecretKey";

  const {
    selectedRoom,
    room,
    startDate,
    endDate,
    totalCostOfStay,
    selectedPromotion,
    isCustomPromotion,
    guestTypes,
    bedCount,
  } = useAppSelector((state) => state.checkout);

  const { formToShow, travellerFormInfo, billingFormInfo, makeBookingStatus, bookingId } =
    useAppSelector((state) => state.checkoutConfig);

  // make request body for Confirm Booking Api Call.
  const makeRequestBody = (data: any) => {
    let adultCount: Number = 0;
    let teenCount: Number = 0;
    let childrenCount: Number = 0;

    guestTypes.forEach((guestType) => {
      if (guestType.categoryName === "Adults") {
        adultCount = guestType.count;
      } else if (guestType.categoryName === "Teens") {
        teenCount = guestType.count;
      } else if (guestType.categoryName === "Children") {
        childrenCount = guestType.count;
      }
    });

    const extraData = {
      roomTypeId: room.roomTypeId,
      roomTypeName: room.roomTypeName,
      checkInDate: startDate,
      checkOutDate: endDate,
      roomsCount: selectedRoom,
      subTotal: Number((totalCostOfStay * selectedPromotion.priceFactor).toFixed(1)),
      tax: Number(calculateTaxes().toFixed(1)),
      vat: Number(calculateVat().toFixed(1)),
      nightlyRate: room.roomRate,
      totalCostOfStay: Number(totalDueAmount().toFixed(1)),
      customPromotionId: isCustomPromotion ? Number(selectedPromotion.promotionId) : "",
      graphQlPromotionId: isCustomPromotion ? "" : selectedPromotion.promotionId,
      adultCount: Number(adultCount),
      teenCount: Number(teenCount),
      childCount: Number(childrenCount),
      bedsCount: Number(bedCount),
      propertyId: 4,
    };

    const paymentInfo = {
      cardNumber: String(AES.encrypt(String(data.cardNumber).replaceAll("-", ""), secretKey)),
      cardNumberExpiryMonth: data.expMM,
      cardNumberExpiryYear: data.expYY,
      isSendOffers: data.specialDeal,
    };

    const travellerInfo = {
      travellerEmail: travellerFormInfo.travellerEmail,
      travellerFirstName: travellerFormInfo.travellerFirstName,
      travellerLastName:
        travellerFormInfo.travellerLastName === undefined
          ? ""
          : travellerFormInfo.travellerLastName,
      travellerPhoneNumber: travellerFormInfo.travellerPhoneNumber,
    };
    const requestBody = { ...travellerInfo, ...billingFormInfo, ...paymentInfo, ...extraData };
    return requestBody;
  };

  const specialDeal = watch("specialDeal");
  const agreeToTerms = watch("agreeToTerms");
  const reduxDispatch = useAppDispatch();

  const { t } = useTranslation();
  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
    return (
      <MuiAlert elevation={6} ref={ref} variant="filled" {...props}>
        {props.children}
      </MuiAlert>
    );
  });

  const [open, setOpen] = React.useState(false);
  const handleClosed = (event?: React.SyntheticEvent | Event, reason?: string) => {
    setOpen(false);
  };

  const [termsAndConditionsModalOpen, setTermsAndConditionsModalOpen] = useState(false);

  const handleTermsAndConditionsClick = () => {
    console.log("clicked");
    setTermsAndConditionsModalOpen(true);
  };

  const handleTermsAndConditionsClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    setTermsAndConditionsModalOpen(false);
  };

  const onSubmit = (data: any) => {
    setOpen(true);
    const requestBody = makeRequestBody(data);
    console.log("Request Body", requestBody);
    reduxDispatch(makeBooking(requestBody));
  };
  const handleClick = () => {
    reduxDispatch(setFormToShow("billingInfo"));
  };

  useEffect(() => {
    if (makeBookingStatus === "success" && bookingId !== "") {
      reduxDispatch(setShowItineraryCard(false));
      navigate(`/confirm-booking/${bookingId}`);
    }
  }, [makeBookingStatus, bookingId, navigate, reduxDispatch]);

  return (
    <Box display={"grid"} sx={{ gap: "1rem" }} mb={"2rem"}>
      <Typography
        fontSize={"1.25rem"}
        fontWeight={700}
        sx={{ background: "#EFF0F1", borderRadius: "0.3rem", padding: "0.43rem 0.3rem" }}
      >
        3.{t("Payment Info")}
      </Typography>
      {formToShow === "paymentInfo" ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* --------------------------------------------------------- First Row -------------------------------------------- */}
          <Box sx={{ display: "grid", gridTemplateColumns: "45.4% 1fr", gap: "2.4rem" }}>
            <Box display={"grid"}>
              <TypographyGrey>{t("Card Number")}</TypographyGrey>
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
                <TypographyGrey>{t("Exp MM")}</TypographyGrey>
                <TextField
                  {...register("expMM")}
                  error={!!errors.expMM}
                  helperText={errors.expMM ? errors.expMM?.message?.toString() : " "}
                />
              </Box>
              <Box display={"grid"}>
                <TypographyGrey>{t("Exp YY")}</TypographyGrey>
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
              <TypographyGrey>{t("CVV")}</TypographyGrey>
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
            <Typography>{t("Send me special offers.")}</Typography>
          </Box>
          {/* ----------------------------------------------------- Terms and conditions -------------------------------------  */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Checkbox checked={!!agreeToTerms} color="primary" {...register("agreeToTerms")} />
            <Typography>
              {t("I agree to the")}{" "}
              <span
                style={{ color: "#5D5D5D", cursor: "pointer" }}
                onClick={handleTermsAndConditionsClick}
              >
                {t("Terms and Policies")}
              </span>{" "}
              {t("of travel")}
            </Typography>
          </Box>
          <TermsAndConditionsModal
            open={termsAndConditionsModalOpen}
            handleClose={handleTermsAndConditionsClose}
          />
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
                sx={{ cursor: "pointer", color: "#26266d", width: "15rem", fontSize: "0.875rem" }}
              >
                {t("Edit Billing Info")}
              </Button>
              <StyledButtonNoMargin sx={{ maxWidth: "12rem" }} variant="contained" type="submit">
                {t("PURCHASE")}
              </StyledButtonNoMargin>
            </Box>
          </Box>
        </form>
      ) : (
        <></>
      )}
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={makeBookingStatus === "rejected" && open}
        autoHideDuration={1000}
        onClose={handleClosed}
      >
        {makeBookingStatus === "rejected" ? (
          <Box>
            <Alert onClose={handleClosed} severity="error" sx={{ width: "100%" }}>
              Unable to complete booking please try again later...!
            </Alert>
          </Box>
        ) : (
          <></>
        )}
      </Snackbar>
    </Box>
  );
};

export default PaymentInfo;
