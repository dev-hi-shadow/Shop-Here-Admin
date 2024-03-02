import { createReducer } from "@reduxjs/toolkit";

const initialState = {};
export const UsersReducer = createReducer(initialState, {
  USER_CREATE_REQUEST: (state) => {
    state.loading = true;
  },
  USER_CREATE_SUCCESS: (state, action) => {
    state.loading = false;
    state.AddUsers = action.payload.data;
  },
  USER_CREATE_FAILED: (state, action) => {
    state.loading = false;
    state.AddUsers = undefined;
    state.error = action.payload.error;
  },
  USER_GET_REQUEST: (state) => {
    state.loading = true;
  },
  USER_GET_SUCCESS: (state, action) => {
    state.loading = false;
    state.GetUsers = action.payload.data;
  },
  USER_GET_FAILED: (state, action) => {
    state.loading = false;
    state.GetUsers = undefined;
    state.error = action.payload.error;
  },
  USER_EDIT_REQUEST: (state) => {
    state.loading = true;
  },
  USER_EDIT_SUCCESS: (state, action) => {
    state.loading = false;
    state.EditUsers = action.payload.data;
  },
  USER_EDIT_FAILED: (state, action) => {
    state.loading = false;
    state.EditUsers = undefined;
    state.error = action.payload.error;
  },
  USER_DELETE_RECOVER_REQUEST: (state) => {
    state.loading = true;
  },
  USER_DELETE_RECOVER_SUCCESS: (state, action) => {
    state.loading = false;
    state.DeleteRecoverUsers = action.payload.data;
  },
  USER_DELETE_RECOVER_FAILED: (state, action) => {
    state.loading = false;
    state.DeleteRecoverUsers = undefined;
    state.error = action.payload.error;
  },
});
