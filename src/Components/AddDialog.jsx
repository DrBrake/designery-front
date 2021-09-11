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
    alignSelf: "flex-end",
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
      {variant === DIALOG_VARIANT.IMAGE_REF ||
      variant === DIALOG_VARIANT.DRAFT ||
      variant === DIALOG_VARIANT.COMPLETED_WORK ||
      variant === DIALOG_VARIANT.TAG ||
      variant === DIALOG_VARIANT.INSPIRATION ? (
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
                  {index === 0 ? (
                    <Add
                      onClick={() => arrayHelpers.insert(index, "")}
                      className={classes.marginRight}
                    />
                  ) : (
                    <Remove
                      onClick={() => arrayHelpers.remove(index)}
                      className={classes.marginRight}
                    />
                  )}
                  <Field
                    placeholder={
                      variant === DIALOG_VARIANT.IMAGE_REF ||
                      variant === DIALOG_VARIANT.DRAFT ||
                      variant === DIALOG_VARIANT.COMPLETED_WORK
                        ? "Image URL or local file"
                        : `Type existing or new ${variant}`
                    }
                    variant="outlined"
                    fullWidth
                    className={classes.marginRight}
                    name={`${name}.${index}`}
                    component={TextField}
                  />
                  {(variant === DIALOG_VARIANT.IMAGE_REF ||
                    variant === DIALOG_VARIANT.DRAFT ||
                    variant === DIALOG_VARIANT.COMPLETED_WORK) && (
                    <Button
                      variant="text"
                      color="primary"
                      className={classes.button}
                      onClick={() => null}
                    >
                      Browse
                    </Button>
                  )}
                </div>
              ))}
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
      <div className={classes.buttonContainer}>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={() => setDialogOpen(false)}
        >
          Save
        </Button>
      </div>
    </Dialog>
  );
};

export default AddDialog;
