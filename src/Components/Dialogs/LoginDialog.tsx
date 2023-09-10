import React, { useEffect, FC } from "react";
import { Formik, Form, Field } from "formik";
import { TextField, Button, Typography, CircularProgress } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";

import Dialog from "./Dialog";
import { usePostLoginMutation } from "../../Services/dataAPI";

interface Props {
  dialogOpen: boolean;
  setDialogOpen: () => void;
}

const useStyles = makeStyles((theme) => ({
  input: {
    marginBottom: theme.spacing(1),
  },
  button: {
    minWidth: theme.spacing(17),
    borderRadius: theme.spacing(1),
  },
  text: {
    minHeight: "24px",
    marginBottom: theme.spacing(2),
  },
}));

const LoginDialog: FC<Props> = ({ dialogOpen, setDialogOpen }) => {
  const classes = useStyles();
  const [postLogin, { isSuccess, isError, isLoading }] = usePostLoginMutation();

  useEffect(() => {
    if (isSuccess) {
      setDialogOpen();
    }
  }, [isSuccess]);

  return (
    <Dialog dialogOpen={dialogOpen} setDialogOpen={setDialogOpen}>
      <Formik
        initialValues={{
          UserName: "",
          Password: "",
        }}
        onSubmit={postLogin}
        enableReinitialize
      >
        {({ values, handleChange }) => (
          <Form>
            <Field
              label="User name"
              inputProps={{ name: "UserName" }}
              fullWidth
              className={classes.input}
              value={values.UserName}
              component={TextField}
              onChange={handleChange}
            />
            <Field
              label="Password"
              inputProps={{ name: "Password" }}
              fullWidth
              value={values.Password}
              component={TextField}
              onChange={handleChange}
              type="password"
            />
            <Typography color="error" className={classes.text}>
              {isError ? "Error logging in" : ""}
            </Typography>
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
                "Login"
              )}
            </Button>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default LoginDialog;
