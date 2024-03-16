import { createSlice } from "@reduxjs/toolkit";
import { address } from "../API/Address";

export const addressSlice = createSlice({
  name: "address",
  initialState: {},
  reducers: {
    // Define synchronous reducers here if needed
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        address.endpoints.GetAddresss.matchFulfilled,
        (state, action) => {
          state.addresss = action.payload;
        }
      )
      .addMatcher(
        address.endpoints.CreateAddress.matchFulfilled,
        (state, action) => {
          state.create = action.payload;
        }
      )
      .addMatcher(
        address.endpoints.UpdateAddress.matchFulfilled,
        (state, action) => {
          state.update = action.payload;
        }
      )
      .addMatcher(
        address.endpoints.DeleteAddress.matchFulfilled,
        (state, action) => {
          state.delete = action.payload;
        }
      );
  },
});

export default addressSlice.reducer;
