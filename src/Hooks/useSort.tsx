import { useReducer } from "react";
import { SortDir, SortValue } from "../Types/dataTypes";
import { SORT_VALUES } from "../constants";

const sortState = {
  Title: {
    direction: "desc",
    value: SORT_VALUES.TITLE,
    name: "Title",
  },
  Date: {
    direction: "asc",
    value: SORT_VALUES.DATE,
    name: "Date",
  },
  Random: {
    direction: "asc",
    value: SORT_VALUES.RANDOM,
    name: "Random",
  },
  active: "Date",
};

const sortReducer = (state: any, action: any) => {
  switch (action.type) {
    case SORT_VALUES.TITLE:
      return {
        ...state,
        Title: Object.assign(state.Title, action),
        active: "Title",
      };
    case SORT_VALUES.DATE:
      return {
        ...state,
        Date: Object.assign(state.Date, action),
        active: "Date",
      };
    case SORT_VALUES.RANDOM:
      return {
        ...state,
        Random: Object.assign(state.Random, action),
        active: "Random",
      };
    default:
      return state;
  }
};

const useSort = (type: "List" | "Grid") => {
  const [sort, handleRequestSort] = useReducer(sortReducer, sortState);
  let allSortValues = [] as Array<{
    name: string;
    direction: SortDir;
    value: SortValue;
  }>;
  if (type === "List") {
    allSortValues = [sort.Title, sort.Date];
  } else if (type === "Grid") {
    allSortValues = [sort.Date, sort.Random];
  }
  return {
    sort: sort[sort.active],
    allSortValues: allSortValues,
    handleRequestSort,
  };
};

export default useSort;
