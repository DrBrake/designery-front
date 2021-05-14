import React from "react";
import classnames from "classnames";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

import Chip from "../Chip";
import { ChevronDown } from "../Icons";

const useStyles = makeStyles((theme) => ({
  container: {
    cursor: "pointer",
    border: `1px solid ${theme.palette.primary.dark}`,
    // eslint-disable-next-line prettier/prettier
    padding: `${theme.spacing(5)}px ${theme.spacing(5)}px ${theme.spacing(1)}px ${theme.spacing(5)}px`,
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
  descriptionText: {
    fontSize: "16px",
  },
  lightGrey: {
    color: theme.palette.primary.dark,
  },
  icon: {
    marginRight: theme.spacing(6),
    marginTop: theme.spacing(1),
  },
  date: {
    textAlign: "right",
  },
  tag: {
    marginRight: theme.spacing(2),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    color: theme.palette.primary.light,
  },
  lastTag: {
    marginRight: "0px",
  },
}));

const BarClosed = ({ setOpen, isLast }) => {
  const classes = useStyles();
  return (
    <Grid
      container
      justify="space-between"
      className={classnames(classes.container, {
        [classes.lastContainer]: isLast,
      })}
      onClick={() => setOpen(true)}
    >
      <Grid item className={classes.firstItem}>
        <ChevronDown className={classes.icon} />
        <div>
          <Typography className={classes.text}>Title</Typography>
          <Typography
            className={classnames(classes.descriptionText, classes.lightGrey)}
          >
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

export default BarClosed;
