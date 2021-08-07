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
  },
});

export const selectNewItems = (state) => state.app.newItems;
export const { addNewItem } = appSlice.actions;
export default appSlice.reducer;
