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
      loading="lazy"
      width="240"
      height="240"
      className={classnames(classes.image, {
        [classes.barImageRef]: variant === IMAGE_TYPE.BAR,
        [classes.randomPopUp]: variant === IMAGE_TYPE.RANDOM_POPUP,
      })}
    />
  );
};

export default Image;
