import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../fetchBaseQuery";

export const address = createApi({
  baseQuery,
  reducerPath: "address",
  endpoints: (builder) => ({
    GetAddresss: builder.query({
      query: () => ({
        url: "/addresses",
        method: "GET",
      }),
    }),
    CreateAddress: builder.mutation({
      query: (data) => ({
        url: "/addresses/create",
        method: "POST",
        body: data,
      }),
    }),
    UpdateAddress: builder.mutation({
      query: (data) => ({
        url: `/addresses/update/${data.id}`,
        method: "PUT",
        body: { ...data, id: undefined },
      }),
    }),
    DeleteAddress: builder.mutation({
      query: (data) => ({
        url: `/addressess/delete/${data.id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAddressesQuery,
  useCreateAddressMutation,
  useDeleteAddressMutation,
  useUpdateAddressMutation,
} = address;
