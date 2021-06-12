import React from "react";
import { Switch, Router } from "react-router";
import { Route } from "react-router-dom";
import ScrollToTop from "./Components/ScrollToTop";
import { List } from "./Views";
import Navigation from "./Components/Navigation";
import { browserHistory } from "./utils";

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
