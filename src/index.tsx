import React, { FC } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AppContainer } from "react-hot-loader";
import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import { Provider } from "react-redux";

import store from "./store";
import theme from "./theme";

const createStore = store();

const render = (Component: FC) => {
  ReactDOM.render(
    <Provider store={createStore}>
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <AppContainer>
            <Component />
          </AppContainer>
        </CssBaseline>
      </ThemeProvider>
    </Provider>,
    document.getElementById("app")
  );
};

render(App);

if (module.hot) {
  module.hot.accept("./App.tsx", () => {
    render(App);
  });
}
