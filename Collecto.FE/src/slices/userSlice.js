import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUserIdFromSession: (state) => {
      const userId = sessionStorage.getItem("userId");
      return userId;
    },
    clearUserId: () => null,
  },
});

export const { setUserIdFromSession, clearUserId } = userSlice.actions;

export default userSlice.reducer;
