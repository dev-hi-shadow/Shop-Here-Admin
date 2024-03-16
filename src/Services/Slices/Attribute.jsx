import { createSlice } from "@reduxjs/toolkit";
import { attribute } from "../API/Attribute";

export const attributeSlice = createSlice({
  name: "attribute",
  initialState: {},
  reducers: {
    // Define synchronous reducers here if needed
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(attribute.endpoints.GetAttributes.matchFulfilled, (state, action) => {
        state.attributes = action.payload;
      })
      .addMatcher(
        attribute.endpoints.CreateAttribute.matchFulfilled,
        (state, action) => {
          state.create = action.payload;
        }
      )
      .addMatcher(
        attribute.endpoints.UpdateAttribute.matchFulfilled,
        (state, action) => {
          state.update = action.payload;
        }
      )
      .addMatcher(
        attribute.endpoints.DeleteAttribute.matchFulfilled,
        (state, action) => {
          state.delete = action.payload;
        }
      );
  },
});

export default attributeSlice.reducer;
