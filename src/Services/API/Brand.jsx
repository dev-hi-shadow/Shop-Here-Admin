import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../fetchBaseQuery";

export const brand = createApi({
  baseQuery,
  reducerPath: "brand",
  endpoints: (builder) => ({
    GetBrands: builder.query({
      query: () => ({
        url: "/brands",
        method: "GET",
      }),
    }),
    CreateBrand: builder.mutation({
      query: (data) => ({
        url: "/brands/create",
        method: "POST",
        body: data,
      }),
    }),
    UpdateBrand: builder.mutation({
      query: (data) => ({
        url: `/brands/update/${data.id}`,
        method: "PUT",
        body: { ...data, id: undefined },
      }),
    }),
    DeleteBrand: builder.mutation({
      query: (data) => ({
        url: `/brands/delete/${data.id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetBrandsQuery,
  useCreateBrandMutation,
  useDeleteBrandMutation,
  useUpdateBrandMutation,
} = brand;
