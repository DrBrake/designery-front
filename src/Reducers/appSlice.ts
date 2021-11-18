import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { dataAPI } from "../Services/dataAPI";
import {
  ItemResponse,
  Item,
  Idea,
  Inspiration,
  Project,
} from "../Types/dataTypes";
import { RootState } from "./rootReducer";

import { handleDataForList } from "../utils";
import { VARIANTS } from "../constants";

interface InitialState {
  data: ItemResponse;
  newItems: Array<Item>;
}

export const appSlice = createSlice({
  name: "app",
  initialState: {
    data: { ideas: [], projects: [], inspirations: [], tags: [] },
    newItems: [],
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

export const selectData = (state: RootState) => state.app.data;
export const selectIdeas = (state: RootState) => state.app.data.ideas;
export const selectProjects = (state: RootState) => state.app.data.projects;
export const selectInspirations = (state: RootState) =>
  state.app.data.inspirations;
export const selectTags = (state: RootState) => state.app.data.tags;

export const selectNewItems = (state: RootState) => state.app.newItems;
export const selectAllImages = (state: RootState) => {
  return handleDataForList(state.app.data).reduce<string[]>((acc, cur) => {
    if (
      (cur.Variant === VARIANTS.IDEA || cur.Variant === VARIANTS.INSPIRATION) &&
      typeof cur.ImageRefs === "string"
    ) {
      acc.concat(cur.ImageRefs);
    }
    return acc;
  }, []);
};

export const {
  addNewItem,
  removeNewItem,
  updateNewItem,
  removeAllNewItems,
} = appSlice.actions;
export default appSlice.reducer;
