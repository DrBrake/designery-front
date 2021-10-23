import React from "react";
import classnames from "classnames";
import { Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";

import { selectNewItems, selectData } from "../Reducers/appSlice";
import { useGetDataQuery } from "../Services/dataAPI";
import { handleDataForList } from "../utils";

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
  const data = useSelector(selectData);
  const handleData = handleDataForList(data);

  // isLoading gets stuck to true with hot reload sometimes
  const loadingProd = isLoading && process.env.NODE_ENV === "production";

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
                onClick={() => {}}
              >
                Remove All
              </Button>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={() => {}}
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
                projects={data?.projects}
                isNewItem
                index={index}
              />
            ))}
          </>
        )}
      </div>
      {loadingProd && <Typography>Loading</Typography>}
      {error && <Typography>Error</Typography>}
      {handleData && handleData.length > 0 && !loadingProd && (
        <>
          <Sort />
          {handleData.map((item, index) => (
            <Bar
              itemData={item}
              isFirst={index === 0}
              isLast={index + 1 === handleData.length}
              isNewItem={false}
              key={item._id}
              projects={data?.projects}
              index={index}
            />
          ))}
        </>
      )}
      {handleData?.length === 0 && !loadingProd && newItems?.length === 0 && (
        <Typography>No data yet</Typography>
      )}
    </div>
  );
};

export default List;
