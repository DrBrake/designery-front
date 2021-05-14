import React from "react";
import classnames from "classnames";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  barImageRef: {
    cursor: "pointer",
    width: 240,
    height: 240,
    objectFit: "cover",
  },
}));

const Image = ({ src, onClick, variant }) => {
  const classes = useStyles();
  return (
    <img
      src={src}
      onClick={onClick}
      className={classnames({ [classes.barImageRef]: variant === "bar" })}
    />
  );
};

export default Image;
