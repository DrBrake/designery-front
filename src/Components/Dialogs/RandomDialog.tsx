import React, { FC } from "react";
import { Typography } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { convertFromRaw } from "draft-js";

import { IMAGE_TYPE, RANDOM_DIALOG_TYPE, VARIANTS } from "../../constants";
import {
  getRandomBetween,
  getTwoRandomUniqueValuesFromArray,
} from "../../utils";
import { ItemResponse, Idea, Inspiration } from "../../Types/dataTypes";

import Chip from "../Chip";
import Dialog from "./Dialog";
import Image from "../Image/Image";

const useStyles = makeStyles((theme) =>
  createStyles({
    flex: {
      display: "flex",
    },
    border: {
      borderRight: `10px solid ${theme.palette.primary.main}`,
      margin: `0 ${theme.spacing(2)}px`,
    },
    randomPopUpDialogContainer: {
      width: "50%",
    },
    randomPopUpImageContainer: {
      display: "flex",
      overflow: "scroll",
      marginBottom: theme.spacing(2),
    },
    marginBottom2: {
      marginBottom: theme.spacing(2),
    },
  })
);

interface Props {
  data: ItemResponse | undefined;
  randomDialogType: string | null;
  randomDialogOpen: boolean;
  setRandomDialogOpen: (value: boolean) => void;
}

const RandomDialog: FC<Props> = ({
  randomDialogType,
  randomDialogOpen,
  setRandomDialogOpen,
  data,
}) => {
  const classes = useStyles();
  const getRamdonItems = (): Array<Idea | Inspiration> => {
    if (data) {
      if (randomDialogType === RANDOM_DIALOG_TYPE.IDEAS) {
        return getTwoRandomUniqueValuesFromArray(data.ideas);
      } else if (randomDialogType === RANDOM_DIALOG_TYPE.INSPIRATIONS) {
        return getTwoRandomUniqueValuesFromArray(data.inspirations);
      } else if (randomDialogType === RANDOM_DIALOG_TYPE.BOTH) {
        const firstItem = data.ideas[getRandomBetween(0, data.ideas.length)];
        const secondItem =
          data.inspirations[getRandomBetween(0, data.inspirations.length)];
        return [firstItem, secondItem];
      }
      return [];
    }
    return [];
  };
  return (
    <Dialog
      dialogOpen={randomDialogOpen}
      setDialogOpen={() => setRandomDialogOpen(false)}
    >
      <div className={classes.flex}>
        {getRamdonItems().map((item, index) => (
          <>
            <div className={classes.randomPopUpDialogContainer} key={item._id}>
              <Typography className={classes.marginBottom2}>
                {item.Title}
              </Typography>
              {item.Description && (
                <Typography className={classes.marginBottom2}>
                  {convertFromRaw(item.Description).getPlainText()}
                </Typography>
              )}
              <div className={classes.randomPopUpImageContainer}>
                {item.ImageRefs &&
                  item.ImageRefs.map(
                    (image) =>
                      typeof image === "string" && (
                        <Image
                          variant={IMAGE_TYPE.RANDOM_POPUP}
                          src={image}
                          key={image}
                        />
                      )
                  )}
              </div>
              <div className={classes.marginBottom2}>
                {item.Tags &&
                  item.Tags.map((tag, tagIndex) => (
                    <Chip
                      label={tag.Title}
                      lastTag={tagIndex + 1 === item.Tags.length}
                      key={tag._id}
                    />
                  ))}
              </div>
              <Typography className={classes.marginBottom2}>
                {item.Variant === VARIANTS.IDEA && item.Project}
              </Typography>
              {item.Variant === VARIANTS.IDEA &&
                item?.Inspirations?.map((inspiration) => (
                  <Typography key={inspiration._id}>
                    {inspiration.Title}
                  </Typography>
                ))}
              {item.Variant === VARIANTS.INSPIRATION &&
                item?.Ideas?.map((idea) => (
                  <Typography key={idea._id}>{idea.Title}</Typography>
                ))}
            </div>
            {index === 0 && <div className={classes.border} />}
          </>
        ))}
      </div>
    </Dialog>
  );
};

export default RandomDialog;
