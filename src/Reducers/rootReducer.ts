import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

import appSlice from "./appSlice";
import authSlice from "./authSlice";
import { dataAPI } from "../Services/dataAPI";

const persistConfig = {
  key: "auth",
  storage,
};

const rootReducer = combineReducers({
  app: appSlice,
  auth: persistReducer(persistConfig, authSlice),
  [dataAPI.reducerPath]: dataAPI.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
