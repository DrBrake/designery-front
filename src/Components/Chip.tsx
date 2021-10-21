import React, { FC } from "react";
import classnames from "classnames";
import MuiChip from "@material-ui/core/Chip";
import { makeStyles, createStyles } from "@material-ui/core/styles";

interface Props {
  label: string;
  lastTag?: boolean;
  onClick?: () => void;
  onDelete?: () => void;
}

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      marginRight: theme.spacing(2),
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
      color: theme.palette.primary.light,
      background: "white",
      border: `1px solid ${theme.palette.primary.dark}`,
      pointerEvents: "none",
    },
    text: {
      fontSize: "16px",
      fontWeight: "bold",
    },
    lastTag: {
      marginRight: "0px",
    },
  })
);

const Chip: FC<Props> = ({ label, lastTag, onClick, onDelete }) => {
  const classes = useStyles();
  return (
    <MuiChip
      label={label}
      onClick={onClick}
      onDelete={onDelete}
      className={classnames(classes.text, classes.container, {
        [classes.lastTag]: lastTag,
      })}
    />
  );
};

export default Chip;
