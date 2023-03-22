import React, { FC } from "react";
import classnames from "classnames";
import { FieldArray, Field, Formik, Form } from "formik";
import { Typography, TextField, Button } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';

import Dialog from "./Dialog";
import { Add, Remove } from "../Icons";
import { ImageFile } from "../../Types/dataTypes";
import { isURL } from "../../utils";

interface Props {
  dialogOpen: boolean;
  setDialogOpen: () => void;
  itemValues?: Array<string | ImageFile>;
  name: string;
  setFieldValue: (field: string, value: any) => void;
  title: string;
}

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
    background: theme.palette.grey["800"],
    padding: theme.spacing(1),
    borderRadius: theme.spacing(1),
    display: "flex",
  },
  pointer: {
    cursor: "pointer",
  },
}));

const AddImageDialog: FC<Props> = ({
  dialogOpen,
  setDialogOpen,
  itemValues,
  name,
  setFieldValue,
  title,
}) => {
  const classes = useStyles();

  return (
    <Dialog dialogOpen={dialogOpen} setDialogOpen={setDialogOpen}>
      <Formik
        initialValues={{
          imageUrls: [""],
        }}
        onSubmit={(values) => {
          setFieldValue(
            name,
            itemValues?.concat(
              values.imageUrls.filter(
                (item) => item !== "" && isURL(item) && item
              )
            )
          );
          setDialogOpen();
        }}
      >
        {({ values, handleChange }) => (
          <Form>
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
              name="imageUrls"
              render={(arrayHelpers) => (
                <>
                  {values.imageUrls?.map((item, index) => (
                    <div
                      key={index}
                      className={classnames(
                        classes.alignCenter,
                        classes.marginBottom2
                      )}
                    >
                      {values.imageUrls?.length > 1 && (
                        <Remove
                          onClick={() => arrayHelpers.remove(index)}
                          className={classnames(
                            classes.marginRight,
                            classes.pointer
                          )}
                        />
                      )}
                      <Field
                        placeholder={"Image URL"}
                        variant="outlined"
                        fullWidth
                        className={classes.marginRight}
                        name={`imageUrls.${index}`}
                        as={TextField}
                        onChange={handleChange}
                      />
                    </div>
                  ))}
                  <div className={classes.iconContainer}>
                    <Add
                      onClick={() => arrayHelpers.push("")}
                      className={classnames(
                        classes.marginRight,
                        classes.pointer
                      )}
                    />
                  </div>
                  <div className={classes.buttonContainer}>
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      type="submit"
                    >
                      Save
                    </Button>
                  </div>
                </>
              )}
            />
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default AddImageDialog;
