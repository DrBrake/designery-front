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
import Image from "../Image";
import AddDialog from "../AddDialog";
import PromptDialog from "../PromptDialog";
import RichTextEditor from "../RichTextEditor";
import { Close, Add } from "../Icons";
import { VARIANTS, IMAGE_TYPE, DIALOG_VARIANT } from "../../constants";

const useStyles = makeStyles((theme) => ({
  container: {
    border: `1px solid ${theme.palette.primary.dark}`,
    // eslint-disable-next-line prettier/prettier
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
  },
  bottomContainer: {
    display: "flex",
    justifyContent: "space-between",
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
              item !== "" && (
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
              if (values.ImageRefs.length === 0) {
                setFieldValue("ImageRefs", [""]);
              }
              setAddDialogVariant(DIALOG_VARIANT.IMAGE_REF);
            }}
          />
        </div>
        {values.ImageRefs &&
          values.ImageRefs.map(
            (item) =>
              item !== "" && (
                <Image variant={IMAGE_TYPE.BAR} src={item} key={uuidv4()} />
              )
          )}
      </div>
    );

  const getValuesByVariant = (values, variant) => {
    if (variant === DIALOG_VARIANT.IMAGE_REF) return values.ImageRefs;
    else if (variant === DIALOG_VARIANT.TAG) return values.Tags;
    else if (variant === DIALOG_VARIANT.PROJECT) return projects;
    else if (variant === DIALOG_VARIANT.INSPIRATION) return values.Inspirations;
    else if (variant === DIALOG_VARIANT.DRAFT) return values.Drafts;
    else if (variant === DIALOG_VARIANT.COMPLETED_WORK) {
      return values.CompletedWorks;
    }
    return [];
  };

  const getNameByVariant = (variant) => {
    if (variant === DIALOG_VARIANT.IMAGE_REF) return "ImageRefs";
    else if (variant === DIALOG_VARIANT.TAG) return "Tags";
    else if (variant === DIALOG_VARIANT.PROJECT) return "Project";
    else if (variant === DIALOG_VARIANT.INSPIRATION) return "Inspirations";
    else if (variant === DIALOG_VARIANT.DRAFT) return "Drafts";
    else if (variant === DIALOG_VARIANT.COMPLETED_WORK) {
      return "CompletedWorks";
    }
    return "";
  };

  return (
    <Formik
      initialValues={{
        Title: itemData.Title || "",
        Description: itemData.Description
          ? EditorState.createWithContent(convertFromRaw(itemData.Description))
          : EditorState.createEmpty(),
        ImageRefs: itemData.ImageRefs || [],
        Drafts: itemData.Drafts || [],
        CompletedWorks: itemData.CompletedWorks || [],
        Completed: itemData.Completed || false,
        Tags: itemData.Tags || [],
        Project: itemData.Project || "",
        Inspirations: itemData.Inspirations || [],
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
                            setAddDialogOpen(true);
                            if (values.Tags.length === 0) {
                              setFieldValue("Tags", [""]);
                            }
                            setAddDialogVariant(DIALOG_VARIANT.TAG);
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
                            item !== "" && (
                              <Chip
                                label={item}
                                onClick={() => null}
                                lastTag={index + 1 === values.Tags.length}
                                key={uuidv4()}
                              />
                            )
                        )}
                    </div>
                    <div
                      className={classnames(
                        classes.selectContainer,
                        classes.marginBottom3
                      )}
                    >
                      <FormControl fullWidth className={classes.marginRight}>
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
                      <Add
                        className={classes.pointer}
                        onClick={() => {
                          setAddDialogOpen(true);
                          setAddDialogVariant(DIALOG_VARIANT.PROJECT);
                        }}
                      />
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
                          Inspirations
                        </Typography>
                        <Add
                          className={classes.pointer}
                          onClick={() => {
                            setAddDialogOpen(true);
                            if (values.Inspirations.length === 0) {
                              setFieldValue("Inspirations", [""]);
                            }
                            setAddDialogVariant(DIALOG_VARIANT.INSPIRATION);
                          }}
                        />
                      </div>
                      {values.Inspirations &&
                        values.Inspirations.map(
                          (item) =>
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
                        item !== "" && (
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
          <AddDialog
            dialogOpen={addDialogOpen}
            setDialogOpen={setAddDialogOpen}
            variant={addDialogVariant}
            values={getValuesByVariant(values, addDialogVariant)}
            name={getNameByVariant(addDialogVariant)}
            handleChange={handleChange}
          />
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
