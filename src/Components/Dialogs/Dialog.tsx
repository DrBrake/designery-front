import React, { FC } from "react";
import { Dialog as MuiDialog } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

interface Props {
  dialogOpen: boolean;
  setDialogOpen: (value: boolean) => void;
  onClose?: () => void;
}

const useStyles = makeStyles((theme) => ({
  dialogPadding: {
    padding: theme.spacing(4),
    maxWidth: "100%",
    minWidth: "500px",
    overflow: "visible",
  },
}));

const Dialog: FC<Props> = ({
  children,
  dialogOpen,
  setDialogOpen,
  onClose,
}) => {
  const classes = useStyles();
  return (
    <MuiDialog
      open={dialogOpen}
      onClose={() => {
        if (onClose) onClose();
        setDialogOpen(false);
      }}
      classes={{
        paper: classes.dialogPadding,
      }}
      transitionDuration={{ enter: 200, exit: 1 }}
    >
      {children}
    </MuiDialog>
  );
};

export default Dialog;
