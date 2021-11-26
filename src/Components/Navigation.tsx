import React, { useState, FC } from "react";
import classnames from "classnames";
import dayjs from "dayjs";
import { EditorState, convertToRaw } from "draft-js";
import { withRouter, RouteComponentProps } from "react-router";
import { Grid, Popper, Paper, Typography, TextField } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import {
  addNewItem,
  selectNewItems,
  setFilters,
  selectFilters,
  selectInspirations,
  selectIdeas,
  selectTags,
} from "../Reducers/appSlice";

import { ROUTES, RANDOM_DIALOG_TYPE, VARIANTS } from "../constants";
import Chip from "./Chip";
import RandomDialog from "./Dialogs/RandomDialog";
import {
  Add,
  Filter,
  Archive,
  Search,
  Random,
  GridOn,
  SmallChevronDown,
  Close,
  List,
} from "./Icons";

const useStyles = makeStyles((theme) =>
  createStyles({
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
      color: theme.palette.secondary.light,
    },
    fullWidth: {
      width: "100%",
    },
    overlay: {
      position: "absolute",
      top: 0,
      left: 0,
      height: "100%",
      width: "100%",
      opacity: 0,
      zIndex: 0,
      cursor: "initial",
    },
    disabledColor: {
      color: theme.palette.grey["400"],
    },
  })
);

const Navigation: FC<RouteComponentProps> = ({
  children,
  history,
  location,
}) => {
  const [addOpen, setAddOpen] = useState(false);
  const [randomOpen, setRandomOpen] = useState(false);
  const [randomDialogOpen, setRandomDialogOpen] = useState(false);
  const [randomDialogType, setRandomDialogType] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const classes = useStyles();
  const dispatch = useDispatch();

  const ideas = useSelector(selectIdeas);
  const inspirations = useSelector(selectInspirations);
  const tags = useSelector(selectTags);
  const newItems = useSelector(selectNewItems);
  const filters = useSelector(selectFilters);

  const getAddPopper = () => (
    <>
      <div className={classes.overlay} onClick={() => setAddOpen(false)} />
      <Popper id="addPopper" open={addOpen} anchorEl={anchorEl}>
        <Paper elevation={3} className={classes.paper}>
          <Typography
            className={classnames(
              classes.marginBottom1,
              classes.fontWeightBold,
              classes.pointer
            )}
            onClick={() =>
              dispatch(
                addNewItem({
                  Title: `New idea #${newItems.length + 1}`,
                  Description: convertToRaw(
                    EditorState.createEmpty().getCurrentContent()
                  ),
                  ImageRefs: [],
                  Drafts: [],
                  CompletedWorks: [],
                  Completed: false,
                  Tags: [],
                  Project: undefined,
                  Inspirations: [],
                  DateCreated: dayjs().format(),
                  Variant: VARIANTS.IDEA,
                  TempID: uuidv4(),
                })
              )
            }
          >
            Idea
          </Typography>
          <Typography
            className={classnames(
              classes.marginBottom1,
              classes.fontWeightBold,
              classes.pointer
            )}
            onClick={() =>
              dispatch(
                addNewItem({
                  Title: `New inspiration #${newItems.length + 1}`,
                  Description: convertToRaw(
                    EditorState.createEmpty().getCurrentContent()
                  ),
                  ImageRefs: [],
                  Ideas: [],
                  Tags: [],
                  DateCreated: dayjs().format(),
                  Variant: VARIANTS.INSPIRATION,
                  TempID: uuidv4(),
                })
              )
            }
          >
            Inspiration
          </Typography>
          <Typography
            className={classnames(
              classes.marginBottom1,
              classes.fontWeightBold,
              classes.pointer
            )}
            onClick={() =>
              dispatch(
                addNewItem({
                  Title: `New project #${newItems.length + 1}`,
                  Description: convertToRaw(
                    EditorState.createEmpty().getCurrentContent()
                  ),
                  Ideas: [],
                  Tags: [],
                  DateCreated: dayjs().format(),
                  Variant: VARIANTS.PROJECT,
                  TempID: uuidv4(),
                })
              )
            }
          >
            Project
          </Typography>
        </Paper>
      </Popper>
    </>
  );

  const getRandomPopper = () => {
    const enoughInspirations = inspirations?.length > 1;
    const enoughIdeas = ideas?.length > 1;
    const enoughBoth = ideas?.length > 0 && inspirations?.length > 0;
    return (
      <>
        <div className={classes.overlay} onClick={() => setRandomOpen(false)} />
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
              className={classnames(classes.marginBottom1, {
                [classes.pointer]: enoughInspirations,
                [classes.disabledColor]: !enoughInspirations,
              })}
              onClick={() => {
                if (enoughInspirations) {
                  setRandomDialogOpen(true);
                  setRandomDialogType(RANDOM_DIALOG_TYPE.INSPIRATIONS);
                  setRandomOpen(false);
                }
              }}
            >
              Combine two inspirations
            </Typography>
            <Typography
              className={classnames(classes.marginBottom1, {
                [classes.pointer]: enoughIdeas,
                [classes.disabledColor]: !enoughIdeas,
              })}
              onClick={() => {
                if (enoughIdeas) {
                  setRandomDialogOpen(true);
                  setRandomDialogType(RANDOM_DIALOG_TYPE.IDEAS);
                  setRandomOpen(false);
                }
              }}
            >
              Combine two ideas
            </Typography>
            <Typography
              className={classnames(classes.marginBottom1, {
                [classes.pointer]: enoughBoth,
                [classes.disabledColor]: !enoughBoth,
              })}
              onClick={() => {
                if (enoughBoth) {
                  setRandomDialogOpen(true);
                  setRandomDialogType(RANDOM_DIALOG_TYPE.BOTH);
                  setRandomOpen(false);
                }
              }}
            >
              Combine idea and inspiration
            </Typography>
          </Paper>
        </Popper>
      </>
    );
  };

  const getFilterPopper = () => (
    <>
      <div className={classes.overlay} onClick={() => setFilterOpen(false)} />
      <Popper id="filterPopper" open={filterOpen} anchorEl={anchorEl}>
        <Paper elevation={3} className={classes.paper}>
          <div className={classnames(classes.flex, classes.marginBottom3)}>
            <Typography
              className={classnames(
                classes.text,
                classes.marginRight2,
                classes.pointer,
                { [classes.disabledColor]: filters.ideas }
              )}
              onClick={() => dispatch(setFilters({ ideas: !filters.ideas }))}
            >
              Ideas
            </Typography>
            <Typography
              className={classnames(
                classes.text,
                classes.marginRight2,
                classes.pointer,
                { [classes.disabledColor]: filters.inspirations }
              )}
              onClick={() =>
                dispatch(setFilters({ inspirations: !filters.inspirations }))
              }
            >
              Inspiration
            </Typography>
            <Typography
              className={classnames(classes.text, classes.pointer, {
                [classes.disabledColor]: filters.projects,
              })}
              onClick={() =>
                dispatch(setFilters({ projects: !filters.projects }))
              }
            >
              Projects
            </Typography>
          </div>
          <Typography
            className={classnames(
              classes.text,
              classes.marginBottom2,
              classes.pointer,
              { [classes.disabledColor]: !filters.archived }
            )}
            onClick={() =>
              dispatch(setFilters({ archived: !filters.archived }))
            }
          >
            Only show archived
          </Typography>
          <Typography
            className={classnames(classes.text, classes.marginBottom2)}
          >
            Tags
          </Typography>
          {tags &&
            tags.map((item) => (
              <Chip
                label={item.Title}
                onClick={() => dispatch(setFilters({ tag: item._id }))}
                key={item._id}
              />
            ))}
        </Paper>
      </Popper>
    </>
  );

  return (
    <>
      <Grid
        container
        wrap="nowrap"
        spacing={2}
        alignItems="center"
        justifyContent="space-between"
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
        </Grid>
        {addOpen && getAddPopper()}
        {searchOpen && (
          <Grid item className={classes.fullWidth}>
            <TextField
              value={filters.search}
              placeholder="Search"
              variant="outlined"
              fullWidth
              onChange={(e) => dispatch(setFilters({ search: e.target.value }))}
            />
          </Grid>
        )}
        <Grid item className={classes.flex}>
          {searchOpen ? (
            <div className={classes.icon}>
              <Close onClick={() => setSearchOpen(false)} />
            </div>
          ) : (
            <div className={classes.icon}>
              <Search onClick={() => setSearchOpen(true)} />
            </div>
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
          </div>
          {randomOpen && getRandomPopper()}
          <div className={classes.icon}>
            <List
              className={classnames({
                [classes.highlightColor]: location.pathname === ROUTES.ROOT,
              })}
              onClick={() => history.push(ROUTES.ROOT)}
            />
          </div>
          <div className={classes.icon}>
            <GridOn
              className={classnames({
                [classes.highlightColor]: location.pathname.includes(
                  ROUTES.GRID
                ),
              })}
              onClick={() => history.push(ROUTES.GRID)}
            />
          </div>
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
          </div>
          {filterOpen && getFilterPopper()}
          <Typography
            className={classnames(classes.text, classes.pointer)}
            onClick={() => history.push(ROUTES.ROOT)}
          >
            designery
          </Typography>
        </Grid>
      </Grid>
      {children}
      <RandomDialog
        randomDialogType={randomDialogType}
        randomDialogOpen={randomDialogOpen}
        setRandomDialogOpen={setRandomDialogOpen}
        ideas={ideas}
        inspirations={inspirations}
      />
    </>
  );
};

export default withRouter(Navigation);
