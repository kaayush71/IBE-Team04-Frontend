import { createSlice } from "@reduxjs/toolkit";

interface State {
  selectedLanguage: string;
  supportedLanguage: string[];
}

const initialState: State = {
  selectedLanguage: "",
  supportedLanguage: ["en", "fr"],
};

export const languageDataSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setSelectedLanguage: (state, action) => {
      state.selectedLanguage = action.payload;
    },
  },
});

export default languageDataSlice.reducer;
export const { setSelectedLanguage } = languageDataSlice.actions;
