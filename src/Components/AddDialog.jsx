import React, { useState } from "react";
import classnames from "classnames";
import { Typography, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Dialog from "./Dialog";
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
  pointer: {
    cursor: "pointer",
  },
}));

const AddDialog = ({ dialogOpen, setDialogOpen, variant }) => {
  const [url, setUrl] = useState("");
  const classes = useStyles();
  const getTitle = () => {
    if (variant === DIALOG_VARIANT.IMAGE_REF) return "Add image reference";
    else if (variant === DIALOG_VARIANT.TAG) return "Add a tag";
    else if (variant === DIALOG_VARIANT.PROJECT) return "Add a project";
    else if (variant === DIALOG_VARIANT.INSPIRATION) return "Add a inspiration";
    else if (variant === DIALOG_VARIANT.DRAFT) return "Add a draft";
    else if (variant === DIALOG_VARIANT.COMPLETED_WORK) {
      return "Add a completed work";
    }
    return "";
  };
  return (
    <Dialog
      dialogOpen={dialogOpen}
      setDialogOpen={setDialogOpen}
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
      {variant === DIALOG_VARIANT.IMAGE_REF ||
      variant === DIALOG_VARIANT.DRAFT ||
      variant === DIALOG_VARIANT.COMPLETED_WORK ? (
        <div className={classnames(classes.alignCenter, classes.marginBottom2)}>
          <TextField
            placeholder="Image URL or local file"
            variant="outlined"
            fullWidth
            className={classes.marginRight}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <Button
            variant="text"
            color="primary"
            className={classes.button}
            onClick={() => null}
          >
            Browse
          </Button>
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
