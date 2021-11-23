import React, { useEffect } from "react";
import classnames from "classnames";
import { Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";

import {
  selectNewItems,
  selectData,
  removeAllNewItems,
} from "../Reducers/appSlice";
import {
  useGetDataQuery,
  usePostMultipleItemsMutation,
} from "../Services/dataAPI";
import { sortData } from "../utils";
import useSort from "../Hooks/useSort";

import Sort from "../Components/Sort";
import Bar from "../Components/Bar/Bar";

const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: `${theme.breakpoints.values.xl}px`,
    margin: "auto",
  },
  newItemContainer: {
    marginBottom: theme.spacing(2),
  },
  button: {
    minWidth: theme.spacing(17),
    borderRadius: theme.spacing(1),
  },
  marginRight: {
    marginRight: theme.spacing(2),
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: theme.spacing(2),
  },
}));

const List = () => {
  const classes = useStyles();
  const { error, isLoading } = useGetDataQuery();
  const [postMultipleItems, { isSuccess: postMultipleItemsSuccess }] =
    usePostMultipleItemsMutation();
  const data = useSelector(selectData);
  const { sort, allSortValues, handleRequestSort } = useSort("List");

  const dispatch = useDispatch();

  // isLoading gets stuck to true with hot reload sometimes
  const loadingProd = isLoading && process.env.NODE_ENV === "production";

  useEffect(() => {
    if (postMultipleItemsSuccess) {
      dispatch(removeAllNewItems());
    }
  }, [postMultipleItemsSuccess]);

  const newItems = useSelector(selectNewItems);
  return (
    <div className={classes.container}>
      <div className={classes.newItemContainer}>
        {newItems && newItems.length > 0 && (
          <>
            <div className={classes.buttonContainer}>
              <Button
                variant="text"
                color="primary"
                className={classnames(classes.button, classes.marginRight)}
                onClick={() => dispatch(removeAllNewItems())}
              >
                Remove All
              </Button>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={() => postMultipleItems(newItems)}
              >
                Save All
              </Button>
            </div>
            {newItems.map((item, index) => (
              <Bar
                itemData={item}
                isFirst={index === 0}
                isLast={index + 1 === newItems.length}
                key={item.TempID}
                isNewItem
                index={index}
              />
            ))}
          </>
        )}
      </div>
      {loadingProd && <Typography>Loading</Typography>}
      {error && <Typography>Error</Typography>}
      {data && data.length > 0 && !loadingProd && (
        <>
          <Sort
            handleRequestSort={handleRequestSort}
            direction={sort.direction}
            value={sort.value}
            values={allSortValues}
          />
          {sortData(data, sort.value, sort.direction).map((item, index) => (
            <Bar
              itemData={item}
              isFirst={index === 0}
              isLast={index + 1 === data.length}
              isNewItem={false}
              key={item._id}
              index={index}
            />
          ))}
        </>
      )}
      {data?.length === 0 && !loadingProd && newItems?.length === 0 && (
        <Typography>No data yet</Typography>
      )}
    </div>
  );
};

export default List;
