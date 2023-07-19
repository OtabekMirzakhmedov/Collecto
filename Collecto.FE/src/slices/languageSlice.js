import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  language: sessionStorage.getItem("language") || "en",
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;
      sessionStorage.setItem("language", action.payload);
    },
  },
});

export const { setLanguage } = languageSlice.actions;

export default languageSlice.reducer;
