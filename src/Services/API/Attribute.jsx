import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../fetchBaseQuery";

export const attribute = createApi({
  baseQuery,
  reducerPath: "attribute",
  endpoints: (builder) => ({
    GetAttributes: builder.query({
      query: () => ({
        url: "/attributes",
        method: "GET",
      }),
    }),
    CreateAttribute: builder.mutation({
      query: (data) => ({
        url: "/attributes/create",
        method: "POST",
        body: data,
      }),
    }),
    UpdateAttribute: builder.mutation({
      query: (data) => ({
        url: `/attributes/update/${data.id}`,
        method: "PUT",
        body: { ...data, id: undefined },
      }),
    }),
    DeleteAttribute: builder.mutation({
      query: (data) => ({
        url: `/attributes/delete/${data.id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAttributesQuery,
  useCreateAttributeMutation,
  useDeleteAttributeMutation,
  useUpdateAttributeMutation,
} = attribute;
