import React from "react";
import classnames from "classnames";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";

import Chip from "../Chip";
import { Close, Add } from "../Icons";

const useStyles = makeStyles((theme) => ({
  container: {
    border: `1px solid ${theme.palette.primary.dark}`,
    // eslint-disable-next-line prettier/prettier
    padding: `${theme.spacing(5)}px ${theme.spacing(5)}px ${theme.spacing(1)}px ${theme.spacing(5)}px`,
    borderBottomWidth: "0px",
  },
  lastContainer: {
    borderBottomWidth: "1px",
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
    cursor: "pointer",
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
  column: {
    display: "flex",
    flexDirection: "column",
    flex: "0 1 60%",
    width: "100%",
    marginRight: theme.spacing(5),
  },
  marginBottom2: {
    marginBottom: theme.spacing(2),
  },
  marginBottom3: {
    marginBottom: theme.spacing(3),
  },
  marginRight: {
    marginRight: theme.spacing(2),
  },
  flex: {
    display: "flex",
  },
  flexWrap: {
    flexWrap: "wrap",
  },
  spaceBetween: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: theme.spacing(3),
  },
  fullWidth: {
    width: "100%",
  },
}));

const BarClosed = ({ setOpen, isLast }) => {
  const classes = useStyles();
  return (
    <div
      className={classnames(classes.container, {
        [classes.lastContainer]: isLast,
      })}
    >
      <Grid container wrap="nowrap">
        <Grid item>
          <Close className={classes.icon} onClick={() => setOpen(false)} />
        </Grid>
        <Grid item xs={12}>
          <div className={classes.flex}>
            <div className={classes.column}>
              <TextField
                value="Title"
                variant="outlined"
                fullWidth
                className={classes.marginBottom2}
              />
              <TextField
                value="Description"
                variant="outlined"
                fullWidth
                className={classes.marginBottom2}
                multiline
                rows={8}
              />
            </div>
            <div className={classes.fullWidth}>
              <div className={classes.spaceBetween}>
                <div className={classes.flex}>
                  <Typography className={classes.marginRight}>Tags</Typography>
                  <Add />
                </div>
                <Typography
                  className={classnames(
                    classes.text,
                    classes.lightGrey,
                    classes.date
                  )}
                >
                  16.11.2020
                </Typography>
              </div>
              <div
                className={classnames(classes.fullWidth, classes.marginBottom3)}
              >
                <Chip label="Tag" />
                <Chip label="Tag" lastTag />
              </div>
              <div className={classnames(classes.flex, classes.marginBottom3)}>
                <Select />
                <Add />
              </div>
              <div
                className={classnames(classes.fullWidth, classes.marginBottom3)}
              >
                <Typography>Inspirations</Typography>
                <Typography>
                  <Link href="#">Inspiration 1</Link>
                  <Link href="#">Inspiration 2</Link>
                </Typography>
              </div>
            </div>
          </div>
          <div className={classes.flex}>
            <Typography className={classes.marginRight}>
              Image references
            </Typography>
            <Add />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default BarClosed;