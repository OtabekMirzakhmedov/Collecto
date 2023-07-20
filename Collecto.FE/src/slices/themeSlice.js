// themeSlice.js
import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "theme",
  initialState: localStorage.getItem("theme") || "light",
  reducers: {
    toggleTheme: (state) => {
      const newTheme = state === "dark" ? "light" : "dark";
      localStorage.setItem("theme", newTheme);
      return newTheme;
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
