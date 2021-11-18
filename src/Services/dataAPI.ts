import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { Idea, Inspiration, Project, ItemResponse } from "../Types/dataTypes";
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
    postMultipleItems: builder.mutation({
      query: (body: Array<Idea | Project | Inspiration>) => ({
        url: `/item/multiple`,
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
  }),
});

export const {
  useGetDataQuery,
  usePostItemMutation,
  useRemoveItemMutation,
  usePostMultipleItemsMutation,
} = dataAPI;
