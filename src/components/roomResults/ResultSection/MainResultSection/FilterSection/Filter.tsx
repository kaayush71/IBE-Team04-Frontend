/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Checkbox, ListItemIcon, ListItemText, MenuItem, Typography } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React, { useEffect, useMemo, useRef } from "react";
import "./filter.scss";
import { useAppDispatch, useAppSelector } from "../../../../../redux/store";
import { setFilter } from "../../../../../redux/reducers/roomResultConfigDataSlice";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

const Filter = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const filters = useAppSelector((state) => state.resultsConfiguration.filters);
  const reduxDispatch = useAppDispatch();
  const { t } = useTranslation();
  const formData = JSON.parse(localStorage.getItem("formData") || "{}");
  const previousFormDataRef = useRef(formData);
  useEffect(() => {
    if (formData === "{}" || formData === previousFormDataRef.current) {
      return;
    } else {
      if (filters !== undefined) {
        filters.forEach((filter: any) => {
          if (filter.show === true) {
            if (filter.selectedOptions.length !== 0)
              searchParams.set(`${filter.filterName}`, `${filter.selectedOptions}`);
            else {
              searchParams.delete(`${filter.filterName}`);
            }
          }
        });
        navigate(`/room-search-results?${searchParams.toString()}`);
      }
    }
    previousFormDataRef.current = formData;
  }, [filters, navigate, searchParams]);

  const handleClick = (filterData: any) => {
    reduxDispatch(setFilter(filterData));
  };

  return (
    <Box
      sx={{
        backgroundColor: "#EFF0F1",
        padding: "1rem 1.2rem",
        minHeight: "maxContent",
      }}
    >
      <Typography fontWeight={700} fontSize="1.25rem">
        {t("Narrow Your Results")}
      </Typography>
      <div>
        {filters.map((filter) => {
          return (
            filter.show && (
              <Accordion
                key={filter.filterName}
                sx={{ boxShadow: "none", backgroundColor: "transparent" }}
              >
                <AccordionSummary
                  sx={{ padding: 0 }}
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>{t(filter.filterName)}</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ padding: "0" }}>
                  {filter.options.map((option) => {
                    return (
                      <MenuItem key={option}>
                        <ListItemIcon>
                          <Checkbox
                            onClick={() =>
                              handleClick({
                                filterName: filter.filterName,
                                option: option,
                              })
                            }
                            disabled={false}
                            checked={filter.selectedOptions?.includes(option)}
                          />
                        </ListItemIcon>
                        <ListItemText primary={t(`${option.replaceAll("_", " ")}`)} />
                      </MenuItem>
                    );
                  })}
                </AccordionDetails>
              </Accordion>
            )
          );
        })}
      </div>
    </Box>
  );
};

export default Filter;
