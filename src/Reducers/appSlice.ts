import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { dataAPI } from "../Services/dataAPI";
import {
  ItemResponse,
  Item,
  Idea,
  Inspiration,
  Project,
  Filters,
} from "../Types/dataTypes";
import { RootState } from "./rootReducer";

import { filterData, combineData } from "../utils";

interface InitialState {
  data: ItemResponse;
  newItems: Array<Item>;
  filters: Filters;
}

export const appSlice = createSlice({
  name: "app",
  initialState: {
    data: { ideas: [], projects: [], inspirations: [], tags: [] },
    newItems: [],
    filters: {
      ideas: false,
      inspirations: false,
      projects: false,
      tags: [],
      search: "",
      archived: true,
    },
  } as InitialState,
  reducers: {
    addNewItem: (
      state,
      action: PayloadAction<Idea | Inspiration | Project>
    ) => {
      state.newItems.push(action.payload);
    },
    removeNewItem: (state, action) => {
      state.newItems.splice(action.payload.index, 1);
    },
    updateNewItem: (state, action) => {
      state.newItems[action.payload.index] = action.payload.values;
    },
    removeAllNewItems: (state) => {
      state.newItems = [];
    },
    setFilters: (state, action) => {
      if (action.payload.tag) {
        const tag = action.payload.tag;
        if (state.filters.tags.some((item) => item === tag)) {
          state.filters.tags = state.filters.tags.filter(
            (item) => item !== tag
          );
        } else {
          state.filters.tags.push(tag);
        }
      } else {
        state.filters = Object.assign(state.filters, action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      dataAPI.endpoints.getData.matchFulfilled,
      (state, action) => {
        state.data = action.payload;
      }
    );
  },
});

export const selectData = (state: RootState) => {
  return filterData(combineData(state.app.data), state.app.filters);
};
export const selectIdeas = (state: RootState) => state.app.data.ideas;
export const selectProjects = (state: RootState) => state.app.data.projects;
export const selectInspirations = (state: RootState) =>
  state.app.data.inspirations;
export const selectTags = (state: RootState) => state.app.data.tags;
export const selectFilters = (state: RootState) => state.app.filters;
export const selectNewItems = (state: RootState) => state.app.newItems;

export const {
  addNewItem,
  removeNewItem,
  updateNewItem,
  removeAllNewItems,
  setFilters,
} = appSlice.actions;
export default appSlice.reducer;
