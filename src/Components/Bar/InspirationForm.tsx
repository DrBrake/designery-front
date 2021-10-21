import React, { useState, useEffect, FC } from "react";
import classnames from "classnames";
import dayjs from "dayjs";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import { v4 as uuidv4 } from "uuid";
import { Formik, Form } from "formik";
import { Typography, Grid, TextField, Button } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";
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
import { Close, Add } from "../Icons";
import { IMAGE_TYPE, DIALOG_VARIANT } from "../../constants";
import { isURL } from "../../utils";
import { Inspiration, Idea, Tag } from "../../Types/dataTypes";

const useStyles = makeStyles((theme) =>
  createStyles({
    icon: {
      cursor: "pointer",
      marginRight: theme.spacing(6),
      marginTop: theme.spacing(1),
    },
    column: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      marginRight: theme.spacing(5),
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
    flex: {
      display: "flex",
    },
    button: {
      minWidth: theme.spacing(17),
      borderRadius: theme.spacing(1),
    },
    buttonContainer: {
      alignSelf: "flex-end",
      flex: "1",
      display: "flex",
      alignItems: "center",
    },
    bottomContainer: {
      display: "flex",
      flexFlow: "column",
    },
    fontWeightBold: {
      fontWeight: "bold",
    },
    pointer: {
      cursor: "pointer",
    },
    lighterGrey: {
      color: theme.palette.grey[400],
    },
    verticalDivider: {
      height: theme.spacing(3),
      width: "1px",
      background: theme.palette.grey["500"],
      marginRight: theme.spacing(2),
    },
    fullWidth: {
      width: "100%",
    },
  })
);

interface Props {
  inspiration: Inspiration;
  isNewItem: boolean;
  index: number;
  setOpen: (value: boolean) => void;
}

interface RawInspiration extends Inspiration {
  NewImageRefs: Array<string>;
  NewIdeas: Array<Idea>;
  NewTags: Array<Tag>;
}

const InspirationForm: FC<Props> = ({
  inspiration,
  setOpen,
  isNewItem,
  index,
}) => {
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [addDialogVariant, setAddDialogVariant] = useState("");
  const [removeDialogOpen, setRemoveDialogOpen] = useState(false);
  const [postItem, { isSuccess }] = usePostItemMutation();
  const [removeItem] = useRemoveItemMutation();

  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess && isNewItem) dispatch(removeNewItem({ index }));
  }, [isSuccess]);

  const handleFieldValues = (values: RawInspiration) => {
    const tempValues = { ...values };
    tempValues.ImageRefs?.concat(tempValues.NewImageRefs);
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
            if (values.NewImageRefs.length === 0) {
              setFieldValue("NewImageRefs", [""]);
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
                <Image variant={IMAGE_TYPE.BAR} src={item} key={uuidv4()} />
              )
          )}
        {values.NewImageRefs &&
          values.NewImageRefs.map(
            (item) =>
              isURL(item) && (
                <Image variant={IMAGE_TYPE.BAR} src={item} key={uuidv4()} />
              )
          )}
        <ImageDragAndDrop />
      </div>
    </div>
  );

  const getDialogOptions = (values: RawInspiration, dialogVariant: string) => {
    if (dialogVariant === DIALOG_VARIANT.IMAGE_REF) {
      return {
        title: "Add image reference",
        name: "NewImageRefs",
        values: values.NewImageRefs,
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

  return (
    <Formik
      initialValues={
        {
          Title: inspiration.Title || "",
          Description: inspiration.Description,
          ImageRefs: inspiration.ImageRefs || [],
          NewImageRefs: [],
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
              </div>
              <div
                className={classnames(classes.fullWidth, classes.marginBottom3)}
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
