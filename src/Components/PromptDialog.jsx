import React from "react";
import { Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Dialog from "./Dialog";

const useStyles = makeStyles((theme) => ({
  title: {
    marginBottom: theme.spacing(2),
    fontSize: "24px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  button: {
    minWidth: theme.spacing(17),
    borderRadius: theme.spacing(1),
  },
}));

const PromptDialog = ({
  dialogOpen,
  setDialogOpen,
  title,
  onSave,
  onCancel,
  saveButtonText,
  cancelButtonText,
}) => {
  const classes = useStyles();
  return (
    <Dialog dialogOpen={dialogOpen} setDialogOpen={setDialogOpen}>
      <Typography className={classes.title}>{title}</Typography>
      <div className={classes.buttonContainer}>
        <Button
          onClick={() => {
            if (onSave) onSave();
            setDialogOpen(false);
          }}
          variant="contained"
          color="primary"
          className={classes.button}
        >
          {saveButtonText || "Save"}
        </Button>
        <Button
          onClick={() => {
            if (onCancel) onCancel();
            setDialogOpen(false);
          }}
          variant="contained"
          color="primary"
          className={classes.button}
        >
          {cancelButtonText || "Cancel"}
        </Button>
      </div>
    </Dialog>
  );
};

export default PromptDialog;
