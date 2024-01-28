import { createReducer } from "@reduxjs/toolkit";

const initialState = {}
export const CountriesReducer = createReducer(initialState, {
   
    COUNTRIES_GET_SUCCESS: (state, action) => {
        state.loading = false
        state.GetCountries = action.payload
    },
    COUNTRIES_GET_FAILED: (state, action) => {
        state.loading = false
        state.GetCountries = undefined
        state.error = action.payload
    },

})