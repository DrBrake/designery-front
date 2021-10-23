import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import {
  Idea,
  Inspiration,
  Project,
  Tag,
  ItemResponse,
} from "../Types/dataTypes";
import { BASE_URL } from "../constants";

export const dataAPI = createApi({
  reducerPath: "dataAPI",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["Items"],
  endpoints: (builder) => ({
    getData: builder.query<ItemResponse, void>({
      query: () => "/",
      providesTags: ["Items"],
    }),
    postItem: builder.mutation({
      query: (body: Idea | Project | Inspiration) => ({
        url: `/item/${body.Variant}`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Items"],
    }),
    removeItem: builder.mutation({
      query: (body: Idea | Project | Inspiration) => ({
        url: `/item/${body.Variant}/${body._id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Items"],
    }),
    postTag: builder.mutation({
      query: (body: Tag) => ({
        url: "/item/tag",
        method: "POST",
        body: body,
      }),
    }),
    removeTag: builder.mutation({
      query: (body: Tag) => ({
        url: `/item/tag/${body._id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Items"],
    }),
  }),
});

export const {
  useGetDataQuery,
  usePostItemMutation,
  useRemoveItemMutation,
  usePostTagMutation,
} = dataAPI;
