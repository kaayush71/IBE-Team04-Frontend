import { Box, CircularProgress, IconButton, TextField, Typography } from "@mui/material";
import React, { useRef } from "react";
import Slider from "react-slick";
import { RoomType } from "../../../redux/reducers/roomResultConfigDataSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import BedIcon from "@mui/icons-material/Bed";

import "./RoomCardModal.scss";
import PromotionCard from "./PromotionCard/PromotionCard";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { sliderSettings } from "../../../constants/sliderSettings";
import { StyledButtonNoMargin } from "../../styledComponents/styledComponents";
import PromotionCardStandard from "./PromotionCard/PromotionCardStandard";
import {
  fetchCustomPromotion,
  setSelectedPromotionRoomType,
} from "../../../redux/reducers/promotionsDataSlice";
import { useTranslation } from "react-i18next";
type Props = {
  room: RoomType;
  handleClose: any;
};

//styles
const roomTypeName = {
  position: "absolute",
  bottom: "1rem",
  left: "5%",
  fontWeight: "800",
  textTransform: "capitalize",
};

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return (
    <MuiAlert elevation={6} ref={ref} variant="filled" {...props}>
      {props.children}
    </MuiAlert>
  );
});

const RoomCardModal = ({ room, handleClose }: Props) => {
  const { t } = useTranslation();
  const fetchCustomPromoStatus = useAppSelector((state) => state.promotions.fetchCustomPromoStatus);
  const [open, setOpen] = React.useState(false);

  const handleClosed = (event?: React.SyntheticEvent | Event, reason?: string) => {
    setOpen(false);
  };
  const reduxDispatch = useAppDispatch();
  const roomType = useAppSelector((state) => state.resultsConfiguration.roomType);
  const promotions = useAppSelector((state) => state.promotions);
  const specialPromotion = useAppSelector((state) => state.promotions.specialPromotion);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setOpen(true);
    reduxDispatch(setSelectedPromotionRoomType(room.roomTypeName));
    reduxDispatch(
      fetchCustomPromotion({
        roomTypeId: room.roomTypeId,
        promoCode: inputRef.current?.value,
      })
    );
    if (inputRef?.current) {
      inputRef.current.value = "";
    }
  };
  return (
    <Box>
      <Box sx={{ position: "relative" }}>
        <Slider className="slick-slider modal" {...sliderSettings}>
          {roomType[`${room.roomTypeName}`].images.map((image, index) => (
            <Box
              key={index}
              sx={{
                height: "23.81rem",
                width: "100%",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                display: "flex",
                placeSelf: "baseline",
                backgroundPosition: "100% 60%",
                background: `linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0)),url(${image}) center`,
              }}
            ></Box>
          ))}
        </Slider>
        <Typography sx={roomTypeName} color={"#ffffff"} fontSize={"2rem"}>
          {t(room.roomTypeName.replaceAll("_", " "))}
        </Typography>
        <IconButton
          sx={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            color: "white",
          }}
          onClick={handleClose}
        >
          <CloseIcon sx={{ fontWeight: "400" }} fontSize="medium" />
        </IconButton>
      </Box>
      <Box sx={{ padding: "2.31rem 5%" }}>
        <Box
          sx={{
            display: { md: "grid", xs: "flex" },
            gridTemplateColumns: { lg: "60% 1fr", md: "65% 1fr" },
            gap: "5rem",
            flexDirection: "column-reverse",
          }}
        >
          <Box>
            <Box sx={{ display: "flex", gap: "2.18rem" }}>
              <Box sx={{ display: "flex", gap: "0.3rem" }}>
                <PersonOutlineIcon sx={{ color: "#5d5d5d" }} />
                <Typography fontSize={"0.875rem"} color={"#5D5D5D"} fontWeight={400}>
                  1-{room.maxCapacity}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", gap: "0.4rem" }}>
                <BedIcon sx={{ color: "#5d5d5d" }} />
                <Typography fontSize={"0.875rem"} color={"#5D5D5D"} fontWeight={400}>
                  {room.bedType}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", gap: "0.3rem" }}>
                <Typography fontSize={"0.875rem"} color={"#5D5D5D"} fontWeight={400}>
                  {`${room.areaInSquareFeet}ft`}
                </Typography>
              </Box>
            </Box>
            <Typography textAlign={{ xs: "justify", sm: "initial" }} mt={"1.375rem"}>
              {t(`${roomType[`${room.roomTypeName}`].description}`)}
            </Typography>

            {/* ------------------------------------------------------- Promotions ---------------------------------------------------- */}
            <Box mt={"1.625rem"} className="standard-rate">
              <Typography fontSize={"1.25rem"} fontWeight={"700"}>
                {t("Standard Rate")}
              </Typography>
              {/* --------------------------------------- Promotion Card ----------------------------------------------------------- */}
              <PromotionCardStandard room={room} />
            </Box>
            {/* ---------------------------------------------------------------- Deals And Packages ------------------------------------- */}
            <Box mt={"2.5rem"} className="deals-packages">
              <Typography fontSize={"1.25rem"} fontWeight={"700"}>
                {t("Deals & Packages")}
              </Typography>
              {promotions.loading ? (
                <CircularProgress />
              ) : (
                promotions.promotions.map((promotion) => {
                  return (
                    <PromotionCard key={promotion.promotionId} promotion={promotion} room={room} />
                  );
                })
              )}
            </Box>
            {/* --------------------------------------------------------------- Special Deal ------------------------------------------------ */}
            {promotions.showSpecialPromotion &&
            promotions.selectedPromotionRoomType === room.roomTypeName ? (
              <Box mt={"2.5rem"} className="special-promotion">
                <Typography fontSize={"1.25rem"} fontWeight={"700"}>
                  {t("Special Deal")}
                </Typography>
                <PromotionCard promotion={specialPromotion} room={room} />
              </Box>
            ) : (
              <></>
            )}

            {/* --------------------------------------------------------------- Promo Code ------------------------------------------------ */}
            <form onSubmit={handleSubmit}>
              <Box mt={"2.5rem"}>
                <Typography>{t("Enter a promo code")}</Typography>
                <Box
                  mt={"5px"}
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "0.7fr 0.3fr",
                    gap: "0.813rem",
                    maxWidth: "20rem",
                  }}
                >
                  <TextField inputRef={inputRef} id="outlined-basic" variant="outlined" />
                  <StyledButtonNoMargin type="submit" variant="contained">
                    <Typography sx={{ fontWeight: "700", fontSize: "0.875rem" }}>
                      {t("APPLY")}
                    </Typography>
                  </StyledButtonNoMargin>
                  <Snackbar
                    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                    sx={{ marginTop: "5rem" }}
                    open={fetchCustomPromoStatus !== "" && open}
                    autoHideDuration={700}
                    onClose={handleClosed}
                  >
                    {fetchCustomPromoStatus === "success" ? (
                      <Box>
                        <Alert onClose={handleClosed} severity="success" sx={{ width: "100%" }}>
                          Promocode applied successfully.
                        </Alert>
                      </Box>
                    ) : fetchCustomPromoStatus === "rejected" ? (
                      <Box>
                        <Alert onClose={handleClosed} severity="error" sx={{ width: "100%" }}>
                          Please check your promocode..!
                        </Alert>
                      </Box>
                    ) : (
                      <></>
                    )}
                  </Snackbar>
                </Box>
              </Box>
            </form>
            {/* ------------------------------------------------------------------------------------------------------------------------- */}
          </Box>
          {/* -------------------------------------------------------------- Ammenities ----------------------------------------------- */}
          <Box>
            <Typography>{t("Ammenities")}</Typography>
            <Box
              sx={{
                marginTop: "1rem",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "0.3rem",
              }}
            >
              {roomType[`${room.roomTypeName}`].ammenities.map((ammenity, index) => {
                return (
                  <Box key={index} sx={{ display: "flex", gap: "0.5rem" }}>
                    <CheckCircleOutlineIcon />
                    <Typography>{t(`${ammenity}`)}</Typography>
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default RoomCardModal;
