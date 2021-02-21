import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Popper from "@material-ui/core/Popper";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import { Add, Filter, Archive, Search } from "./Icons";

const useStyles = makeStyles((theme) => ({
  container: {
    boxShadow: `0 3px 8px 0 rgba(0, 0, 0, 0.16)`,
    marginBottom: theme.spacing(6),
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
  },
  icon: {
    cursor: "pointer",
    marginRight: theme.spacing(5),
  },
  paper: {
    padding: theme.spacing(2),
  },
  text: {
    fontWeight: "bold",
  },
}));

const Navigation = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = useStyles();

  return (
    <>
      <Grid container wrap="nowrap" spacing={2} className={classes.container}>
        <Grid item xs={12}>
          <Add className={classes.icon} onClick={() => null} />
        </Grid>
        <Grid item>
          <Search className={classes.icon} onClick={() => null} />
        </Grid>
        <Grid item>
          <Archive className={classes.icon} onClick={() => null} />
        </Grid>
        <Grid item>
          <Filter
            aria-describedby="tagFilter"
            className={classes.icon}
            onClick={(e) => {
              setOpen(!open);
              setAnchorEl(e.currentTarget);
            }}
          />
          <Popper id="tagFilter" open={open} anchorEl={anchorEl}>
            <ClickAwayListener onClickAway={() => setOpen(false)}>
              <Paper elevation={3} className={classes.paper}></Paper>
            </ClickAwayListener>
          </Popper>
        </Grid>
        <Grid item>
          <Typography className={classes.text}>Designery</Typography>
        </Grid>
      </Grid>
      {children}
    </>
  );
};

export default Navigation;
