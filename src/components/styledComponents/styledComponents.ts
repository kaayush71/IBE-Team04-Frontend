import { Button, Divider, Typography } from "@mui/material";
import { styled } from "@mui/system";

export const StyledButton = styled(Button)((props) => ({
  backgroundColor: "#26266D",
  "&:hover": { backgroundColor: "#26266D" },
  padding: "0.75rem 1.25rem",
  width: "100%",
  marginTop: "0.5rem",
  fontSize: "0.875rem",
}));

export const StyledButtonNoMargin = styled(Button)((props) => ({
  backgroundColor: "#26266D",
  "&:hover": { backgroundColor: "#26266D" },
  padding: "0.75rem 1.25rem",
  width: "100%",
  fontSize: "0.875rem",
}));

export const TypographyGrey = styled(Typography)((props) => ({
  color: "#5D5D5D",
  fontWeight: "400",
}));

export const StyledDivider = styled(Divider)((props) => ({
  margin: "0.5rem 0",
  color: "#5D5D5D",
  borderWidth: "1px",
}));

export const StyledDividerBlack = styled(Divider)((props) => ({
  margin: "1.375rem 0",
  borderWidth: "0.1px",
  borderColor: "black",
}));
