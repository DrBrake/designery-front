import React, { FC } from "react";
import { Select, MenuItem } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import createStyles from '@mui/styles/createStyles';

import { ArrowDown, ArrowUp, Refresh } from "./Icons";
import { SortDir, SortValue } from "../Types/dataTypes";
import { SORT_VALUES } from "../constants";

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
  const getIcon = () => {
    if (value !== SORT_VALUES.RANDOM) {
      if (direction === "asc") {
        return (
          <ArrowDown
            onClick={() =>
              handleRequestSort({ type: value, direction: "desc" })
            }
            className={classes.pointer}
          />
        );
      }
      return (
        <ArrowUp
          onClick={() => handleRequestSort({ type: value, direction: "asc" })}
          className={classes.pointer}
        />
      );
    }
    return (
      <Refresh
        onClick={() => handleRequestSort({ type: value, direction: "asc" })}
        className={classes.pointer}
      />
    );
  };
  return (
    <div className={classes.container}>
      <Select
        variant="standard"
        value={value}
        onChange={(e) =>
          handleRequestSort({
            type: e.target.value as SortValue,
            value: e.target.value as SortValue,
          })
        }
        className={classes.select}>
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
      {getIcon()}
    </div>
  );
};

export default Sort;
