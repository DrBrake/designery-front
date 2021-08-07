import React from "react";
import ReactDOM from "react-dom";
import App from "./App.js";
import { AppContainer } from "react-hot-loader";
import { ThemeProvider } from "@material-ui/core/styles";
import { Provider } from "react-redux";

import store from "./store";
import theme from "./theme";

const render = (Component) => {
  ReactDOM.render(
    <Provider store={store()}>
      <ThemeProvider theme={theme}>
        <AppContainer>
          <Component />
        </AppContainer>
      </ThemeProvider>
    </Provider>,
    document.getElementById("app")
  );
};

render(App);

if (module.hot) {
  module.hot.accept("./App.js", () => {
    render(App);
  });
}
