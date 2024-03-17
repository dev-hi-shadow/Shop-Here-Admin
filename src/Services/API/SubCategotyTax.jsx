import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../fetchBaseQuery";

export const subcategory_tax = createApi({
  baseQuery,
  reducerPath: "subcategory_tax",
  endpoints: (builder) => ({
    GetSubCategoriesTax: builder.query({
      query: () => ({
        url: "/sub-categories-taxes",
        method: "GET",
      }),
    }),
    CreateSubCategoryTax: builder.mutation({
      query: (data) => ({
        url: "/sub-categories-taxes/create",
        method: "POST",
        body: data,
      }),
    }),
    UpdateSubCategoryTax: builder.mutation({
      query: (data) => ({
        url: `/sub-categories-taxes/update/${data.id}`,
        method: "PUT",
        body: { ...data, id: undefined },
      }),
    }),
    DeleteSubCategoryTax: builder.mutation({
      query: (data) => ({
        url: `/sub-categories-taxes/delete/${data.id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
    useGetSubCategoriesTaxQuery,
  useCreateSubCategoryTaxMutation,
  useDeleteSubCategoryTaxMutation,
  useUpdateSubCategoryTaxMutation,
} = subcategory_tax;
