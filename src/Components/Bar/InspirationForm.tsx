import React, { useEffect, FC } from "react";
import classnames from "classnames";
import dayjs from "dayjs";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import { Formik, Form } from "formik";
import { Typography, Grid, TextField, Button, Link } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

import {
  removeNewItem,
  updateNewItem,
  selectIdeas,
  selectTags,
} from "../../Reducers/appSlice";
import {
  usePostItemMutation,
  useRemoveItemMutation,
} from "../../Services/dataAPI";
import Image from "../Image/Image";
import AddImageDialog from "../Dialogs/AddImageDialog";
import PromptDialog from "../Dialogs/PromptDialog";
import ImageDragAndDrop from "../Image/ImageDragAndDrop";
import RichTextEditor from "../RichTextEditor";
import Chip from "../Chip";
import AutocompleteDialog from "../Dialogs/AutocompleteDialog";
import ImageDialog from "../Dialogs/ImageDialog";
import { Close, Add } from "../Icons";
import { IMAGE_TYPE, DIALOG_VARIANT, BASE_URL } from "../../constants";
import { Inspiration, ImageFile } from "../../Types/dataTypes";
import { useFormStyles } from "./FormStyles";
import { isURL } from "../../utils";
import useDialogs from "../../Hooks/useDialogs";

interface Props {
  inspiration: Inspiration;
  isNewItem: boolean;
  index: number;
  setOpen: (value: boolean) => void;
}

const InspirationForm: FC<Props> = ({
  inspiration,
  setOpen,
  isNewItem,
  index,
}) => {
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

  const getImageRefs = (
    values: Inspiration,
    setFieldValue: (name: string, value: any) => void
  ) => {
    const getSrc = (image: string | ImageFile): string => {
      if (typeof image === "string") {
        if (isURL(image)) return image;
        else return `${BASE_URL}/images/${values.Variant}/${image}`;
      } else if (image.file) {
        return image.file;
      }
      return "";
    };
    return (
      <div className={classes.marginBottom3}>
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

  return (
    <Formik
      initialValues={
        {
          _id: inspiration._id || null,
          Title: inspiration.Title || "",
          Description: inspiration.Description,
          ImageRefs: inspiration.ImageRefs || [],
          Tags: inspiration.Tags || [],
          Ideas: inspiration.Ideas || [],
          DateCreated: inspiration.DateCreated || dayjs().format(),
          Variant: inspiration.Variant || "",
        } as Inspiration
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
                          classes.marginBottom2,
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
                    <div className={classnames(classes.flex, classes.flexWrap)}>
                      {values.Ideas &&
                        values.Ideas.map(
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
                                    href="#"
                                  >
                                    {item.Title}
                                  </Link>
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
              {getImageRefs(values, setFieldValue)}
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
              itemValues={values.ImageRefs}
              setDialogOpen={() =>
                setDialogs({
                  type: "Add",
                  open: false,
                  variant: null,
                })
              }
              setFieldValue={setFieldValue}
              {...dialogs.Add.dialogOptions}
            />
          )}
          {dialogs.Autocomplete.open && (
            <AutocompleteDialog
              dialogOpen={dialogs.Autocomplete.open}
              values={
                dialogs.Autocomplete.variant === DIALOG_VARIANT.TAG
                  ? tags
                  : ideas
              }
              itemValues={
                dialogs.Autocomplete.variant === DIALOG_VARIANT.TAG
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
                setDialogs({
                  type: "Remove",
                  open: false,
                });
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
        </Form>
      )}
    </Formik>
  );
};

export default InspirationForm;
