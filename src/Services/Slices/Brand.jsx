import { createSlice } from "@reduxjs/toolkit";
import { brand } from "../API/Brand";

export const brandSlice = createSlice({
  name: "brand",
  initialState: {},
  reducers: {
    // Define synchronous reducers here if needed
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(brand.endpoints.GetBrands.matchFulfilled, (state, action) => {
        state.brands = action.payload;
      })
      .addMatcher(
        brand.endpoints.CreateBrand.matchFulfilled,
        (state, action) => {
          state.create = action.payload;
        }
      )
      .addMatcher(
        brand.endpoints.UpdateBrand.matchFulfilled,
        (state, action) => {
          state.update = action.payload;
        }
      )
      .addMatcher(
        brand.endpoints.DeleteBrand.matchFulfilled,
        (state, action) => {
          state.delete = action.payload;
        }
      );
  },
});

export default brandSlice.reducer;
