import { createReducer } from "@reduxjs/toolkit";

const initialState = {}
export const SubCategoryReducer = createReducer(initialState, {
    SUBCATEGORY_CREATE_REQUEST: (state) => {
        state.loading = true
    },
    SUBCATEGORY_CREATE_SUCCESS: (state, action) => {
        state.loading = false
        state.AddSubCategory = action.payload.data
    },
    SUBCATEGORY_CREATE_FAILED: (state, action) => {
        state.loading = false
        state.AddSubCategory = undefined
        state.error = action.payload.error
    },
    SUBCATEGORY_GET_REQUEST: (state) => {
        state.loading = true
    },
    SUBCATEGORY_GET_SUCCESS: (state, action) => {
        state.loading = false
        state.GetSubCategory = action.payload.data
    },
    SUBCATEGORY_GET_FAILED: (state, action) => {
        state.loading = false
        state.GetSubCategory = undefined
        state.error = action.payload.error
    },
    SUBCATEGORY_EDIT_REQUEST: (state) => {
        state.loading = true
    },
    SUBCATEGORY_EDIT_SUCCESS: (state, action) => {
        state.loading = false
        state.EditSubCategory = action.payload.data
    },
    SUBCATEGORY_EDIT_FAILED: (state, action) => {
        state.loading = false
        state.EditSubCategory = undefined
        state.error = action.payload.error
    },
    SUBCATEGORY_DELETE_RECOVER_REQUEST: (state) => {
        state.loading = true
    },
    SUBCATEGORY_DELETE_RECOVER_SUCCESS: (state, action) => {
        state.loading = false
        state.DeleteRecoverSubCategory = action.payload.data
    },
    SUBCATEGORY_DELETE_RECOVER_FAILED: (state, action) => {
        state.loading = false
        state.DeleteRecoverSubCategory = undefined
        state.error = action.payload.error
    }

})