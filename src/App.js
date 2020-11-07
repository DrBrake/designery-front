import React from "react";
import { Switch, Router } from "react-router";
import { Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import ScrollToTop from "./Components/ScrollToTop";
import { List } from "./Views";
import Navigation from "./Components/Navigation";

const browserHistory = createBrowserHistory();
require("../favicon.ico");

const App = () => (
  <Router history={browserHistory}>
    <Navigation>
      <ScrollToTop>
        <Switch>
          <Route exact path="/" render={(props) => <List {...props} />} />
        </Switch>
      </ScrollToTop>
    </Navigation>
  </Router>
);

export default App;
