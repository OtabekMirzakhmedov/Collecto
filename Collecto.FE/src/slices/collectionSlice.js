import { createSlice } from "@reduxjs/toolkit";

const collectionSlice = createSlice({
  name: "collection",
  initialState: null,
  reducers: {
    setCollection: (state, action) => {
      return action.payload;
    },
    clearCollection: (state) => {
      return null;
    },
  },
});

export const { setCollection, clearCollection } = collectionSlice.actions;
export default collectionSlice.reducer;
