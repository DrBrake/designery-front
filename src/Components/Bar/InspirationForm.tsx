import React, { useState, useEffect, FC } from "react";
import classnames from "classnames";
import dayjs from "dayjs";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import { v4 as uuidv4 } from "uuid";
import { Formik, Form } from "formik";
import { Typography, Grid, TextField, Button } from "@material-ui/core";
import { useDispatch } from "react-redux";

import { removeNewItem, updateNewItem } from "../../Reducers/appSlice";
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
import { Close, Add } from "../Icons";
import { IMAGE_TYPE, DIALOG_VARIANT, BASE_URL } from "../../constants";
import { isURL } from "../../utils";
import { Inspiration, Idea, Tag } from "../../Types/dataTypes";
import { useFormStyles } from "./FormStyles";

interface Props {
  inspiration: Inspiration;
  isNewItem: boolean;
  index: number;
  setOpen: (value: boolean) => void;
}

interface RawInspiration extends Inspiration {
  NewIdeas: Array<Idea>;
  NewTags: Array<Tag>;
  NewImageRefURLs: Array<string>;
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
  const [removeDialogOpen, setRemoveDialogOpen] = useState(false);
  const [postItem, { isSuccess }] = usePostItemMutation();
  const [removeItem] = useRemoveItemMutation();

  const classes = useFormStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess && isNewItem) dispatch(removeNewItem({ index }));
  }, [isSuccess]);

  const handleFieldValues = (values: RawInspiration) => {
    const tempValues = { ...values };
    tempValues.Ideas?.concat(tempValues.NewIdeas);
    tempValues.Tags?.concat(tempValues.NewTags);
    return tempValues;
  };

  const getImageRefs = (
    values: RawInspiration,
    setFieldValue: (name: string, value: any) => void
  ) => (
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
            if (values.NewImageRefURLs?.length === 0) {
              setFieldValue("NewImageRefURLs", [""]);
            }
            setAddDialogVariant(DIALOG_VARIANT.IMAGE_REF);
          }}
        />
      </div>
      <div className={classes.flex}>
        {values.ImageRefs &&
          values.ImageRefs.map(
            (item) =>
              isURL(item) && (
                <Image
                  variant={IMAGE_TYPE.BAR}
                  src={`${BASE_URL}/${item}`}
                  key={uuidv4()}
                />
              )
          )}
        {values.NewImageRefURLs &&
          values.NewImageRefURLs.map((item) => (
            <Image variant={IMAGE_TYPE.BAR} src={item} key={uuidv4()} />
          ))}
        {values.NewImageRefFiles &&
          values.NewImageRefFiles.map((item) => (
            <Image variant={IMAGE_TYPE.BAR} src={item.file} key={item.id} />
          ))}
        <ImageDragAndDrop
          setFieldValue={setFieldValue}
          NewImageRefFiles={values.NewImageRefFiles}
        />
      </div>
    </div>
  );

  const getDialogOptions = (values: RawInspiration, dialogVariant: string) => {
    if (dialogVariant === DIALOG_VARIANT.IMAGE_REF) {
      return {
        title: "Add image reference",
        name: "NewImageRefURLs",
        values: values.NewImageRefURLs,
      };
    } else if (dialogVariant === DIALOG_VARIANT.TAG) {
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

  const getAutocompleteDialogOptions = (
    values: RawInspiration,
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

  return (
    <Formik
      initialValues={
        {
          _id: inspiration._id || null,
          Title: inspiration.Title || "",
          Description: inspiration.Description,
          ImageRefs: inspiration.ImageRefs || [],
          NewImageRefFiles: [],
          NewImageRefURLs: [],
          Tags: inspiration.Tags || [],
          NewTags: [],
          Ideas: inspiration.Ideas || [],
          NewIdeas: [],
          DateCreated: inspiration.DateCreated || dayjs().format(),
          Variant: inspiration.Variant || "",
        } as RawInspiration
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
                              lastTag={index + 1 === values.NewTags.length}
                              key={item._id}
                            />
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
              handleChange={handleChange}
              setFieldValue={setFieldValue}
              {...getDialogOptions(values, addDialogVariant)}
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
