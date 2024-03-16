import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../fetchBaseQuery";

export const tax = createApi({
  baseQuery,
  reducerPath: "tax",
  endpoints: (builder) => ({
    GetTaxes: builder.query({
      query: () => ({
        url: "/taxes",
        method: "GET",
      }),
    }),
    CreateTax: builder.mutation({
      query: (data) => ({
        url: "/taxes/create",
        method: "POST",
        body: data,
      }),
    }),
    UpdateTax: builder.mutation({
      query: (data) => ({
        url: `/taxes/update/${data.id}`,
        method: "PUT",
        body: { ...data, id: undefined },
      }),
    }),
    DeleteTax: builder.mutation({
      query: (data) => ({
        url: `/taxes/delete/${data.id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetTaxesQuery,
  useCreateTaxMutation,
  useDeleteTaxMutation,
  useUpdateTaxMutation,
} = tax;
