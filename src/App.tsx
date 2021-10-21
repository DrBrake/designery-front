import React from "react";
import { Switch, Router } from "react-router";
import { Route } from "react-router-dom";

import ScrollToTop from "./Components/ScrollToTop";
import { List, Grid } from "./Views";
import Navigation from "./Components/Navigation";
import { browserHistory } from "./utils";
import { ROUTES } from "./constants";

const App = () => (
  <Router history={browserHistory}>
    <Navigation>
      <ScrollToTop>
        <Switch>
          <Route exact path={ROUTES.ROOT} render={(props) => <List />} />
          <Route exact path={ROUTES.GRID} render={(props) => <Grid />} />
        </Switch>
      </ScrollToTop>
    </Navigation>
  </Router>
);

export default App;
