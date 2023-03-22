import React, { FC } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { CssBaseline } from "@mui/material";
import {
  ThemeProvider,
  Theme,
  StyledEngineProvider,
} from "@mui/material/styles";
import { Provider } from "react-redux";

import store from "./store";
import theme from "./theme";

declare module "@mui/styles/defaultTheme" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

const createStore = store();

const container = document.getElementById("app");
const root = createRoot(container!);

const render = (Component: FC) => {
  root.render(
    <Provider store={createStore}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline>
            <Component />
          </CssBaseline>
        </ThemeProvider>
      </StyledEngineProvider>
    </Provider>
  );
};

render(App);

if (module.hot) {
  module.hot.accept("./App.tsx", () => {
    render(App);
  });
}
