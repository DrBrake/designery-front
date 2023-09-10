import React from "react";
import { Typography, Grid as MuiGrid } from "@mui/material";
import { useSelector } from "react-redux";
import makeStyles from "@mui/styles/makeStyles";

import { selectData } from "../Reducers/appSlice";
import { useGetDataQuery } from "../Services/dataAPI";

import Sort from "../Components/Sort";
import Image from "../Components/Image/Image";
import ImageDialog from "../Components/Dialogs/ImageDialog";
import { IMAGE_TYPE, BASE_URL, SORT_VALUES } from "../constants";
import useSort from "../Hooks/useSort";
import useDialogs from "../Hooks/useDialogs";
import { sortData, getAllImages, shuffleArray } from "../utils";

const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: `${theme.breakpoints.values.xl}px`,
    margin: "auto",
  },
}));

const Grid = () => {
  const { sort, allSortValues, handleRequestSort } = useSort("Grid");
  const { dialogs, setDialogs } = useDialogs();
  const { isLoading, error } = useGetDataQuery();
  const classes = useStyles();

  const data = useSelector(selectData);

  const getImages = () => {
    if (sort.value === SORT_VALUES.RANDOM) {
      return shuffleArray(getAllImages(data));
    } else return getAllImages(sortData(data, sort.value, sort.direction));
  };
  const images = getImages();
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
            {images.map((item) => (
              <MuiGrid
                item
                key={item.image}
                onClick={() =>
                  setDialogs({
                    type: "Image",
                    open: true,
                    variant: item.variant,
                    image: item.image,
                  })
                }
              >
                <Image
                  variant={IMAGE_TYPE.BAR}
                  src={`${BASE_URL}/images/${item.variant}/${item.image}?w=440`}
                />
              </MuiGrid>
            ))}
          </MuiGrid>
          {dialogs.Image.open && (
            <ImageDialog
              dialogOpen={dialogs.Image.open}
              setDialogOpen={() =>
                setDialogs({
                  type: "Image",
                  open: false,
                  variant: null,
                  image: null,
                })
              }
              image={dialogs.Image.image}
              variant={dialogs.Image.variant}
            />
          )}
        </>
      ) : (
        <Typography>No data yet</Typography>
      )}
    </div>
  );
};

export default Grid;
