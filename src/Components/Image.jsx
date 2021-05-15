import React from "react";
import classnames from "classnames";
import { makeStyles } from "@material-ui/core/styles";

import { IMAGE_TYPE } from "../constants";

const useStyles = makeStyles(() => ({
  image: {
    cursor: "pointer",
    objectFit: "cover",
  },
  barImageRef: {
    width: 240,
    height: 240,
  },
  completedWork: {
    maxHeight: 280,
  },
  grid: {
    maxHeight: 370,
  },
}));

const Image = ({ src, onClick, variant }) => {
  const classes = useStyles();
  return (
    <img
      src={src}
      onClick={onClick}
      className={classnames(classes.image, {
        [classes.barImageRef]: variant === IMAGE_TYPE.BAR,
        [classes.completedWork]: variant === IMAGE_TYPE.COMPLETED_WORK,
        [classes.grid]: variant === IMAGE_TYPE.GRID,
      })}
    />
  );
};

export default Image;
