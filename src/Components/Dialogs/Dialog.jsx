import React from "react";
import { Dialog as MuiDialog } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  dialogPadding: {
    padding: theme.spacing(4),
    maxWidth: "100%",
    minWidth: "500px",
    overflow: "visible",
  },
}));

const Dialog = ({ children, dialogOpen, setDialogOpen, onClose }) => {
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
