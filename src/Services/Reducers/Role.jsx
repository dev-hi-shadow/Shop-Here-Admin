import { createReducer } from "@reduxjs/toolkit";

const initialState = {}
export const RoleReducer = createReducer(initialState, {
    ROLE_CREATE_REQUEST: (state) => {
        state.loading = true
    },
    ROLE_CREATE_SUCCESS: (state, action) => {
        state.loading = false
        state.AddRole = action.payload.data
    },
    ROLE_CREATE_FAILED: (state, action) => {
        state.loading = false
        state.AddRole = undefined
        state.error = action.payload.error
    },
    ROLE_GET_REQUEST: (state) => {
        state.loading = true
    },
    ROLE_GET_SUCCESS: (state, action) => {
        state.loading = false
        state.GetRole = action.payload.data
    },
    ROLE_GET_FAILED: (state, action) => {
        state.loading = false
        state.GetRole = undefined
        state.error = action.payload.error
    },
    ROLE_EDIT_REQUEST: (state) => {
        state.loading = true
    },
    ROLE_EDIT_SUCCESS: (state, action) => {
        state.loading = false
        state.EditRole = action.payload.data
    },
    ROLE_EDIT_FAILED: (state, action) => {
        state.loading = false
        state.EditRole = undefined
        state.error = action.payload.error
    },
    ROLE_DELETE_RECOVER_REQUEST: (state) => {
        state.loading = true
    },
    ROLE_DELETE_RECOVER_SUCCESS: (state, action) => {
        state.loading = false
        state.DeleteRecoverRole = action.payload.data
    },
    ROLE_DELETE_RECOVER_FAILED: (state, action) => {
        state.loading = false
        state.DeleteRecoverRole = undefined
        state.error = action.payload.error
    }

})