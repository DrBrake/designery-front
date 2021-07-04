import React from "react";
import { Dialog as MuiDialog } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  dialogPadding: {
    padding: theme.spacing(4),
    overflowX: "hidden",
    maxWidth: "100%",
  },
}));

const Dialog = ({ children, dialogOpen, setDialogOpen }) => {
  const classes = useStyles();
  return (
    <MuiDialog
      open={dialogOpen}
      onClose={() => setDialogOpen(false)}
      classes={{
        paper: classes.dialogPadding,
      }}
    >
      {children}
    </MuiDialog>
  );
};

export default Dialog;
