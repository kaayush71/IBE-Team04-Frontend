import React from "react";
import { useAppSelector } from "../../../redux/store";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

type Props = {
  open: boolean;
  handleClose: any;
};

// style
const promotionModalStyle = {
  position: "absolute" as "absolute",
  top: "16.25rem",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "25.5rem",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const PromotionModal = (props: Props) => {
  const { totalCostOfStay } = useAppSelector((state) => state.checkout);
  const selectedCurrency = useAppSelector((state) => state.currency.selectedCurrency);
  const selectedPromotion = useAppSelector((state) => state.checkout.selectedPromotion);
  return (
    <div>
      <Modal
        open={props.open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={promotionModalStyle}>
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
            {selectedPromotion.promotionTitle.replaceAll("_", " ").toLowerCase()}
          </Typography>
          <Typography id="modal-modal-description">
            {selectedPromotion.promotionDescription.replaceAll("_", " ").toLowerCase()}
          </Typography>
          <Box mt={"3.375rem"} sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography>Package Total</Typography>
            <Typography>
              {` ${selectedCurrency.symbol}${(
                selectedCurrency.rate *
                (totalCostOfStay * selectedPromotion.priceFactor)
              ).toFixed(1)} `}
            </Typography>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default PromotionModal;
