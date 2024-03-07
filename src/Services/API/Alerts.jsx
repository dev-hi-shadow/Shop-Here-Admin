import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../fetchBaseQuery";
export const alerts = createApi({
  baseQuery,
  reducerPath: "alerts",
  endpoints: (builder) => ({
    GetAlerts: builder.query({
      query: () => ({
        url: `/alerts`,
        method: "GET",
      }),
    }),
    UpdateAlerts: builder.mutation({
      query: (data) => ({
        url: `/alerts`,
        method: "PUT",
        body: { ...data, id: undefined },
      }),
    }),
  }),
});

export const { useGetAlertsQuery, useUpdateAlertsMutation } = alerts;
