import { createSlice } from "@reduxjs/toolkit";
import { auth } from "../API/Auth";

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
    builder.addMatcher(auth.endpoints.logout.matchFulfilled, (state) => {
      state.user = null;
      state.logout = true;
    });
  },
});
export default authSlice.reducer;

export const LoginAction = (state) => state.authSlice.user;
export const SignUpAction = (state) => state.authSlice.user;
