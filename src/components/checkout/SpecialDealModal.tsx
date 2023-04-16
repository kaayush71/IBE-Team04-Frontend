import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

type Props = { open: boolean; handleClose: any };

// style
const specialDealModalStyle = {
  position: "absolute" as "absolute",
  top: "13.25rem",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70vw",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const SpecialDealModal = (props: Props) => {
  return (
    <div>
      <Modal
        open={props.open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={specialDealModalStyle}>
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
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas quis neque, beatae
            nostrum expedita eaque asperiores similique sit voluptatem modi odio blanditiis enim
            accusamus, in officiis. Tenetur alias ad consequuntur? Rem nesciunt harum pariatur omnis
            labore odio sint totam dolores. Exercitationem, quam reprehenderit? Facere, veniam
            explicabo. Quas numquam, recusandae voluptas natus dolor doloribus qui tempore dolores
            sint perspiciatis, sequi molestias, voluptate consequatur blanditiis magni delectus
            repellat! Accusamus qui magnam culpa facere vero, a soluta porro dolor suscipit rerum
            distinctio excepturi fuga nostrum aut. Doloribus repellat deserunt nulla rem dolore?
            Doloribus saepe pariatur natus voluptatum repellendus, illo quis quos possimus dolores.
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default SpecialDealModal;
