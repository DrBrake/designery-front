import React, { FC } from "react";
import classnames from "classnames";
import { Dialog as MuiDialog } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

interface Props {
  dialogOpen: boolean;
  setDialogOpen: () => void;
  onClose?: () => void;
  transparent?: boolean;
}

const useStyles = makeStyles((theme) => ({
  dialogPadding: {
    padding: theme.spacing(4),
    maxWidth: "100%",
    minWidth: "500px",
    overflow: "visible",
  },
  transparent: {
    background: "transparent",
    boxShadow: "none",
    padding: 0,
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.9)",
  },
}));

const Dialog: FC<Props> = ({
  children,
  dialogOpen,
  setDialogOpen,
  onClose,
  transparent,
}) => {
  const classes = useStyles();
  return (
    <MuiDialog
      open={dialogOpen}
      onClose={() => {
        if (onClose) onClose();
        setDialogOpen();
      }}
      classes={{
        paper: classnames(classes.dialogPadding, {
          [classes.transparent]: transparent,
        }),
      }}
      transitionDuration={{ enter: 200, exit: 1 }}
      onClick={() => transparent && setDialogOpen()}
      BackdropProps={{ classes: { root: classes.backdrop } }}
    >
      {children}
    </MuiDialog>
  );
};

export default Dialog;
