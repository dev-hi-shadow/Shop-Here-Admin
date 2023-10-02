import { createReducer } from "@reduxjs/toolkit";

const initialState = {}
export const ProductReducer = createReducer(initialState, {
    PRODUCT_CREATE_REQUEST: (state) => {
        state.loading = true
    },
    PRODUCT_CREATE_SUCCESS: (state, action) => {
        state.loading = false
        state.AddProduct = action.payload.data
    },
    PRODUCT_CREATE_FAILED: (state, action) => {
        state.loading = false
        state.AddProduct = undefined
        state.error = action.payload.error
    },
    PRODUCT_GET_REQUEST: (state) => {
        state.loading = true
    },
    PRODUCT_GET_SUCCESS: (state, action) => {
        state.loading = false
        state.GetProduct = action.payload.data
    },
    PRODUCT_GET_FAILED: (state, action) => {
        state.loading = false
        state.GetProduct = undefined
        state.error = action.payload.error
    },
    PRODUCT_EDIT_REQUEST: (state) => {
        state.loading = true
    },
    PRODUCT_EDIT_SUCCESS: (state, action) => {
        state.loading = false
        state.EditProduct = action.payload.data
    },
    PRODUCT_EDIT_FAILED: (state, action) => {
        state.loading = false
        state.EditProduct = undefined
        state.error = action.payload.error
    },
    PRODUCT_DELETE_RECOVER_REQUEST: (state) => {
        state.loading = true
    },
    PRODUCT_DELETE_RECOVER_SUCCESS: (state, action) => {
        state.loading = false
        state.DeleteRecoverProduct = action.payload.data
    },
    PRODUCT_DELETE_RECOVER_FAILED: (state, action) => {
        state.loading = false
        state.DeleteRecoverProduct = undefined
        state.error = action.payload.error
    }

})