import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Bar from "../Components/Bar";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
}));

const List = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Bar />
      <Bar />
      <Bar isLast />
    </div>
  );
};

export default List;
