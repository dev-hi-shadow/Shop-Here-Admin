import { createSlice } from "@reduxjs/toolkit";
import { subcategory } from "../API/SubCategory";

export const subcategorySlice = createSlice({
  name: "subcategory",
  initialState: {},
  reducers: {
    // Define synchronous reducers here if needed
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        subcategory.endpoints.GetSubCategories.matchFulfilled,
        (state, action) => {
          state.categories = action.payload;
        }
      )
      .addMatcher(
        subcategory.endpoints.CreateSubCategory.matchFulfilled,
        (state, action) => {
          state.create = action.payload;
        }
      )
      .addMatcher(
        subcategory.endpoints.UpdateSubCategory.matchFulfilled,
        (state, action) => {
          state.update = action.payload;
        }
      )
      .addMatcher(
        subcategory.endpoints.DeleteSubCategory.matchFulfilled,
        (state, action) => {
          state.delete = action.payload;
        }
      );
  },
});

export default subcategorySlice.reducer;
