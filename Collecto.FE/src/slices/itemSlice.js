import { createSlice } from "@reduxjs/toolkit";

const itemSlice = createSlice({
  name: "item",
  initialState: null,
  reducers: {
    setItem: (state, action) => {
      return action.payload;
    },
    clearItem: (state) => {
      return null;
    },
  },
});

export const { setItem, clearItem } = itemSlice.actions;
export default itemSlice.reducer;
