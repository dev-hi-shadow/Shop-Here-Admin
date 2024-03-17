import { createSlice } from "@reduxjs/toolkit";
import { subcategory_tax } from "../API/SubCategotyTax";

export const SubCategoryTaxSlice = createSlice({
  name: "subcategory_tax",
  initialState: {},
  reducers: {
    // Define synchronous reducers here if needed
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        subcategory_tax.endpoints.GetSubCategoriesTax.matchFulfilled,
        (state, action) => {
          state.categories = action.payload;
        }
      )
      .addMatcher(
        subcategory_tax.endpoints.CreateSubCategoryTax.matchFulfilled,
        (state, action) => {
          state.create = action.payload;
        }
      )
      .addMatcher(
        subcategory_tax.endpoints.UpdateSubCategoryTax.matchFulfilled,
        (state, action) => {
          state.update = action.payload;
        }
      )
      .addMatcher(
        subcategory_tax.endpoints.DeleteSubCategoryTax.matchFulfilled,
        (state, action) => {
          state.delete = action.payload;
        }
      );
  },
});

export default SubCategoryTaxSlice.reducer;
