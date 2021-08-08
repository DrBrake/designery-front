import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    newItems: [],
  },
  reducers: {
    addNewItem: (state, action) => {
      state.newItems.push(action.payload);
    },
    removeNewItem: (state, action) => {
      state.newItems.splice(action.payload.index, 1);
    },
    updateNewItem: (state, action) => {
      state.newItems[action.payload.index] = action.payload.values;
    },
  },
});

export const selectNewItems = (state) => state.app.newItems;
export const { addNewItem, removeNewItem, updateNewItem } = appSlice.actions;
export default appSlice.reducer;
