import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: !!sessionStorage.getItem("jwtToken"),
  token: sessionStorage.getItem("jwtToken"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      sessionStorage.setItem("jwtToken", action.payload.token);
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.token = null;
      sessionStorage.removeItem("jwtToken");
      sessionStorage.removeItem("role");
      sessionStorage.removeItem("userId");
      sessionStorage.removeItem("fullName");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;

export default authSlice.reducer;
