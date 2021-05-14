import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Bar from "../Components/Bar/Bar";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  innerContainer: {
    maxWidth: "1640px",
    width: "100%",
  },
}));

const List = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.innerContainer}>
        <Bar />
        <Bar />
        <Bar isLast />
      </div>
    </div>
  );
};

export default List;
