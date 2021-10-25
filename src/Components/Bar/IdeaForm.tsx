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
import { useDispatch } from "react-redux";

import { removeNewItem, updateNewItem } from "../../Reducers/appSlice";
import {
  usePostItemMutation,
  useRemoveItemMutation,
} from "../../Services/dataAPI";
import Chip from "../Chip";
import Image from "../Image/Image";
import AddImageDialog from "../Dialogs/AddImageDialog";
import PromptDialog from "../Dialogs/PromptDialog";
import AutocompleteDialog from "../Dialogs/AutocompleteDialog";
import RichTextEditor from "../RichTextEditor";
import ImageDragAndDrop from "../Image/ImageDragAndDrop";
import { Close, Add } from "../Icons";
import { VARIANTS, IMAGE_TYPE, DIALOG_VARIANT } from "../../constants";
import { isURL } from "../../utils";
import { Project, Idea, Tag, Inspiration } from "../../Types/dataTypes";
import { useFormStyles } from "./FormStyles";

interface Props {
  idea: Idea;
  projects: Array<Project>;
  setOpen: (value: boolean) => void;
  isNewItem: boolean;
  index: number;
}

interface RawIdea extends Idea {
  NewImageRefURLs?: Array<string>;
  NewTags?: Array<Tag>;
  NewInspirations?: Array<Inspiration>;
}

const IdeaForm: FC<Props> = ({ idea, projects, setOpen, isNewItem, index }) => {
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [addDialogVariant, setAddDialogVariant] = useState("");
  const [autocompleteDialogOpen, setAutocompleteDialogOpen] = useState(false);
  const [autocompleteDialogVariant, setAutocompleteDialogVariant] = useState(
    ""
  );
  const [removeDialogOpen, setRemoveDialogOpen] = useState(false);
  const [completeDialogOpen, setCompleteDialogOpen] = useState(false);
  const [postItem, { isSuccess }] = usePostItemMutation();
  const [removeItem] = useRemoveItemMutation();

  const classes = useFormStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess && isNewItem) dispatch(removeNewItem({ index }));
  }, [isSuccess]);

  const handleFieldValues = (values: RawIdea) => {
    const tempValues = { ...values };
    tempValues.ImageRefs = tempValues.ImageRefs?.concat(
      values.NewImageRefURLs!
    );
    tempValues.Tags = tempValues.Tags?.concat(values.NewTags!);
    tempValues.Inspirations = tempValues.Inspirations?.concat(
      values.NewInspirations!
    );
    delete tempValues.NewImageRefURLs;
    delete tempValues.NewTags;
    delete tempValues.NewInspirations;
    return tempValues as Idea;
  };

  const getImageRefs = (
    values: RawIdea,
    setFieldValue: (name: string, value: any) => void
  ) => (
    <div>
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
            if (values.Drafts?.length === 0) {
              setFieldValue("Drafts", [""]);
            }
            setAddDialogVariant(DIALOG_VARIANT.DRAFT);
          }}
        />
      </div>
      {values.Drafts &&
        values.Drafts.map(
          (item) =>
            isURL(item) && (
              <Image variant={IMAGE_TYPE.DRAFT} src={item} key={uuidv4()} />
            )
        )}
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
                <Image variant={IMAGE_TYPE.BAR} src={item} key={item} />
              )
          )}
        {values.NewImageRefURLs &&
          values.NewImageRefURLs.map(
            (item) =>
              isURL(item) && (
                <Image variant={IMAGE_TYPE.BAR} src={item} key={item} />
              )
          )}
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

  const getAutocompleteDialogOptions = (
    values: RawIdea,
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
    } else if (dialogVariant === DIALOG_VARIANT.INSPIRATION) {
      return {
        title: "Add a inspiration",
        name: "NewInspirations",
        values: values.Inspirations,
        newValues: values.NewInspirations,
        dialogVariant: dialogVariant,
        dataVariant: VARIANTS.INSPIRATION,
      };
    }
    return { title: "", name: "", values: [], newValues: [] };
  };

  const getAddDialogOptions = (values: RawIdea, dialogVariant: string) => {
    if (dialogVariant === DIALOG_VARIANT.IMAGE_REF) {
      return {
        title: "Add image reference",
        name: "NewImageRefURLs",
        values: values.NewImageRefURLs,
      };
    } else if (dialogVariant === DIALOG_VARIANT.DRAFT) {
      return { title: "Add a draft", name: "Drafts", values: values.Drafts };
    } else if (dialogVariant === DIALOG_VARIANT.COMPLETED_WORK) {
      return {
        title: "Add a completed work",
        name: "CompletedWorks",
        values: values.CompletedWorks,
      };
    }
    return { title: "", name: "", values: [], newValues: [] };
  };

  return (
    <Formik
      initialValues={
        {
          _id: idea._id || null,
          Title: idea.Title || "",
          Description: idea.Description,
          ImageRefs: idea.ImageRefs || [],
          NewImageRefFiles: [],
          NewImageRefURLs: [],
          Drafts: idea.Drafts || [],
          CompletedWorks: idea.CompletedWorks || [],
          Completed: idea.Completed || false,
          Tags: idea.Tags || [],
          NewTags: [],
          Project: idea.Project || "",
          Inspirations: idea.Inspirations || [],
          NewInspirations: [],
          DateCreated: idea.DateCreated || dayjs().format(),
          Variant: VARIANTS.IDEA,
        } as RawIdea
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
                  <FormControl fullWidth className={classes.marginBottom3}>
                    <InputLabel
                      id="projectSelect"
                      classes={{
                        root: classes.paddingLeft,
                        focused: classes.displayNone,
                      }}
                      disableAnimation
                    >
                      Project
                    </InputLabel>
                    <Select
                      labelId="projectSelect"
                      value={values.Project}
                      onChange={handleChange}
                      variant="outlined"
                      name="Project"
                    >
                      {projects.map((item) => (
                        <MenuItem value={item.Title} key={uuidv4()}>
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
                    {values.NewInspirations &&
                      values.NewInspirations.map(
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
                        if (values.CompletedWorks?.length === 0) {
                          setFieldValue("CompletedWorks", [""]);
                        }
                        setAddDialogVariant(DIALOG_VARIANT.COMPLETED_WORK);
                      }}
                    />
                  </div>
                  {values.CompletedWorks &&
                    values.CompletedWorks.map(
                      (item) =>
                        isURL(item) && (
                          <Image
                            variant={IMAGE_TYPE.COMPLETED_WORK}
                            src={item}
                            key={uuidv4()}
                          />
                        )
                    )}
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
              handleChange={handleChange}
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
          />
        </Form>
      )}
    </Formik>
  );
};

export default IdeaForm;
