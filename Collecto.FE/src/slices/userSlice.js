import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userId: sessionStorage.getItem("userId"),
    isAdmin: sessionStorage.getItem('role') === 'Admin',
  },
  reducers: {
    setUserIdFromSession: (state) => {
      const userId = sessionStorage.getItem("userId");
      return { ...state, userId };
    },
    setIsAdmin: (state, action) => {
      state.isAdmin = action.payload;
    },
    clearUserId: (state) => {
      state.userId = null;
      state.isAdmin = false;
    },
  },
});

export const { setUserIdFromSession, setIsAdmin, clearUserId } = userSlice.actions;


export default userSlice.reducer;
