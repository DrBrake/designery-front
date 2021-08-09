import React from "react";
import { withRouter } from "react-router";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { v4 as uuidv4 } from "uuid";
import { convertFromRaw } from "draft-js";

import { IMAGE_TYPE, RANDOM_DIALOG_TYPE } from "../constants";
import { getRandomBetween, getTwoRandomUniqueValuesFromArray } from "../utils";
import Chip from "../Components/Chip";
import Dialog from "../Components/Dialog";
import Image from "../Components/Image";

const useStyles = makeStyles((theme) => ({
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
}));

const RandomDialog = ({ randomDialogType, setRandomDialogType, data }) => {
  const classes = useStyles();
  const getRamdonItems = () => {
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
  };
  return (
    <Dialog dialogOpen={!!randomDialogType} setDialogOpen={setRandomDialogType}>
      <div className={classes.flex}>
        {getRamdonItems().map((item, index) => (
          <>
            <div className={classes.randomPopUpDialogContainer} key={uuidv4()}>
              <Typography className={classes.marginBottom2}>
                {item.Title}
              </Typography>
              <Typography className={classes.marginBottom2}>
                {convertFromRaw(item.Description).getPlainText()}
              </Typography>
              <div className={classes.randomPopUpImageContainer}>
                {item.ImageRefs &&
                  item.ImageRefs.map((image) => (
                    <Image
                      variant={IMAGE_TYPE.RANDOM_POPUP}
                      src={image}
                      key={uuidv4()}
                    />
                  ))}
              </div>
              <div className={classes.marginBottom2}>
                {item.Tags &&
                  item.Tags.map((tag, tagIndex) => (
                    <Chip
                      label={tag}
                      lastTag={tagIndex + 1 === item.Tags.length}
                      key={uuidv4()}
                    />
                  ))}
              </div>
              <Typography className={classes.marginBottom2}>
                {item.Project}
              </Typography>
              {item.Inspirations &&
                item.Inspirations.map((inspiration) => (
                  <Typography key={uuidv4()}>{inspiration}</Typography>
                ))}
              {item.Ideas &&
                item.Ideas.map((idea) => (
                  <Typography key={uuidv4()}>{idea}</Typography>
                ))}
            </div>
            {index === 0 && <div className={classes.border} />}
          </>
        ))}
      </div>
    </Dialog>
  );
};

export default withRouter(RandomDialog);
