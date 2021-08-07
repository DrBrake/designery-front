import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const dataAPI = createApi({
  reducerPath: "dataAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8081" }),
  endpoints: (builder) => ({
    getData: builder.query({
      query: () => "/",
    }),
    postIdea: builder.mutation({
      query: ({ ...body }) => ({
        url: "idea",
        method: "POST",
        body: body,
      }),
      transformResponse: (response) => response.data,
    }),
    postProject: builder.mutation({
      query: ({ ...body }) => ({
        url: "project",
        method: "POST",
        body: body,
      }),
      transformResponse: (response) => response.data,
    }),
    postInspiration: builder.mutation({
      query: ({ ...body }) => ({
        url: "inspiration",
        method: "POST",
        body: body,
      }),
      transformResponse: (response) => response.data,
    }),
    postTag: builder.mutation({
      query: ({ ...body }) => ({
        url: "tag",
        method: "POST",
        body: body,
      }),
      transformResponse: (response) => response.data,
    }),
  }),
});

export const {
  useGetDataQuery,
  usePostIdea,
  usePostProject,
  usePostInspiration,
  usePostTag,
} = dataAPI;
