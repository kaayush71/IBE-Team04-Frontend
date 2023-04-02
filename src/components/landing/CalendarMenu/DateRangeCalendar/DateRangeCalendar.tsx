import React, { useCallback, useEffect, useState } from "react";
import { DateRange } from "react-date-range";
import "./DateRangeCalendar.scss";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { Box, Button, Divider, Typography } from "@mui/material";
import { addDays, format, isSameDay } from "date-fns";
import isBefore from "date-fns/isBefore";
import { useAppDispatch, useAppSelector } from "../../../../redux/store";
import {
  setEndDate,
  setMinimumNightlyPrice,
  setShowDateOnForm,
  setShowSearchForm,
  setStartDate,
} from "../../../../redux/reducers/landingSearchFormSlice";

const DateRangeCalendar = () => {
  const currentDate = new Date();
  const reduxDispatch = useAppDispatch();
  const minRoomRates = useAppSelector((state) => state.calendar.data);
  const selectedCurrency = useAppSelector((state) => state.currency.selectedCurrency);
  const landingForm = useAppSelector((state) => state.landingForm);
  const [showAlertMessage, setShowAlertMessage] = useState(false);
  const minimumNightlyPrice = useAppSelector((state) => state.landingForm.minimumNightlyPrice);
  const selectedDateRange = [
    {
      startDate: new Date(landingForm.startDate),
      endDate: new Date(landingForm.endDate),
      key: "selection",
    },
  ];
  // function to get the minimum price
  // between start-date and end-dat
  const getMinimumNightlyPrice = useCallback(
    (startDate: string, endDate: string) => {
      if (startDate === endDate) {
        reduxDispatch(setMinimumNightlyPrice(Infinity));
        return;
      }
      while (startDate <= endDate) {
        const currentDateMinPrice = minRoomRates[startDate];
        if (currentDateMinPrice !== undefined) {
          if (currentDateMinPrice < minimumNightlyPrice) {      
            reduxDispatch(setMinimumNightlyPrice(currentDateMinPrice));
          }
        }
        startDate = format(addDays(new Date(startDate), 1), "yyyy-MM-dd");
      }
    },
    [minRoomRates, minimumNightlyPrice, reduxDispatch]
  );

  useEffect(() => {
    getMinimumNightlyPrice(
      format(new Date(landingForm.startDate), "yyyy-MM-dd"),
      format(new Date(landingForm.endDate), "yyyy-MM-dd")
    );
  }, [getMinimumNightlyPrice, landingForm.endDate, landingForm.startDate]);

  // will be called when their is change
  // in start-date or end-date
  const handleSelect = (ranges: any) => {
    const startDate = format(new Date(ranges.selection.startDate), "yyyy-MM-dd");
    const endDate = format(new Date(ranges.selection.endDate), "yyyy-MM-dd");
    getMinimumNightlyPrice(startDate, endDate);
    setShowAlertMessage(!showAlertMessage);
    reduxDispatch(setStartDate(startDate));
    reduxDispatch(setEndDate(endDate));
  };

  const handleSubmit = () => {
    reduxDispatch(setShowDateOnForm(true));
    reduxDispatch(setShowSearchForm(false));
  };

  // custom function that will return
  // the price for each day
  const getPrice = (day: Date) => {
    const dateNow = format(new Date(day), "yyyy-MM-dd");
    return minRoomRates[dateNow]
      ? `${selectedCurrency.symbol} ${(selectedCurrency.rate * minRoomRates[dateNow]).toFixed(1)}`
      : "-";
  };
  const rangeColors = ["#26266D"];
  function customDayContent(day: Date) {
    const EmptyPrice = <Box sx={{ color: "black", height: "30%" }}>-</Box>;
    const Price = <div className="day-price">{getPrice(day)}</div>;
    return (
      <>
        <div className="day-number">{format(day, "d")}</div>
        {isBefore(day, new Date(currentDate.getTime() - 1 * 24 * 60 * 60 * 1000))
          ? EmptyPrice
          : Price}
      </>
    );
  }

  return (
    <React.Fragment>
      <Box>
        <DateRange
          editableDateInputs={true}
          onChange={handleSelect}
          months={2}
          ranges={selectedDateRange}
          minDate={
            selectedDateRange[0].startDate.getTime() === selectedDateRange[0].endDate.getTime()
              ? selectedDateRange[0].startDate
              : new Date()
          }
          maxDate={
            selectedDateRange[0].startDate.getTime() === selectedDateRange[0].endDate.getTime()
              ? addDays(
                  selectedDateRange[0].startDate,
                  landingForm.landingConfig.searchForm.bookingDateRange
                )
              : new Date("2023-05-31")
          }
          rangeColors={rangeColors}
          direction="horizontal"
          calendarFocus={"forwards"}
          dayContentRenderer={customDayContent}
          fixedHeight={true}
          showPreview={false}
          preventSnapRefocus={true}
          showMonthAndYearPickers={false}
        />
        <Divider />
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-end",
            flexDirection: "column",
            padding: "0.5rem 0.5rem",
          }}
        >
          <Box sx={{ display: "flex", gap: "2rem", alignItems: "start" }}>
            <Typography marginTop={"1rem"}>
              {isSameDay(selectedDateRange[0].startDate, selectedDateRange[0].endDate)
                ? ""
                : `from ${selectedCurrency.symbol} ${(
                    selectedCurrency.rate * minimumNightlyPrice
                  ).toFixed(1)}/night`}
            </Typography>
            <Button
              onClick={handleSubmit}
              disabled={isSameDay(selectedDateRange[0].startDate, selectedDateRange[0].endDate)}
              sx={{
                backgroundColor: "#26266D",
                "&:hover": { backgroundColor: "#26266D" },
                margin: "1rem 0 0.5rem",
                maxWidth: "10rem",
                fontSize: "0.875rem",
                padding: "0.75rem 1.25rem",
              }}
              variant="contained"
            >
              Apply Dates
            </Button>
          </Box>
          {showAlertMessage ? (
            <Box>
              <Typography color={"#D0182B"} fontSize={"0.875rem"}>
                Please select end date. Max.
              </Typography>
              <Typography color={"#D0182B"} fontSize={"0.875rem"}>
                {`length of stay: ${landingForm.landingConfig.searchForm.bookingDateRange} days`}
              </Typography>
            </Box>
          ) : (
            <></>
          )}
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default DateRangeCalendar;
