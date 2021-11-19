import { useReducer } from "react";
import { SortDir, SortValue } from "../Types/dataTypes";

const sortState = {
  Title: {
    direction: "desc",
    value: "Title",
    name: "Title",
  },
  Date: {
    direction: "asc",
    value: "DateCreated",
    name: "Date",
  },
  Random: {
    direction: "asc",
    value: "Random",
    name: "Random",
  },
  active: "Date",
};

const sortReducer = (state: any, action: any) => {
  switch (action.type) {
    case "Title":
      return {
        ...state,
        Title: Object.assign(state.Title, action),
        active: "Title",
      };
    case "DateCreated":
      return {
        ...state,
        Date: Object.assign(state.Date, action),
        active: "Date",
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
