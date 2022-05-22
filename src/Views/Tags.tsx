import React, { useState } from "react";
import { Typography, Grid as MuiGrid } from "@material-ui/core";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

import Chip from "../Components/Chip";
import EditTagDialog from "../Components/Dialogs/EditTagDialog";
import { Tag } from "../Types/dataTypes";

import { selectTags } from "../Reducers/appSlice";
import { useGetDataQuery } from "../Services/dataAPI";
import useDialogs from "../Hooks/useDialogs";

const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: `${theme.breakpoints.values.xl}px`,
    margin: "auto",
  },
}));

const Tags = () => {
  const [selectedTag, setSelectedTag] = useState<Tag | null>(null);
  const { isLoading, error } = useGetDataQuery();
  const { dialogs, setDialogs } = useDialogs();
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
              <Chip
                label={item.Title}
                onClick={() => {
                  setSelectedTag(item);
                  setDialogs({
                    type: "EditTag",
                    open: true,
                  });
                }}
              />
            </MuiGrid>
          ))}
        </MuiGrid>
      ) : (
        <Typography>No data yet</Typography>
      )}
      {dialogs.EditTag.open && selectedTag && (
        <EditTagDialog
          tag={selectedTag}
          dialogOpen={dialogs.EditTag.open}
          setDialogOpen={() =>
            setDialogs({
              type: "EditTag",
              open: false,
            })
          }
        />
      )}
    </div>
  );
};

export default Tags;
