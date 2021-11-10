import React, { FC, useState, useEffect } from "react";
import classnames from "classnames";
import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";
import { Formik, Form } from "formik";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
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
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

import {
  removeNewItem,
  updateNewItem,
  selectProjects,
  selectTags,
  selectInspirations,
} from "../../Reducers/appSlice";
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

interface Props {
  idea: Idea;
  setOpen: (value: boolean) => void;
  isNewItem: boolean;
  index: number;
}

const IdeaForm: FC<Props> = ({ idea, setOpen, isNewItem, index }) => {
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [addDialogVariant, setAddDialogVariant] = useState("");
  const [autocompleteDialogOpen, setAutocompleteDialogOpen] = useState(false);
  const [autocompleteDialogVariant, setAutocompleteDialogVariant] = useState(
    ""
  );
  const [removeDialogOpen, setRemoveDialogOpen] = useState(false);
  const [completeDialogOpen, setCompleteDialogOpen] = useState(false);
  const [imageDialogOpen, setImageDialogOpen] = useState(false);
  const [imageDialogImage, setImageDialogImage] = useState("");
  const [postItem, { isSuccess: postItemSuccess }] = usePostItemMutation();
  const [removeItem] = useRemoveItemMutation();

  const projects = useSelector(selectProjects);
  const inspirations = useSelector(selectInspirations);
  const tags = useSelector(selectTags);

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

  const getImageRefs = (
    values: Idea,
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
        <div className={classnames(classes.flex, classes.marginBottom2)}>
          <Typography
            className={classnames(classes.marginRight, classes.fontWeightBold)}
          >
            Drafts
          </Typography>
          <Add
            className={classes.pointer}
            onClick={() => {
              setAddDialogOpen(true);
              setAddDialogVariant(DIALOG_VARIANT.DRAFT);
            }}
          />
        </div>
        {values.Drafts &&
          values.Drafts.map((item) => (
            <Image
              variant={IMAGE_TYPE.DRAFT}
              src={`${BASE_URL}/images/drafts/${item}`}
              key={uuidv4()}
            />
          ))}
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

  const getAutocompleteDialogOptions = (
    values: Idea,
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
    } else if (dialogVariant === DIALOG_VARIANT.INSPIRATION) {
      return {
        title: "Add a inspiration",
        name: "Inspirations",
        values: inspirations,
        itemValues: values.Inspirations,
        dialogVariant: dialogVariant,
        dataVariant: VARIANTS.INSPIRATION,
      };
    }
    return { title: "", name: "", values: [], itemValues: [] };
  };

  const getAddDialogOptions = (values: Idea, dialogVariant: string) => {
    if (dialogVariant === DIALOG_VARIANT.IMAGE_REF) {
      return {
        title: "Add image reference",
        name: "ImageRefs",
        itemValues: values.ImageRefs,
      };
    } else if (dialogVariant === DIALOG_VARIANT.DRAFT) {
      return {
        title: "Add a draft",
        name: "Drafts",
        itemValues: values.Drafts,
      };
    } else if (dialogVariant === DIALOG_VARIANT.COMPLETED_WORK) {
      return {
        title: "Add a completed work",
        name: "CompletedWorks",
        itemValues: values.CompletedWorks,
      };
    }
    return { title: "", name: "", itemValues: [] };
  };

  return (
    <Formik
      initialValues={
        {
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
        } as Idea
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
                              lastTag={index + 1 === values.Tags?.length}
                              key={item._id}
                            />
                          )
                      )}
                  </div>
                  <FormControl fullWidth className={classes.marginBottom3}>
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
                        <MenuItem value={item._id} key={uuidv4()}>
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
                          classes.fontWeightBold
                        )}
                      >
                        Inspirations
                      </Typography>
                      <Add
                        className={classes.pointer}
                        onClick={() => {
                          setAutocompleteDialogOpen(true);
                          setAutocompleteDialogVariant(
                            DIALOG_VARIANT.INSPIRATION
                          );
                        }}
                      />
                    </div>
                    {values.Inspirations &&
                      values.Inspirations.map(
                        (item) =>
                          item &&
                          item.Title !== "" && (
                            <Typography key={uuidv4()}>
                              <Link href="#">{item.Title}</Link>
                            </Typography>
                          )
                      )}
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
                        setAddDialogOpen(true);
                        setAddDialogVariant(DIALOG_VARIANT.COMPLETED_WORK);
                      }}
                    />
                  </div>
                  {values.CompletedWorks &&
                    values.CompletedWorks.map((item) => (
                      <Image
                        variant={IMAGE_TYPE.COMPLETED_WORK}
                        src={`${BASE_URL}/images/completed/${item}`}
                        key={uuidv4()}
                      />
                    ))}
                </div>
              )}
              <div className={classes.bottomContainer}>
                {getImageRefs(values, setFieldValue)}
                <div className={classes.buttonContainer}>
                  {!values.Completed && (
                    <Button
                      variant="text"
                      color="primary"
                      className={classnames(
                        classes.button,
                        classes.marginRight
                      )}
                      onClick={() => setRemoveDialogOpen(true)}
                    >
                      Remove
                    </Button>
                  )}
                  {!isNewItem && (
                    <Button
                      variant="text"
                      color="primary"
                      className={classnames(
                        classes.button,
                        classes.marginRight
                      )}
                      onClick={() => setCompleteDialogOpen(true)}
                    >
                      Complete
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
          <PromptDialog
            dialogOpen={completeDialogOpen}
            setDialogOpen={setCompleteDialogOpen}
            title="Are you sure you want to set this as completed?"
            saveButtonText="Complete"
            onSave={() => {}}
          />
        </Form>
      )}
    </Formik>
  );
};

export default IdeaForm;
