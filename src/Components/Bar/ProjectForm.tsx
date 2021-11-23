import React, { useEffect, FC } from "react";
import classnames from "classnames";
import dayjs from "dayjs";
import { Formik, Form } from "formik";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import { Typography, Grid, TextField, Button, Link } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

import {
  removeNewItem,
  updateNewItem,
  selectTags,
  selectIdeas,
} from "../../Reducers/appSlice";
import {
  usePostItemMutation,
  useRemoveItemMutation,
} from "../../Services/dataAPI";
import PromptDialog from "../Dialogs/PromptDialog";
import RichTextEditor from "../RichTextEditor";
import Chip from "../Chip";
import AutocompleteDialog from "../Dialogs/AutocompleteDialog";
import { Close, Add } from "../Icons";
import { Project } from "../../Types/dataTypes";
import { DIALOG_VARIANT } from "../../constants";
import { useFormStyles } from "./FormStyles";
import useDialogs from "../../Hooks/useDialogs";

interface Props {
  project: Project;
  isNewItem: boolean;
  index: number;
  setOpen: (value: boolean) => void;
}

const ProjectForm: FC<Props> = ({ project, setOpen, isNewItem, index }) => {
  const { dialogs, setDialogs } = useDialogs();

  const [postItem, { isSuccess: postItemSuccess }] = usePostItemMutation();
  const [removeItem] = useRemoveItemMutation();

  const classes = useFormStyles();
  const dispatch = useDispatch();

  const ideas = useSelector(selectIdeas);
  const tags = useSelector(selectTags);

  useEffect(() => {
    if (postItemSuccess) {
      setOpen(false);
      if (isNewItem) {
        dispatch(removeNewItem({ index }));
      }
    }
  }, [postItemSuccess]);

  return (
    <Formik
      initialValues={
        {
          _id: project._id || null,
          Title: project.Title || "",
          Description: project.Description,
          Ideas: project.Ideas || [],
          Tags: project.Tags || [],
          DateCreated: project.DateCreated || dayjs().format(),
          Completed: project.Completed || false,
          Variant: project.Variant || "",
        } as Project
      }
      onSubmit={(values) => postItem(values)}
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
                        values: values,
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
                          setDialogs({
                            type: "Autocomplete",
                            open: true,
                            variant: DIALOG_VARIANT.TAG,
                          });
                        }}
                      />
                    </div>
                    <Typography
                      className={classnames(
                        classes.fontSize16,
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
                  </div>
                  <div
                    className={classnames(
                      classes.fullWidth,
                      classes.marginBottom3
                    )}
                  >
                    <div className={classes.flex}>
                      <Typography
                        className={classnames(
                          classes.marginRight,
                          classes.fontWeightBold
                        )}
                      >
                        Linked ideas
                      </Typography>
                      <Add
                        className={classes.pointer}
                        onClick={() => {
                          setDialogs({
                            type: "Autocomplete",
                            open: true,
                            variant: DIALOG_VARIANT.IDEA,
                          });
                        }}
                      />
                    </div>
                    <div className={classes.flex}>
                      {values.Ideas &&
                        values.Ideas.map(
                          (item) =>
                            item &&
                            item.Title !== "" && (
                              <>
                                <Typography
                                  key={item._id}
                                  className={classes.marginRight}
                                >
                                  <Link href="#">{item.Title}</Link>
                                </Typography>
                                {index + 1 < values.Ideas!.length && (
                                  <div className={classes.verticalDivider} />
                                )}
                              </>
                            )
                        )}
                    </div>
                  </div>
                </div>
              </div>
              <div className={classes.bottomContainer}>
                <div className={classes.buttonContainer}>
                  <Button
                    variant="text"
                    className={classnames(classes.button, classes.marginRight)}
                    onClick={() =>
                      setDialogs({
                        type: "Remove",
                        open: true,
                      })
                    }
                  >
                    Remove
                  </Button>
                  {!isNewItem && (
                    <Button
                      variant="text"
                      className={classnames(
                        classes.button,
                        classes.marginRight
                      )}
                      onClick={() =>
                        setDialogs({
                          type: "Complete",
                          open: false,
                        })
                      }
                    >
                      Archive
                    </Button>
                  )}
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
          {dialogs.Autocomplete.open && (
            <AutocompleteDialog
              dialogOpen={dialogs.Autocomplete.open}
              values={
                dialogs.Autocomplete.variant === DIALOG_VARIANT.TAG
                  ? tags
                  : ideas
              }
              itemValues={
                dialogs.Autocomplete.variant === DIALOG_VARIANT.IDEA
                  ? values.Tags
                  : values.Ideas
              }
              setDialogOpen={() =>
                setDialogs({
                  type: "Autocomplete",
                  open: false,
                  variant: null,
                })
              }
              setFieldValue={setFieldValue}
              {...dialogs.Autocomplete.dialogOptions}
            />
          )}
          <PromptDialog
            dialogOpen={dialogs.Remove.open}
            setDialogOpen={() =>
              setDialogs({
                type: "Remove",
                open: false,
              })
            }
            onSave={() => {
              isNewItem
                ? dispatch(removeNewItem({ index }))
                : removeItem(values);
            }}
            title={`Are you sure you want to remove this ${values.Variant}?`}
            saveButtonText="Remove"
          />
          <PromptDialog
            dialogOpen={dialogs.Complete.open}
            setDialogOpen={() =>
              setDialogs({
                type: "Complete",
                open: false,
              })
            }
            title="Are you sure you want to set this as completed?"
            saveButtonText="Complete"
            onSave={() => {}}
          />
        </Form>
      )}
    </Formik>
  );
};

export default ProjectForm;
