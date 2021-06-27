import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Sort from "../Components/Sort";
import Bar from "../Components/Bar/Bar";

const useStyles = makeStyles(() => ({
  container: {
    maxWidth: "1640px",
    margin: "auto",
  },
}));

const List = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Sort />
      <Bar variant="idea" />
      <Bar variant="inspiration" />
      <Bar variant="project" isLast />
    </div>
  );
};

export default List;
