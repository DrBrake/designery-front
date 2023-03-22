import React, { useEffect, FC, useState } from "react";
import classnames from "classnames";
import { Formik, Form, Field } from "formik";
import { useSelector } from "react-redux";
import {
  TextField,
  Button,
  Typography,
  CircularProgress,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';

import { selectToken } from "../../Reducers/authSlice";
import { Tag } from "../../Types/dataTypes";
import Dialog from "./Dialog";
import { usePostTagMutation } from "../../Services/dataAPI";

interface Props {
  tag: Tag;
  dialogOpen: boolean;
  setDialogOpen: () => void;
}

const useStyles = makeStyles((theme) => ({
  input: {
    marginBottom: theme.spacing(1),
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  button: {
    minWidth: theme.spacing(17),
    borderRadius: theme.spacing(1),
  },
  remove: {
    color: "red",
  },
  text: {
    minHeight: "24px",
    marginBottom: theme.spacing(2),
  },
  title: {
    fontWeight: "bold",
    marginBottom: theme.spacing(3),
    textAlign: "center",
  },
}));

const EditTagDialog: FC<Props> = ({ tag, dialogOpen, setDialogOpen }) => {
  const [removeConfirm, setRemoveConfirm] = useState(false);
  const [postTag, { isSuccess, isError, isLoading }] = usePostTagMutation();

  const classes = useStyles();
  const token = useSelector(selectToken);

  useEffect(() => {
    if (isSuccess) {
      setDialogOpen();
    }
  }, [isSuccess]);

  return (
    <Dialog dialogOpen={dialogOpen} setDialogOpen={setDialogOpen}>
      {
        <Formik
          initialValues={tag}
          onSubmit={(values) =>
            postTag({ tag: values, type: removeConfirm ? "DELETE" : "POST" })
          }
          enableReinitialize
        >
          {({ values, handleChange, setFieldValue }) => (
            <Form>
              {removeConfirm ? (
                <>
                  <Typography className={classes.text}>
                    Are you sure you want to remove this tag?
                  </Typography>
                  <div className={classes.buttonContainer}>
                    <Button
                      variant="text"
                      onClick={setDialogOpen}
                      className={classes.button}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <CircularProgress color="secondary" size={24} />
                      ) : (
                        "Cancel"
                      )}
                    </Button>
                    <Button
                      color="primary"
                      variant="contained"
                      className={classes.button}
                      type="submit"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <CircularProgress color="secondary" size={24} />
                      ) : (
                        "Remove"
                      )}
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <Typography className={classes.title}>Edit tag</Typography>
                  <Field
                    label="Title"
                    inputProps={{ name: "Title" }}
                    fullWidth
                    className={classes.input}
                    value={values.Title}
                    component={TextField}
                    onChange={handleChange}
                  />
                  {token && (
                    <FormControlLabel
                      control={<Checkbox checked={values.Secret} />}
                      label="Secret"
                      onChange={() => setFieldValue("Secret", !values.Secret)}
                    />
                  )}
                  <Typography color="error" className={classes.text}>
                    {isError && "Error editing tag"}
                  </Typography>
                  <div className={classes.buttonContainer}>
                    <Button
                      variant="text"
                      className={classnames(classes.button, classes.remove)}
                      onClick={() => setRemoveConfirm(true)}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <CircularProgress color="secondary" size={24} />
                      ) : (
                        "Remove"
                      )}
                    </Button>
                    <Button
                      color="primary"
                      variant="contained"
                      className={classes.button}
                      type="submit"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <CircularProgress color="secondary" size={24} />
                      ) : (
                        "Save"
                      )}
                    </Button>
                  </div>
                </>
              )}
            </Form>
          )}
        </Formik>
      }
    </Dialog>
  );
};

export default EditTagDialog;
