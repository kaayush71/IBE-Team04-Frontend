import { Box, FormControl, Select, Typography } from "@mui/material";
import React from "react";
import { setShowSearchForm } from "../../../redux/reducers/landingSearchFormSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import DateRangeCalendar from "./DateRangeCalendar/DateRangeCalendar";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import "./CalendarMenu.scss";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";

type Props = {};

export default function CalendarMenu(props: Props) {
  const landingForm = useAppSelector((state) => state.landingForm);
  const { t } = useTranslation();
  const CalendarMenuInput = () => {
    return (
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography>
          {landingForm.startDate
            ? format(new Date(landingForm.startDate), "yyyy-MM-dd")
            : t("Check In")}
        </Typography>
        <ArrowForwardIcon fontSize="small" />
        <Typography>
          {landingForm.endDate && landingForm.endDate !== landingForm.startDate
            ? format(new Date(landingForm.endDate), "yyyy-MM-dd")
            : t("Check Out")}
        </Typography>
        <CalendarMonthIcon fontSize="small" />
      </Box>
    );
  };

  const showSearchForm = useAppSelector((state) => state.landingForm.showSearchForm);
  const reduxDispatch = useAppDispatch();
  return (
    <FormControl fullWidth>
      <Select
        IconComponent={() => null}
        sx={{
          width: "100%",
          "& .MuiSelect-select": {
            padding: "0.7rem !important",
          },
        }}
        MenuProps={{
          PaperProps: {
            sx: {
              "& .MuiMenu-list": {
                padding: "0.3rem 0 0 0",
              },
              left: "121px !important",
            },
          },
        }}
        open={showSearchForm}
        onOpen={() => reduxDispatch(setShowSearchForm(true))}
        onClose={() => reduxDispatch(setShowSearchForm(false))}
        displayEmpty={true}
        renderValue={() => <CalendarMenuInput />}
      >
        <DateRangeCalendar />
      </Select>
    </FormControl>
  );
}
