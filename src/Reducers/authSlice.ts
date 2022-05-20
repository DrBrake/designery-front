import { createSlice } from "@reduxjs/toolkit";
import { dataAPI } from "../Services/dataAPI";

interface AuthSlice {
  auth: {
    token: string | null;
  };
}

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
  },
  reducers: {
    logout: (state) => {
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      dataAPI.endpoints.postLogin.matchFulfilled,
      (state, action) => {
        state.token = action.payload.token;
      }
    );
  },
});

export const selectToken = (state: AuthSlice) => state.auth.token;

export const { logout } = authSlice.actions;
export default authSlice.reducer;
