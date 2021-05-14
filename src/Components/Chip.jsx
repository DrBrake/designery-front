import React from "react";
import classnames from "classnames";
import MuiChip from "@material-ui/core/Chip";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    marginRight: theme.spacing(2),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    color: theme.palette.primary.light,
    background: "white",
    border: `1px solid ${theme.palette.primary.dark}`,
    pointerEvents: "none",
  },
  text: {
    fontSize: "16px",
    fontWeight: "500",
  },
  lastTag: {
    marginRight: "0px",
  },
}));

const Chip = ({ label, lastTag }) => {
  const classes = useStyles();
  return (
    <MuiChip
      label={label}
      className={classnames(classes.text, classes.container, {
        [classes.lastTag]: lastTag,
      })}
    />
  );
};

export default Chip;
