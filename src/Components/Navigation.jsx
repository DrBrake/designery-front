import React, { useState } from "react";
import classnames from "classnames";
import { withRouter } from "react-router";
import Grid from "@material-ui/core/Grid";
import Popper from "@material-ui/core/Popper";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

import { ROUTES } from "../constants";
import Chip from "../Components/Chip";
import {
  Add,
  Filter,
  Archive,
  Search,
  Random,
  GridOn,
  SmallChevronDown,
  Close,
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
  highlightColor: {
    color: theme.palette.secondary.main,
  },
  fullWidth: {
    width: "100%",
  },
}));

const Navigation = ({ children, history, location }) => {
  const [addOpen, setAddOpen] = useState(false);
  const [randomOpen, setRandomOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
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
          <Add className={classnames({ [classes.highlightColor]: addOpen })} />
          <SmallChevronDown
            className={classnames({ [classes.highlightColor]: addOpen })}
          />
          <Popper id="addPopper" open={addOpen} anchorEl={anchorEl}>
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
          </Popper>
        </Grid>
        {searchOpen && (
          <Grid item className={classes.fullWidth}>
            <TextField
              value=""
              placeholder="Search"
              variant="outlined"
              fullWidth
            />
          </Grid>
        )}
        <Grid item className={classes.flex}>
          {searchOpen ? (
            <Close
              className={classes.icon}
              onClick={() => setSearchOpen(false)}
            />
          ) : (
            <Search
              className={classes.icon}
              onClick={() => setSearchOpen(true)}
            />
          )}
          <div
            className={classnames(classes.icon, {
              [classes.openIcon]: randomOpen,
            })}
            onClick={(e) => {
              setRandomOpen(!randomOpen);
              setAnchorEl(e.currentTarget);
            }}
          >
            <Random
              className={classnames({ [classes.highlightColor]: randomOpen })}
            />
            <SmallChevronDown
              className={classnames({ [classes.highlightColor]: randomOpen })}
            />
            <Popper id="randomPopper" open={randomOpen} anchorEl={anchorEl}>
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
                  className={classnames(classes.pointer, classes.marginBottom1)}
                  onClick={() => null}
                >
                  Combine two inspirations
                </Typography>
                <Typography
                  className={classnames(classes.pointer, classes.marginBottom1)}
                  onClick={() => null}
                >
                  Combine two ideas
                </Typography>
                <Typography
                  className={classnames(classes.pointer, classes.marginBottom1)}
                  onClick={() => null}
                >
                  Combine idea and inspiration
                </Typography>
              </Paper>
            </Popper>
          </div>
          <GridOn
            className={classnames(classes.icon, {
              [classes.highlightColor]: location.pathname.includes(ROUTES.GRID),
            })}
            onClick={() => history.push(ROUTES.GRID)}
          />
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
            <Filter
              aria-describedby="tagFilter"
              className={classnames({ [classes.highlightColor]: filterOpen })}
            />
            <SmallChevronDown
              className={classnames({ [classes.highlightColor]: filterOpen })}
            />
            <Popper id="filterPopper" open={filterOpen} anchorEl={anchorEl}>
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
            </Popper>
          </div>
          <Typography
            className={classnames(classes.text, classes.pointer)}
            onClick={() => history.push(ROUTES.ROOT)}
          >
            designery
          </Typography>
        </Grid>
      </Grid>
      {children}
    </>
  );
};

export default withRouter(Navigation);
