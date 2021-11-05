import React, { useState, useEffect, FC } from "react";
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
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [addDialogVariant, setAddDialogVariant] = useState("");
  const [autocompleteDialogOpen, setAutocompleteDialogOpen] = useState(false);
  const [autocompleteDialogVariant, setAutocompleteDialogVariant] = useState(
    ""
  );

  const [imageDialogOpen, setImageDialogOpen] = useState(false);
  const [imageDialogImage, setImageDialogImage] = useState("");
  const [removeDialogOpen, setRemoveDialogOpen] = useState(false);
  const [postItem, { isSuccess }] = usePostItemMutation();
  const [removeItem] = useRemoveItemMutation();

  const classes = useFormStyles();
  const dispatch = useDispatch();

  const ideas = useSelector(selectIdeas);
  const tags = useSelector(selectTags);

  useEffect(() => {
    if (isSuccess && isNewItem) dispatch(removeNewItem({ index }));
  }, [isSuccess]);

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
            className={classnames(classes.marginRight, classes.fontWeightBold)}
          >
            Image references
          </Typography>
          <Add
            className={classes.pointer}
            onClick={() => {
              setAddDialogOpen(true);
              setAddDialogVariant(DIALOG_VARIANT.IMAGE_REF);
            }}
          />
        </div>
        <div className={classes.flex}>
          {values.ImageRefs &&
            values.ImageRefs.map((item) => (
              <Image
                variant={IMAGE_TYPE.BAR}
                src={getSrc(item)}
                key={typeof item === "string" ? item : item.id}
                onClick={() => {
                  setImageDialogOpen(true);
                  setImageDialogImage(
                    typeof item === "string" ? item : item.file
                  );
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

  const getAddDialogOptions = (values: Inspiration, dialogVariant: string) => {
    if (dialogVariant === DIALOG_VARIANT.IMAGE_REF) {
      return {
        title: "Add image reference",
        name: "ImageRefs",
        itemValues: values.ImageRefs,
      };
    }
    return { title: "", name: "", itemValues: [] };
  };

  const getAutocompleteDialogOptions = (
    values: Inspiration,
    dialogVariant: string
  ) => {
    if (dialogVariant === DIALOG_VARIANT.TAG) {
      return {
        title: "Add a tag",
        name: "Tags",
        values: tags,
        itemValues: values.Tags,
        dialogVariant: dialogVariant,
      };
    } else if (dialogVariant === DIALOG_VARIANT.IDEA) {
      return {
        title: "Add an idea",
        name: "Ideas",
        values: ideas,
        itemValues: values.Ideas,
        dialogVariant: dialogVariant,
      };
    }
    return { title: "", name: "", values: [], itemValues: [] };
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
                          setAutocompleteDialogOpen(true);
                          setAutocompleteDialogVariant(DIALOG_VARIANT.IDEA);
                        }}
                      />
                    </div>
                    {values.Ideas &&
                      values.Ideas.map(
                        (item) =>
                          item &&
                          item.Title !== "" && (
                            <Typography key={item._id}>
                              <Link href="#">{item.Title}</Link>
                            </Typography>
                          )
                      )}
                  </div>
                </div>
              </div>
              {getImageRefs(values, setFieldValue)}
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
          {addDialogOpen && (
            <AddImageDialog
              dialogOpen={addDialogOpen}
              setDialogOpen={setAddDialogOpen}
              setFieldValue={setFieldValue}
              {...getAddDialogOptions(values, addDialogVariant)}
            />
          )}
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
          {imageDialogOpen && (
            <ImageDialog
              dialogOpen={imageDialogOpen}
              setDialogOpen={setImageDialogOpen}
              image={imageDialogImage}
              variant={values.Variant}
              onRemove={() => {
                setImageDialogOpen(false);
                setFieldValue(
                  "ImageRefs",
                  values.ImageRefs?.filter((item) =>
                    typeof item === "string"
                      ? item !== imageDialogImage
                      : item.file !== imageDialogImage
                  )
                );
              }}
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

export default InspirationForm;
