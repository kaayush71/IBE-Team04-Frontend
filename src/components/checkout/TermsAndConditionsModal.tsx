import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

type Props = { open: boolean; handleClose: any };

// style
const termsAndConditionModalStyle = {
  position: "absolute" as "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70vw",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const TermsAndConditionsModal = (props: Props) => {
  return (
    <div>
      <Modal
        open={props.open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={termsAndConditionModalStyle}>
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
          <Typography mb={"1rem"} fontSize={"1.5rem"} fontWeight={"700"}>
            Terms and Conditions
          </Typography>
          <Typography>
            Welcome to our hotel booking website. By accessing and using our services, you agree to
            the following terms and conditions:When making a reservation on our website, you will be
            required to provide certain personal information, including your full name, email
            address, billing address, and credit card details. We guarantee that all personal
            information provided will be kept confidential and secure. We will use your personal
            information only for the purpose of processing your reservation and communicating with
            you regarding your stay.By making a reservation on our website, you confirm that you are
            over 18 years of age and that you have the legal capacity to enter into a binding
            agreement. You also agree to pay all charges incurred during your stay, including room
            charges, taxes, and any additional fees for services or amenities requested.Cancellation
            policies may vary depending on the type of room and rate selected. Please review the
            cancellation policy before making your reservation.We reserve the right to modify,
            suspend or discontinue any aspect of our services at any time without notice. We also
            reserve the right to refuse service to anyone for any reason at any time.By using our
            website, you agree to indemnify and hold us harmless from any claims, damages, or losses
            arising from your use of our services.
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default TermsAndConditionsModal;
