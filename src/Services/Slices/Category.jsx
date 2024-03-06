import { createSlice } from "@reduxjs/toolkit";
import { category } from "../API/Category";

export const categorySlice = createSlice({
  name: "category",
  initialState: {},
  reducers: {
    // Define synchronous reducers here if needed
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        category.endpoints.GetCategories.matchFulfilled,
        (state, action) => {
          state.categories = action.payload;
        }
      )
      .addMatcher(
        category.endpoints.CreateCategory.matchFulfilled,
        (state, action) => {
          state.create = action.payload;
        }
      )
      .addMatcher(
        category.endpoints.UpdateCategory.matchFulfilled,
        (state, action) => {
          state.update = action.payload;
        }
      )
      .addMatcher(
        category.endpoints.DeleteCategory.matchFulfilled,
        (state, action) => {
          state.delete = action.payload;
        }
      );
  },
});

export default categorySlice.reducer;
