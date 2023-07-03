import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: !!localStorage.getItem("jwtToken"),
  token: localStorage.getItem("jwtToken"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      localStorage.setItem("jwtToken", action.payload.token); // Store the token in localStorage
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.token = null;
      localStorage.removeItem("jwtToken"); // Remove the token from localStorage
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;

export default authSlice.reducer;
