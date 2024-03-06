import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../fetchBaseQuery";

const SubCategory = createApi({
  baseQuery,
  reducerPath: "subcategory",
  endpoints: (builder) => ({
    SubCategories: builder.query({
      query: () => ({
        url: "/sub-categories",
        method: "GET",
      }),
    }),
    CreateSubCategory: builder.mutation({
      query: (data) => ({
        url: "/sub-categories/create",
        method: "POST",
        body: data,
      }),
    }),
    UpdateSubCategory: builder.mutation({
      query: (id, data) => ({
        url: `/sub-categories/update/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    DeleteSubCategory: builder.mutation({
      query: (id, data) => ({
        url: `/sub-categories/delete/${id}`,
        method: "DELETE",
        body: data,
      }),
    }),
  }),
});

export const {
  useSubCategoriesQuery,
  useCreateSubCategoryMutation,
  useDeleteSubCategoryMutation,
  useUpdateSubCategoryMutation,
} = SubCategory;
