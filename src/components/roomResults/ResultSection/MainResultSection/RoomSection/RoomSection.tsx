import {
  Alert,
  Box,
  CircularProgress,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import React, { useMemo } from "react";
import { setPageNumber, setSort } from "../../../../../redux/reducers/roomResultConfigDataSlice";
import { useAppDispatch, useAppSelector } from "../../../../../redux/store";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import "./roomSection.scss";
import RoomCardNew from "./RoomCard/RoomCardNew";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const RoomSection = () => {
  const sorts = useAppSelector((state) => state.resultsConfiguration.sorts);
  const roomResults = useAppSelector((state) => state.resultsConfiguration);
  const { t } = useTranslation();
  // console.log("sort to send", roomResults.sortToSend);
  const roomData = useAppSelector((state) => state.resultsConfiguration.roomTypeList);
  // console.log("room Data from graphql", roomData);
  const currentPageNumber = roomResults.selectedPage;
  const navigate = useNavigate();
  const reduxDispatch = useAppDispatch();
  const location = useLocation();
  const params = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const handleForward = () => {
    let pageNumber = currentPageNumber + 1;
    params.set("page", `${pageNumber}`);
    localStorage.setItem("page", `${pageNumber}`);
    reduxDispatch(setPageNumber(currentPageNumber + 1));
    navigate(`/room-search-results?${params.toString()}`);
  };
  const handleBackward = () => {
    if (currentPageNumber > 1) {
      let pageNumber = currentPageNumber - 1;
      params.set("page", `${pageNumber}`);
      localStorage.setItem("page", `${pageNumber}`);
      reduxDispatch(setPageNumber(currentPageNumber - 1));
      navigate(`/room-search-results?${params.toString()}`);
    }
  };
  const handleChange = (event: SelectChangeEvent) => {
    reduxDispatch(setSort(event.target.value));
  };

  return (
    <Box sx={{ width: "100%" }} className={"room-section"}>
      <Box
        className={"room-title"}
        sx={{ display: "flex", justifyContent: "space-between", marginBottom: "0.7rem" }}
      >
        <Typography fontWeight={700} fontSize="1.25rem" sx={{ padding: "0.5rem 0" }}>
          {t("Room Results")}
        </Typography>
        <Box sx={{ display: "flex", gap: "2rem", alignItems: "center" }}>
          <Box onClick={handleBackward}>
            <ChevronLeftIcon fontSize="small" />
          </Box>
          <Typography fontWeight={700} fontSize="1" sx={{ padding: "0.5rem 0" }}>
            {`Page ${roomResults.selectedPage} of  ${roomResults.totalNumberOfData} Results`}
          </Typography>
          <Box onClick={handleForward}>
            <ChevronRightIcon fontSize="small" />
          </Box>
          <Typography fontWeight={400} fontSize={"1.5rem"} color={"#5d5d5d"}>|</Typography>
          <FormControl
            sx={{ width: roomResults.selectedSortName === "" ? "5rem" : "9rem" }}
            variant="outlined"
          >
            <Select
              className="sorting"
              name="sort"
              displayEmpty={true}
              defaultValue=""
              IconComponent={KeyboardArrowDownIcon}
              renderValue={
                roomResults.selectedSortName === ""
                  ? () => <Typography fontWeight={700}>Sort</Typography>
                  : () => (
                      <Typography
                        fontWeight={700}
                      >{`${roomResults.selectedSortName}->${roomResults.selectedSortValue}`}</Typography>
                    )
              }
              onChange={handleChange}
              style={{ width: "100%", height: "30px" }}
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "0 none",
                },
              }}
            >
              {sorts.map((sort) => {
                return (
                  sort.show &&
                  sort.options.map((option) => {
                    return (
                      <MenuItem
                        key={`${sort.sortName}+${option}`}
                        value={`${sort.sortName}#${option}`}
                      >{`${sort.sortName} -> ${option}`}</MenuItem>
                    );
                  })
                );
              })}
            </Select>
          </FormControl>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "2rem",
        }}
        className={"room-card-list"}
      >
        {roomResults.roomResultsLoading ? (
          <Box sx={{ height: "30vh" }}>
            <CircularProgress />
          </Box>
        ) : roomResults.isError || roomResults.roomTypeList.length === 0 ? (
          <Box sx={{ height: "25vh", width: "100%" }}>
            <Alert severity="error">
              Unable to get the Room Result data. Please modify your search.
            </Alert>
          </Box>
        ) : (
          roomData.map((room, index) => {
            return <RoomCardNew key={index} room={room} />;
          })
        )}
      </Box>
    </Box>
  );
};

export default RoomSection;
