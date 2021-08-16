import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const dataAPI = createApi({
  reducerPath: "dataAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8081" }),
  endpoints: (builder) => ({
    getData: builder.query({
      query: () => "/",
    }),
    postItem: builder.mutation({
      query: (body) => ({
        url: `/item/${body.Variant}`,
        method: "POST",
        body: body,
      }),
    }),
    postTag: builder.mutation({
      query: (body) => ({
        url: "/item/tag",
        method: "POST",
        body: body,
      }),
    }),
  }),
});

export const {
  useGetDataQuery,
  usePostItemMutation,
  usePostTagMutation,
} = dataAPI;
