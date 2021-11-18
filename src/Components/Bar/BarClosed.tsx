import React, { FC } from "react";
import classnames from "classnames";
import dayjs from "dayjs";
import { convertFromRaw } from "draft-js";
import { Typography, Grid } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import Chip from "../Chip";
import { ChevronDown } from "../Icons";
import { Item } from "../../Types/dataTypes";
import { VARIANTS } from "../../constants";
import { useFormStyles } from "./FormStyles";

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      cursor: "pointer",
      border: `1px solid #000000`,
      padding: `${theme.spacing(5)}px ${theme.spacing(5)}px ${theme.spacing(
        1
      )}px ${theme.spacing(5)}px`,
      borderBottomWidth: "0px",
      minHeight: "105px",
      position: "relative",
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
    flex: {
      display: "flex",
    },
    text: {
      fontSize: "16px",
      fontWeight: "bold",
    },
    lighterGrey: {
      color: theme.palette.grey[400],
    },
    fontSize16: {
      fontSize: "16px",
    },
    lightGrey: {
      color: theme.palette.primary.dark,
    },
    icon: {
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
    marginRight: {
      marginRight: theme.spacing(),
    },
  })
);

interface Props {
  itemData: Item;
  isLast: boolean;
  isFirst: boolean;
  isNewItem: boolean;
  setOpen: (value: boolean) => void;
}

const BarClosed: FC<Props> = ({
  itemData,
  setOpen,
  isLast,
  isFirst,
  isNewItem,
}) => {
  const classes = useStyles();
  const formClasses = useFormStyles();
  return (
    <Grid
      container
      justify="space-between"
      className={classnames(classes.container, {
        [classes.lastContainer]: isLast,
        [classes.firstContainer]: isFirst,
      })}
      onClick={() => setOpen(true)}
    >
      <div
        className={classnames(formClasses.variantColor, {
          [formClasses.ideaBar]: itemData.Variant === VARIANTS.IDEA,
          [formClasses.inspirationBar]:
            itemData.Variant === VARIANTS.INSPIRATION,
          [formClasses.projectBar]: itemData.Variant === VARIANTS.PROJECT,
        })}
      />
      <Grid item className={classes.flex}>
        <ChevronDown className={classes.icon} />
        <div>
          <div className={classes.flex}>
            <Typography
              className={classnames(classes.text, classes.marginRight)}
            >
              {itemData.Title}
            </Typography>
            {isNewItem && (
              <Typography
                className={classnames(classes.text, classes.lighterGrey)}
              >
                (UNSAVED)
              </Typography>
            )}
          </div>
          <Typography className={classes.fontSize16}>
            {itemData.Description &&
              convertFromRaw(itemData.Description).getPlainText()}
          </Typography>
        </div>
      </Grid>
      <Grid item>
        <Typography className={classnames(classes.fontSize16, classes.date)}>
          {dayjs(itemData.DateCreated).format("DD.MM.YYYY")}
        </Typography>
        {itemData.Tags &&
          itemData.Tags.map((item, index) => (
            <Chip
              label={item.Title}
              lastTag={index + 1 === itemData.Tags.length}
              key={item._id}
            />
          ))}
      </Grid>
    </Grid>
  );
};

export default BarClosed;
