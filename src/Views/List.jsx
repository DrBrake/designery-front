import React from "react";
import Typography from "@material-ui/core/Typography";
import { v4 as uuidv4 } from "uuid";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";

import { selectNewItems } from "../Reducers/appSlice";
import { useGetDataQuery } from "../Services/dataAPI";
import { handleDataForList } from "../utils";

import Sort from "../Components/Sort";
import Bar from "../Components/Bar/Bar";

const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: `${theme.breakpoints.values.xl}px`,
    margin: "auto",
  },
}));

const List = () => {
  const classes = useStyles();
  const { data, error, isLoading } = useGetDataQuery();
  const handleData = handleDataForList(data);

  const newItems = useSelector(selectNewItems);
  return (
    <div className={classes.container}>
      {newItems &&
        newItems.map((item, index) => (
          <Bar
            itemData={item}
            isFirst={index === 0}
            isLast={index + 1 === newItems.length}
            key={uuidv4()}
            projects={data.projects}
            isNewItem
            index={index}
          />
        ))}
      {isLoading && <Typography>Loading</Typography>}
      {error && <Typography>Error</Typography>}
      {handleData && handleData.length > 0 && !isLoading && (
        <>
          <Sort />
          {handleData.map((item, index) => (
            <Bar
              itemData={item}
              isFirst={index === 0}
              isLast={index + 1 === data.length}
              key={uuidv4()}
              projects={data.projects}
            />
          ))}
        </>
      )}
      {handleData?.length === 0 &&
        !isLoading &&
        // eslint-disable-next-line prettier/prettier
        newItems?.length === 0 && (
          <Typography>No data yet</Typography>
        )}
    </div>
  );
};

export default List;
