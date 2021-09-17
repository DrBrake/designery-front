import React from "react";
import classnames from "classnames";
import { FieldArray, Field } from "formik";
import { Typography, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Dialog from "./Dialog";
import { Add, Remove } from "./Icons";
import { DIALOG_VARIANT } from "../constants";

const useStyles = makeStyles((theme) => ({
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
    display: "flex",
    justifyContent: "flex-end",
  },
  iconContainer: {
    alignSelf: "center",
    flex: 1,
  },
  pointer: {
    cursor: "pointer",
  },
}));

const AddDialog = ({
  dialogOpen,
  setDialogOpen,
  variant,
  values,
  name,
  handleChange,
}) => {
  const classes = useStyles();

  const addMultiple =
    variant === DIALOG_VARIANT.IMAGE_REF ||
    variant === DIALOG_VARIANT.DRAFT ||
    variant === DIALOG_VARIANT.COMPLETED_WORK ||
    variant === DIALOG_VARIANT.TAG ||
    variant === DIALOG_VARIANT.INSPIRATION;

  const imageVariant =
    variant === DIALOG_VARIANT.IMAGE_REF ||
    variant === DIALOG_VARIANT.DRAFT ||
    variant === DIALOG_VARIANT.COMPLETED_WORK;

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

  const getButtons = (arrayHelpers) => (
    <div className={classes.buttonContainer}>
      {addMultiple && arrayHelpers && (
        <div className={classes.iconContainer}>
          <Add
            onClick={() => arrayHelpers.push("")}
            className={classnames(classes.marginRight, classes.cursor)}
          />
        </div>
      )}
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={() => setDialogOpen(false)}
      >
        Save
      </Button>
    </div>
  );

  return (
    <Dialog dialogOpen={dialogOpen} setDialogOpen={setDialogOpen}>
      <Typography
        className={classnames(
          classes.fontWeightBold,
          classes.marginBottom3,
          classes.textAlignCenter
        )}
      >
        {getTitle()}
      </Typography>
      {addMultiple ? (
        <FieldArray
          name={name}
          render={(arrayHelpers) => (
            <>
              {values.map((item, index) => (
                <div
                  key={index}
                  className={classnames(
                    classes.alignCenter,
                    classes.marginBottom2
                  )}
                >
                  <Remove
                    onClick={() => arrayHelpers.remove(index)}
                    className={classnames(classes.marginRight, classes.cursor)}
                  />
                  <Field
                    placeholder={
                      imageVariant
                        ? "Image URL"
                        : `Type existing or new ${variant}`
                    }
                    variant="outlined"
                    fullWidth
                    className={classes.marginRight}
                    name={`${name}.${index}`}
                    as={TextField}
                    onChange={handleChange}
                  />
                </div>
              ))}
              {getButtons(arrayHelpers)}
            </>
          )}
        />
      ) : (
        <TextField
          variant="outlined"
          fullWidth
          className={classes.marginBottom2}
          onChange={handleChange}
        />
      )}
      {!addMultiple && getButtons()}
    </Dialog>
  );
};

export default AddDialog;
