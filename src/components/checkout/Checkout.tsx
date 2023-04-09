import { Modal } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { fetchBillingConfig } from "../../redux/reducers/checkoutDataSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import Steps from "../roomResults/Stepper/Steps";
import { StyledButton } from "../styledComponents/styledComponents";
import CheckOutModal from "./checkOutModal/CheckOutModal";
import HelpCard from "./HelpCard";
import ItineraryCard from "./itinerary/ItineraryCard";

type Props = {};

// styles
const modalContainerStyle = {
  position: "absolute" as "absolute",
  top: "30%",
  left: "30%",
  transform: "translate(-50%, -50%)",
  width: "40vw",
  bgcolor: "background.paper",
  boxShadow: 24,
  padding: "1rem 1.5rem",
};

const checkOutContainerStyle = {
  padding: "0 1.5rem",
  margin: "3.43rem 0",
  display: "grid",
  gridTemplateColumns: { lg: "58.4% 1fr", md: "1fr 1fr" },
  columnGap: "8.35rem",
  rowGap: "2rem",
  minHeight: "63vh",
};

// Checkout Page
const Checkout = (props: Props) => {
  const [open, setOpen] = React.useState(false);
  const { t } = useTranslation();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const reduxDispatch = useAppDispatch();
  const { showItineraryCard } = useAppSelector((state) => state.checkout);
  useEffect(() => {
    reduxDispatch(fetchBillingConfig());
  }, [reduxDispatch]);

  return (
    <Box sx={{ width: "100%" }} className="checkout">
      <Steps />
      <Box sx={{ padding: "0 3.375rem", width: "100%" }}>
        <Box sx={checkOutContainerStyle}>
          <Box>
            {/* ---------------------------------------------- User Info ------------------------------------------ */}
            <StyledButton
              onClick={handleOpen}
              sx={{ display: "flex", maxWidth: "15rem", margin: "0 auto" }}
              variant="contained"
            >
              {t("CHECKOUT")}
            </StyledButton>
            <Modal open={open} onClose={handleClose}>
              <Box sx={modalContainerStyle}>
                <CheckOutModal handleClose={handleClose} />
              </Box>
            </Modal>
          </Box>
          {/* ---------------------------------------------- Itinerary section ------------------------------------------ */}
          <Box sx={{ display: "grid", gap: "2.5rem", position: "relative" }}>
            {showItineraryCard ? <ItineraryCard buttonText="CONTINUE SHOPPING" /> : <></>}
            <HelpCard />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Checkout;
