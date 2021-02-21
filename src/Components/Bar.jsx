import React, { useState } from "react";
import classnames from "classnames";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

import Chip from "../Components/Chip";
import { ChevronDown, ChevronUp } from "./Icons";

const useStyles = makeStyles((theme) => ({
  container: {
    cursor: "pointer",
    maxWidth: "1640px",
    border: `1px solid ${theme.palette.primary.dark}`,
    padding: `${theme.spacing(5)}px ${theme.spacing(5)}px 12px ${theme.spacing(5)}px`,
    borderBottomWidth: "0px",
  },
  lastContainer: {
    borderBottomWidth: "1px",
  },
  firstItem: {
    display: "flex",
  },
  text: {
    fontSize: "16px",
    fontWeight: "500",
  },
  lightGrey: {
    color: theme.palette.primary.dark,
  },
  icon: {
    marginRight: "52px",
    marginTop: "12px",
  },
  date: {
    textAlign: "right",
  },
  tag: {
    marginRight: "16px",
    paddingLeft: "26px",
    paddingRight: "26px",
    color: theme.palette.primary.light,
  },
  lastTag: {
    marginRight: "0px",
  },
}));

const Bar = ({ isLast }) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  return (
    <Grid
      container
      justify="space-between"
      className={classnames(classes.container, {
        [classes.lastContainer]: isLast,
      })}
      onClick={() => setOpen(!open)}
    >
      <Grid item className={classes.firstItem}>
        {open ? (
          <ChevronUp className={classes.icon} />
        ) : (
          <ChevronDown className={classes.icon} />
        )}
        <div>
          <Typography className={classes.text}>Title</Typography>
          <Typography className={classnames(classes.text, classes.lightGrey)}>
            Description
          </Typography>
        </div>
      </Grid>
      <Grid item>
        <Typography
          className={classnames(classes.text, classes.lightGrey, classes.date)}
        >
          16.11.2020
        </Typography>
        <Chip label="Tag" />
        <Chip label="Tag" lastTag />
      </Grid>
    </Grid>
  );
};

export default Bar;
