import React from "react";
import classnames from "classnames";
import { Dialog, Typography, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { DIALOG_VARIANT } from "../constants";

const useStyles = makeStyles((theme) => ({
  dialogPadding: {
    padding: theme.spacing(4),
  },
  textAlignCenter: {
    textAlign: "center",
  },
  marginBottom2: {
    marginBottom: theme.spacing(2),
  },
  marginBottom3: {
    marginBottom: theme.spacing(3),
  },
  marginRight: {
    marginRight: theme.spacing(2),
  },
  fontWeightBold: {
    fontWeight: "bold",
  },
  alignCenter: {
    display: "flex",
    alignItems: "center",
  },
  button: {
    minWidth: theme.spacing(17),
    borderRadius: theme.spacing(1),
  },
  buttonContainer: {
    alignSelf: "flex-end",
  },
}));

const AddDialog = ({ dialogOpen, setDialogOpen, variant }) => {
  const classes = useStyles();
  const getTitle = () => {
    if (variant === DIALOG_VARIANT.IMAGE) return "Add image reference";
    else if (variant === DIALOG_VARIANT.TAG) return "Add a tag";
    else if (variant === DIALOG_VARIANT.PROJECT) return "Add a project";
    else if (variant === DIALOG_VARIANT.INSPIRATION) return "Add a inspiration";
    else if (variant === DIALOG_VARIANT.COMPLETED_WORK) {
      return "Add a completed work";
    }
    return "";
  };
  return (
    <Dialog
      open={dialogOpen}
      onClose={() => setDialogOpen(false)}
      classes={{
        paper: classes.dialogPadding,
      }}
    >
      <Typography
        className={classnames(
          classes.fontWeightBold,
          classes.marginBottom3,
          classes.textAlignCenter
        )}
      >
        {getTitle()}
      </Typography>
      {variant === DIALOG_VARIANT.IMAGE ||
      variant === DIALOG_VARIANT.COMPLETED_WORK ? (
        <div className={classnames(classes.alignCenter, classes.marginBottom2)}>
          <TextField
            placeholder="Image URL or local file"
            variant="outlined"
            fullWidth
            className={classes.marginRight}
          />
          <>
            <Button
              variant="text"
              color="primary"
              className={classes.button}
              onClick={() => null}
            >
              Browse
            </Button>
          </>
        </div>
      ) : (
        <TextField
          variant="outlined"
          fullWidth
          className={classes.marginBottom2}
        />
      )}
      <div className={classes.buttonContainer}>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={() => null}
        >
          Save
        </Button>
      </div>
    </Dialog>
  );
};

export default AddDialog;
