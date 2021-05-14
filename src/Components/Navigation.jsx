import React, { useState } from "react";
import classnames from "classnames";
import Grid from "@material-ui/core/Grid";
import Popper from "@material-ui/core/Popper";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import Chip from "../Components/Chip";
import {
  Add,
  Filter,
  Archive,
  Search,
  Random,
  GridOn,
  SmallChevronDown,
} from "./Icons";

const useStyles = makeStyles((theme) => ({
  container: {
    boxShadow: `0 3px 8px 0 rgba(0, 0, 0, 0.16)`,
    marginBottom: theme.spacing(6),
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
    height: theme.spacing(9),
  },
  icon: {
    cursor: "pointer",
    marginRight: theme.spacing(5),
    display: "flex",
    borderRadius: theme.spacing(1),
    padding: theme.spacing(1),
  },
  paper: {
    padding: theme.spacing(3),
    marginTop: -theme.spacing(1),
  },
  text: {
    fontWeight: "bold",
    alignSelf: "center",
  },
  flex: {
    display: "flex",
  },
  openIcon: {
    boxShadow: `0 0 6px 0 rgba(0, 0, 0, 0.16)`,
  },
  marginRight2: {
    marginRight: theme.spacing(2),
  },
  marginBottom2: {
    marginBottom: theme.spacing(2),
  },
  marginBottom3: {
    marginBottom: theme.spacing(3),
  },
  pointer: {
    cursor: "pointer",
  },
  marginBottom1: {
    marginBottom: theme.spacing(1),
  },
  fontWeightBold: {
    fontWeight: "bold",
  },
}));

const Navigation = ({ children }) => {
  const [addOpen, setAddOpen] = useState(false);
  const [randomOpen, setRandomOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = useStyles();

  return (
    <>
      <Grid
        container
        wrap="nowrap"
        spacing={2}
        alignItems="center"
        justify="space-between"
        className={classes.container}
      >
        <Grid
          item
          className={classnames(classes.icon, {
            [classes.openIcon]: addOpen,
          })}
          onClick={(e) => {
            setAddOpen(!addOpen);
            setAnchorEl(e.currentTarget);
          }}
        >
          <Add />
          <SmallChevronDown />
          <Popper id="addPopper" open={addOpen} anchorEl={anchorEl}>
            <ClickAwayListener onClickAway={() => setAddOpen(false)}>
              <Paper elevation={3} className={classes.paper}>
                <Typography
                  className={classnames(
                    classes.marginBottom1,
                    classes.fontWeightBold,
                    classes.pointer
                  )}
                  onClick={() => null}
                >
                  Idea
                </Typography>
                <Typography
                  className={classnames(
                    classes.marginBottom1,
                    classes.fontWeightBold,
                    classes.pointer
                  )}
                  onClick={() => null}
                >
                  Inspiration
                </Typography>
                <Typography
                  className={classnames(
                    classes.marginBottom1,
                    classes.fontWeightBold,
                    classes.pointer
                  )}
                  onClick={() => null}
                >
                  Project
                </Typography>
              </Paper>
            </ClickAwayListener>
          </Popper>
        </Grid>
        <Grid item className={classes.flex}>
          <Search className={classes.icon} onClick={() => null} />
          <div
            className={classnames(classes.icon, {
              [classes.openIcon]: randomOpen,
            })}
            onClick={(e) => {
              setRandomOpen(!randomOpen);
              setAnchorEl(e.currentTarget);
            }}
          >
            <Random />
            <SmallChevronDown />
            <Popper id="randomPopper" open={randomOpen} anchorEl={anchorEl}>
              <ClickAwayListener onClickAway={() => setRandomOpen(false)}>
                <Paper elevation={3} className={classes.paper}>
                  <Typography
                    className={classnames(
                      classes.marginBottom1,
                      classes.fontWeightBold
                    )}
                  >
                    Random
                  </Typography>
                  <Typography
                    className={classnames(
                      classes.pointer,
                      classes.marginBottom1
                    )}
                    onClick={() => null}
                  >
                    Combine two inspirations
                  </Typography>
                  <Typography
                    className={classnames(
                      classes.pointer,
                      classes.marginBottom1
                    )}
                    onClick={() => null}
                  >
                    Combine two ideas
                  </Typography>
                  <Typography
                    className={classnames(
                      classes.pointer,
                      classes.marginBottom1
                    )}
                    onClick={() => null}
                  >
                    Combine idea and inspiration
                  </Typography>
                </Paper>
              </ClickAwayListener>
            </Popper>
          </div>
          <GridOn className={classes.icon} onClick={() => null} />
          <Archive className={classes.icon} onClick={() => null} />
          <div
            className={classnames(classes.icon, {
              [classes.openIcon]: filterOpen,
            })}
            onClick={(e) => {
              setFilterOpen(!filterOpen);
              setAnchorEl(e.currentTarget);
            }}
          >
            <Filter aria-describedby="tagFilter" />
            <SmallChevronDown />
            <Popper id="filterPopper" open={filterOpen} anchorEl={anchorEl}>
              <ClickAwayListener onClickAway={() => setFilterOpen(false)}>
                <Paper elevation={3} className={classes.paper}>
                  <div
                    className={classnames(classes.flex, classes.marginBottom3)}
                  >
                    <Typography
                      className={classnames(
                        classes.text,
                        classes.marginRight2,
                        classes.pointer
                      )}
                      onClick={() => null}
                    >
                      Ideas
                    </Typography>
                    <Typography
                      className={classnames(
                        classes.text,
                        classes.marginRight2,
                        classes.pointer
                      )}
                      onClick={() => null}
                    >
                      Inspiration
                    </Typography>
                    <Typography
                      className={classnames(classes.text, classes.pointer)}
                      onClick={() => null}
                    >
                      Projects
                    </Typography>
                  </div>
                  <Typography
                    className={classnames(classes.text, classes.marginBottom2)}
                    onClick={() => null}
                  >
                    Tags
                  </Typography>
                  <Chip label="Tag" onClick={() => null} />
                  <Chip label="Tag" onClick={() => null} />
                </Paper>
              </ClickAwayListener>
            </Popper>
          </div>
          <Typography className={classes.text} onClick={() => null}>
            Designery
          </Typography>
        </Grid>
      </Grid>
      {children}
    </>
  );
};

export default Navigation;
