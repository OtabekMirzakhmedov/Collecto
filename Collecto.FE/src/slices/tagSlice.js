import { createSlice } from "@reduxjs/toolkit";

const tagSlice = createSlice({
  name: "tag",
  initialState: null,
  reducers: {
    setTag: (state, action) => {
      return action.payload;
    },
    clearTag: (state) => {
      return null;
    },
  },
});

export const { setTag, clearTag } = tagSlice.actions;

export default tagSlice.reducer;
