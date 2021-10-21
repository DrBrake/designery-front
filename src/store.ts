import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./Reducers/rootReducer";
import { dataAPI } from "./Services/dataAPI";

const store = () => {
  const configStore = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(dataAPI.middleware),
  });

  if (module.hot) {
    module.hot.accept("./Reducers/rootReducer", () => {
      configStore.replaceReducer(rootReducer);
    });
  }

  return configStore;
};

export default store;
