import React from "react";
import { Switch, Router } from "react-router";
import { Route } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import ScrollToTop from "./Components/ScrollToTop";
import { List, Grid, Tags } from "./Views";
import Navigation from "./Components/Navigation";
import LoginDialog from "./Components/Dialogs/LoginDialog";
import Footer from "./Components/Footer";

import { browserHistory } from "./utils";
import { ROUTES } from "./constants";
import useDialogs from "./Hooks/useDialogs";

const useStyles = makeStyles((theme) => ({
  container: {
    margin: theme.spacing(1),
    marginBottom: theme.spacing(8),
  },
}));

const App = () => {
  const classes = useStyles();
  const { dialogs, setDialogs } = useDialogs();
  const setLoginDialogOpen = () => {
    setDialogs({
      type: "Login",
      open: !dialogs.Login.open,
      variant: null,
    });
  };
  return (
    <div className={classes.container}>
      <Router history={browserHistory}>
        <Navigation>
          <ScrollToTop>
            <Switch>
              <Route exact path={ROUTES.ROOT} render={(props) => <List />} />
              <Route exact path={ROUTES.GRID} render={(props) => <Grid />} />
              <Route exact path={ROUTES.TAGS} render={(props) => <Tags />} />
            </Switch>
          </ScrollToTop>
        </Navigation>
        <LoginDialog
          dialogOpen={dialogs.Login.open}
          setDialogOpen={setLoginDialogOpen}
        />
        <Footer setLoginDialogOpen={setLoginDialogOpen} />
      </Router>
    </div>
  );
};

export default App;
