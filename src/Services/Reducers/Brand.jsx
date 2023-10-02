import { createReducer } from "@reduxjs/toolkit";

const initialState = {}
export const BrandReducer = createReducer(initialState, {
    BRAND_CREATE_REQUEST: (state) => {
        state.loading = true
    },
    BRAND_CREATE_SUCCESS: (state, action) => {
        state.loading = false
        state.AddBrand = action.payload.data
    },
    BRAND_CREATE_FAILED: (state, action) => {
        state.loading = false
        state.AddBrand = undefined
        state.error = action.payload.error
    },
    BRAND_GET_REQUEST: (state) => {
        state.loading = true
    },
    BRAND_GET_SUCCESS: (state, action) => {
        state.loading = false
        state.GetBrand = action.payload.data
    },
    BRAND_GET_FAILED: (state, action) => {
        state.loading = false
        state.GetBrand = undefined
        state.error = action.payload.error
    },
    BRAND_EDIT_REQUEST: (state) => {
        state.loading = true
    },
    BRAND_EDIT_SUCCESS: (state, action) => {
        state.loading = false
        state.EditBrand = action.payload.data
    },
    BRAND_EDIT_FAILED: (state, action) => {
        state.loading = false
        state.EditBrand = undefined
        state.error = action.payload.error
    },
    BRAND_DELETE_RECOVER_REQUEST: (state) => {
        state.loading = true
    },
    BRAND_DELETE_RECOVER_SUCCESS: (state, action) => {
        state.loading = false
        state.DeleteRecoverBrand = action.payload.data
    },
    BRAND_DELETE_RECOVER_FAILED: (state, action) => {
        state.loading = false
        state.DeleteRecoverBrand = undefined
        state.error = action.payload.error
    }

})