import React, { FC, useEffect } from "react";
import classnames from "classnames";
import dayjs from "dayjs";
import { Formik, Form } from "formik";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import { isEqual } from "lodash";
import {
  Typography,
  Grid,
  TextField,
  Select,
  InputLabel,
  FormControl,
  Link,
  Button,
  MenuItem,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import {
  removeNewItem,
  updateNewItem,
  selectProjects,
  selectTags,
  selectInspirations,
} from "../../Reducers/appSlice";
import { selectToken } from "../../Reducers/authSlice";
import {
  usePostItemMutation,
  useRemoveItemMutation,
} from "../../Services/dataAPI";
import Chip from "../Chip";
import Image from "../Image/Image";
import AddImageDialog from "../Dialogs/AddImageDialog";
import PromptDialog from "../Dialogs/PromptDialog";
import AutocompleteDialog from "../Dialogs/AutocompleteDialog";
import ImageDialog from "../Dialogs/ImageDialog";
import RichTextEditor from "../RichTextEditor";
import ImageDragAndDrop from "../Image/ImageDragAndDrop";
import { Close, Add } from "../Icons";
import {
  VARIANTS,
  IMAGE_TYPE,
  DIALOG_VARIANT,
  BASE_URL,
} from "../../constants";
import { isURL } from "../../utils";
import { Idea, ImageFile } from "../../Types/dataTypes";
import { useFormStyles } from "./FormStyles";
import useDialogs from "../../Hooks/useDialogs";

interface Props {
  idea: Idea;
  setOpen: (value: boolean) => void;
  isNewItem: boolean;
  index: number;
}

const IdeaForm: FC<Props> = ({ idea, setOpen, isNewItem, index }) => {
  const { dialogs, setDialogs } = useDialogs();

  const [postItem, { isSuccess: postItemSuccess }] = usePostItemMutation();
  const [removeItem] = useRemoveItemMutation();

  const projects = useSelector(selectProjects);
  const inspirations = useSelector(selectInspirations);
  const tags = useSelector(selectTags);
  const token = useSelector(selectToken);

  const classes = useFormStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    if (postItemSuccess) {
      setOpen(false);
      if (isNewItem) {
        dispatch(removeNewItem({ index }));
      }
    }
  }, [postItemSuccess]);

  const initialValues = {
    _id: idea._id || null,
    Title: idea.Title || "",
    Description: idea.Description,
    ImageRefs: idea.ImageRefs || [],
    Drafts: idea.Drafts || [],
    CompletedWorks: idea.CompletedWorks || [],
    Completed: idea.Completed || false,
    Tags: idea.Tags || [],
    Project: idea.Project || null,
    Inspirations: idea.Inspirations || [],
    DateCreated: idea.DateCreated || dayjs().format(),
    Variant: VARIANTS.IDEA,
    Secret: idea.Secret || false,
  };

  const getImageRefs = (
    values: Idea,
    setFieldValue: (name: string, value: any) => void
  ) => {
    const getSrc = (image: string | ImageFile): string => {
      if (typeof image === "string") {
        if (isURL(image)) return image;
        else return `${BASE_URL}/images/${values.Variant}/${image}?w=440`;
      } else if (image.file) {
        return image.file;
      }
      return "";
    };
    return (
      <div className={classes.marginBottom3}>
        <div className={classnames(classes.flex, classes.marginBottom2)}>
          <Typography
            className={classnames(
              classes.marginRight,
              classes.marginBottom2,
              classes.fontWeightBold
            )}
          >
            Drafts
          </Typography>
          <Add
            className={classes.pointer}
            onClick={() => {
              setDialogs({
                type: "Add",
                open: true,
                variant: DIALOG_VARIANT.DRAFT,
              });
            }}
          />
        </div>
        {values.Drafts &&
          values.Drafts.map((item) => (
            <Image
              variant={IMAGE_TYPE.BAR}
              src={`${BASE_URL}/images/drafts/${item}?w=440`}
              key={item}
            />
          ))}
        <div className={classes.flex}>
          <Typography
            className={classnames(
              classes.marginRight,
              classes.marginBottom2,
              classes.fontWeightBold
            )}
          >
            Image references
          </Typography>
          <Add
            className={classes.pointer}
            onClick={() => {
              setDialogs({
                type: "Add",
                open: true,
                variant: DIALOG_VARIANT.IMAGE_REF,
              });
            }}
          />
        </div>
        <div className={classnames(classes.flex, classes.flexWrap)}>
          {values.ImageRefs &&
            values.ImageRefs.map((item) => (
              <Image
                variant={IMAGE_TYPE.BAR}
                src={getSrc(item)}
                key={typeof item === "string" ? item : item.id}
                onClick={() => {
                  setDialogs({
                    type: "Image",
                    open: true,
                    variant: DIALOG_VARIANT.IMAGE_REF,
                    image: typeof item === "string" ? item : item.file,
                  });
                }}
              />
            ))}
          <ImageDragAndDrop
            setFieldValue={setFieldValue}
            ImageRefs={values.ImageRefs}
          />
        </div>
      </div>
    );
  };

  const getAddDialogValues = (values: Idea, dialogVariant: string) => {
    if (dialogVariant === DIALOG_VARIANT.IMAGE_REF) {
      return {
        itemValues: values.ImageRefs,
      };
    } else if (dialogVariant === DIALOG_VARIANT.DRAFT) {
      return {
        itemValues: values.Drafts,
      };
    } else if (dialogVariant === DIALOG_VARIANT.COMPLETED_WORK) {
      return {
        itemValues: values.CompletedWorks,
      };
    }
    return { itemValues: [] };
  };

  return (
    <Formik
      initialValues={initialValues as Idea}
      onSubmit={(values) => postItem(values)}
    >
      {({ values, handleChange, setFieldValue, submitForm }) => (
        <Form>
          <Grid container wrap="nowrap" id={values._id}>
            <Grid item>
              <Close
                className={classes.icon}
                onClick={() => {
                  if (isEqual(values, initialValues)) {
                    setOpen(false);
                    if (isNewItem)
                      dispatch(
                        updateNewItem({
                          index,
                          values: values,
                        })
                      );
                  } else {
                    setDialogs({
                      type: "Discard",
                      open: true,
                      variant: DIALOG_VARIANT.DISCARD,
                    });
                  }
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
                          classes.marginBottom2,
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
                              lastTag={index + 1 === values.Tags?.length}
                              key={item._id}
                            />
                          )
                      )}
                  </div>
                  <FormControl variant="standard" fullWidth className={classes.marginBottom3}>
                    <InputLabel
                      id="projectSelect"
                      classes={{
                        root: classnames(classes.paddingLeft, {
                          [classes.displayNone]: values.Project,
                        }),
                        focused: classes.displayNone,
                      }}
                      disableAnimation
                    >
                      Project
                    </InputLabel>
                    <Select
                      labelId="projectSelect"
                      value={values.Project?._id || ""}
                      onChange={(e) =>
                        setFieldValue(
                          "Project",
                          projects.find((item) => item._id === e.target.value)
                        )
                      }
                      variant="outlined"
                      name="Project"
                    >
                      <MenuItem value="" key="projectNoValue">
                        None
                      </MenuItem>
                      {projects.map((item) => (
                        <MenuItem value={item._id} key={item._id}>
                          {item.Title}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
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
                          classes.marginBottom2,
                          classes.fontWeightBold
                        )}
                      >
                        Inspirations
                      </Typography>
                      <Add
                        className={classes.pointer}
                        onClick={() => {
                          setDialogs({
                            type: "Autocomplete",
                            open: true,
                            variant: DIALOG_VARIANT.INSPIRATION,
                          });
                        }}
                      />
                    </div>
                    <div className={classnames(classes.flex, classes.flexWrap)}>
                      {values.Inspirations &&
                        values.Inspirations.map(
                          (item, index) =>
                            item &&
                            item.Title !== "" && (
                              <>
                                <Typography
                                  key={item._id}
                                  className={classes.marginRight}
                                >
                                  <Link
                                    className={classes.defaultLinkColor}
                                    href={`#${item._id || item.TempID}`}
                                  >
                                    {item.Title}
                                  </Link>
                                </Typography>
                                {index + 1 < values.Inspirations!.length && (
                                  <div className={classes.verticalDivider} />
                                )}
                              </>
                            )
                        )}
                    </div>
                  </div>
                </div>
              </div>
              {values.Completed && (
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
                      Completed works
                    </Typography>
                    <Add
                      className={classes.pointer}
                      onClick={() => {
                        setDialogs({
                          type: "Add",
                          open: true,
                          variant: DIALOG_VARIANT.COMPLETED_WORK,
                        });
                      }}
                    />
                  </div>
                  {values.CompletedWorks &&
                    values.CompletedWorks.map((item) => (
                      <Image
                        variant={IMAGE_TYPE.BAR}
                        src={`${BASE_URL}/images/completed/${item}?w=440`}
                        key={item}
                      />
                    ))}
                </div>
              )}
              <div className={classes.bottomContainer}>
                {getImageRefs(values, setFieldValue)}
                <div className={classes.buttonContainer}>
                  {token && (
                    <FormControlLabel
                      control={<Checkbox checked={values.Secret} />}
                      label="Secret"
                      onChange={() => setFieldValue("Secret", !values.Secret)}
                    />
                  )}
                  {!values.Completed && (
                    <Button
                      variant="text"
                      className={classnames(
                        classes.button,
                        classes.marginRight
                      )}
                      onClick={() =>
                        setDialogs({
                          type: "Remove",
                          open: true,
                        })
                      }
                    >
                      Remove
                    </Button>
                  )}
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
                          open: true,
                        })
                      }
                    >
                      Archive
                    </Button>
                  )}
                  <div className={classes.verticalDivider} />
                  <Button
                    variant="text"
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
          {dialogs.Add.open && (
            <AddImageDialog
              dialogOpen={dialogs.Add.open}
              setDialogOpen={() =>
                setDialogs({
                  type: "Add",
                  open: false,
                  variant: null,
                })
              }
              setFieldValue={setFieldValue}
              {...dialogs.Add.dialogOptions}
              {...getAddDialogValues(values, dialogs.Add.variant)}
            />
          )}
          {dialogs.Autocomplete.open && (
            <AutocompleteDialog
              dialogOpen={dialogs.Autocomplete.open}
              values={
                dialogs.Autocomplete.variant === DIALOG_VARIANT.TAG
                  ? tags
                  : inspirations
              }
              itemValues={
                dialogs.Autocomplete.variant === DIALOG_VARIANT.TAG
                  ? values.Tags
                  : values.Inspirations
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
          {dialogs.Image.open && (
            <ImageDialog
              dialogOpen={dialogs.Image.open}
              setDialogOpen={() =>
                setDialogs({
                  type: "Image",
                  open: false,
                  variant: null,
                  image: null,
                })
              }
              image={dialogs.Image.image}
              variant={values.Variant}
              onRemove={() => {
                setFieldValue(
                  "ImageRefs",
                  values.ImageRefs?.filter((item) =>
                    typeof item === "string"
                      ? item !== dialogs.Image.image
                      : item.file !== dialogs.Image.image
                  )
                );
              }}
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
            onSave={() => {
              setFieldValue("Completed", true);
              submitForm();
            }}
          />
          <PromptDialog
            dialogOpen={dialogs.Discard.open}
            setDialogOpen={() =>
              setDialogs({
                type: "Discard",
                open: false,
              })
            }
            title="Discard changes?"
            saveButtonText="Yes"
            onSave={() => setOpen(false)}
          />
        </Form>
      )}
    </Formik>
  );
};

export default IdeaForm;
