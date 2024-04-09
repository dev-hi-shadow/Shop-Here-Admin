import { createSlice } from "@reduxjs/toolkit";
import { faq } from "../API/Faqs";

export const faqSlice = createSlice({
  name: "faq",
  initialState: {},
  reducers: {
    // Define synchronous reducers here if needed
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(faq.endpoints.GetFaqs.matchFulfilled, (state, action) => {
        state.faqs = action.payload;
      })
      .addMatcher(
        faq.endpoints.CreateFaq.matchFulfilled,
        (state, action) => {
          state.create = action.payload;
        }
      )
      .addMatcher(
        faq.endpoints.UpdateFaq.matchFulfilled,
        (state, action) => {
          state.update = action.payload;
        }
      )
      .addMatcher(
        faq.endpoints.DeleteFaq.matchFulfilled,
        (state, action) => {
          state.delete = action.payload;
        }
      );
  },
});

export default faqSlice.reducer;
