import React, { FC } from "react";
import { Select, MenuItem } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import { ArrowDown, ArrowUp } from "./Icons";
import { SortDir, SortValue } from "../Types/dataTypes";

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      marginBottom: theme.spacing(2),
    },
    select: {
      marginRight: theme.spacing(2),
      minWidth: "100px",
      "&:before, &:after": {
        content: "initial",
      },
      textTransform: "capitalize",
    },
    pointer: {
      cursor: "pointer",
    },
    menuItem: {
      textTransform: "capitalize",
    },
  })
);

interface Props {
  direction: SortDir;
  value: SortValue;
  values: Array<{ value: SortValue; name: string }>;
  handleRequestSort: (values: {
    type: string;
    value?: SortValue;
    direction?: SortDir;
  }) => void;
}

const Sort: FC<Props> = ({ direction, values, value, handleRequestSort }) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Select
        value={value}
        onChange={(e) =>
          handleRequestSort({
            type: e.target.value as SortValue,
            value: e.target.value as SortValue,
          })
        }
        className={classes.select}
      >
        {values.map((item) => (
          <MenuItem
            value={item.value}
            className={classes.menuItem}
            key={item.value}
          >
            {item.name}
          </MenuItem>
        ))}
      </Select>
      {direction === "asc" ? (
        <ArrowDown
          onClick={() => handleRequestSort({ type: value, direction: "desc" })}
          className={classes.pointer}
        />
      ) : (
        <ArrowUp
          onClick={() => handleRequestSort({ type: value, direction: "asc" })}
          className={classes.pointer}
        />
      )}
    </div>
  );
};

export default Sort;
