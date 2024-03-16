import { createSlice } from "@reduxjs/toolkit";
import { unit } from "../API/Unit";

export const unitSlice = createSlice({
  name: "unit",
  initialState: {},
  reducers: {
    // Define synchronous reducers here if needed
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(unit.endpoints.GetUnits.matchFulfilled, (state, action) => {
        state.units = action.payload;
      })
      .addMatcher(unit.endpoints.CreateUnit.matchFulfilled, (state, action) => {
        state.create = action.payload;
      })
      .addMatcher(unit.endpoints.UpdateUnit.matchFulfilled, (state, action) => {
        state.update = action.payload;
      })
      .addMatcher(unit.endpoints.DeleteUnit.matchFulfilled, (state, action) => {
        state.delete = action.payload;
      });
  },
});

export default unitSlice.reducer;
