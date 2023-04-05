import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../../redux/store";

type Props = {};

const PromotionCard = (props: Props) => {
  const selectedCurrency = useAppSelector((state) => state.currency.selectedCurrency);
  return (
    <Box
      mt={"1rem"}
      sx={{
        display: { md: "grid", sm: "block" },
        gridTemplateColumns: "70% 1fr",
        boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.1)",
        border: "1px solid #EFF0F1",
        maxWidth: { xl: "45w", lg: "50vw", md: "60vw" },
      }}
    >
      <Box
        sx={{
          padding: "26px 23px",
        }}
      >
        <Typography fontWeight={"700"}>Standard Rate</Typography>
        <Typography color={"#5D5D5D"} mt={"0.75rem"}>
          Spend $10 every night you stay and earn $150 in dining credit at the resort.
        </Typography>
      </Box>
      <Box sx={{ backgroundColor: "#EFF0F1", padding: "26px 23px" }}>
        <Typography fontSize={"1.25rem"} fontWeight={"700"} textAlign={"end"}>
          {`${selectedCurrency.symbol} ${(selectedCurrency.rate * 100).toFixed(1)}`}
        </Typography>
        <Typography color={"#858685"} textAlign={"end"}>
          per night
        </Typography>
        <Link to={"/checkout"}>
          <Button
            type="submit"
            sx={{
              backgroundColor: "#26266D",
              "&:hover": { backgroundColor: "#26266D" },
              padding: "0.75rem 1.25rem",
              width: "100%",
              marginTop: "0.5rem",
              fontSize: "0.875rem",
            }}
            variant="contained"
          >
            <Typography sx={{ fontWeight: "700", fontSize: "0.875rem" }}>
              {"SELECT PACKAGE"}
            </Typography>
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default PromotionCard;
