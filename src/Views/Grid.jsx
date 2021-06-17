import React from "react";
import MuiGrid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

import Image from "../Components/Image";
import { IMAGE_TYPE } from "../constants";

const useStyles = makeStyles(() => ({
  container: {
    maxWidth: "1640px",
    margin: "auto",
  },
}));

const Grid = () => {
  const classes = useStyles();
  return (
    <MuiGrid container spacing={1} className={classes.container}>
      <MuiGrid item xs={3}>
        <Image
          variant={IMAGE_TYPE.GRID}
          src="https://cdn.vox-cdn.com/thumbor/E8q_XhXOvit56AdG5rxdP46C4lw=/1400x788/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/22438562/GettyImages_102679046.jpg"
        />
      </MuiGrid>
      <MuiGrid item xs={3}>
        <Image
          variant={IMAGE_TYPE.GRID}
          src="https://cdn.vox-cdn.com/thumbor/E8q_XhXOvit56AdG5rxdP46C4lw=/1400x788/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/22438562/GettyImages_102679046.jpg"
        />
      </MuiGrid>
      <MuiGrid item xs={3}>
        <Image
          variant={IMAGE_TYPE.GRID}
          src="https://cdn.vox-cdn.com/thumbor/E8q_XhXOvit56AdG5rxdP46C4lw=/1400x788/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/22438562/GettyImages_102679046.jpg"
        />
      </MuiGrid>
      <MuiGrid item xs={3}>
        <Image
          variant={IMAGE_TYPE.GRID}
          src="https://cdn.vox-cdn.com/thumbor/E8q_XhXOvit56AdG5rxdP46C4lw=/1400x788/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/22438562/GettyImages_102679046.jpg"
        />
      </MuiGrid>
      <MuiGrid item xs={3}>
        <Image
          variant={IMAGE_TYPE.GRID}
          src="https://cdn.vox-cdn.com/thumbor/E8q_XhXOvit56AdG5rxdP46C4lw=/1400x788/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/22438562/GettyImages_102679046.jpg"
        />
      </MuiGrid>
    </MuiGrid>
  );
};

export default Grid;
