import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../fetchBaseQuery";

export const category = createApi({
  baseQuery,
  reducerPath: "category",
  endpoints: (builder) => ({
    GetCategories: builder.query({
      query: () => ({
        url: "/categories",
        method: "GET",
      }),
    }),
    CreateCategory: builder.mutation({
      query: ({ data }) => ({
        url: "/categories/create",
        method: "POST",
        body: data,
      }),
    }),
    UpdateCategory: builder.mutation({
      query: ({ id, data }) => ({
        url: `/categories/update/${id}`,
        method: "PUT",
        body: { ...data, id: undefined },
      }),
    }),
    DeleteCategory: builder.mutation({
      query: ({ id, data }) => ({
        url: `/categories/delete/${id}`,
        method: "DELETE",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
} = category;
