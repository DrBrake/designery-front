import React, { FC } from "react";
import classnames from "classnames";
import { Typography } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import { IMAGE_TYPE, RANDOM_DIALOG_TYPE, BASE_URL } from "../../constants";
import {
  getRandomBetween,
  getTwoRandomUniqueValuesFromArray,
} from "../../utils";
import { Idea, Inspiration } from "../../Types/dataTypes";

import Dialog from "./Dialog";
import Image from "../Image/Image";
import { Close } from "../Icons";

const useStyles = makeStyles((theme) =>
  createStyles({
    flex: {
      display: "flex",
    },
    border: {
      borderRight: `2px solid ${theme.palette.primary.main}`,
      margin: `0 ${theme.spacing(2)}px`,
    },
    randomPopUpDialogContainer: {
      width: "50%",
    },
    randomPopUpImageContainer: {
      display: "flex",
      flexWrap: "wrap",
      marginBottom: theme.spacing(2),
    },
    marginBottom2: {
      marginBottom: theme.spacing(2),
    },
    textRight: {
      textAlign: "right",
    },
    flexJustifyRight: {
      justifyContent: "right",
    },
    bold: {
      fontWeight: "bold",
    },
    close: {
      marginBottom: theme.spacing(2),
      cursor: "pointer",
    },
  })
);

interface Props {
  ideas: Array<Idea>;
  inspirations: Array<Inspiration>;
  randomDialogType: string | null;
  randomDialogOpen: boolean;
  setRandomDialogOpen: (value: boolean) => void;
}

const RandomDialog: FC<Props> = ({
  randomDialogType,
  randomDialogOpen,
  setRandomDialogOpen,
  ideas,
  inspirations,
}) => {
  const classes = useStyles();
  const getRamdonItems = (): Array<Idea | Inspiration> => {
    if (randomDialogType === RANDOM_DIALOG_TYPE.IDEAS) {
      return getTwoRandomUniqueValuesFromArray(ideas);
    } else if (randomDialogType === RANDOM_DIALOG_TYPE.INSPIRATIONS) {
      return getTwoRandomUniqueValuesFromArray(inspirations);
    } else if (randomDialogType === RANDOM_DIALOG_TYPE.BOTH) {
      const firstItem = ideas[getRandomBetween(0, ideas.length)];
      const secondItem = inspirations[getRandomBetween(0, inspirations.length)];
      return [firstItem, secondItem];
    }
    return [];
  };
  return (
    <Dialog
      dialogOpen={randomDialogOpen}
      setDialogOpen={() => setRandomDialogOpen(false)}
    >
      <div className={classnames(classes.flex, classes.flexJustifyRight)}>
        <Close
          className={classes.close}
          onClick={() => setRandomDialogOpen(false)}
        />
      </div>
      <div className={classes.flex}>
        {getRamdonItems().map((item, index) => (
          <>
            <div className={classes.randomPopUpDialogContainer} key={item._id}>
              <Typography
                variant="h4"
                className={classnames(classes.marginBottom2, classes.bold, {
                  [classes.textRight]: index !== 0,
                })}
              >
                {item.Title}
              </Typography>
              <div
                className={classnames(classes.randomPopUpImageContainer, {
                  [classes.flexJustifyRight]: index !== 0,
                })}
              >
                {item.ImageRefs &&
                  item.ImageRefs.map(
                    (image) =>
                      typeof image === "string" && (
                        <Image
                          variant={IMAGE_TYPE.RANDOM_POPUP}
                          src={`${BASE_URL}/images/${item.Variant}/${image}?w=440`}
                          key={image}
                        />
                      )
                  )}
              </div>
            </div>
            {index === 0 && <div className={classes.border} />}
          </>
        ))}
      </div>
    </Dialog>
  );
};

export default RandomDialog;
