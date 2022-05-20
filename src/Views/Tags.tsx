import React from "react";
import { Typography, Grid as MuiGrid } from "@material-ui/core";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

import Chip from "../Components/Chip";

import { selectTags } from "../Reducers/appSlice";
import { useGetDataQuery } from "../Services/dataAPI";

const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: `${theme.breakpoints.values.xl}px`,
    margin: "auto",
  },
}));

const Tags = () => {
  const { isLoading, error } = useGetDataQuery();
  const classes = useStyles();

  const tags = useSelector(selectTags);

  return (
    <div className={classes.container}>
      {isLoading && <Typography>Loading</Typography>}
      {error && <Typography>Error</Typography>}
      {tags?.length > 0 && !isLoading ? (
        <MuiGrid container spacing={1}>
          {tags.map((item) => (
            <MuiGrid item key={item._id}>
              <Chip label={item.Title} />
            </MuiGrid>
          ))}
        </MuiGrid>
      ) : (
        <Typography>No data yet</Typography>
      )}
    </div>
  );
};

export default Tags;
