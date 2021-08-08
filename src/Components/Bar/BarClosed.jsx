import React from "react";
import classnames from "classnames";
import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";
import { convertFromRaw } from "draft-js";
import { Typography, Grid } from "@material-ui/core";
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
  firstContainer: {
    borderTopLeftRadius: "4px",
    borderTopRightRadius: "4px",
  },
  lastContainer: {
    borderBottomWidth: "1px",
    borderBottomLeftRadius: "4px",
    borderBottomRightRadius: "4px",
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

const BarClosed = ({ itemData, setOpen, isLast, isFirst }) => {
  const classes = useStyles();
  return (
    <Grid
      container
      justify="space-between"
      className={classnames(classes.container, {
        [classes.lastContainer]: isLast,
        [classes.firstContainer]: isFirst,
      })}
      onClick={() => setOpen(true)}
    >
      <Grid item className={classes.firstItem}>
        <ChevronDown className={classes.icon} />
        <div>
          <Typography className={classes.text}>{itemData.Title}</Typography>
          <Typography
            className={classnames(classes.descriptionText, classes.lightGrey)}
          >
            {itemData.Description &&
              convertFromRaw(itemData.Description).getPlainText()}
          </Typography>
        </div>
      </Grid>
      <Grid item>
        <Typography
          className={classnames(classes.text, classes.lightGrey, classes.date)}
        >
          {dayjs(itemData.DateCreated).format("DD.MM.YYYY")}
        </Typography>
        {itemData.Tags &&
          itemData.Tags.map((item, index) => (
            <Chip
              label={item}
              isLast={index + 1 === itemData.Tags.length}
              key={uuidv4()}
            />
          ))}
      </Grid>
    </Grid>
  );
};

export default BarClosed;
