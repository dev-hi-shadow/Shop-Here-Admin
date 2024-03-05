import { createSlice } from "@reduxjs/toolkit";
import {auth} from "../API/auth";

export const authSlice = createSlice({
  name: "auth",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      auth.endpoints.profile.matchFulfilled,
      (state, action) => {
        state.user = action.payload;
      }
    );
  },
});
export default authSlice.reducer;

export const LoginAction = (state) => state.authSlice.user;
