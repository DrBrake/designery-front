import React, { useState, useEffect, FC } from "react";
import classnames from "classnames";
import dayjs from "dayjs";
import { Formik, Form } from "formik";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import { Typography, Grid, TextField, Button } from "@material-ui/core";
import { useDispatch } from "react-redux";

import { removeNewItem, updateNewItem } from "../../Reducers/appSlice";
import {
  usePostItemMutation,
  useRemoveItemMutation,
} from "../../Services/dataAPI";
import PromptDialog from "../Dialogs/PromptDialog";
import RichTextEditor from "../RichTextEditor";
import Chip from "../Chip";
import AutocompleteDialog from "../Dialogs/AutocompleteDialog";
import { Close, Add } from "../Icons";
import { Project, Idea, Tag } from "../../Types/dataTypes";
import { DIALOG_VARIANT } from "../../constants";
import { useFormStyles } from "./FormStyles";

interface Props {
  project: Project;
  isNewItem: boolean;
  index: number;
  setOpen: (value: boolean) => void;
}

interface RawProject extends Project {
  NewIdeas?: Array<Idea>;
  NewTags?: Array<Tag>;
}

const ProjectForm: FC<Props> = ({ project, setOpen, isNewItem, index }) => {
  const [autocompleteDialogOpen, setAutocompleteDialogOpen] = useState(false);
  const [autocompleteDialogVariant, setAutocompleteDialogVariant] = useState(
    ""
  );
  const [removeDialogOpen, setRemoveDialogOpen] = useState(false);
  const [postItem, { isSuccess }] = usePostItemMutation();
  const [removeItem] = useRemoveItemMutation();

  const classes = useFormStyles();
  const dispatch = useDispatch();

  const handleFieldValues = (values: RawProject) => {
    const tempValues = { ...values };
    tempValues.Ideas?.concat(tempValues.NewIdeas!);
    tempValues.Tags?.concat(tempValues.NewTags!);
    delete tempValues.NewIdeas;
    delete tempValues.NewTags;
    return tempValues;
  };

  const getAutocompleteDialogOptions = (
    values: RawProject,
    dialogVariant: string
  ) => {
    if (dialogVariant === DIALOG_VARIANT.TAG) {
      return {
        title: "Add a tag",
        name: "NewTags",
        values: values.Tags,
        newValues: values.NewTags,
        dialogVariant: dialogVariant,
      };
    }
    return { title: "", name: "", values: [], newValues: [] };
  };

  useEffect(() => {
    if (isSuccess && isNewItem) dispatch(removeNewItem({ index }));
  }, [isSuccess]);

  return (
    <Formik
      initialValues={
        {
          _id: project._id || null,
          Title: project.Title || "",
          Description: project.Description,
          Ideas: project.Ideas || [],
          NewIdeas: [],
          Tags: project.Tags || [],
          NewTags: [],
          DateCreated: project.DateCreated || dayjs().format(),
          Variant: project.Variant || "",
        } as RawProject
      }
      onSubmit={(values) => postItem(handleFieldValues(values))}
    >
      {({ values, handleChange, setFieldValue }) => (
        <Form>
          <Grid container wrap="nowrap">
            <Grid item>
              <Close
                className={classes.icon}
                onClick={() => {
                  setOpen(false);
                  if (isNewItem)
                    dispatch(
                      updateNewItem({
                        index,
                        values: handleFieldValues(values),
                      })
                    );
                }}
              />
            </Grid>
            <Grid item xs={12}>
              {isNewItem && (
                <Typography
                  className={classnames(
                    classes.lighterGrey,
                    classes.marginBottom2
                  )}
                >
                  (UNSAVED)
                </Typography>
              )}
              <div className={classes.flex}>
                <div className={classes.column}>
                  <TextField
                    placeholder="Title"
                    variant="outlined"
                    fullWidth
                    className={classes.marginBottom2}
                    value={values.Title}
                    name="Title"
                    onChange={handleChange}
                    required
                  />
                  <RichTextEditor
                    placeholder="Description"
                    editorState={
                      values.Description
                        ? EditorState.createWithContent(
                            convertFromRaw(values.Description)
                          )
                        : EditorState.createEmpty()
                    }
                    setFieldValue={(value) =>
                      setFieldValue(
                        "Description",
                        convertToRaw(value.getCurrentContent())
                      )
                    }
                  />
                </div>
                <div className={classes.fullWidth}>
                  <div className={classes.spaceBetween}>
                    <div className={classes.flex}>
                      <Typography
                        className={classnames(
                          classes.marginRight,
                          classes.fontWeightBold
                        )}
                      >
                        Tags
                      </Typography>
                      <Add
                        className={classes.pointer}
                        onClick={() => {
                          setAutocompleteDialogOpen(true);
                          setAutocompleteDialogVariant(DIALOG_VARIANT.TAG);
                        }}
                      />
                    </div>
                    <Typography
                      className={classnames(
                        classes.text,
                        classes.lightGrey,
                        classes.date
                      )}
                    >
                      {dayjs(values.DateCreated).format("DD.MM.YYYY")}
                    </Typography>
                  </div>
                  <div
                    className={classnames(
                      classes.fullWidth,
                      classes.marginBottom3
                    )}
                  >
                    {values.Tags &&
                      values.Tags.map(
                        (item, index) =>
                          item &&
                          item.Title !== "" && (
                            <Chip
                              label={item.Title}
                              onClick={() => null}
                              lastTag={index + 1 === values.Tags?.length}
                              key={item._id}
                            />
                          )
                      )}
                    {values.NewTags &&
                      values.NewTags.map(
                        (item, index) =>
                          item &&
                          item.Title !== "" && (
                            <Chip
                              label={item.Title}
                              onClick={() => null}
                              lastTag={index + 1 === values.NewTags?.length}
                              key={item._id}
                            />
                          )
                      )}
                  </div>
                </div>
              </div>
              <div className={classes.bottomContainer}>
                <div className={classes.buttonContainer}>
                  <Button
                    variant="text"
                    color="primary"
                    className={classnames(classes.button, classes.marginRight)}
                    onClick={() => setRemoveDialogOpen(true)}
                  >
                    Remove
                  </Button>
                  <div className={classes.verticalDivider} />
                  <Button
                    variant="text"
                    color="primary"
                    className={classnames(classes.button, classes.marginRight)}
                    onClick={() => setOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    type="submit"
                  >
                    Save
                  </Button>
                </div>
              </div>
            </Grid>
          </Grid>
          {autocompleteDialogOpen && (
            <AutocompleteDialog
              dialogOpen={autocompleteDialogOpen}
              setDialogOpen={setAutocompleteDialogOpen}
              setFieldValue={setFieldValue}
              {...getAutocompleteDialogOptions(
                values,
                autocompleteDialogVariant
              )}
            />
          )}
          <PromptDialog
            dialogOpen={removeDialogOpen}
            setDialogOpen={setRemoveDialogOpen}
            onSave={() => {
              isNewItem
                ? dispatch(removeNewItem({ index }))
                : removeItem(values);
            }}
            title={`Are you sure you want to remove this ${values.Variant}?`}
            saveButtonText="Remove"
          />
        </Form>
      )}
    </Formik>
  );
};

export default ProjectForm;
