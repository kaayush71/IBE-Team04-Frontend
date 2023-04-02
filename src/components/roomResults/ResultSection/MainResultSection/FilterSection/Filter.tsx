import { Box, Checkbox, ListItemIcon, ListItemText, MenuItem, Typography } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React from "react";
import "./filter.scss";
import { useAppDispatch, useAppSelector } from "../../../../../redux/store";
import { setFilter } from "../../../../../redux/reducers/roomResultConfigDataSlice";
import { useTranslation } from "react-i18next";

const Filter = () => {
  const filters = useAppSelector((state) => state.resultsConfiguration.filters);
  const reduxDispatch = useAppDispatch();
  const { t } = useTranslation();
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
