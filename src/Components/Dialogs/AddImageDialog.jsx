import React from "react";
import classnames from "classnames";
import { FieldArray, Field } from "formik";
import { Typography, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Dialog from "./Dialog";
import { Add, Remove } from "../Icons";

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
    position: "relative",
  },
  iconContainer: {
    position: "absolute",
    top: "50%",
    left: "-7%",
    marginTop: "-24px", // Half the size of the element
    background: "white",
    padding: theme.spacing(1),
    borderRadius: theme.spacing(1),
    display: "flex",
  },
  pointer: {
    cursor: "pointer",
  },
}));

const AddDialog = ({
  dialogOpen,
  setDialogOpen,
  values,
  name,
  handleChange,
  setFieldValue,
  title,
}) => {
  const classes = useStyles();

  return (
    <Dialog
      dialogOpen={dialogOpen}
      setDialogOpen={setDialogOpen}
      onClose={() => {
        setFieldValue(
          name,
          values.filter((value) => value !== "")
        );
      }}
    >
      <Typography
        className={classnames(
          classes.fontWeightBold,
          classes.marginBottom3,
          classes.textAlignCenter
        )}
      >
        {title}
      </Typography>
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
                {values.length > 1 && (
                  <Remove
                    onClick={() => arrayHelpers.remove(index)}
                    className={classnames(classes.marginRight, classes.pointer)}
                  />
                )}
                <Field
                  placeholder={"Image URL"}
                  variant="outlined"
                  fullWidth
                  className={classes.marginRight}
                  name={`${name}.${index}`}
                  as={TextField}
                  onChange={handleChange}
                />
              </div>
            ))}
            <div className={classes.iconContainer}>
              <Add
                onClick={() => arrayHelpers.push("")}
                className={classnames(classes.marginRight, classes.pointer)}
              />
            </div>
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
          </>
        )}
      />
    </Dialog>
  );
};

export default AddDialog;
