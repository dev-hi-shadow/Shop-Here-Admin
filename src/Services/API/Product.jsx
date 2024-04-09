import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../fetchBaseQuery";

export const product = createApi({
  baseQuery,
  reducerPath: "product",
  endpoints: (builder) => ({
    GetProducts: builder.query({
      query: () => ({
        url: "/products",
        method: "GET",
      }),
    }),
    GetSingleProduct: builder.query({
      query: (id) => ({
        url: `/products/${id}`,
        method: "GET",
      }),
    }),
    CreateProduct: builder.mutation({
      query: (data) => ({
        url: "/products/create",
        method: "POST",
        body: data,
      }),
    }),
    UpdateProduct: builder.mutation({
      query: (data) => ({
        url: `/products/update/${data.id}`,
        method: "PUT",
        body: { ...data, id: undefined },
      }),
    }),
    DeleteProduct: builder.mutation({
      query: (data) => ({
        url: `/products/delete/${data.id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
  useGetSingleProductQuery
} = product;
