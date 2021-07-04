import React from "react";
import classnames from "classnames";
import { makeStyles } from "@material-ui/core/styles";

import { IMAGE_TYPE } from "../constants";

const useStyles = makeStyles((theme) => ({
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
    width: "100%",
  },
  randomPopUp: {
    width: 240,
    height: 240,
    cursor: "initial",
    marginRight: theme.spacing(2),
    "&:last-child": {
      marginRight: 0,
    },
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
        [classes.randomPopUp]: variant === IMAGE_TYPE.RANDOM_POPUP,
      })}
    />
  );
};

export default Image;
