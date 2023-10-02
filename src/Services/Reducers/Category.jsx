import { createReducer } from "@reduxjs/toolkit";

const initialState = {}
export const CategoryReducer = createReducer(initialState, {
    CATEGORY_CREATE_REQUEST: (state) => {
        state.loading = true
    },
    CATEGORY_CREATE_SUCCESS: (state, action) => {
        state.loading = false
        state.AddCategory = action.payload.data
    },
    CATEGORY_CREATE_FAILED: (state, action) => {
        state.loading = false
        state.AddCategory = undefined
        state.error = action.payload.error
    },
    CATEGORY_GET_REQUEST: (state) => {
        state.loading = true
    },
    CATEGORY_GET_SUCCESS: (state, action) => {
        state.loading = false
        state.GetCategory = action.payload.data
    },
    CATEGORY_GET_FAILED: (state, action) => {
        state.loading = false
        state.GetCategory = undefined
        state.error = action.payload.error
    },
    CATEGORY_EDIT_REQUEST: (state) => {
        state.loading = true
    },
    CATEGORY_EDIT_SUCCESS: (state, action) => {
        state.loading = false
        state.EditCategory = action.payload.data
    },
    CATEGORY_EDIT_FAILED: (state, action) => {
        state.loading = false
        state.EditCategory = undefined
        state.error = action.payload.error
    },
    CATEGORY_DELETE_RECOVER_REQUEST: (state) => {
        state.loading = true
    },
    CATEGORY_DELETE_RECOVER_SUCCESS: (state, action) => {
        state.loading = false
        state.DeleteRecoverCategory = action.payload.data
    },
    CATEGORY_DELETE_RECOVER_FAILED: (state, action) => {
        state.loading = false
        state.DeleteRecoverCategory = undefined
        state.error = action.payload.error
    }

})