import React, { FC } from "react";
import classnames from "classnames";

import useImageStyles from "./ImageStyles";
import { IMAGE_TYPE } from "../../constants";

interface Props {
  src: string;
  onClick?: () => void;
  variant: string;
}

const Image: FC<Props> = ({ src, onClick, variant }) => {
  const classes = useImageStyles();
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
