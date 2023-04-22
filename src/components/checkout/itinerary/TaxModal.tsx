import React from "react";
import { useAppSelector } from "../../../redux/store";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { StyledDividerBlack } from "../../styledComponents/styledComponents";
import { format } from "date-fns";

type Props = {
  open: boolean;
  handleClose: any;
};

// style
const taxModalStyle = {
  position: "absolute" as "absolute",
  top: "26.25rem",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "25.5rem",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const TaxModal = (props: Props) => {
  const checkoutRoom = useAppSelector((state) => state.checkout.room);
  const selectedCurrency = useAppSelector((state) => state.currency.selectedCurrency);
  const { selectedPromotion, roomTypeRates, totalCostOfStay, taxes, dueNow, dueAtResort, vat } =
    useAppSelector((state) => state.checkout);

  const calculateVat = () => {
    let costWithVat = 0;
    costWithVat = totalCostOfStay * selectedPromotion.priceFactor;
    costWithVat = costWithVat * vat;
    return costWithVat * selectedCurrency.rate;
  };

  // function to calculate amount with taxes
  const calculateTaxes = () => {
    let costWithTaxes = 0;
    costWithTaxes = totalCostOfStay * selectedPromotion.priceFactor;
    let taxAmount = 0;
    for (let i = 0; i < taxes.length; i++) {
      taxAmount = taxAmount + costWithTaxes * taxes[i].value;
    }
    return taxAmount * selectedCurrency.rate;
  };

  // function to calculate due now amount
  const dueNowAmount = () => {
    let dueNowAmount = 0;
    dueNowAmount +=
      totalCostOfStay * selectedPromotion.priceFactor + calculateTaxes() + calculateVat();
    dueNowAmount = dueNowAmount * dueNow;
    return dueNowAmount * selectedCurrency.rate;
  };

  // function to calculate due at resort amount
  const dueAtResortAmount = () => {
    let dueAtResortAmount = 0;
    dueAtResortAmount +=
      totalCostOfStay * selectedPromotion.priceFactor + calculateTaxes() + calculateVat();
    dueAtResortAmount = dueAtResortAmount * dueAtResort;
    return dueAtResortAmount * selectedCurrency.rate;
  };

  return (
    <div>
      <Modal
        open={props.open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={taxModalStyle}>
          <IconButton
            sx={{
              top: "0.2rem",
              right: "0.3rem",
              position: "absolute",
              color: "black",
            }}
            onClick={props.handleClose}
          >
            <CloseIcon sx={{ fontWeight: "400" }} fontSize="medium" />
          </IconButton>
          <Typography textTransform={"capitalize"} fontSize={"1.5rem"} fontWeight={"700"}>
            Rate Breakdown
          </Typography>
          <Typography textTransform={"capitalize"} id="modal-modal-description">
            {checkoutRoom.roomTypeName.replaceAll("_", " ").toLowerCase()}
          </Typography>
          <Typography textTransform={"capitalize"} id="modal-modal-description">
            {`Nightly Rate(per room)`}
          </Typography>
          <Typography textTransform={"capitalize"} mt={"1.375rem"} mb={"1.375rem"}>
            {selectedPromotion.promotionTitle.replaceAll("_", " ").toLowerCase()}
          </Typography>
          {/* ------------------------------------------------------- Room Rates ------------------------------------------------------ */}
          <Box>
            {roomTypeRates.map((roomTypeRate) => {
              return (
                <Box
                  key={roomTypeRate.date}
                  sx={{ display: "flex", justifyContent: "space-between", gap: "0.5rem" }}
                >
                  <Typography>
                    {format(new Date(roomTypeRate.date), "EEEE, MMMM d, yyyy")}
                  </Typography>
                  <Typography>{`${selectedCurrency.symbol} ${
                    selectedCurrency.rate *
                    roomTypeRate.roomTypeRate *
                    selectedPromotion.priceFactor
                  }`}</Typography>
                </Box>
              );
            })}
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: "0.5rem",
              margin: "1.375rem 0",
            }}
          >
            <Typography fontSize={"1.2rem"}>Room Total</Typography>
            <Typography>
              {selectedCurrency.symbol}
              {totalCostOfStay * selectedPromotion.priceFactor * selectedCurrency.rate}
            </Typography>
          </Box>
          {/* -------------------------------------------------------------------------------------------------------------------- */}
          <StyledDividerBlack />
          {/* ----------------------------------------------------------- Taxes ------------------------------------------------------- */}
          <Typography mb={"0.5rem"}>Taxes and fees (per room)</Typography>
          {taxes.map((tax) => {
            return (
              <Box
                key={tax.name}
                sx={{ display: "flex", justifyContent: "space-between", gap: "0.5rem" }}
              >
                <Typography>{tax.name}</Typography>
                <Typography>
                  {selectedCurrency.symbol}
                  {(
                    totalCostOfStay *
                    selectedPromotion.priceFactor *
                    tax.value *
                    selectedCurrency.rate
                  ).toFixed(1)}
                </Typography>
              </Box>
            );
          })}
          {/* -------------------------------------------------------------------------------------------------------------------- */}
          <StyledDividerBlack />
          {/* ----------------------------------------------------------- Due now ------------------------------------------------- */}
          <Box sx={{ display: "flex", justifyContent: "space-between", gap: "0.5rem" }}>
            <Typography>{`Due now`}</Typography>
            <Typography>
              {selectedCurrency.symbol}
              {dueNowAmount().toFixed(1)}
            </Typography>
          </Box>
          {/* ----------------------------------------------------------- Due at resort ------------------------------------------------- */}

          <Box sx={{ display: "flex", justifyContent: "space-between", gap: "0.5rem" }}>
            <Typography>{`Due at resort`}</Typography>
            <Typography>
              {selectedCurrency.symbol}
              {dueAtResortAmount().toFixed(1)}
            </Typography>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default TaxModal;
