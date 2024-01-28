import { createReducer } from "@reduxjs/toolkit";

const initialState = {}
export const AddressesReducer = createReducer(initialState, {
    ADDRESSES_CREATE_REQUEST: (state) => {
        state.loading = true
    },
    ADDRESSES_CREATE_SUCCESS: (state, action) => {
        state.loading = false
        state.AddAddresses = action.payload.data
    },
    ADDRESSES_CREATE_FAILED: (state, action) => {
        state.loading = false
        state.AddAddresses = undefined
        state.error = action.payload.error
    },
    ADDRESSES_GET_REQUEST: (state) => {
        state.loading = true
    },
    ADDRESSES_GET_SUCCESS: (state, action) => {
        state.loading = false
        state.GetAddresses = action.payload.data
    },
    ADDRESSES_GET_FAILED: (state, action) => {
        state.loading = false
        state.GetAddresses = undefined
        state.error = action.payload.error
    },
    ADDRESSES_EDIT_REQUEST: (state) => {
        state.loading = true
    },
    ADDRESSES_EDIT_SUCCESS: (state, action) => {
        state.loading = false
        state.EditAddresses = action.payload.data
    },
    ADDRESSES_EDIT_FAILED: (state, action) => {
        state.loading = false
        state.EditAddresses = undefined
        state.error = action.payload.error
    },
    ADDRESSES_DELETE_RECOVER_REQUEST: (state) => {
        state.loading = true
    },
    ADDRESSES_DELETE_RECOVER_SUCCESS: (state, action) => {
        state.loading = false
        state.DeleteRecoverAddresses = action.payload.data
    },
    ADDRESSES_DELETE_RECOVER_FAILED: (state, action) => {
        state.loading = false
        state.DeleteRecoverAddresses = undefined
        state.error = action.payload.error
    }

})