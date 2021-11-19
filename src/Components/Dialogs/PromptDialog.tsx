import React, { FC } from "react";
import { Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Dialog from "./Dialog";

interface Props {
  dialogOpen: boolean;
  setDialogOpen: () => void;
  title: string;
  onSave?: () => void;
  onCancel?: () => void;
  saveButtonText?: string;
  cancelButtonText?: string;
}

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(3),
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

const PromptDialog: FC<Props> = ({
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
            setDialogOpen();
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
            setDialogOpen();
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
