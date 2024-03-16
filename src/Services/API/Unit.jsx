import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../fetchBaseQuery";

export const unit = createApi({
  baseQuery,
  reducerPath: "unit",
  endpoints: (builder) => ({
    GetUnits: builder.query({
      query: () => ({
        url: "/units",
        method: "GET",
      }),
    }),
    CreateUnit: builder.mutation({
      query: (data) => ({
        url: "/units/create",
        method: "POST",
        body: data,
      }),
    }),
    UpdateUnit: builder.mutation({
      query: (data) => ({
        url: `/units/update/${data.id}`,
        method: "PUT",
        body: { ...data, id: undefined },
      }),
    }),
    DeleteUnit: builder.mutation({
      query: (data) => ({
        url: `/units/delete/${data.id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetUnitsQuery,
  useCreateUnitMutation,
  useDeleteUnitMutation,
  useUpdateUnitMutation,
} = unit;
