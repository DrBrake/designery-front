import React from "react";
import { withRouter } from "react-router";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { IMAGE_TYPE } from "../constants";
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

const Navigation = ({ randomDialogType, setRandomDialogType }) => {
  const classes = useStyles();
  return (
    <Dialog dialogOpen={randomDialogType} setDialogOpen={setRandomDialogType}>
      <div className={classes.flex}>
        <div className={classes.randomPopUpDialogContainer}>
          <Typography className={classes.marginBottom2}>Title 1</Typography>
          <Typography className={classes.marginBottom2}>
            Description 1
          </Typography>
          <div className={classes.randomPopUpImageContainer}>
            <Image
              variant={IMAGE_TYPE.RANDOM_POPUP}
              src="https://cdn.vox-cdn.com/thumbor/E8q_XhXOvit56AdG5rxdP46C4lw=/1400x788/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/22438562/GettyImages_102679046.jpg"
            />
            <Image
              variant={IMAGE_TYPE.RANDOM_POPUP}
              src="https://cdn.vox-cdn.com/thumbor/E8q_XhXOvit56AdG5rxdP46C4lw=/1400x788/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/22438562/GettyImages_102679046.jpg"
            />
            <Image
              variant={IMAGE_TYPE.RANDOM_POPUP}
              src="https://cdn.vox-cdn.com/thumbor/E8q_XhXOvit56AdG5rxdP46C4lw=/1400x788/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/22438562/GettyImages_102679046.jpg"
            />
            <Image
              variant={IMAGE_TYPE.RANDOM_POPUP}
              src="https://cdn.vox-cdn.com/thumbor/E8q_XhXOvit56AdG5rxdP46C4lw=/1400x788/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/22438562/GettyImages_102679046.jpg"
            />
            <Image
              variant={IMAGE_TYPE.RANDOM_POPUP}
              src="https://cdn.vox-cdn.com/thumbor/E8q_XhXOvit56AdG5rxdP46C4lw=/1400x788/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/22438562/GettyImages_102679046.jpg"
            />
          </div>
          <div className={classes.marginBottom2}>
            <Chip label="Tag" />
            <Chip label="Tag" lastTag />
          </div>
          <Typography className={classes.marginBottom2}>Project 1</Typography>
          <Typography>Inspiration 1</Typography>
          <Typography>Inspiration 2</Typography>
        </div>
        <div className={classes.border} />
        <div className={classes.randomPopUpDialogContainer}>
          <Typography className={classes.marginBottom2}>Title 2</Typography>
          <Typography className={classes.marginBottom2}>
            Description 2
          </Typography>
          <div className={classes.randomPopUpImageContainer}>
            <Image
              variant={IMAGE_TYPE.RANDOM_POPUP}
              src="https://cdn.vox-cdn.com/thumbor/E8q_XhXOvit56AdG5rxdP46C4lw=/1400x788/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/22438562/GettyImages_102679046.jpg"
            />
            <Image
              variant={IMAGE_TYPE.RANDOM_POPUP}
              src="https://cdn.vox-cdn.com/thumbor/E8q_XhXOvit56AdG5rxdP46C4lw=/1400x788/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/22438562/GettyImages_102679046.jpg"
            />
          </div>
          <div className={classes.marginBottom2}>
            <Chip label="Tag" />
            <Chip label="Tag" lastTag />
          </div>
          <Typography className={classes.marginBottom2}>Project 2</Typography>
          <Typography>Inspiration 3</Typography>
          <Typography>Inspiration 4</Typography>
        </div>
      </div>
    </Dialog>
  );
};

export default withRouter(Navigation);
