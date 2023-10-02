import { createReducer } from "@reduxjs/toolkit";

const initialState = {}
export const UnitReducer = createReducer(initialState, {
    UNIT_CREATE_REQUEST: (state) => {
        state.loading = true
    },
    UNIT_CREATE_SUCCESS: (state, action) => {
        state.loading = false
        state.AddUnit = action.payload.data
    },
    UNIT_CREATE_FAILED: (state, action) => {
        state.loading = false
        state.AddUnit = undefined
        state.error = action.payload.error
    },
    UNIT_GET_REQUEST: (state) => {
        state.loading = true
    },
    UNIT_GET_SUCCESS: (state, action) => {
        state.loading = false
        state.GetUnit = action.payload.data
    },
    UNIT_GET_FAILED: (state, action) => {
        state.loading = false
        state.GetUnit = undefined
        state.error = action.payload.error
    },
    UNIT_EDIT_REQUEST: (state) => {
        state.loading = true
    },
    UNIT_EDIT_SUCCESS: (state, action) => {
        state.loading = false
        state.EditUnit = action.payload.data
    },
    UNIT_EDIT_FAILED: (state, action) => {
        state.loading = false
        state.EditUnit = undefined
        state.error = action.payload.error
    },
    UNIT_DELETE_RECOVER_REQUEST: (state) => {
        state.loading = true
    },
    UNIT_DELETE_RECOVER_SUCCESS: (state, action) => {
        state.loading = false
        state.DeleteRecoverUnit = action.payload.data
    },
    UNIT_DELETE_RECOVER_FAILED: (state, action) => {
        state.loading = false
        state.DeleteRecoverUnit = undefined
        state.error = action.payload.error
    }

})