import { combineReducers } from "@reduxjs/toolkit";

import appSlice from "./appSlice";
import { dataAPI } from "../Services/dataAPI";

const rootReducer = combineReducers({
  app: appSlice,
  [dataAPI.reducerPath]: dataAPI.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
