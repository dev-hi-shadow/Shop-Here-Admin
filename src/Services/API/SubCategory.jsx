import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../fetchBaseQuery";

export const subcategory = createApi({
  baseQuery,
  reducerPath: "subcategory",
  endpoints: (builder) => ({
    GetSubCategories: builder.query({
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
      query: (data) => ({
        url: `/sub-categories/update/${data.id}`,
        method: "PUT",
        body: { ...data, id: undefined },
      }),
    }),
    DeleteSubCategory: builder.mutation({
      query: (data) => ({
        url: `/sub-categories/delete/${data.id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetSubCategoriesQuery,
  useCreateSubCategoryMutation,
  useDeleteSubCategoryMutation,
  useUpdateSubCategoryMutation,
} = subcategory;
