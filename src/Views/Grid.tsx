import React from "react";
import { Typography, Grid as MuiGrid } from "@material-ui/core";
import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

import { selectAllImages } from "../Reducers/appSlice";
import { useGetDataQuery } from "../Services/dataAPI";

import Sort from "../Components/Sort";
import Image from "../Components/Image/Image";
import { IMAGE_TYPE } from "../constants";

const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: `${theme.breakpoints.values.xl}px`,
    margin: "auto",
  },
}));

const Grid = () => {
  const { isLoading, error } = useGetDataQuery();
  const classes = useStyles();
  const images = useSelector(selectAllImages);
  return (
    <div className={classes.container}>
      {isLoading && <Typography>Loading</Typography>}
      {error && <Typography>Error</Typography>}
      {images?.length > 0 && !isLoading ? (
        <>
          <Sort />
          <MuiGrid container spacing={1}>
            {images.map((image) => (
              <MuiGrid item xs={3} key={uuidv4()}>
                <Image variant={IMAGE_TYPE.GRID} src={image} />
              </MuiGrid>
            ))}
          </MuiGrid>
        </>
      ) : (
        <Typography>No data yet</Typography>
      )}
    </div>
  );
};

export default Grid;
