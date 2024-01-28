import { createReducer } from "@reduxjs/toolkit";

const initialState = {}
export const TaxReducer = createReducer(initialState, {
    TAX_CREATE_REQUEST: (state) => {
        state.loading = true
    },
    TAX_CREATE_SUCCESS: (state, action) => {
        state.loading = false
        state.AddTax = action.payload.data
    },
    TAX_CREATE_FAILED: (state, action) => {
        state.loading = false
        state.AddTax = undefined
        state.error = action.payload.error
    },
    TAX_GET_REQUEST: (state) => {
        state.loading = true
    },
    TAX_GET_SUCCESS: (state, action) => {
        state.loading = false
        state.GetTax = action.payload.data
    },
    TAX_GET_FAILED: (state, action) => {
        state.loading = false
        state.GetTax = undefined
        state.error = action.payload.error
    },
    TAX_EDIT_REQUEST: (state) => {
        state.loading = true
    },
    TAX_EDIT_SUCCESS: (state, action) => {
        state.loading = false
        state.EditTax = action.payload.data
    },
    TAX_EDIT_FAILED: (state, action) => {
        state.loading = false
        state.EditTax = undefined
        state.error = action.payload.error
    },
    TAX_DELETE_RECOVER_REQUEST: (state) => {
        state.loading = true
    },
    TAX_DELETE_RECOVER_SUCCESS: (state, action) => {
        state.loading = false
        state.DeleteRecoverTax = action.payload.data
    },
    TAX_DELETE_RECOVER_FAILED: (state, action) => {
        state.loading = false
        state.DeleteRecoverTax = undefined
        state.error = action.payload.error
    }

})