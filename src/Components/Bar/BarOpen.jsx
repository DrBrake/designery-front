import React, { useState, useEffect } from "react";
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
import { makeStyles } from "@material-ui/core/styles";
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

const useStyles = makeStyles((theme) => ({
  container: {
    border: `1px solid ${theme.palette.primary.dark}`,
    padding: `${theme.spacing(5)}px ${theme.spacing(5)}px ${theme.spacing(
      1
    )}px ${theme.spacing(5)}px`,
    borderBottomWidth: "0px",
  },
  firstContainer: {
    borderTopLeftRadius: "4px",
    borderTopRightRadius: "4px",
  },
  lastContainer: {
    borderBottomWidth: "1px",
    borderBottomLeftRadius: "4px",
    borderBottomRightRadius: "4px",
  },
  text: {
    fontSize: "16px",
    fontWeight: "500",
  },
  descriptionText: {
    fontSize: "16px",
  },
  lightGrey: {
    color: theme.palette.primary.dark,
  },
  icon: {
    cursor: "pointer",
    marginRight: theme.spacing(6),
    marginTop: theme.spacing(1),
  },
  date: {
    textAlign: "right",
  },
  tag: {
    marginRight: theme.spacing(2),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    color: theme.palette.primary.light,
  },
  lastTag: {
    marginRight: "0px",
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
  paddingLeft: {
    paddingLeft: theme.spacing(2),
  },
  flex: {
    display: "flex",
  },
  flexWrap: {
    flexWrap: "wrap",
  },
  spaceBetween: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: theme.spacing(3),
  },
  selectContainer: {
    display: "flex",
    alignItems: "center",
  },
  fullWidth: {
    width: "100%",
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
  displayNone: {
    display: "none",
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
}));

const BarOpen = ({
  itemData,
  projects,
  setOpen,
  isLast,
  isFirst,
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
  const [completeDialogOpen, setCompleteDialogOpen] = useState(false);
  const [postItem, { isSuccess }] = usePostItemMutation();
  const [removeItem] = useRemoveItemMutation();

  const classes = useStyles();
  const dispatch = useDispatch();

  const handleFieldValues = (values) => {
    const tempValues = { ...values };
    tempValues.Description = convertToRaw(
      tempValues.Description.getCurrentContent()
    );
    tempValues.ImageRefs.concat(tempValues.NewImageRefs);
    return tempValues;
  };

  useEffect(() => {
    if (isSuccess && isNewItem) dispatch(removeNewItem({ index }));
  }, [isSuccess]);

  const getImageRefs = (values, setFieldValue) =>
    (values.Variant === VARIANTS.IDEA ||
      values.Variant === VARIANTS.INSPIRATION) && (
      <div
        className={classnames({
          [classes.marginBottom3]: values.Variant === VARIANTS.INSPIRATION,
        })}
      >
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
              if (values.Drafts.length === 0) {
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

  const getDialogOptions = (values, dialogVariant) => {
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
    } else if (dialogVariant === DIALOG_VARIANT.INSPIRATION) {
      return {
        title: "Add a inspiration",
        name: "NewInspirations",
        values: values.Inspirations,
        newValues: values.NewInspirations,
        dialogVariant: dialogVariant,
        dataVariant: VARIANTS.INSPIRATION,
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
      initialValues={{
        Title: itemData.Title || "",
        Description: itemData.Description
          ? EditorState.createWithContent(convertFromRaw(itemData.Description))
          : EditorState.createEmpty(),
        ImageRefs: itemData.ImageRefs || [],
        NewImageRefs: [],
        Drafts: itemData.Drafts || [],
        CompletedWorks: itemData.CompletedWorks || [],
        Completed: itemData.Completed || false,
        Tags: itemData.Tags || [],
        NewTags: [],
        Project: itemData.Project || "",
        Inspirations: itemData.Inspirations || [],
        NewInspirations: [],
        DateCreated: itemData.DateCreated || dayjs().format(),
        Variant: itemData.Variant || "",
      }}
      onSubmit={(values) => postItem(handleFieldValues(values))}
    >
      {({ values, handleChange, setFieldValue }) => (
        <Form
          className={classnames(classes.container, {
            [classes.lastContainer]: isLast,
            [classes.firstContainer]: isFirst,
          })}
        >
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
                    editorState={values.Description}
                    setFieldValue={(value) =>
                      setFieldValue("Description", value)
                    }
                  />
                </div>
                {values.Variant === VARIANTS.IDEA && (
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
                            item !== "" && (
                              <Chip
                                label={item.Title}
                                onClick={() => null}
                                lastTag={index + 1 === values.Tags.length}
                                key={item._id}
                              />
                            )
                        )}
                      {values.NewTags &&
                        values.NewTags.map(
                          (item, index) =>
                            item &&
                            item !== "" && (
                              <Chip
                                label={item.Title}
                                onClick={() => null}
                                lastTag={index + 1 === values.NewTags.length}
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
                            item !== "" && (
                              <Typography key={uuidv4()}>
                                <Link href="#">{item.Title}</Link>
                              </Typography>
                            )
                        )}
                      {values.NewInspirations &&
                        values.NewInspirations.map(
                          (item) =>
                            item &&
                            item !== "" && (
                              <Typography key={uuidv4()}>
                                <Link href="#">{item.Title}</Link>
                              </Typography>
                            )
                        )}
                    </div>
                  </div>
                )}
              </div>
              {values.Variant === VARIANTS.INSPIRATION &&
                getImageRefs(values, setFieldValue)}
              {values.Variant === VARIANTS.IDEA && values.Completed && (
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
                        if (values.CompletedWorks.length === 0) {
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
                {values.Variant === VARIANTS.IDEA &&
                  getImageRefs(values, setFieldValue)}
                {values.Variant !== VARIANTS.IDEA && (
                  <div>
                    <Typography className={classes.fontWeightBold}>
                      Linked ideas
                    </Typography>
                    {values.Ideas &&
                      values.Ideas.map((item) => (
                        <Typography key={uuidv4()}>
                          <Link href="#">{item.Title}</Link>
                        </Typography>
                      ))}
                  </div>
                )}
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
                  {values.Variant === VARIANTS.IDEA && !isNewItem && (
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
              {...getDialogOptions(values, addDialogVariant)}
            />
          )}
          {autocompleteDialogOpen && (
            <AutocompleteDialog
              dialogOpen={autocompleteDialogOpen}
              setDialogOpen={setAutocompleteDialogOpen}
              setFieldValue={setFieldValue}
              {...getDialogOptions(values, autocompleteDialogVariant)}
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

export default BarOpen;
