import React from "react";
import { Typography, Grid as MuiGrid } from "@material-ui/core";
import { v4 as uuidv4 } from "uuid";
import { makeStyles } from "@material-ui/core/styles";

import { useGetDataQuery } from "../Services/dataAPI";
import { handleDataForList } from "../utils";

import Sort from "../Components/Sort";
import Image from "../Components/Image";
import { IMAGE_TYPE } from "../constants";

const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: `${theme.breakpoints.values.xl}px`,
    margin: "auto",
  },
}));

const Grid = () => {
  const classes = useStyles();
  const { data, error, isLoading } = useGetDataQuery();
  const handleData = handleDataForList(data);
  return (
    <div className={classes.container}>
      {isLoading && <Typography>Loading</Typography>}
      {error && <Typography>Error</Typography>}
      {handleData && handleData.length > 0 && !isLoading ? (
        <>
          <Sort />
          <MuiGrid container spacing={1}>
            {handleData.map(
              (itemData) =>
                itemData.ImageRefs &&
                itemData.ImageRefs.map((image) => (
                  <MuiGrid item xs={3} key={uuidv4()}>
                    <Image variant={IMAGE_TYPE.GRID} src={image} />
                  </MuiGrid>
                ))
            )}
          </MuiGrid>
        </>
      ) : (
        <Typography>No data yet</Typography>
      )}
    </div>
  );
};

export default Grid;
