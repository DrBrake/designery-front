import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const dataAPI = createApi({
  reducerPath: "dataAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8081" }),
  endpoints: (builder) => ({
    getData: builder.query({
      query: () => "/",
      providesTags: () => ["Items"],
    }),
    postItem: builder.mutation({
      query: (body) => ({
        url: `/item/${body.Variant}`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Items"],
    }),
    removeItem: builder.mutation({
      query: (body) => ({
        url: `/item/${body.Variant}/${body._id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Items"],
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
  useRemoveItemMutation,
  usePostTagMutation,
} = dataAPI;
