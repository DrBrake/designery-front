import React, { useState } from "react";
import { Select, MenuItem } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import { ArrowDown, ArrowUp } from "./Icons";

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      marginBottom: theme.spacing(2),
    },
    select: {
      marginRight: theme.spacing(2),
      minWidth: "100px",
      "&:before, &:after": {
        content: "initial",
      },
    },
    pointer: {
      cursor: "pointer",
    },
  })
);

const Sort = () => {
  const [direction, setDirection] = useState("asc");
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Select value="name" onChange={() => null} className={classes.select}>
        <MenuItem value="name">Name</MenuItem>
        <MenuItem value="date">Date</MenuItem>
      </Select>
      {direction === "asc" ? (
        <ArrowDown
          onClick={() => setDirection("desc")}
          className={classes.pointer}
        />
      ) : (
        <ArrowUp
          onClick={() => setDirection("asc")}
          className={classes.pointer}
        />
      )}
    </div>
  );
};

export default Sort;
