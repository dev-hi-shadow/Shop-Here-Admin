import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../fetchBaseQuery";


export const faq = createApi({
  baseQuery,
  reducerPath: "faqs",
  endpoints: (builder) => ({
    GetFaqs: builder.query({
      query: () => ({
        url: "/faqs",
        method: "GET",
      }),
    }),
    CreateFaq: builder.mutation({
      query: (data) => ({
        url: "/faqs/create",
        method: "POST",
        body: data,
      }),
    }),
    UpdateFaq: builder.mutation({
      query: (data) => ({
        url: `/faqs/update/${data.id}`,
        method: "PUT",
        body: { ...data, id: undefined },
      }),
    }),
    DeleteFaq: builder.mutation({
      query: (data) => ({
        url: `/faqs/delete/${data.id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetFaqsQuery,
  useCreateFaqMutation,
  useDeleteFaqMutation,
  useUpdateFaqMutation,
} = faq
