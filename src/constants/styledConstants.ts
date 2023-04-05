// -------------------------------------------------- Room Section---------------------------------------------
export const roomCardList = {
  display: "flex",
  flexWrap: "wrap",
  flexDirection: { xs: "column", md: "row" },
  alignItems: "center",
  columnGap: "3rem",
  rowGap: "2rem",
  justifyContent: "space-between",
};

export const roomSectionContainer = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "0.7rem",
  flexDirection: { xs: "column", sm: "row" },
};

export const roomSectionRight = {
  display: "flex",
  columnGap: "1rem",
  rowGap: "0",
  alignItems: "center",
  flexDirection: { xs: "column", sm: "row" },
};

// ----------------------------------------------------------------------------------------------------------------

// -------------------------------------------------------- Room Card Modal ------------------------------------------
export const roomTypeName = {
  position: "absolute",
  bottom: "1rem",
  left: "5%",
  fontWeight: "800",
  textTransform: "capitalize",
};
// --------------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------- Promotion Card-------------------------------------------------
export const promotionBoxStyle = {
  display: { md: "grid", sm: "block" },
  gridTemplateColumns: "70% 1fr",
  boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.1)",
  border: "1px solid #EFF0F1",
  maxWidth: { xl: "45w", lg: "50vw", md: "60vw" },
};
// --------------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------- Landing-------------------------------------------------
export const searchButtonStyle = {
  backgroundColor: "#26266D",
  "&:hover": { backgroundColor: "#26266D" },
  display: "flex",
  padding: "0.75rem 1.25rem",
  margin: { md: "5rem auto 3rem auto", xs: "4rem auto 3rem auto" },
  width: "10rem",
};
// --------------------------------------------------------------------------------------------------------------------------

// ----------------------------------------------------------Checkout------------------------------------------------------
export const checkOutContainerStyle = {
  padding: "0 1.5rem",
  margin: "3.43rem 0",
  display: "grid",
  gridTemplateColumns: "58.4% 1fr",
  columnGap: "8.35rem",
  minHeight: "50vh",
};

// ----------------------------------------------------------Itinerary-Card------------------------------------------------------
export const itineraryButtonStyle = {
  display: "flex",
  margin: "33px auto 0 auto",
  padding: "0.75rem 0.5rem",
  width: "60%",
  fontSize: "0.875rem",
  color: "#26266D",
  border: "3px solid #26266D ",
  "&:hover": { color: "#fff", backgroundColor: "#26266D", border: "3px solid #26266D " },
};