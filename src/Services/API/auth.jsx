import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../fetchBaseQuery";

export const auth = createApi({
  reducerPath: "auth",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/users/signin",
        method: "POST",
        body: credentials,
      }),
    }),
    signup: builder.mutation({
      query: (credentials) => ({
        url: "/users/signup",
        method: "POST",
        body: credentials,
      }),
    }),
    profile: builder.query({
      query: () => ({
        url: "/users/profile",
        method: "GET",
      }),
    }),
  }),
});
export const { useLoginMutation, useSignupMutation, useProfileQuery } = auth;

