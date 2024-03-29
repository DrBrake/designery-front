import React, { FC } from "react";
import classnames from "classnames";
import { Chip as MuiChip } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";

interface Props {
  label: string;
  lastTag?: boolean;
  onClick?: () => void;
  onDelete?: () => void;
  active?: boolean;
}

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      marginRight: theme.spacing(2),
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
      color: theme.palette.common.white,
      background: theme.palette.grey["A400"],
      border: `1px solid ${theme.palette.primary.dark}`,
      pointerEvents: (props: any) => (props.clickable ? "auto" : "none"),

      "&:focus": {
        color: theme.palette.common.white,
        background: theme.palette.grey["A400"],
      },
    },
    text: {
      fontSize: "16px",
      fontWeight: "bold",
    },
    lastTag: {
      marginRight: "0px",
    },
    active: {
      color: theme.palette.primary.light,
      background: theme.palette.common.white,

      "&:focus": {
        color: theme.palette.primary.light,
        background: theme.palette.common.white,
      },
    },
  })
);

const Chip: FC<Props> = ({ label, lastTag, onClick, onDelete, active }) => {
  const classes = useStyles({ clickable: !!onClick || !!onDelete });
  return (
    <MuiChip
      label={label}
      onClick={onClick}
      onDelete={onDelete}
      className={classnames(classes.text, classes.container, {
        [classes.lastTag]: lastTag,
        [classes.active]: active,
      })}
    />
  );
};

export default Chip;
