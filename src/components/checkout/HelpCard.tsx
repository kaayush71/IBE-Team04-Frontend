import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useTranslation } from "react-i18next";

type Props = {};

// Help card which is displayed
// on checkout page.
const HelpCard = (props: Props) => {
  const { t } = useTranslation();
  return (
    <Box sx={{ background: "#EFF0F1", padding: "1.43rem", height: "9.375rem" }}>
      <Typography fontWeight={"700"} fontSize={"1.5rem"}>
        {t("Need help?")}
      </Typography>
      <Box mt={"1rem"} sx={{ display: "grid", columnGap: "0.25rem" }}>
        <Typography fontWeight={"700"}>{t("Call")}1-800-555-5555</Typography>
        <Typography fontSize={"0.875rem"} color="#2F2F2F">
          {t("Mon-Fr 8a-5p EST")}
        </Typography>
      </Box>
    </Box>
  );
};

export default HelpCard;
