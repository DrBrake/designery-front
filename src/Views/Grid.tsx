import React from "react";
import { Typography, Grid as MuiGrid } from "@material-ui/core";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

import { selectData } from "../Reducers/appSlice";
import { useGetDataQuery } from "../Services/dataAPI";

import Sort from "../Components/Sort";
import Image from "../Components/Image/Image";
import { IMAGE_TYPE } from "../constants";
import useSort from "../Hooks/useSort";
import { sortData, getAllImages } from "../utils";

const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: `${theme.breakpoints.values.xl}px`,
    margin: "auto",
  },
}));

const Grid = () => {
  const { sort, allSortValues, handleRequestSort } = useSort("Grid");
  const { isLoading, error } = useGetDataQuery();
  const classes = useStyles();

  const data = useSelector(selectData);
  const images = getAllImages(sortData(data, sort.value, sort.direction));
  return (
    <div className={classes.container}>
      {isLoading && <Typography>Loading</Typography>}
      {error && <Typography>Error</Typography>}
      {images?.length > 0 && !isLoading ? (
        <>
          <Sort
            handleRequestSort={handleRequestSort}
            direction={sort.direction}
            value={sort.value}
            values={allSortValues}
          />
          <MuiGrid container spacing={1}>
            {images.map((image) => (
              <MuiGrid item xs={3} key={image}>
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
