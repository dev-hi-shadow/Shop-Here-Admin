import { createSlice } from "@reduxjs/toolkit";
import { tax } from "../API/Tax";

export const taxSlice = createSlice({
  name: "tax",
  initialState: {},
  reducers: {
    // Define synchronous reducers here if needed
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(tax.endpoints.GetTaxes.matchFulfilled, (state, action) => {
        state.taxs = action.payload;
      })
      .addMatcher(tax.endpoints.CreateTax.matchFulfilled, (state, action) => {
        state.create = action.payload;
      })
      .addMatcher(tax.endpoints.UpdateTax.matchFulfilled, (state, action) => {
        state.update = action.payload;
      })
      .addMatcher(tax.endpoints.DeleteTax.matchFulfilled, (state, action) => {
        state.delete = action.payload;
      });
  },
});

export default taxSlice.reducer;
