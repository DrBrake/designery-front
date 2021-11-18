import React from "react";
import { Switch, Router } from "react-router";
import { Route } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import ScrollToTop from "./Components/ScrollToTop";
import { List, Grid } from "./Views";
import Navigation from "./Components/Navigation";
import { browserHistory } from "./utils";
import { ROUTES } from "./constants";

const useStyles = makeStyles((theme) => ({
  container: {
    margin: theme.spacing(1),
  },
}));

const App = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
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
    </div>
  );
};

export default App;
