import { createReducer } from "@reduxjs/toolkit";

const initialState = {}
export const AuthenticationReducer = createReducer(initialState, {
    SIGNUP_REQUEST: (state) => {
        state.loading = true
        state.isAuthenticated = false
    },
    SIGNUP_SUCCESS: (state, action) => {
        state.isAuthenticated = true
        state.isLogedIn = true
        state.loading = false
        state.signup = action.payload.data
    },
    SIGNUP_FAILED: (state, action) => {
        state.loading = false
        state.signin = undefined
        state.isAuthenticated = false
        state.error = action.payload.error
    },
    SIGNIN_REQUEST: (state) => {
        state.loading = true
    },
    SIGNIN_SUCCESS: (state, action) => {
        state.isAuthenticated = true
        state.isLogedIn = true
        state.loading = false
        state.signin = action.payload.data
    },
    SIGNIN_FAILED: (state, action) => {
        state.loading = false
        state.login = undefined
        state.error = action.payload.error
    },
    PROFILE_REQUEST: (state) => {
        state.loading = true
    },
    PROFILE_SUCCESS: (state, action) => {
        state.loading = false
        state.profile = action.payload.data
    },
    PROFILE_FAILED: (state, action) => {
        state.loading = false
        state.profile = undefined
        state.error = action.payload
        state.isAuthenticated = false
    },
    LOGOUT_REQUEST: (state) => {
        state.loading = true
    },
    LOGOUT_SUCCESS: (state, action) => {
        state.loading = false
        state.profile = undefined
        state.isAuthenticated = false
        state.logout = action.payload
    },
    LOGOUT_FAILED: (state, action) => {
        state.loading = false
        state.profile = undefined
        state.error = action.payload
    }

})