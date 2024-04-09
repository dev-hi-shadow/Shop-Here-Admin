import { createSlice } from "@reduxjs/toolkit";
import { product } from "../API/Product";

export const productSlice = createSlice({
  name: "product",
  initialState: {},
  reducers: {
    // Define synchronous reducers here if needed
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        product.endpoints.GetProducts.matchFulfilled,
        (state, action) => {
          state.products = action.payload;
        }
      )
      .addMatcher(
        product.endpoints.GetSingleProduct.matchFulfilled,
        (state, action) => {
          state.product = action.payload;
        }
      )
      .addMatcher(
        product.endpoints.CreateProduct.matchFulfilled,
        (state, action) => {
          state.create = action.payload;
        }
      )
      .addMatcher(
        product.endpoints.UpdateProduct.matchFulfilled,
        (state, action) => {
          state.update = action.payload;
        }
      )
      .addMatcher(
        product.endpoints.DeleteProduct.matchFulfilled,
        (state, action) => {
          state.delete = action.payload;
        }
      );
  },
});

export default productSlice.reducer;
