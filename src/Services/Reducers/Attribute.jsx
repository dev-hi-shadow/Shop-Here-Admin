import { createReducer } from "@reduxjs/toolkit";

const initialState = {}
export const AttributeReducer = createReducer(initialState, {
    ATTRIBUTE_CREATE_REQUEST: (state) => {
        state.loading = true
    },
    ATTRIBUTE_CREATE_SUCCESS: (state, action) => {
        state.loading = false
        state.AddAttribute = action.payload.data
    },
    ATTRIBUTE_CREATE_FAILED: (state, action) => {
        state.loading = false
        state.AddAttribute = undefined
        state.error = action.payload.error
    },
    ATTRIBUTE_GET_REQUEST: (state) => {
        state.loading = true
    },
    ATTRIBUTE_GET_SUCCESS: (state, action) => {
        state.loading = false
        state.GetAttribute = action.payload.data
    },
    ATTRIBUTE_GET_FAILED: (state, action) => {
        state.loading = false
        state.GetAttribute = undefined
        state.error = action.payload.error
    },
    ATTRIBUTE_EDIT_REQUEST: (state) => {
        state.loading = true
    },
    ATTRIBUTE_EDIT_SUCCESS: (state, action) => {
        state.loading = false
        state.EditAttribute = action.payload.data
    },
    ATTRIBUTE_EDIT_FAILED: (state, action) => {
        state.loading = false
        state.EditAttribute = undefined
        state.error = action.payload.error
    },
    ATTRIBUTE_DELETE_RECOVER_REQUEST: (state) => {
        state.loading = true
    },
    ATTRIBUTE_DELETE_RECOVER_SUCCESS: (state, action) => {
        state.loading = false
        state.DeleteRecoverAttribute = action.payload.data
    },
    ATTRIBUTE_DELETE_RECOVER_FAILED: (state, action) => {
        state.loading = false
        state.DeleteRecoverAttribute = undefined
        state.error = action.payload.error
    },

    ATTRIBUTE_DELETE_VALUE_REQUEST: (state) => {
        state.loading = true
    },
    ATTRIBUTE_DELETE_VALUE_SUCCESS: (state, action) => {
        state.loading = false
        state.DeleteAttributeValue = action.payload.data
    },
    ATTRIBUTE_DELETE_VALUE_FAILED: (state, action) => {
        state.loading = false
        state.DeleteAttributeValue = undefined
        state.error = action.payload.error
    },
    ATTRIBUTE_ADD_VALUE_REQUEST: (state) => {
        state.loading = true
    },
    ATTRIBUTE_ADD_VALUE_SUCCESS: (state, action) => {
        state.loading = false
        state.AddAttributeValue = action.payload.data
    },
    ATTRIBUTE_ADD_VALUE_FAILED: (state, action) => {
        state.loading = false
        state.AddAttributeValue = undefined
        state.error = action.payload.error
    }
})